<template>
  <div>
    <div class="top-bar">
      <div class="header-push">Order Details</div>
    </div>

    <div v-if="enableLoader" key="loadingCircle" class="loader-circle">
      <LoadingCircle :enable="enableLoader" />
    </div>

    <div v-if="!enableLoader" class="details">
      <!-- <div class="sub-heading">
        <div class="p-name">Items</div>
      </div> -->

      <!-- <div
        :key="index + 'new'"
        v-for="(product, index) in cartGetters.getItems(order.cart)"
        class="checkout-product"
      >
        <div class="s-p-image">
          <SfImage
            :src="cartGetters.getItemImage(product)"
            alt="product img"
            :width="85"
            :height="90"
          />
        </div>
        <div class="s-p-details">
          <div class="s-p-name">{{ cartGetters.getItemName(product) }}</div>
          <div class="s-p-weight">x {{ cartGetters.getItemQty(product) }}</div>
          <div class="s-p-price">
            ₹ {{ cartGetters.getItemPrice(product).regular }}
          </div>
        </div>
      </div> -->
      <Card>
        <SfAccordion>
          <SfAccordionItem :header="'Order'">
            <CardContent class="flex-space-bw">
              <div class="address-text"><span>Placed at</span></div>
              <div class="address-text order-id">
                <span>{{ orderPlacementTime }}</span>
              </div>
            </CardContent>
            <div><hr class="sf-divider divider" /></div>

            <div
              :key="orderId"
              v-for="(order, orderId, index) in order.orderData"
              class="shipment-wrapper"
            >
              <CardContent class="flex-space-bw">
                <div class="address-text">
                  <span>Shipment {{ index + 1 }}</span>
                </div>
                <div class="address-text">
                  <span>Id - {{ orderId }}</span>
                </div>
              </CardContent>
              <CardContent
                v-if="orderStatusData && orderStatusData[index]"
                class="flex-space-bw"
              >
                <div class="address-text"><span>Status</span></div>
                <div class="address-text">
                  <span>{{ orderStatusData[index].state }}</span>
                </div>
              </CardContent>
              <CardContent class="flex-space-bw">
                <div class="address-text-items"><span>Item (s)</span></div>
              </CardContent>
              <CardContent class="flex-space-bw">
                <div>
                  {{ order.quote.breakup[0].title }} x
                  {{ order.items[0].quantity.count }}
                </div>
                <div>
                  <div
                    @click="
                      openItemsModal = true;
                      selectMoreItemsId = orderId;
                    "
                    class="more-items-button"
                  >
                    <span class="more-items-text"
                      >{{ order.items.length - 1 }} more items</span
                    >
                  </div>
                </div>
              </CardContent>

              <div class="order-buttons-wrapper">
                <SfButton
                  class="sf-button--pure"
                  @click="
                    openTrackModal = true;
                    selectedTrackingId = index;
                  "
                >
                  <div class="color-def">Track</div>
                </SfButton>

                <SfButton
                  class="sf-button--pure"
                  @click="
                    openSupportModal = true;
                    selectedSupportId = index;
                  "
                >
                  <div class="color-def">Support</div>
                </SfButton>
              </div>
              <div><hr class="sf-divider divider" /></div>
            </div>
          </SfAccordionItem>
        </SfAccordion>
      </Card>

      <div class="sub-heading"></div>

      <div v-if="showFulfillmentProgress">
        <Card>
          <SfAccordion>
            <SfAccordionItem :header="'Fulfillment Progress'">
              <CardContent class="flex-space-bw">
                <div class="fulfillment-progress">
                  <div
                    v-for="(currFulfillment,
                    fulfillmentId,
                    index) in fulfillmentData"
                    class="track-details"
                    :class="{
                      first: index === 0,
                      last: index === Object.keys(fulfillmentData).length - 1
                    }"
                    :key="index"
                  >
                    <template
                      v-if="
                        currFulfillment.state &&
                          currFulfillment.state.descriptor
                      "
                    >
                      <div class="check-container">
                        <div v-if="index !== 0" class="dot"></div>
                        <div v-if="index !== 0" class="dot"></div>
                        <div v-if="index !== 0" class="dot"></div>
                        <div class="check">
                          <img src="/icons/check.svg" alt="" />
                        </div>
                        <div
                          v-if="
                            index !== Object.keys(fulfillmentData).length - 1
                          "
                          class="dot"
                        ></div>
                        <div
                          v-if="
                            index !== Object.keys(fulfillmentData).length - 1
                          "
                          class="dot"
                        ></div>
                      </div>
                      <div class="step-details">
                        <div class="step-number">Shipment {{ index + 1 }}</div>
                        <div class="step-name">
                          {{ currFulfillment.state.descriptor.name }}
                        </div>
                        <div class="step-time">
                          {{ currFulfillment.state.descriptor.updated_at }}
                        </div>
                      </div>
                    </template>
                  </div>
                </div>
              </CardContent>
            </SfAccordionItem>
          </SfAccordion>
        </Card>
      </div>

      <div class="sub-heading"></div>

      <Card>
        <SfAccordion>
          <SfAccordionItem :header="'Shipping'">
            <AddressCard
              :name="order.shippingAddress.name"
              :address="order.shippingAddress.address"
              :mobile="order.shippingAddress.mobile"
              :building="order.shippingAddress.building"
              :pincode="order.shippingAddress.pincode"
            />
          </SfAccordionItem>
        </SfAccordion>
      </Card>

      <div class="sub-heading"></div>

      <Card>
        <SfAccordion>
          <SfAccordionItem :header="'Billing'">
            <CardContent v-if="order.shippingAsBilling" class="flex-space-bw">
              <div class="address-text">Same as Shipping Details</div>
            </CardContent>
            <AddressCard
              v-else
              :name="order.billingAddress.name"
              :address="order.billingAddress.address"
              :mobile="order.billingAddress.mobile"
              :building="order.billingAddress.building"
              :pincode="order.billingAddress.pincode"
            />
          </SfAccordionItem>
        </SfAccordion>
      </Card>

      <div class="sub-heading"></div>

      <Card>
        <SfAccordion>
          <SfAccordionItem :header="'Payment'">
            <div :key="orderId" v-for="(value, orderId) in order.orderData">
              <div :key="id" v-for="(breakup, id) in value.quote.breakup">
                <CardContent class="flex-space-bw">
                  <div class="address-text">{{ breakup.title }}</div>
                  <div class="address-text-value">
                    ₹{{ breakup.price.value }}
                  </div>
                </CardContent>
              </div>
              <div><hr class="sf-divider divider" /></div>
              <CardContent class="flex-space-bw">
                <div class="address-text">Total</div>
                <div class="address-text-value">
                  ₹{{ value.quote.price.value }}
                </div>
              </CardContent>
              <CardContent class="flex-space-bw">
                <div class="address-text">Status</div>
                <div class="address-text-value">
                  {{ value.payment.status }}
                </div>
              </CardContent>
            </div>
            <CardContent class="flex-space-bw">
              <div class="address-text">Method</div>
              <div class="address-text-value">{{ order.paymentMethod }}</div>
            </CardContent>
            <div><hr /></div>
          </SfAccordionItem>
        </SfAccordion>
      </Card>

      <div class="sub-heading"></div>

      <div v-if="orderStatusData">
        <Card>
          <SfAccordion>
            <SfAccordionItem :header="'Fulfillment'">
              <div
                v-for="(currOrderStatus, orderStatusId) in orderStatusData"
                :key="orderStatusId"
              >
                <CardContent class="flex-space-bw">
                  <div class="address-text">ID</div>
                  <div class="address-text">
                    {{ currOrderStatus.provider.id }}
                  </div>
                </CardContent>
                <CardContent class="flex-space-bw">
                  <div class="address-text">Status</div>
                  <div class="address-text">{{ currOrderStatus.state }}</div>
                </CardContent>

                <div><hr class="sf-divider divider" /></div>
              </div>
            </SfAccordionItem>
          </SfAccordion>
        </Card>
      </div>

      <div class="sub-heading"></div>

      <button
        class="sf-button color-primary support-btns card-checkbox"
        @click="goHome"
      >
        <div class="f-btn-text">Home</div>
      </button>

      <ModalSlide
        :visible="openSupportModal"
        @close="
          openSupportModal = false;
          selectedSupportId = null;
        "
      >
        <div class="modal-heading">Contact Support</div>
        <div><hr class="sf-divider" /></div>
        <div class="modal-body">
          <div v-if="supportData && supportData[selectedSupportId]">
            <div class="support-text">
              You can reach out to one of our customer support executives for
              any help, queries or feedback to
              {{
                providerGetters.getProviderName(
                  cartGetters.getBppProvider(order.cart)
                )
              }}
            </div>
            <SfButton
              class="support-btns"
              v-if="supportData[selectedSupportId].phone"
              @click="openWindow('tel:' + supportData[selectedSupportId].phone)"
              aria-label="Close modal"
              type="button"
              >Call us</SfButton
            >
            <SfButton
              class="support-btns"
              v-if="supportData[selectedSupportId].email"
              @click="
                openWindow('mailto:' + supportData[selectedSupportId].email)
              "
              aria-label="Close modal"
              type="button"
              >Email us</SfButton
            >
            <SfButton
              class="support-btns"
              v-if="supportData[selectedSupportId].uri"
              @click="openWindow(supportData[selectedSupportId].uri)"
              aria-label="Close modal"
              type="button"
              >Chat with us</SfButton
            >
          </div>
          <div v-else class="support-text">
            No Support available at the moment
          </div>
        </div>
      </ModalSlide>

      <ModalSlide
        :visible="openTrackModal"
        @close="
          openTrackModal = false;
          selectedTrackingId = null;
        "
      >
        <div class="modal-heading">Track</div>
        <div><hr class="sf-divider" /></div>
        <div class="modal-body">
          <div v-if="!trackingData[selectedTrackingId]" class="support-text">
            No Tracking details available
            <!-- {{
              providerGetters.getProviderName(
                cartGetters.getBppProvider(order.cart)
              )
            }} -->
          </div>
          <div v-else>
            <SfButton
              class="support-btns"
              aria-label="Close modal"
              type="button"
              @click="openWindow(trackingData[selectedTrackingId])"
              >open Link</SfButton
            >
          </div>
          <!-- <SfButton class="support-btns" aria-label="Close modal" type="button"
            >Call us</SfButton
          >
          <SfButton class="support-btns" aria-label="Close modal" type="button"
            >Chat with us</SfButton
          > -->
        </div>
      </ModalSlide>

      <ModalSlide
        :visible="openItemsModal"
        @close="
          openItemsModal = false;
          selectMoreItemsId = null;
        "
      >
        <div class="modal-heading">Ordered Items</div>
        <div><hr class="sf-divider" /></div>
        <div class="modal-body">
          <CardContent class="flex-space-bw">
            <div class="address-text">
              <span>Shipment 1</span>
            </div>
            <div class="address-text order-id">
              <span>Id - {{ selectMoreItemsId }}</span>
            </div>
          </CardContent>
          <div v-if="selectMoreItemsId !== null">
            <CardContent class="more-items-flex">
              <div
                v-for="(product, index) in getMoreItems(
                  order,
                  selectMoreItemsId
                )"
                :key="index"
                class="item-wrapper"
              >
                <div class="s-p-image">
                  <SfImage
                    :src="cartGetters.getItemImage(product)"
                    alt="product img"
                    :width="85"
                    :height="90"
                  />
                </div>
                <div class="s-p-details">
                  <div class="s-p-name">
                    {{ cartGetters.getItemName(product) }}
                  </div>
                  <div class="s-p-retailer">
                    sold by
                    {{
                      providerGetters.getProviderName(
                        cartGetters.getBppProvider(product)
                      )
                    }}
                  </div>
                  <div class="s-p-weight">x {{ product.quantity }}</div>
                  <div class="s-p-price">
                    ₹
                    {{
                      cartGetters.getItemPrice(product).regular *
                        product.quantity
                    }}
                  </div>
                </div>
              </div>
            </CardContent>
          </div>
          <button
            class="sf-button color-primary support-btns"
            @click="openItemsModal = false"
          >
            <div class="f-btn-text">Okay</div>
          </button>
        </div>
      </ModalSlide>
    </div>
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
import LoadingCircle from '~/components/LoadingCircle';
import SfAccordionItem from '~/components/Accordion.vue';
import AddressInputs from '~/components/AddressInputs.vue';
import Footer from '~/components/Footer.vue';
import {
  cartGetters,
  providerGetters,
  useTrack,
  useOrderStatus,
  useSupport,
  useCart
} from '@vue-storefront/beckn';

