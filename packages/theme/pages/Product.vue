<template>
  <div id="product">
    <!-- <SfBreadcrumbs
      class="breadcrumbs desktop-only"
      :breadcrumbs="breadcrumbs"
    /> -->
    <div class="product">
      <div @click="goBack" class="sf-chevron--left sf-chevron icon_back">
        <span class="sf-search-bar__icon">
        <SfIcon color="var(--c-primary)" size="20px" icon="chevron_left" />
      </span>
      </div>
      <div class="images">
        <LazyHydrate when-visible>
          <ImagesScroll
            :imageHeight="350"
            :images="images"
            class="product__gallery"
          />
        </LazyHydrate>
      </div>

      <div class="product__info">
        <div class="product__header">
          <SfHeading
            :title="productGetters.getName(product)"
            :level="3"
            class="sf-heading--no-underline sf-heading--left"
          />
          <!-- <SfIcon
            icon="drag"
            size="xxl"
            color="var(--c-text-disabled)"
            class="product__drag-icon smartphone-only"
          /> -->
        </div>
        <div class="product__price-and-rating">
          <div class="s-p-price">
            ₹ {{ productGetters.getPrice(product).regular }}
          </div>
          <AddToCart :key="keyVal+'product-page'" :value="cartGetters.getItemQty(isInCart({product}))" @updateItemCount="updateCart" />
        </div>
        <div><hr class="sf-divider divider" /></div>

        <LazyHydrate when-idle>
          <SfAccordion class="product__tabs">
            <SfAccordionItem :header="'Product Description'">
              <div class="prouct__description">
                {{ productGetters.getLongDescription(product) }}
              </div>
            </SfAccordionItem>
          </SfAccordion>
        </LazyHydrate>

        <div v-if="cartGetters.getTotalItems(cart)" class="bottom-bar-cart">
          <!-- <ul class="list-inline">
            <li>
              <h3>Total</h3>
              <h4>₹{{cartGetters.getTotalItems(products)}} <span>{{cartGetters.getTotals(products)}} Items</span></h4>
            </li>
            <li class="d-flex b-cart-blk" @click="toggleCartSidebar">
              <SfIcon
                icon="add_to_cart"
                size="sm"
                color="white"
                :coverage="1"
              />
              View Cart
              <SfIcon
                class="mt"
                icon="chevron_right"
                size="20px"
                color="white"
                :coverage="1"
              />
            </li>
          </ul> -->
          <!-- <div class="cart-checkout">
            <div>
              </div>
            <div class="sf-chevron--right sf-chevron">
              <span class="sf-chevron__bar sf-chevron__bar--left" />
              <span class="sf-chevron__bar sf-chevron__bar--right" />
            </div>
          </div> -->
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
    </div>
  </div>
</template>
<script>
import {
  SfProperty,
  SfHeading,
  SfPrice,
  SfRating,
  SfSelect,
  SfAccordion,
  SfIcon,
  SfImage,
  SfBanner,
  SfAlert,
  SfSticky,
  SfReview,
  SfBreadcrumbs,
  SfButton,
  SfColor
} from '@storefront-ui/vue';

import AddToCart from '~/components/AddToCart.vue';
import ImagesScroll from '~/components/ImagesScroll.vue';
import SfAccordionItem from '~/components/Accordion.vue';
import Footer from '~/components/Footer';
import { useUiState } from '~/composables';
import { useCart, cartGetters, productGetters } from '@vue-storefront/beckn';
import MobileStoreBanner from '~/components/MobileStoreBanner.vue';
import LazyHydrate from 'vue-lazy-hydration';
import { onBeforeMount, ref, watch} from '@vue/composition-api';

export default {
  middleware: 'auth',
  name: 'Product',
  transition: 'fade',

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setup(props, context) {
    const { toggleSearchVisible, clearCartPopup } = useUiState();
    const keyVal = ref(0);

    toggleSearchVisible(false);

    watch(() => clearCartPopup.value, (newVal) => {
      if (!newVal) {
        keyVal.value++;
      }
    });

    const data = context.root.$route.query.data;
    const { product, bpp, bppProvider, locations} = JSON.parse(
      Buffer.from(data, 'base64').toString()
    );
    const { addItem, cart, load, isInCart } = useCart();
    console.log('product', product);
    const images = productGetters.getImages(product);
    const goBack = () => {
      toggleSearchVisible(true);
      context.root.$router.back();
    };

    const updateCart = async (value) => {
      addItem({
        product: product,
        quantity: value,
        customQuery: { bpp: bpp, bppProvider: bppProvider, locations: locations}
      });
    };

    onBeforeMount(async () => {
      await load();
    });

    const footerClick = () => {
      context.root.$router.push('/cart');
    };
    return {
      images,
      goBack,
      cart,
      updateCart,
      product,
      toggleSearchVisible,
      productGetters,
      isInCart,
      cartGetters,
      footerClick,
      keyVal
    };
  },
  components: {
    SfAlert,
    SfColor,
    SfProperty,
    SfHeading,
    SfPrice,
    SfRating,
    SfSelect,
    SfIcon,
    SfImage,
    AddToCart,
    SfBanner,
    SfSticky,
    SfReview,
    SfBreadcrumbs,
    SfButton,
    MobileStoreBanner,
    LazyHydrate,
    SfAccordionItem,
    SfAccordion,
    ImagesScroll,
    Footer
  }
};
</script>

<style lang="scss" scoped>
#product {
  box-sizing: border-box;
  @include for-desktop {
    max-width: 1272px;
    margin: 0 auto;
  }
}

