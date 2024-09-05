<template>
  <div class="explore-page">
    <div class="head"></div>
    <div class="provider-head flexy-center h-padding">
      <div class="flexy">
        <div class="back" @click="goBack">
          <SfIcon color="#F37A20" size="20px" icon="chevron_left" />
        </div>
        <img
          class="provide-img"
          :src="
            providerGetters.getProviderImages(provider)[0]
              ? providerGetters.getProviderImages(provider)[0]
              : require('~/assets/images/store-placeholder.png')
          "
          alt="Vila stripe maxi shirt dress"
          :width="35"
          :height="36"
        />
        <div class="text-padding">
          <div class="flexy-center">
            <div class="p-name">
              {{ providerGetters.getProviderName(provider, provider) }}
            </div>
            <div class="text-padding">
              <span class="p-distance">by</span>
              <span class="bpp-name">{{
                providerGetters.getProviderBpp(bpp.bpp_descriptor)
              }}</span>
            </div>
          </div>
          <div class="p-distance">
            {{ providerGetters.getProviderDistance(provider) }} km
          </div>
        </div>
      </div>
    </div>
    <div class="h-padding">
      <SfSearchBar
        placeholder="Search for items"
        aria-label="Search"
        :icon="null"
        :value="searchKey"
        @input="(value) => (searchKey = value)"
        @keydown.enter="searchHit($event)"
      >
        <template #icon>
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
    </div>
    <div key="loadingCircle" class="details">
      <transition-group name="sf-fade" class="check-w" mode="out-in">
        <div
          v-if="setSearchKey && !enableLoader"
          class="s-text h-padding"
          key="s-text"
        >
          Related to your search “{{ setSearchKey }}”
        </div>
        <div
          v-if="!enableLoader"
          key="p-list"
          class="product-container grid"
        >
          <ProductCard
            v-for="(product, pIndex) in itemList"
            v-if="pIndex < loadNum"
            @goToProduct="goToProduct(product, provider, bpp)"
            :key="pIndex + '-' + keyVal + 'product'"
            :pName="productGetters.getName(product)"
            :pPrice="productGetters.getPrice(product).regular"
            :pImage="productGetters.getGallery(product)[0].small[0]"
            :pWieght="productGetters.getProductWeight(product) + ' kg'"
            :pCount="cartGetters.getItemQty(isInCart({ product }))"
            @updateItemCount="(item) => updateItemCount(item, pIndex)"
          />
        </div>
        <div v-if="itemList.length > loadNum " key="load-more" class="load-more" @click="loadMore">
          <button>Load More</button>
        </div>
        <LoadingCircle :enable="enableLoader" key="loding-cir" />
      </transition-group>
    </div>
    <div v-if="cartGetters.getTotalItems(cart)" class="sr-footer">
      <Footer
        @buttonClick="footerClick"
        :totalPrice="cart.totalPrice"
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
import { SfIcon, SfSearchBar, SfButton } from '@storefront-ui/vue';
import { ref, onBeforeMount, watch } from '@vue/composition-api';
import LoadingCircle from '~/components/LoadingCircle';
import ProductCard from '~/components/ProductCard';
import Footer from '~/components/Footer';
import { useUiState } from '~/composables';
import {
  productGetters,
  providerGetters,
  cartGetters,
  useCart,
  useFacet,
  useSearch
} from '@vue-storefront/beckn';

