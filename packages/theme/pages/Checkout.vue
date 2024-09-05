<template>
  <div v-if="cartGetters.getTotalItems(cart)">
    <div class="top-bar header-top">
      <div @click="goBack" class="sf-chevron--left sf-chevron icon_back">
        <span class="sf-search-bar__icon">
          <SfIcon color="var(--c-primary)" size="20px" icon="chevron_left" />
        </span>
      </div>
      <div>Billing and Shipping</div>
    </div>
    <div v-if="enableLoader" key="loadingCircle" class="loader-circle">
      <LoadingCircle :enable="enableLoader" />
    </div>
    <div class="details header-push">
      <div class="sub-heading">
        <div class="p-name" v-e2e="'cart-item'">Items</div>
      </div>

      <div
        :key="bppId"
        v-for="(itemsPerBpp,
        bppId,
        shipmentNumber) in cartGetters.getCartItemsPerBppPerProvider(cart)"
        class="cart-shipment-wrapper"
      >
        <div
          v-for="(itemsPerProvider, bppProviderId) in itemsPerBpp"
          :key="bppProviderId"
          class="shipment-wrapper"
        >
          <div class="shipment-number">Shipment {{ shipmentNumber + 1 }}</div>
          <div
            v-for="(item, index) in itemsPerProvider"
            :key="index"
            class="item-wrapper"
          >
            <div class="s-p-image">
              <SfImage
                :src="cartGetters.getItemImage(item)"
                alt="product img"
                :width="85"
                :height="90"
              />
            </div>
            <div class="s-p-details">
              <div class="s-p-name">{{ cartGetters.getItemName(item) }}</div>
              <div class="s-p-retailer">
                sold by
                {{
                  providerGetters.getProviderName(
                    cartGetters.getBppProvider(item)
                  )
                }}
              </div>
              <div class="s-p-weight">
                x {{ cartGetters.getItemQty(item).count }}
              </div>
              <div class="s-p-price">
                ₹
                {{
                  cartGetters.getItemPrice(item).regular *
                    cartGetters.getItemQty(item).count
                }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="sub-heading">
        <div class="p-name">Shipping</div>
        <SfButton
          v-if="isShippingAddressFilled"
          class="sf-button--pure"
          @click="toggleShippingModal"
        >
          <div class="color-def">Change</div>
        </SfButton>
      </div>
      <AddressCard
        v-if="isShippingAddressFilled"
        :name="shippingAddress.name"
        :address="shippingAddress.address"
        :mobile="shippingAddress.mobile"
        :pincode="shippingAddress.pincode"
        :building="shippingAddress.building"
      />
      <Card v-if="!isShippingAddressFilled">
        <CardContent>
          <div class="address-bar-icon">
            <svg
              width="16"
              height="21"
              viewBox="0 0 16 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8 1C11.8598 1 15 4.1402 15 8C15 13.2126 9.80472 18.1458 7.99934 19.7024C6.19334 18.1482 1 13.2239 1 8C1 4.1402 4.14018 1 8 1ZM8 0C3.58176 0 0 3.5817 0 8C0 14.8571 8 21 8 21C8 21 16 14.8571 16 8C16 3.5817 12.4182 0 8 0ZM7 12H9V9H12V7H9V4H7V7H4V9H7V12Z"
                fill="#F37A20"
              />
            </svg>
          </div>
          <div
            @click="toggleShippingModal"
            v-e2e="'add-shipping-details'"
            class="address-text color-def"
          >
            Add Shipping Details
          </div>
        </CardContent>
      </Card>

      <div v-if="isShippingAddressFilled" class="sub-heading">
        <div class="p-name">Billing</div>
        <SfButton
          v-if="isBillingAddressFilled || !shippingAsBilling"
          class="sf-button--pure"
          @click="toggleBillingModal"
        >
          <div class="color-def">Change</div>
        </SfButton>
      </div>
      <Card v-if="isShippingAddressFilled" class="card-checkbox">
        <CardContent>
          <div class="address-bar-icon">
            <SfCheckbox
              @change="changeShippingAsBilling"
              :selected="shippingAsBilling"
              name="shipping"
            />
          </div>
          <div class="address-text">Same as Shipping Details</div>
        </CardContent>
      </Card>

      <AddressCard
        v-if="isBillingAddressFilled && !shippingAsBilling"
        :name="billingAddress.name"
        :address="billingAddress.address"
        :mobile="billingAddress.mobile"
        :pincode="billingAddress.pincode"
        :building="billingAddress.building"
      />

      <div class="sub-heading">
        <div class="p-name">Payment</div>
      </div>

      <div>
        <Card>
          <SfAccordion>
            <SfAccordionItem :header="'Subtotal'">
              <!-- <CardContent > -->
              <div class="bpp_breakup">
                <div
                  :key="bppId"
                  v-for="(value, bppId) in cartGetters.getQuoteItem(cart)"
                >
                  <div
                    :key="providerId"
                    v-for="(valuePerProvider, providerId) in value"
                  >
                    <div
                      :key="id"
                      v-for="(breakup, id) in valuePerProvider.breakup"
                    >
                      <CardContent class="flex-space-bw">
                        <div>{{ breakup.title }}</div>
                        <div>₹{{ breakup.price.value }}</div>
                      </CardContent>
                    </div>
                    <CardContent class="flex-space-bw">
                      <div>Subtotal :</div>
                      <div>₹{{ valuePerProvider.price.value }}</div>
                    </CardContent>
                  </div>
                </div>
              </div>
            </SfAccordionItem>
          </SfAccordion>
        </Card>
      </div>

      <div class="order-policy">
        <div class="sub-heading">
          <div class="p-name">Order policy</div>
        </div>
        <Card>
          <!-- To redo it after order policy content -->
          <!-- <CardContent> -->
          <p class="policy-text">
            In publishing and graphic design, Lorem ipsum is a placeholder text
            commonly used to demonstrate the visual form of a document or a
            typeface without relying on..
          </p>
        </Card>
      </div>
    </div>
    <Footer
      class="footer-fixed"
      @buttonClick="paymentProceed"
      :totalPrice="cartGetters.getTotals(cart).total"
      :totalItem="cartGetters.getTotalItems(cart)"
      :buttonText="'Proceed'"
      :buttonEnable="proceedToPay"
    >
      <template v-slot:buttonIcon>
        <svg
          width="25"
          height="19"
          viewBox="0 0 25 19"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.0166 7.10181H23.0166M3.0166 1.10181H21.0166C22.1212 1.10181 23.0166 1.99724 23.0166 3.10181V15.1018C23.0166 16.2064 22.1212 17.1018 21.0166 17.1018H3.0166C1.91203 17.1018 1.0166 16.2064 1.0166 15.1018V3.10181C1.0166 1.99724 1.91203 1.10181 3.0166 1.10181Z"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </template>
    </Footer>
    <ModalSlide :visible="shippingAddressModal" @close="toggleShippingModal">
      <AddressInputs
        :buttonText="'Save Shipping Details'"
        :headingText="'Shipping Details'"
        :addressDetails="shippingAddress"
        @getAddress="toggleShippingModal"
        @initCall="initOrder"
        :buttonEnable="isShippingButtonEnabled"
      />
    </ModalSlide>
    <ModalSlide :visible="billingAddressModal" @close="toggleBillingModal">
      <AddressInputs
        :buttonText="'Save Billing Details'"
        :headingText="'Billing Details'"
        :addressDetails="billingAddress"
        @getAddress="toggleBillingModal"
        @initCall="initOrder"
        :buttonEnable="isBillingButtonEnabled"
      />
    </ModalSlide>
  </div>
</template>
<script>
import {
  SfSteps,
  SfSidebar,
  SfButton,
  SfModal,
  SfCheckbox,
  SfAccordion,
  SfImage,
  SfInput,
  SfIcon
} from '@storefront-ui/vue';
import ModalSlide from '~/components/ModalSlide.vue';
import AddressInputs from '~/components/AddressInputs.vue';
import LoadingCircle from '~/components/LoadingCircle';
import SfAccordionItem from '~/components/Accordion.vue';
import Footer from '~/components/Footer.vue';
import {
  useCart,
  cartGetters,
  providerGetters,
  useAddress,
  useInitOrder,
  useOrderPolicy
} from '@vue-storefront/beckn';

// import { useUiState } from '~/composables';

import { computed, ref, watch, onBeforeMount } from '@vue/composition-api';
import Card from '~/components/Card.vue';
import CardContent from '~/components/CardContent.vue';

import ProductCard from '~/components/ProductCard';
import AddressCard from '~/components/AddressCard';
import helpers, { createOrderRequest } from '../helpers/helpers';
/* eslint camelcase: 0 */

export default {
  middleware: 'auth',
  name: 'Checkout',
  components: {
    SfButton,
    SfSteps,
    SfSidebar,
    SfModal,
    SfCheckbox,
    Footer,
    LoadingCircle,
    ModalSlide,
    SfInput,
    Card,
    SfImage,
    SfAccordion,
    SfAccordionItem,
    CardContent,
    ProductCard,
    AddressInputs,
    SfIcon,
    AddressCard
  },
  setup(_, context) {
    // const isThankYou = computed(() => currentStep.value === 'thank-you');

    const shippingAsBilling = ref(true);
    const shippingAddressModal = ref(false);
    const billingAddressModal = ref(false);
    const enableLoader = ref(false);

    // const billingAddressModal = ref(false);

    const { cart, load } = useCart();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // const { selectedLocation } = useUiState();
    const {
      // polling ,
      pollResults: onInitResult,
      poll: onInitOrder,
      init,
      stopPolling
    } = useInitOrder();

    const { init: getOrderPolicy } = useOrderPolicy();

    const policy = ref({ cancellation_reasons: [] });
    const {
      getBillngAddress,
      getShippingAddress,
      setBillingAddress,
      setShippingAddress
    } = useAddress();
    const shippingAddress = ref(getShippingAddress());

    const billingAddress = ref(getBillngAddress());
    const transactionId = ref('');

    const isShippingAddressFilled = computed(() => {
      return (
        shippingAddress.value.name !== '' &&
        shippingAddress.value.mobile !== '' &&
        shippingAddress.value.building !== '' &&
        shippingAddress.value.address !== '' &&
        shippingAddress.value.pincode !== '' &&
        shippingAddress.value.landmark !== ''
      );
    });
    const isBillingAddressFilled = computed(() => {
      return (
        billingAddress.value.name !== '' &&
        billingAddress.value.mobile !== '' &&
        billingAddress.value.building !== '' &&
        billingAddress.value.address !== '' &&
        shippingAddress.value.pincode !== '' &&
        shippingAddress.value.landmark !== ''
      );
    });

    const paymentProceed = () => {
      context.root.$router.push({
        path: '/payment',
        query: {
          id: transactionId.value
        }
      });
    };

    const toggleShippingModal = () => {
      setShippingAddress(shippingAddress.value);
      shippingAddressModal.value = !shippingAddressModal.value;
    };

    const changeShippingAsBilling = () => {
      shippingAsBilling.value = !shippingAsBilling.value;
    };

    const toggleBillingModal = () => {
      setBillingAddress(billingAddress.value);
      billingAddressModal.value = !billingAddressModal.value;
    };

    const goBack = () => context.root.$router.back();

    const isShippingButtonEnabled = computed(() => {
      return isShippingAddressFilled.value;
    });

    const isBillingButtonEnabled = computed(() => {
      return isBillingAddressFilled.value;
    });

    const proceedToPay = computed(() => {
      return (
        isShippingAddressFilled.value &&
        (isBillingAddressFilled.value || shippingAsBilling.value)
      );
    });

    const initOrder = async () => {
      enableLoader.value = true;
      const params = createOrderRequest(
        transactionId.value,
        cart.value,
        shippingAddress.value,
        billingAddress.value,
        shippingAsBilling.value,
        '12.9063433,77.5856825'
      );
      const response = await init(params, localStorage.getItem('token'));

      if (response) {
        let messageIds = '';
        response.forEach((res) => {
          messageIds += res.context?.message_id + ',';
        });
        messageIds = messageIds.substring(0, messageIds.length - 1);
        await onInitOrder(
          {
            // eslint-disable-next-line camelcase
            messageIds: messageIds
          },
          localStorage.getItem('token')
        );
      } else {
        enableLoader.value = false;
      }
    };

    watch(
      () => onInitResult.value,
      (onInitResponse) => {
        if (!onInitResponse) {
          return;
        }
        if (helpers.shouldStopPooling(onInitResponse, 'order')) {
          stopPolling();
        }
        const initOrderPerBppPerProvider = {};
        // eslint-disable-next-line no-prototype-builtins
        if (onInitResponse.every((item) => item.hasOwnProperty('message'))) {
          onInitResponse.forEach((initResponse) => {
            const { order: currentOnInitData } = initResponse.message;
            if (!currentOnInitData) {
              return;
            }

            const { bpp_id: bppId } = initResponse.context;
            const { id: providerId } = currentOnInitData.provider;
            if (cart.value.quoteItem[bppId]) {
              cart.value.quoteItem[bppId][providerId] = {
                ...currentOnInitData.quote
              };
            } else {
              cart.value.quoteItem[bppId] = {
                [providerId]: { ...currentOnInitData.quote }
              };
            }

            if (initOrderPerBppPerProvider[bppId]) {
              initOrderPerBppPerProvider[bppId][providerId] = {
                ...currentOnInitData
              };
            } else {
              initOrderPerBppPerProvider[bppId] = {
                [providerId]: { ...currentOnInitData }
              };
            }
          });

          // TODO( To provide BPP Id too in the object once we start getting it)
          localStorage.setItem(
            'orderProgress',
            JSON.stringify({
              shippingAddress: shippingAddress.value,
              billingAddress: billingAddress.value,
              shippingAsBilling: shippingAsBilling.value,
              transactionId: transactionId.value,
              status: 0,
              initOrder: initOrderPerBppPerProvider,
              cart: cart.value
            })
          );

          enableLoader.value = false;

          // localStorage.removeItem('transactionId');
        }
      }
    );

    onBeforeMount(() => {
      load();
      transactionId.value = localStorage.getItem('transactionId');
      getOrderPolicy({
        context: {
          bpp_id: cart.value.items[0].bpp.id
        }
      }).then((res) => {
        policy.value = res.message;
      });
    });

    return {
      shippingAsBilling,
      changeShippingAsBilling,
      shippingAddressModal,
      billingAddressModal,
      toggleShippingModal,
      toggleBillingModal,
      shippingAddress,
      goBack,
      billingAddress,
      isShippingAddressFilled,
      cartGetters,
      providerGetters,
      isBillingAddressFilled,
      cart,
      proceedToPay,
      enableLoader,
      initOrder,
      policy,
      paymentProceed,
      isShippingButtonEnabled,
      isBillingButtonEnabled
    };
  }
};
</script>

<style lang="scss" scoped>
.bold {
  font-weight: 600;
}

.card-checkbox {
  margin-bottom: 20px;
}

.sf-checkbox__checkmark:hover {
  --checkbox-border-color: transparent !important;
  border: 0;
}
.sf-input {
  input {
    font-size: 14px;
    &:placeholder {
      font-size: 14px;
    }
  }
}

.s-p-weight {
  margin-top: 6px;
  font-size: 15px;
  font-weight: 700;
}

.flex-space-bw {
  justify-content: space-between;
}

.flex-half {
  display: grid;
  grid-template-columns: 50% 50%;
}

.details {
  padding: 2px 20px;
  padding-bottom: 56px;
  height: calc(100vh - 165px);
  overflow: scroll;
}

.address-bar-icon {
  margin: 10px 10px 1px 10px;
}

.address-text {
  align-self: center;
  margin-left: 6px;
  cursor: pointer;
}

.sub-heading {
  margin: 16px 0px;
  display: flex;
  justify-content: space-between;
}

.icon_back {
  position: absolute;
  left: 0;
  margin: 10px;
}

.color-def {
  color: #f37a20;
}

.top-bar {
  align-items: center;
  display: flex;
  font-size: 18px;
  justify-content: space-around;
  height: 60px;
  font-weight: 500;
  background: white;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.07);
}