import {
  ref,
  onBeforeMount,
  computed,
  onBeforeUnmount
} from '@vue/composition-api';
import Card from '~/components/Card.vue';
import CardContent from '~/components/CardContent.vue';
import AddressCard from '~/components/AddressCard';
import helpers, {
  createStatusTrackAndSupportOrderRequest
} from '../helpers/helpers';

export default {
  middleware: 'auth',
  name: 'OrderDetails',
  components: {
    SfButton,
    SfSteps,
    SfSidebar,
    SfModal,
    SfCheckbox,
    Footer,
    ModalSlide,
    SfInput,
    Card,
    SfImage,
    CardContent,
    AddressInputs,
    SfAccordion,
    SfAccordionItem,
    SfIcon,
    LoadingCircle,
    AddressCard,
    helpers
  },
  setup(_, context) {
    // const isThankYou = computed(() => currentStep.value === 'thank-you');

    const order = ref(null);
    const orderPlacementTime = ref(null);
    const enableLoader = ref(true);
    const selectedTrackingId = ref(null);
    const selectedSupportId = ref(null);
    const selectMoreItemsId = ref(null);
    const { clear } = useCart();

    const {
      poll: onTrack,
      init: track,
      pollResults: trackResult,
      stopPolling: stopPollingOnTrack
    } = useTrack('track');
    const {
      poll: onSupport,
      init: support,
      pollResults: supportResult,
      stopPolling: stopPollingSupport
    } = useSupport('support');

    const {
      poll: onStatus,
      init: status,
      pollResults: statusResult,
      stopPolling: stopStatusPolling
    } = useOrderStatus('status');

    const trackingData = computed(() => {
      if (!trackResult.value) {
        return null;
      }

      let shouldStopPooling = true;
      const trackingData = {};
      trackResult.value.forEach((currentTrackData, index) => {
        if (currentTrackData.message?.tracking?.url) {
          trackingData[index] = currentTrackData.message.tracking.url;
        } else {
          shouldStopPooling = false;
        }
      });

      if (shouldStopPooling) {
        stopPollingOnTrack();
      }

      return trackingData;
    });

    const orderStatusData = computed(() => {
      if (!statusResult.value) {
        return null;
      }

      const orderStatusData = {};
      statusResult.value.forEach((currentStatusData, index) => {
        if (currentStatusData.message?.order) {
          orderStatusData[index] = currentStatusData.message.order;
        }
      });

      return orderStatusData;
    });

    const showFulfillmentProgress = computed(() => {
      if (!statusResult.value) {
        return null;
      }

      let showFulfillmentProgress = false;
      statusResult.value.forEach((currentStatusData) => {
        if (currentStatusData.message?.order?.fulfillment?.state) {
          showFulfillmentProgress = true;
        }
      });

      return showFulfillmentProgress;
    });

    const fulfillmentData = computed(() => {
      if (!statusResult.value) {
        return null;
      }

      const fulfillmentData = {};
      statusResult.value.forEach((currentStatusData, index) => {
        if (currentStatusData.message?.order) {
          fulfillmentData[index] = currentStatusData.message.order.fulfillment;
        }
      });

      return fulfillmentData;
    });

    const supportData = computed(() => {
      if (!supportResult.value) {
        return null;
      }

      let shouldStopPooling = true;
      const supportData = {};
      supportResult.value.forEach((currentSupportData, index) => {
        if (
          currentSupportData.message &&
          Object.keys(currentSupportData.message).length !== 0
        ) {
          supportData[index] = currentSupportData.message;
        } else {
          shouldStopPooling = false;
        }
      });

      if (shouldStopPooling) {
        stopPollingSupport();
      }

      return supportData;
    });

    const parentOrderId = context.root.$route.query.id;
    const fulfillmentStep = [
      { status: 'Items Packed', time: 'May 2021, 2021 12:40 PM' },
      { status: 'Delivery agent assigned', time: 'May 2021, 2021 12:40 PM' },
      { status: 'Agent enroute to store', time: 'May 2021, 2021 12:40 PM' },
      null,
      null,
      null,
      null
    ];
    const fulfillmentSteps = [
      { status: 'Items Packed', time: 'May 2021, 2021 12:40 PM' },
      { status: 'Delivery agent assigned', time: 'May 2021, 2021 12:40 PM' },
      { status: 'Agent enroute to store', time: 'May 2021, 2021 12:40 PM' }
    ];
    const openSupportModal = ref(false);
    const openTrackModal = ref(false);
    const openItemsModal = ref(false);
    const goHome = () => context.root.$router.push('/');
    const goBack = () => context.root.$router.push('/orders');
    const onCancel = () => context.root.$router.push('/cancelorder');

    const callSupport = async () => {
      const params = createStatusTrackAndSupportOrderRequest(
        order.value,
        'ref_id'
      );
      try {
        const response = await support(params, localStorage.getItem('token'));
        await onSupport(
          { messageIds: helpers.getMessageIdsFromResponse(response) },
          localStorage.getItem('token')
        );
      } catch (error) {
        console.log('Error calling support apis - ', error);
      }
    };

    const callStatus = async () => {
      const params = createStatusTrackAndSupportOrderRequest(
        order.value,
        'order_id'
      );
      try {
        const response = await status(params, localStorage.getItem('token'));
        await onStatus(
          { messageIds: helpers.getMessageIdsFromResponse(response) },
          localStorage.getItem('token')
        );
      } catch (error) {
        console.log('Error calling track apis - ', error);
      }
    };

    const callTrack = async () => {
      const params = createStatusTrackAndSupportOrderRequest(
        order.value,
        'order_id'
      );
      try {
        const response = await track(params, localStorage.getItem('token'));
        await onTrack(
          { messageIds: helpers.getMessageIdsFromResponse(response) },
          localStorage.getItem('token')
        );
      } catch (error) {
        console.log('Error calling track apis - ', error);
      }
    };
    onBeforeMount(async () => {
      const orders = JSON.parse(localStorage.getItem('orderHistory')) ?? [];

      order.value = orders.find((ord) => {
        return ord.parentOrderId === parentOrderId;
      });

      orderPlacementTime.value = helpers.getOrderPlacementTimeline(
        order.value.order?.created_at
      );

      await callTrack();
      await callSupport();
      await callStatus();
      enableLoader.value = false;
      localStorage.removeItem('orderProgress');
      localStorage.removeItem('transactionId');
      clear();
    });

    onBeforeUnmount(async () => {
      stopStatusPolling();
    });

    const openWindow = (link) => {
      // debugger
      window.open(link);
    };
    const getMoreItems = helpers.getMoreItemsOfOrderFromcartItems;
    return {
      goHome,
      goBack,
      order,
      cartGetters,
      trackingData,
      selectedTrackingId,
      providerGetters,
      fulfillmentStep,
      fulfillmentSteps,
      openSupportModal,
      onCancel,
      enableLoader,
      openTrackModal,
      openItemsModal,
      callTrack,
      trackResult,
      openWindow,
      orderStatusData,
      fulfillmentData,
      showFulfillmentProgress,
      supportData,
      selectedSupportId,
      orderPlacementTime,
      selectMoreItemsId,
      getMoreItems
    };
  }
};
</script>

