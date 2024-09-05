<template>
  <div>
    <SfMegaMenu
      :visible="isSearchOpen"
      :title="$t('Search results')"
      class="search"
    >
      <transition-group name="sf-fade" class="check-w" mode="out-in">
        <div v-if="enableLoader" key="loadingCircle" class="loader-circle">
          <LoadingCircle   :enable="enableLoader"/>
        </div>
        <div v-else-if="catalogs && catalogs.length > 0" class="search__wrapper-results" key="results">
          <div class="h-padding result-num">
            <span><span v-e2e="'total-result'">{{ totalResults(catalogs) }}</span> results found</span>
          </div>
          <div  v-for="(bpp, bppIndex) in catalogs" :key="bppIndex" >
            <div v-for="(provider, prIndex) in bpp.bpp_providers" :key="prIndex" >
              <div class="provider-head flexy-center h-padding">
                <div class="flexy">
                  <img
                    class="provide-img"
                    :src="providerGetters.getProviderImages(provider)[0]?providerGetters.getProviderImages(provider)[0]:require('~/assets/images/store-placeholder.png')"
                    alt="Vila stripe maxi shirt dress"
                    :width="35"
                    :height="36"
                  />
                  <div class="text-padding">
                    <div class="flexy-center">
                      <div class="p-name">{{providerGetters.getProviderName(provider,provider)}}</div>
                      <div class="text-padding"> <span class="p-distance">by</span>  <span>{{providerGetters.getProviderBpp(bpp.bpp_descriptor)}}</span></div>
                    </div>
                    <div class="p-distance">{{providerGetters.getProviderDistance(provider)}} km</div>
                  </div>
                </div>
                <div class="exp-provider" @click="openProvider(bpp,provider )">Explore All</div>
              </div>
              <div class="results--mobile">
                <ProductCard
                  v-for="(product, pIndex) in provider.items"
                  @goToProduct="goToProduct(product,provider,bpp)"
                  :key="bppIndex+'-'+prIndex+'-'+pIndex+'-'+keyVal+'product'"
                  :pName="productGetters.getName(product)"
                  :pPrice="productGetters.getPrice(product).regular"
                  :pImage="productGetters.getGallery(product)[0].small[0]"
                  :pWieght="productGetters.getProductWeight(product)+' kg'"
                  :pCount="cartGetters.getItemQty(isInCart({product}))"
                  @updateItemCount="(item)=>updateItemCount(item, provider, bpp, pIndex)"
                />
              </div>
              <div><hr class="sf-divider" /></div>
            </div>
          </div>
        </div>
        <div v-else-if="noSearchFound" key="no-search" class="before-results">
          <SfImage src="/icons/feather_search.svg" class="" alt="error" loading="lazy"/>
          <p ><b>{{ $t('Your search did not yield ') }}</b></p>
          <p ><b>{{ $t('any results ') }}</b></p>
          <p >{{ $t('Please try searching again using ') }}</p>
          <p >{{ $t('different keyword') }}</p>
        </div>
        <div v-else-if="false" key="no-results" class="before-results">
          <SfImage src="/error/error.svg" class="before-results__picture" alt="error" loading="lazy"/>
          <p class="before-results__paragraph">{{ $t('You haven’t searched for items yet') }}</p>
          <p class="before-results__paragraph">{{ $t('Let’s start now – we’ll help you') }}</p>
        </div>
      </transition-group>
    </SfMegaMenu>
      <div v-if="cart.totalItems" class="sr-footer">
        <Footer
          @buttonClick="footerClick"
          :totalPrice="cart.totalPrice"
          :totalItem="cart.totalItems"
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
import {
  SfMegaMenu,
  SfList,
  SfBanner,
  SfProductCard,
  SfScrollable,
  SfMenuItem,
  SfButton,
  SfImage,
  SfIcon
} from '@storefront-ui/vue';
import { ref, watch, computed } from '@vue/composition-api';
import { productGetters, providerGetters, cartGetters } from '@vue-storefront/beckn';
import { useCart } from '@vue-storefront/beckn';
import ProductCard from './ProductCard';
import LoadingCircle from './LoadingCircle';
import Footer from '~/components/Footer';
import { useUiState } from '~/composables';

