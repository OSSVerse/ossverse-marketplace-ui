<template>
  <div id="cart">
    <SfSidebar
      v-e2e="'sidebar-cart'"
      :visible="isCartSidebarOpen"
      title="Cart"
      class="sf-sidebar--right"
      @close="toggleCartSidebar"
    >
      <template #content-top>
        <div v-if="cartGetters.getTotalItems(cart)">
          <div>{{ cart.bppName }}</div>
          <div>by</div>
          <div>{{ cart.bppProviderName }}</div>
        </div>
      </template>
      <template #errorMsg>
        <div v-if="false"></div>
        <div v-if="false"></div>
        <div v-if="false"></div>
      </template>
      <transition name="sf-fade" mode="out-in">
        <div
          v-if="cartGetters.getTotalItems(cart)"
          key="my-cart"
          class="my-cart"
        >
          <transition-group name="sf-fade" tag="div">
            <ProductCard
              name="product-card"
              class="product-card"
              v-for="(product, index) in cartGetters.getItems(cart)"
              :key="index + 'new'"
              :pName="cartGetters.getItemName(product)"
              :pPrice="cartGetters.getItemPrice(product).regular"
              :pImage="cartGetters.getItemImage(product)"
              :pCount="cartGetters.getItemQty(product)"
              :horizontalView="false"
              :deleteCard="true"
              :dropdownCouner="true"
              @updateItemCount="(item) => updateItemCount(item, index)"
              @deleteItem="updateItemCount(0, index)"
              @dropdownMore="toggleModal(index)"
            />
          </transition-group>
        </div>
        <div v-else key="empty-cart" class="empty-cart">
          <div class="empty-cart__banner">
            <SfImage
              alt="Empty bag"
              class="empty-cart__image"
              src="/icons/empty-cart.svg"
            />
            <SfHeading
              title="Your cart is empty"
              :level="2"
              class="empty-cart__heading"
              description="Looks like you haven’t added any items to the bag yet. Start
              shopping to fill it in."
            />
          </div>
        </div>
      </transition>
      <div class="c-footer" v-if="cartGetters.getTotalItems(cart)">
        <Footer
          @buttonClick="footerClick"
          :totalPrice="cartGetters.getTotals(cart).total"
          :totalItem="cartGetters.getTotalItems(cart)"
          buttonText="checkout"
        >
          <template v-slot:buttonIcon>
            <SfIcon icon="empty_cart" color="white" :coverage="1" />
          </template>
        </Footer>
      </div>
      <ModalSlide :visible="openModal" @close="toggleModal">
        <div class="modal-heading">Cart Quantity</div>
        <div><hr class="sf-divider" /></div>
        <div class="modal-body">
          <div class="inputs-container">
            <SfInput
              v-model="itemNumber"
              type="number"
              label="Enter Quantity"
              name="locality"
              @change="() => {}"
            />
          </div>
          <SfButton
            class="add-quantity"
            aria-label="Close modal"
            type="button"
            @click="addQuantity"
            style="width: 100%"
            >Add quantity</SfButton
          >
        </div>
      </ModalSlide>
    </SfSidebar>
  </div>
</template>
<script>
import {
  SfSidebar,
  SfHeading,
  SfButton,
  SfIcon,
  SfProperty,
  SfPrice,
  SfCollectedProduct,
  SfImage,
  SfInput
} from '@storefront-ui/vue';
import { useCart, cartGetters } from '@vue-storefront/beckn';
import { useUiState } from '~/composables';
import ProductCard from './ProductCard';
import Footer from './Footer';
import ModalSlide from './ModalSlide';
import { ref } from '@vue/composition-api';

