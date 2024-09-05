<!-- File not used since functionality is removed.
     If we are using again then need changes to the cart object as it is now an array -->
<template>
  <div v-if="show" class="clear-cart">
    <SfOverlay :visible="show"></SfOverlay>
    <div class="cart-popup">
      <SfImage
        class="clear-icon"
        src="/icons/clear-cart.svg"
        alt="clear cart"
      />
      <div class="title">Clear your Cart</div>
      <div class="text-detail">
        Your cart has items from {{ cart.bppProvider.descriptor.name }} Mart.
      </div>
      <div class="text-detail">Do you wish to clear cart and add</div>
      <div class="text-detail">
        items from {{ cart.newProvider.descriptor.name }} mart?
      </div>
      <div class="button-container">
        <button
          class="sf-button sf-button--full-width button-s no"
          @click="onClickNo"
        >
          No
        </button>
        <button
          class="sf-button sf-button--full-width button-s"
          @click="onClickYes"
        >
          yes, Clear Cart
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import { SfIcon, SfOverlay, SfImage } from '@storefront-ui/vue';
import { ref } from '@vue/composition-api';
import { useCart } from '@vue-storefront/beckn';
import { useUiState } from '~/composables';

export default {
  name: 'ClearCartPopup',
  components: {
    SfIcon,
    SfOverlay,
    SfImage
  },
  setup() {
    const { cart, addItem } = useCart();
    const show = ref(false);
    const { changeClearCart } = useUiState();

    /* Commenting this watcher which shows the Clear Cart Popup when an item with new bpp provider is added to cart as we dont want this functionality currently */
    // watch(
    //   () => cart?.value?.newProvider,
    //   () => {
    //     if (cart.value.bppProvider?.id !== cart.value.newProvider?.id) {
    //       show.value = true;
    //       changeClearCart(true);
    //     }
    //   }
    // );

    const onClickYes = () => {
      addItem({
        product: cart.value.newProduct,
        quantity: cart.value.newProduct.quantity,
        customQuery: {
          bpp: cart.value.newBpp,
          bppProvider: cart.value.newProvider,
          clearCart: true,
          locations: cart.value.locations
        }
      });
      changeClearCart(false);
      show.value = false;
    };

    const onClickNo = () => {
      cart.value.newBpp = cart.value.bpp;
      cart.value.newProvider = cart.value.bppProvider;
      changeClearCart(false);
      show.value = false;
    };

    return {
      show,
      cart,
      onClickYes,
      onClickNo
    };
  }
};
</script>
<style lang="scss" scoped>
.clear-cart {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 3;
  .cart-popup {
    text-align: center;
    background: #fff !important;
    width: 341px;
    z-index: 1;
    padding: 15px;
    border-radius: 10px;
    .clear-icon {
      padding: 20px 0;
    }
    .title {
      color: #37474f;
      font-weight: 500;
      font-size: 24px;
      padding-bottom: 10px;
    }
    .text-detail {
      font-size: 17px;
      color: #7c7c7c;
    }
    .button-container {
      display: flex;
      margin-top: 20px;
      .button-s {
        font-size: 14px;
        border-radius: 3px;
      }
      .no {
        background: #fff;
        color: #7c7c7c;
      }
    }
  }
}
</style>