.policy-text {
  font-size: 13px;
}

.p-name {
  font-size: 16px;
  font-weight: 600;
  color: #37474f;
}
#checkout {
  box-sizing: border-box;
  @include for-desktop {
    max-width: 1240px;
    margin: 0 auto;
  }
}

.cart-shipment-wrapper {
  margin-bottom: 30px;
}

.shipment-number {
  font-weight: bold;
  font-size: 18px;
  line-height: 18px;
}

.shipment-wrapper {
  margin-top: 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.3);
}

.shipment-wrapper:first-child {
  border-top: 0px solid rgba(0, 0, 0, 0.3);
}

.item-wrapper {
  display: flex;
  margin: 20px 0;

  .s-p-image {
    margin-right: 25px;
  }
  .s-p-name {
    font-weight: 700;
    font-size: 15px;
  }
  .s-p-retailer {
    padding-top: 5px;
    font-size: 11px;
  }
  .s-p-price {
    font-size: 16px;
    margin-top: 10px;
    color: #f37a20;
  }
}

.checkout {
  @include for-desktop {
    display: flex;
  }
  &__main {
    @include for-desktop {
      flex: 1;
      padding: var(--spacer-xl) 0 0 0;
    }
  }
  &__aside {
    @include for-desktop {
      flex: 0 0 25.5rem;
      margin: 0 0 0 4.25rem;
    }
  }
  &__steps {
    --steps-content-padding: 0 var(--spacer-base);
    @include for-desktop {
      --steps-content-padding: 0;
    }

    &-auth::v-deep .sf-steps__step:first-child {
      --steps-step-color: #e8e4e4;
    }
  }
}
.flex-space-bw {
  justify-content: space-between;
}
.bpp_breakup {
  border-bottom: 5px solid rgba(0, 0, 0, 0.3);
}
.loader-circle {
  width: 100%;
  position: fixed;
  z-index: 1;
  // top: 130px;
  left: 0;
  height: 95vh;
}

.order-policy {
  margin-bottom: 30px;
}
</style>