export default {
  name: 'ExploreProvider',
  components: {
    LoadingCircle,
    SfIcon,
    SfSearchBar,
    SfButton,
    ProductCard,
    Footer
  },
  setup(_, context) {
    const { selectedLocation, explorePageData, updateExpPageData } = useUiState();
    const enableLoader = ref(false);
    const goBack = () => context.root.$router.back();
    console.log(explorePageData);
    const { addItem, cart, isInCart, load } = useCart();
    // const { bpp, provider, searchValue } = context.root.$route.params;
    const bpp = explorePageData.value.bpp;
    const provider = explorePageData.value.provider;
    const searchKey = ref(explorePageData.value.searchValue);
    const setSearchKey = ref(explorePageData.value.searchValue);
    const itemList = ref(provider.items);
    const keyVal = ref(0);
    const loadNum = ref(10);
    const { search, result } = useFacet();
    const { pollResults, poll, polling, stopPolling } = useSearch('search-by-provider');
    console.log(bpp, provider);

    onBeforeMount(async () => {
      await load();
    });

    const handleSearch = async (paramValue) => {
      setSearchKey.value = paramValue;
      console.log(polling.value);
      stopPolling();
      if (!enableLoader.value) enableLoader.value = true;
      await search({
        term: paramValue,
        locationIs:
          selectedLocation?.value?.latitude +
          ',' +
          selectedLocation?.value?.longitude,
        providerId: provider.id
      });
      localStorage.setItem(
        'transactionId',
        result.value.data.ackResponse.context.transaction_id
      );
      watch(
        () => pollResults.value,
        (newValue) => {
          console.log(newValue);
          if (newValue?.length > 0 && enableLoader.value) {
            updateExpPageData({...explorePageData.value, provider: { ...explorePageData.value.provider, items: newValue[0].bpp_providers[0].items}, searchValue: searchKey.value});
            itemList.value = newValue[0].bpp_providers[0].items;
            enableLoader.value = false;
            stopPolling();
          }
        }
      );
      await poll({
        // eslint-disable-next-line camelcase
        message_id: result.value.data.ackResponse.context.message_id
      });
    };

    const searchHit = (value) => {
      if (value?.target?.value) {
        handleSearch(value.target.value);
      }
    };

    const onSearchChange = (value) => {
      searchKey.value = value;
      console.log(searchKey.value);
    };

    const clearSearch = () => {
      searchKey.value = '';
      handleSearch('');
    };

    const updateItemCount = (data, index) => {
      addItem({
        product: itemList.value[index],
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

    const footerClick = () => {
      context.root.$router.push('/cart');
    };

    const loadMore = () => {
      if (itemList.value.length > loadNum.value) {
        loadNum.value += 10;
        console.log(loadNum);
      }
    };

    const goToProduct = (product, provider, bpp) => {
      const data = btoa(JSON.stringify({
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
      }));
      context.root.$router.push({
        path: '/product',
        query: {
          data: data
        }
      });
    };

    return {
      goBack,
      bpp,
      provider,
      enableLoader,
      productGetters,
      providerGetters,
      cartGetters,
      searchKey,
      itemList,
      keyVal,
      cart,
      loadNum,
      setSearchKey,
      isInCart,
      onSearchChange,
      clearSearch,
      updateItemCount,
      handleSearch,
      searchHit,
      footerClick,
      loadMore,
      goToProduct
    };
  }
};
</script>

<style lang="scss" scoped>
.explore-page {
  height: calc(100vh - 45px);
  .flexy {
    display: flex;
  }
  .flexy-center {
    display: flex;
    align-items: center;
  }
  .loader-circle {
    height: calc(100vh - 250px);
  }
  .provider-head {
    display: flex;
    justify-content: space-between;
    padding-top: var(--spacer-base);
    .p-name {
      font-weight: 600;
      font-size: 16px;
    }

    .p-distance {
      font-size: 12px;
      font-weight: 400;
      color: #8d9091;
    }
  }
  .h-padding {
    padding-left: var(--spacer-sm);
    padding-right: var(--spacer-sm);
  }
  .text-padding {
    padding-left: 10px;
  }
  .bpp-name {
    font-weight: 600;
    font-size: 12px;
  }
  .back {
    width: 30px;
    display: flex;
    align-items: center;
  }
  .details {
    height: calc(100vh - 181px);
    padding-top: 20px;
    overflow: scroll;
    .s-text {
      font-weight: bold;
      font-size: 16px;
      padding-bottom: 20px;
    }
    .product-container {
      display: flex;
      overflow: scroll;
      .s-product {
        margin-left: 15px;
      }
    }
    .grid {
      display: grid;
      grid-template-columns: auto auto;
      justify-content: center;
      grid-row-gap: 25px;
      padding-bottom: 60px;
      .s-product {
        margin-right: unset;
      }
    }
    .load-more {
      padding: 20px;
      padding-bottom: unset;
      display: flex;
      justify-content: center;
      padding-bottom: 70px;
      button {
        background-color: #fff;
        color: #f37a20;
        border: 2px solid #f37a20;
        border-radius: 3px;
        font-weight: 600;
        font-size: 15px;
        width: 139px;
        height: 36px;
      }
    }
  }
  .sr-footer {
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 3;
  }
}
</style>
