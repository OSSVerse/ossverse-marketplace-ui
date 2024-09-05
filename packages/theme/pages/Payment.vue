<template>
  <div id="payment">
    <div class="top-bar header-top">
      <div @click="goBack" class="sf-chevron--left sf-chevron icon_back">
        <span class="sf-search-bar__icon">
          <SfIcon color="var(--c-primary)" size="20px" icon="chevron_left" />
        </span>
      </div>
      <div class="">Select Payment Method</div>
    </div>
    <div v-if="enableLoader" key="loadingCircle" class="loader-circle">
      <LoadingCircle :enable="enableLoader" />
    </div>
    <div class="details header-push">
      <div class="sub-heading">
        <div class="p-name">Payment</div>
      </div>
      <Card v-if="order.cart">
        <div v-for="(value, bppId) in order.cart.quoteItem" :key="bppId">
          <div
            :key="providerId"
            v-for="(valuePerProvider, providerId) in value"
            class="address-text bold"
          >
            <div :key="id" v-for="(breakup, id) in valuePerProvider.breakup">
              <CardContent class="flex-space-bw">
                <div class="address-text">
                  {{ breakup.title }}
                </div>
                <div class="address-text">
                  ₹{{ parseFloat(breakup.price.value).toFixed(2) }}
                </div>
              </CardContent>
            </div>
            <div><hr class="sf-divider divider" /></div>
            <CardContent class="flex-space-bw">
              <div>Subtotal :</div>
              ₹{{ valuePerProvider.price.value }}
            </CardContent>
          </div>
        </div>
        <div><hr class="sf-divider divider" /></div>
      </Card>
      <div class="sub-heading">
        <div class="p-name">Other</div>
      </div>
      <Card>
        <CardContent>
          <!-- <div class="address-text color-def">Add Shipping Details</div> -->
          <SfRadio
            class="sf-radio--transparent"
            :name="'Payment'"
            :value="'Cash on Delivery'"
            label="Cash On Delivery"
            :disabled="false"
            :selected="paymentMethod"
            @change="changePaymentMethod"
          />
        </CardContent>
      </Card>
    </div>
    <Footer
      class="footer-fixed"
      :buttonText="'Confirm'"
      :buttonEnable="isPayConfirmActive"
      :totalPrice="parseFloat(order.cart.quote.price.value)"
      :totalItem="cartGetters.getTotalItems(order.cart)"
      @buttonClick="proceedToConfirm"
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
  </div>
</template>
<script>
import { SfButton, SfRadio, SfIcon } from '@storefront-ui/vue';
import { useUiState } from '~/composables';

import { ref, computed, onBeforeMount, watch } from '@vue/composition-api';

import LoadingCircle from '~/components/LoadingCircle';
import { useCart, useConfirmOrder, cartGetters } from '@vue-storefront/beckn';

import Card from '~/components/Card.vue';

import Footer from '~/components/Footer.vue';
import CardContent from '~/components/CardContent.vue';
import helpers, { createConfirmOrderRequest } from '../helpers/helpers';
const { toggleCartSidebar } = useUiState();
export default {
  middleware: 'auth',
  name: 'Payment',
  components: {
    SfButton,
    SfIcon,
    Card,
    CardContent,
    SfRadio,
    Footer,
    LoadingCircle,
  },
  methods: {
    openCart() {
      toggleCartSidebar();
    },
  },
  setup(_, context) {
    const paymentMethod = ref('');
    const order = ref({});
    const enableLoader = ref(false);
    const isTransactionMatching = computed(() => {
      return order.value?.transactionId === context.root.$route.query.id;
    });

    const { init, poll, pollResults, stopPolling, polling } =
      useConfirmOrder('confirm-order');

    const changePaymentMethod = (value) => {
      paymentMethod.value = value;
    };

    const isPayConfirmActive = computed(() => {
      return paymentMethod.value !== '';
    });

    const proceedToConfirm = async () => {
      enableLoader.value = true;
      order.value.paymentMethod = paymentMethod.value;
      const params = createConfirmOrderRequest(
        order.value.transactionId,
        order.value.cart,
        order.value.shippingAddress,
        order.value.billingAddress,
        order.value.shippingAsBilling,
        '12.9063433,77.5856825',
        order.value.initOrder
      );
      const confirmResponses = await init(
        params,
        localStorage.getItem('token')
      );

      let messageIds = '';
      confirmResponses.forEach((confirmResponse) => {
        messageIds += confirmResponse.context?.message_id + ',';
      });
      messageIds = messageIds.substring(0, messageIds.length - 1);
      await poll({ messageIds: messageIds }, localStorage.getItem('token'));
    };

    const setOrderHistory = (onConfirmResponse) => {
      // Next Line: To be removed after orderData flow is set
      order.value.order = onConfirmResponse[0].message.order;
      const parentOrderId = helpers.generateUniqueOrderId();
      const orderData = {};

      onConfirmResponse.forEach((onConfirmData) => {
        const currentOrderData = onConfirmData.message?.order;
        currentOrderData.bppId = onConfirmData.context?.bpp_id;
        if (currentOrderData) {
          orderData[currentOrderData.id] = currentOrderData;
        }
      });

      order.value.parentOrderId = parentOrderId;
      order.value.orderData = orderData;
      const orderHistory =
        JSON.parse(localStorage.getItem('orderHistory')) ?? [];
      orderHistory.push(order.value);
      localStorage.setItem('orderHistory', JSON.stringify(orderHistory));

      context.root.$router.push({
        path: '/ordersuccess',
        query: {
          id: parentOrderId,
        },
      });
    };

    const goBack = () => context.root.$router.back();

    watch(
      () => pollResults.value,
      (onConfirmResponse) => {
        if (!polling.value || !onConfirmResponse) {
          return;
        }

        if (helpers.shouldStopPooling(onConfirmResponse, 'order')) {
          stopPolling();
          setOrderHistory(onConfirmResponse);
        }
      }
    );

    onBeforeMount(() => {
      order.value = JSON.parse(localStorage.getItem('orderProgress'));
      if (!isTransactionMatching.value) {
        context.root.$router.push('/');
      }
      console.log(order.value);
    });
    return {
      paymentMethod,
      changePaymentMethod,
      order,
      cartGetters,
      isPayConfirmActive,
      proceedToConfirm,
      isTransactionMatching,
      enableLoader,
      goBack,
    };
  },
};
</script>
<style lang="scss" scoped>
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

.icon_back {
  position: absolute;
  left: 0;
  margin: 10px;
}
.details {
  margin: 2px 20px;
}

.p-name {
  font-size: 16px;
  font-weight: 600;
  color: #37474f;
}

.sub-heading {
  margin: 16px 0px;
  display: flex;
  justify-content: space-between;
}

.loader-circle {
  width: 100%;
  position: fixed;
  z-index: 1;
  // top: 130px;
  left: 0;
  height: 95vh;
}

.flex-space-bw {
  justify-content: space-between;
}
</style>