.images {
  // height: 400px;
  overflow: hidden;
}

.icon_back {
  position: absolute;
  margin: 15px;
  z-index: 2;
  .sf-icon{
    --icon-color: #F37A20 !important;
    width: 20px;
    height: 20px;
  }
  // width:100%;
}

.bottom-bar-cart {
  // display: flex;
  // justify-content: space-around;
  // margin-bottom: 0px;
  // box-shadow: 0px -5px 40px rgba(0, 0, 0, 0.15);
  position: fixed;
  bottom: 0;
  z-index: 1;
  width: 100%;
  .cart-checkout {
    background: #f37a20;
  }
  ul {
    list-style: none;
    padding: 0;
    display: flex;
    width: 100%;
    margin: 0;
    li {
      width: 50%;
      padding: 12px 0px 12px 50px;
      display: block;
      background: #fff;
      h3 {
        font-size: 12px;
        font-weight: 600;
        color: #000;
      }
      h4 {
        font-size: 16px;
        color: #f37a20;
        span {
          font-size: 10px;
          color: #8d9091;
          font-weight: 400;
        }
      }
      &.b-cart-blk {
        font-size: 16px;
        color: #fcfcfc;
        background: #f37a20;
        display: flex !important;
        justify-content: space-around;
        padding: 0px 25px !important;
        padding-top: 20px !important;
        .mt {
          margin-top: 4px;
        }
      }
    }
  }
}
.sf-accordion.product__tabs.has-chevron{
  margin-top: 0 !important;
}
.divider {
  width: 90%;
  margin: auto;
}
.s-p-price {
  color: #f37a20;
  font-size: 22px;
}

.product {
  @include for-desktop {
    display: flex;
  }

  &__image {
    img {
      object-fit: contain !important;
    }
  }
  &__info {
    margin: var(--spacer-sm) auto;
    @include for-desktop {
      max-width: 32.625rem;
      margin: 0 0 0 7.5rem;
    }
  }
  &__header {
    --heading-title-color: var(--c-link);
    --heading-title-font-weight: var(--font-weight--bold);
    --heading-padding: 0;
    margin: 0 var(--spacer-sm);
    display: flex;
    justify-content: space-between;
    @include for-desktop {
      --heading-title-font-weight: var(--font-weight--semibold);
      margin: 0 auto;
    }
  }
  &__drag-icon {
    animation: moveicon 1s ease-in-out infinite;
  }
  &__price-and-rating {
    margin: 0 var(--spacer-sm) var(--spacer-base);
    align-items: center;
    display: flex;
    justify-content: space-between;
    @include for-desktop {
      margin: var(--spacer-sm) 0 var(--spacer-lg) 0;
    }
  }
  &__rating {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin: var(--spacer-xs) 0 var(--spacer-xs);
  }
  &__count {
    @include font(
      --count-font,
      var(--font-weight--normal),
      var(--font-size--sm),
      1.4,
      var(--font-family--secondary)
    );
    color: var(--c-text);
    text-decoration: none;
    margin: 0 0 0 var(--spacer-xs);
  }
  &__description {
    @include font(
      --product-description-font,
      var(--font-weight--light),
      var(--font-size--base),
      1.6,
      var(--font-family--primary)
    );
  }
  &__select-size {
    margin: 0 var(--spacer-sm);
    @include for-desktop {
      margin: 0;
    }
  }
  &__colors {
    @include font(
      --product-color-font,
      var(--font-weight--normal),
      var(--font-size--lg),
      1.6,
      var(--font-family--secondary)
    );
    display: flex;
    align-items: center;
    margin-top: var(--spacer-xl);
  }
  &__color-label {
    margin: 0 var(--spacer-lg) 0 0;
  }
  &__color {
    margin: 0 var(--spacer-2xs);
  }
  &__add-to-cart {
    margin: var(--spacer-base) var(--spacer-sm) 0;
    @include for-desktop {
      margin-top: var(--spacer-2xl);
    }
  }
  &__guide,
  &__compare,
  &__save {
    display: block;
    margin: var(--spacer-xl) 0 var(--spacer-base) auto;
  }
  &__compare {
    margin-top: 0;
  }
  &__tabs {
    --tabs-title-z-index: 0;
    margin: var(--spacer-lg) auto var(--spacer-2xl);
    --tabs-title-font-size: var(--font-size--lg);
    @include for-desktop {
      margin-top: var(--spacer-2xl);
    }
  }
  &__property {
    margin: var(--spacer-base) 0;
    &__button {
      --button-font-size: var(--font-size--base);
    }
  }
  &__review {
    padding-bottom: 24px;
    border-bottom: var(--c-light) solid 1px;
    margin-bottom: var(--spacer-base);
  }
  &__additional-info {
    color: var(--c-link);
    @include font(
      --additional-info-font,
      var(--font-weight--light),
      var(--font-size--sm),
      1.6,
      var(--font-family--primary)
    );
    &__title {
      font-weight: var(--font-weight--normal);
      font-size: var(--font-size--base);
      margin: 0 0 var(--spacer-sm);
      &:not(:first-child) {
        margin-top: 3.5rem;
      }
    }
    &__paragraph {
      margin: 0;
    }
  }
  &__gallery {
    flex: 1;
  }
}
.breadcrumbs {
  margin: var(--spacer-base) auto var(--spacer-lg);
}
@keyframes moveicon {
  0% {
    transform: translate3d(0, 0, 0);
  }
  50% {
    transform: translate3d(0, 30%, 0);
  }
  100% {
    transform: translate3d(0, 0, 0);
  }
}
</style>