export default {
  name: 'SearchResults',
  components: {
    SfMegaMenu,
    SfList,
    SfBanner,
    SfProductCard,
    SfScrollable,
    SfMenuItem,
    SfButton,
    SfImage,
    ProductCard,
    LoadingCircle,
    SfIcon,
    Footer
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    result: {
      type: Array
    },
    enableLoader: {
      type: Boolean,
      default: false
    },
    noSearchFound: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { emit, root }) {
    const { addItem, cart, isInCart } = useCart();
    const isSearchOpen = ref(props.visible);
    const catalogs = computed(() => props.result);
    const { toggleCartSidebar, clearCartPopup} = useUiState();
    const keyVal = ref(0);

    watch(() => props.visible, (newVal) => {
      isSearchOpen.value = newVal;
      if (isSearchOpen.value) {
        document.body.classList.add('no-scroll');
      } else {
        document.body.classList.remove('no-scroll');
        emit('removeSearchResults');
      }
    });
    watch(() => clearCartPopup.value, (newVal) => {
      if (!newVal) {
        keyVal.value++;
      }
    });

    const totalResults = (newValue) => {
      if (newValue) {
        let reusltNum = 0;
        for (const bpp of newValue) {
          for (const provider of bpp.bpp_providers) {
            reusltNum += provider.items.length;
          }
        }
        return reusltNum;
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
      root.$router.push({
        path: root.$route.path + 'product',
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

    const footerClick = () =>{
      root.$router.push('/cart');
    };

    const openProvider = (bpp, provider) => {
      console.log('clicked ', bpp, provider);
      root.$router.push({
        name: 'ExploreProvider',
        params: {
          bpp: {
            // eslint-disable-next-line camelcase
            bpp_descriptor: bpp.bpp_descriptor,
            // eslint-disable-next-line camelcase
            bpp_id: bpp.bpp_id
          },
          provider
        }
      });
    };

    return {
      isSearchOpen,
      productGetters,
      catalogs,
      providerGetters,
      LoadingCircle,
      goToProduct,
      updateItemCount,
      toggleCartSidebar,
      cart,
      isInCart,
      totalResults,
      cartGetters,
      footerClick,
      keyVal,
      openProvider
    };
  }
};
</script>
<style lang="scss" scoped>
.check-w{
  width: 100%;
}
.flexy{
  display: flex;
}
.flexy-center{
  display: flex;
  align-items: center;
}

.s-product{
  margin-right: 10px;
}
.result-num{
  font-size: 12px;
  font-weight: 400;
  padding-bottom: 10px;
}
.sr-footer{
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 3;
}
.provider-head{
  display: flex;
  justify-content: space-between;
  padding-top: var(--spacer-base);
  .p-name{
    font-size: 19px;
    font-weight: 600;
  }

  .p-distance{
    font-size: 12px;
    font-weight: 400;
    color: #8D9091;
  }
}
.h-padding{
  padding-left: var(--spacer-sm);
  padding-right: var(--spacer-sm);
}
.text-padding{
  padding-left: 10px;
}
.back{
  background-color: #d2d2d2;
}
.exp-provider{
  color: #5ECE7B;
  font-size: 12px;
  font-weight: 600;

}
.search {
  position: absolute;
  right: 0;
  left: 0;
  z-index: 3;
  --mega-menu-column-header-margin: var(--spacer-sm) 0 var(--spacer-xl);
  --mega-menu-content-padding: 0;
  --mega-menu-height: auto;
    padding-bottom: 60px;
    height: 67%;
    background: #FBFCFF;
  @include for-desktop {
    --mega-menu-content-padding: var(--spacer-xl) 0;
  }
  &__wrapper-results {
    display: flex;
    flex-direction: column;
    width: 100%;
    @include for-desktop {
      flex-direction: row;
      flex: 1;
    }
  }
  &__categories {
    flex: 0 0 220px;
  }
  &__results {
    flex: 1
  }
  &__header {
    margin-left: var(--spacer-sm);
  }
  ::v-deep .sf-bar {
    display: none;
  }
  ::v-deep .sf-mega-menu-column__header {
    display: none;
    @include for-desktop {
      display: flex;
    }
  }
  .loader-circle{
    height: calc(100vh - 250px);
  }
}
.results {
  &--mobile {
    display: flex;
    // flex-wrap: wrap;
    // justify-content: space-around;
    background: var(--c-white);
    padding: var(--spacer-base) var(--spacer-sm);
    // --product-card-max-width: 9rem ;
    overflow-y: scroll;
  }
}
.see-all {
  padding: var(--spacer-xl) 0 0 var(--spacer-sm);
}
.action-buttons {
  padding: var(--spacer-xl) var(--spacer-sm) var(--spacer-3xl);
  background: var(--c-white);
  width: 100%;
  &__button {
    width: calc(100% - 32px);
  }
}
.results-listing {
  display: flex;
  flex-wrap: wrap;
  margin-left: var(--spacer-2xs);
}
.result-card {
  margin: var(--spacer-sm) 0;
  @include for-desktop {
    margin: var(--spacer-2xs) 0;
  }
}

.before-results {
  box-sizing: border-box;
  padding: var(--spacer-base) var(--spacer-sm) var(--spacer-2xl);
  width: 100%;
  text-align: center;
  @include for-desktop {
    padding: 0;
  }
  &__picture {
    --image-width: 230px;
    margin-top: var(--spacer-2xl);
    @include for-desktop {
      --image-width: 18.75rem;
      margin-top: var(--spacer-base);
    }
  }
  &__paragraph {
    font-family: var(--font-family--primary);
    font-weight: var(--font-weight--normal);
    font-size: var(--font-size--base);
    color: var(--c-text-muted);
    margin: 0;
    @include for-desktop {
      font-size: var(--font-size--lg);
    }
    &:first-of-type {
      margin: var(--spacer-xl) auto var(--spacer-xs);
    }
  }
  &__button {
    margin: var(--spacer-xl) auto;
    width: 100%;
  }
}
</style>
