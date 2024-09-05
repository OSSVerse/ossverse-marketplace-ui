<!-- eslint-disable no-multiple-empty-lines -->
<template>
  <div class="search-page">
    <div class="search-bar side-padding searchBy-search-bar">
      <SfSearchBar
        :placeholder="searchByPlaceholderMapper[selectedSearchByOption]"
        aria-label="Search"
        :icon="null"
        :value="searchKey"
        @input="(value) => (searchKey = value)"
        @keydown.enter="searchHit($event)"
      >
        <template #icon>
          <div
            :class="{
              'dropdown-button': true
            }"
            @click="onDropdownHeaderClick"
          >
            <div v-if="selectedSearchByOption === 'search-by-all'">All</div>
            <SfImage
              v-else
              :src="`/icons/${selectedSearchByOption}.png`"
              :alt="`${selectedSearchByOption}`"
            />
            <SfIcon icon="chevron_down" size="xxs" />
          </div>
          <SfButton
            v-if="searchKey"
            class="sf-search-bar__button sf-button--pure"
            @click="clearSearch"
          >
            <span class="sf-search-bar__icon">
              <SfIcon color="var(--c-text)" size="20px" icon="cross" />
            </span>
          </SfButton>
          <SfButton
            v-else
            class="sf-search-bar__button sf-button--pure"
            @click="
              isSearchOpen ? (isSearchOpen = false) : (isSearchOpen = true)
            "
          >
            <span class="sf-search-bar__icon">
              <SfIcon color="var(--c-text)" size="20px" icon="search" />
            </span>
          </SfButton>
        </template>
      </SfSearchBar>

      <div class="dowpdown" v-if="openSearchByDropdown">
        <div
          class="dowpdown-item"
          v-for="(searchBy, key, index) in searchByMapper"
          :key="key"
          @click="onSelectDropdownItem(key)"
          :class="{ border: index !== Object.keys(searchByMapper) - 1 }"
        >
          <SfImage
            :src="`/icons/${key}.png`"
            :alt="`${key}`"
            class="search-by-icon"
          />
          {{ searchBy }}
        </div>
      </div>
    </div>

    <div class="details">
      <transition-group name="sf-fade" mode="out-in" v-if="!enableLoader">
        <div
          v-if="pollResults && pollResults.length > 0"
          class="search__wrapper-results"
          key="results"
        >
          <div class="side-padding result-num">
            <div>
              <span
                ><span v-e2e="'total-result'">{{ totalResults }}</span> results
                found</span
              >
            </div>
          </div>
          <div v-for="(bpp, bppIndex) in pollResults" :key="bppIndex">
            <div
              v-for="(provider, prIndex) in bpp.bpp_providers"
              :key="prIndex"
            >
              <div
                v-for="(product, pIndex) in provider.items"
                :key="
                  bppIndex +
                    '-' +
                    prIndex +
                    '-' +
                    pIndex +
                    '-' +
                    keyVal +
                    'product'
                "
                class="results--mobile"
              >
                <ProductCard
                  @goToProduct="goToProduct(product, provider, bpp)"
                  :pName="productGetters.getName(product)"
                  :pProviderName="providerGetters.getProviderName(provider)"
                  :pPrice="productGetters.getPrice(product).regular"
                  :pImage="productGetters.getGallery(product)[0].small[0]"
                  :pDistance="'800m away'"
                  :pWieght="productGetters.getProductWeight(product) + ' kg'"
                  :pCount="cartGetters.getItemQty(isInCart({ product }))"
                  @updateItemCount="
                    (item) => updateItemCount(item, provider, bpp, pIndex)
                  "
                  :horizontalView="false"
                />
              </div>
            </div>
          </div>
        </div>

        <div v-if="noSearchFound" key="no-search" class="before-results">
          <SfImage
            src="/icons/feather_search.svg"
            class=""
            alt="error"
            loading="lazy"
          />
          <p>
            <b>{{ $t('Your search did not yield ') }}</b>
          </p>
          <p>
            <b>{{ $t('any results ') }}</b>
          </p>
          <p>{{ $t('Please try searching again using ') }}</p>
          <p>{{ $t('different keyword') }}</p>
        </div>
      </transition-group>

      <LoadingCircle :enable="enableLoader" key="loding-cir" />
    </div>
    <div v-if="cartGetters.getTotalItems(cart)" class="sr-footer">
      <Footer
        @buttonClick="footerClick"
        :totalPrice="cartGetters.getTotals(cart).total"
        :totalItem="cartGetters.getTotalItems(cart)"
        buttonText="View Cart"
      >
        <template v-slot:buttonIcon>
          <SfIcon icon="empty_cart" color="white" :coverage="1" />
        </template>
      </Footer>
    </div>
  </div>