export default {
  name: 'Cart',
  components: {
    SfSidebar,
    SfButton,
    SfHeading,
    SfIcon,
    SfProperty,
    SfPrice,
    SfCollectedProduct,
    SfImage,
    ProductCard,
    Footer,
    ModalSlide,
    SfInput
  },
  setup(_, { root }) {
    const { isCartSidebarOpen, toggleCartSidebar } = useUiState();
    const { cart, addItem } = useCart();
    const openModal = ref(false);
    const modelOpenIndex = ref(-1);
    const itemNumber = ref(null);

    const updateItemCount = (data, index) => {
      console.log(data, index);
      addItem({
        product: cart.value.items[index],
        quantity: data,
        customQuery: {
          bppName: cart.value.bppName,
          bppProvider: cart.value.bppProviderName
        }
      });
    };

    const footerClick = () => {
      toggleCartSidebar();
      root.$router.push('/checkout');
    };

    const toggleModal = (index = -1) => {
      modelOpenIndex.value = index;
      openModal.value = !openModal.value;
    };

    const addQuantity = () => {
      updateItemCount(Number(itemNumber.value), modelOpenIndex.value);
      toggleModal();
    };

    return {
      isCartSidebarOpen,
      toggleCartSidebar,
      cartGetters,
      cart,
      openModal,
      itemNumber,
      updateItemCount,
      footerClick,
      toggleModal,
      addQuantity
    };
  }
};
</script>

<style lang="scss" scoped>
#cart {
  --sidebar-z-index: 3;
  --overlay-z-index: 3;
  @include for-desktop {
    & > * {
      --sidebar-bottom-padding: var(--spacer-base);
      --sidebar-content-padding: var(--spacer-base);
    }
  }
}

.modal-heading {
  margin: 20px;
  font-size: 20px;
  font-weight: 500;
}

.modal-body {
  padding: 28px;
}

.inputs-container {
  margin-bottom: 28px;
}

.sf-sidebar__content {
  padding: 0 !important;
}

.c-footer {
  width: 100%;
  position: fixed;
  left: 0;
  bottom: 0;
}

.product-card {
  margin-top: 10px;
}
.cart-summary {
  margin-top: var(--spacer-xl);
}
.my-cart {
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-top: 20px;

  &__total-items {
    margin: 0;
  }
  &__total-price {
    --price-font-size: var(--font-size--xl);
    --price-font-weight: var(--font-weight--medium);
    margin: 0 0 var(--spacer-base) 0;
  }
}
.empty-cart {
  --heading-description-margin: 0 0 var(--spacer-xl) 0;
  --heading-title-margin: 0 0 var(--spacer-xl) 0;
  --heading-title-color: var(--c-primary);
  --heading-title-font-weight: var(--font-weight--semibold);
  display: flex;
  flex: 1;
  align-items: center;
  flex-direction: column;
  &__banner {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    flex: 1;
  }
  &__heading {
    padding: 0 var(--spacer-base);
  }
  &__image {
    --image-width: 16rem;
    margin: 0 0 var(--spacer-2xl) 7.5rem;
  }
  @include for-desktop {
    --heading-title-font-size: var(--font-size--xl);
    --heading-title-margin: 0 0 var(--spacer-sm) 0;
  }
}
.collected-product-list {
  flex: 1;
}
.collected-product {
  margin: 0 0 var(--spacer-sm) 0;
  &__properties {
    margin: var(--spacer-xs) 0 0 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-start;
    flex: 2;
    &:first-child {
      margin-bottom: 8px;
    }
  }
  &__actions {
    transition: opacity 150ms ease-in-out;
  }
  &__save,
  &__compare {
    --button-padding: 0;
    &:focus {
      --cp-save-opacity: 1;
      --cp-compare-opacity: 1;
    }
  }
  &__save {
    opacity: var(--cp-save-opacity, 0);
  }
  &__compare {
    opacity: var(--cp-compare-opacity, 0);
  }
  &:hover {
    --cp-save-opacity: 1;
    --cp-compare-opacity: 1;
    @include for-desktop {
      .collected-product__properties {
        display: none;
      }
    }
  }
}
</style>