<style lang="scss" scoped>
.track-target {
  color: #f37a20;
}
.support-btns {
  width: 100%;
  border-radius: 3px;
}

.cancel-order-btn {
  width: 100%;
  border-radius: 3px;
}

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
  font-size: 14px;
  color: #8a8d8e;
}

.flex-space-bw {
  justify-content: space-between;
}

.details {
  padding: 20px;
  height: calc(100vh - 149px);
  overflow: scroll;
}

.address-bar-icon {
  margin: 10px 10px 1px 10px;
}

.address-text {
  align-self: center;
  margin-left: 6px;
  span {
    font-weight: 500;
  }
}

.address-text-items {
  display: flex;
  align-self: center;
  margin-left: 6px;
  span {
    font-weight: 500;
  }
}

.more-items-button {
  border: 1px solid #f37a20;
  border-radius: 6px;
  width: 100%;
}

.more-items-text {
  padding: 9px;
  color: #f37a20;
}

.sub-heading {
  margin: 14px 0px;
  display: flex;
  justify-content: space-between;
}

.footer {
  position: fixed;
  bottom: 0;
}
.address-text {
  font-weight: 600;
}

.address-text-value {
  font-weight: 400;
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
.order-buttons-wrapper {
  padding-top: 20px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-around;
}
.checkout-product:first-child {
  border-top: 0px solid rgba(0, 0, 0, 0.3);
}
.checkout-product {
  display: flex;
  margin-top: 15px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.3);
  padding-bottom: 15px;
  &:first-child(2) {
    border-top: 0 !important;
  }
  .s-p-image {
    margin-right: 25px;
  }
  .s-p-name {
    font-size: 11px;
    color: #000;
  }
  .s-p-price {
    font-size: 16px;
    font-weight: 600;
    margin-top: 10px;
    color: #f37a20;
  }
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
    font-size: 13px;
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
.more-items-flex {
  display: flex;
  flex-direction: column;
}
.modal-heading {
  margin: 20px;
  font-size: 20px;
  font-weight: 500;
}

.color-def {
  color: #f37a20;
}

.modal-body {
  padding: 28px;
  .support-text {
    font-size: 15px;
  }
  .support-btns {
    margin-top: 20px;
    width: 100%;
  }
}

.sf-loader {
  top: 40px;
}

.order-id {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.shipment-wrapper {
  margin-top: 20px;
}

.step-number {
  line-height: 1;
}
</style>