</template>
<script>
import { SfIcon, SfSearchBar, SfButton, SfImage } from '@storefront-ui/vue';
import { ref, onBeforeMount, watch, computed } from '@vue/composition-api';
import LoadingCircle from '~/components/LoadingCircle';
import ProductCard from '~/components/ProductCard';
import Footer from '~/components/Footer';
import { useUiState } from '~/composables';
import debounce from 'lodash.debounce';
import {
  productGetters,
  providerGetters,
  cartGetters,
  useCart,
  useFacet,
  useSearch
} from '@vue-storefront/beckn';

export default {
  name: 'Search',
  components: {
    LoadingCircle,
    SfIcon,
    SfSearchBar,
    SfButton,
    ProductCard,
    Footer,
    SfImage
  },
  setup(_, context) {
    const {
      searchString,
      changeSearchString,
      selectedLocation,
      toggleLoadindBar,
      clearCartPopup
    } = useUiState();
    const goBack = () => {
      context.root.$router.back();
    };

    const { addItem, cart, isInCart, load } = useCart();
    const data = context.root.$route.params.searchKey;
    const searchKey = ref(data);
    const enableLoader = ref(Boolean(data));
    const keyVal = ref(0);
    const { search, result } = useFacet();
    const { pollResults, poll, polling, stopPolling } = useSearch('search');
    const noSearchFound = ref(false);

    const openSearchByDropdown = ref(false);
    const selectedSearchByOption = ref(
      context.root.$route.params.searchBy || 'search-by-all'
    );
    const searchByMapper = {
      'search-by-all': 'All',
      'search-by-seller': 'Search by Seller',
      'search-by-category': 'Search by Category'
    };
    const searchByPlaceholderMapper = {
      'search-by-all': 'Search for Items',
      'search-by-seller': 'Enter Seller\'s Name',
      'search-by-category': 'Enter Category Name'
    };

    watch(
      () => clearCartPopup.value,
      (newVal) => {
        if (!newVal) {
          keyVal.value++;
        }
      }
    );

    const handleSearch = debounce((paramValue) => {
      if (polling.value) stopPolling();
      enableLoader.value = true;
      if (noSearchFound.value) noSearchFound.value = false;
      toggleLoadindBar(false);
      search({
        term: paramValue,
        locationIs:
          selectedLocation?.value?.latitude +
          ',' +
          selectedLocation?.value?.longitude,
        searchBy: selectedSearchByOption.value
        // eslint-disable-next-line no-unused-vars
      }).then((_) => {
        localStorage.setItem(
          'transactionId',
          result.value.data.ackResponse.context.transaction_id
        );

        poll({
          // eslint-disable-next-line camelcase
          message_id: result.value.data?.ackResponse.context.message_id
        });
      });

      console.log('result value', pollResults.value);
    }, 1000);

    watch(
      () => pollResults.value,
      (newValue) => {
        if (newValue?.length > 0 && enableLoader.value) {
          enableLoader.value = false;
          toggleLoadindBar(true);
        }
      }
    );

    watch(
      () => polling.value,
      (newValue) => {
        if (!newValue) {
          enableLoader.value = false;
          toggleLoadindBar(false);
          if (pollResults?.value.length === 0) {
            noSearchFound.value = true;
          }
        } else {
          enableLoader.value = true;
          noSearchFound.value = false;
        }
      }
    );

    onBeforeMount(async () => {
      await load();
      if (searchKey.value) {
        handleSearch(searchKey.value);
      }
    });

    const searchHit = (value) => {
      if (value?.target?.value) {
        if (value.target.value === searchString.value) {
          handleSearch(value.target.value);
        } else {
          changeSearchString(value.target.value);
          console.log(searchString.value);
        }
      }
    };

    watch(searchString, (newVal) => {
      if (newVal !== '') {
        searchKey.value = newVal;
        handleSearch(newVal);
      }
    });

    const onSearchChange = (value) => {
      searchKey.value = value;
      console.log(searchKey.value);
    };

    const clearSearch = () => {
      searchKey.value = '';
    };

    const totalResults = computed(() => {
      let reusltNum = 0;
      for (const bpp of pollResults?.value) {
        if (bpp.bpp_providers.length !== 0) {
          for (const provider of bpp.bpp_providers) {
            // eslint-disable-next-line max-depth
            if (provider.items) {
              reusltNum += provider.items.length;
            }
          }
        }
      }
      return reusltNum;
    });

    const footerClick = () => {
      context.root.$router.push('/cart');
    };

    const goToProduct = (product, provider, bpp) => {
      const data = btoa(
        JSON.stringify({
          product,
          bpp: {
            id: bpp.bpp_id,
            descriptor: bpp.bpp_descriptor
          },
          bppProvider: {
            id: provider.id,
            descriptor: provider.descriptor
          },
          locations: provider.locations
        })
      );
      context.root.$router.push({
        path: '/product',
        query: {
          data: data
        }
      });
    };

    const updateItemCount = (data, provider, bpp, index) => {
      addItem({
        product: provider.items[index],
        quantity: data,
        customQuery: {
          bpp: {
            id: bpp.bpp_id,
            descriptor: bpp.bpp_descriptor
          },
          bppProvider: {
            id: provider.id,
            descriptor: provider.descriptor
          },
          locations: provider.locations
        }
      });
    };

    const saveToSessionStorage = (key, value) => {
      // Convert boolean to string because sessionStorage stores data as strings
      sessionStorage.setItem(key, value);
    };

    const onDropdownHeaderClick = (event) => {
      if (event.type === 'click') {
        saveToSessionStorage('dropdown_value', true);
      }
      if (sessionStorage.getItem('dropdown_value')) {
        saveToSessionStorage('dropdown_value', false);
        openSearchByDropdown.value = !openSearchByDropdown.value;
      }
    };

    const onSelectDropdownItem = (selectedOption) => {
      selectedSearchByOption.value = selectedOption;
      openSearchByDropdown.value = false;
    };

    return {
      goBack,
      enableLoader,
      productGetters,
      providerGetters,
      cartGetters,
      searchKey,
      keyVal,
      noSearchFound,
      cart,
      pollResults,
      isInCart,
      onSearchChange,
      clearSearch,
      updateItemCount,
      handleSearch,
      searchHit,
      footerClick,
      totalResults,
      goToProduct,
      selectedSearchByOption,
      openSearchByDropdown,
      selectedLocation,
      onDropdownHeaderClick,
      onSelectDropdownItem,
      searchByMapper,
      searchByPlaceholderMapper
    };
  }
};
</script>

<style lang="scss" scoped>
.side-padding {
  display: flex;
  justify-content: space-between;
}

.dropdown-button {
  position: absolute;
  border-right: 1px solid #d9d9d9;
  height: 100%;
  padding: 10px;
  width: 75px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  color: #f37a20;
  box-sizing: border-box;
  font-weight: 700;
  cursor: pointer;
}

.dowpdown {
  background: #ffffff;
  box-shadow: 0px 4px 14px rgba(0, 0, 0, 0.3);
  border-radius: 6px;
  padding: 0 7px;
  position: absolute;
  top: 75px;
  width: 342px;
  z-index: 1;
  .dowpdown-item {
    display: flex;
    align-items: center;
    padding: 8px 0;
    cursor: pointer;
  }
  .border {
    border-bottom: 1px solid rgba(226, 226, 226, 0.7);
  }
  .color-text {
    color: #f37a20;
    cursor: pointer;
  }
}

.search-by-icon {
  padding-right: 20px;
  padding-left: 8px;
}

.dropdown-disabled {
  opacity: 0.4;
  color: #e0e0e1 !important;

  .sf-icon {
    --icon-color: #e0e0e1 !important;
  }
}

.search-bar {
  position: relative;
}
</style>
