<template>
  <div id="payment">
    <div class="top-bar">
      <div @click="goBack" class="sf-chevron--left sf-chevron icon_back">
        <span class="sf-search-bar__icon">
          <SfIcon color="var(--c-primary)" size="20px" icon="chevron_left" />
        </span>
      </div>
      <div>Orders</div>
    </div>
    <!-- <div class="sub-heading">
        <div class="p-name">Other</div>
      </div> -->
    <div v-if="enableLoader" key="loadingCircle" class="loader-circle">
      <LoadingCircle :enable="enableLoader" />
    </div>
    <!-- order page with order List -->
    <div v-else class="details">
      <div v-if="orders">
      <div :key="order.parentOrderId" v-for="order in orders">
        <CardContent>
          <div @click="goToOrder(order.parentOrderId)" class="order-details">
            <div class="order-icon">
              <div class="address-bar-icon">
                <svg
                  width="22"
                  height="19"
                  viewBox="0 0 22 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M21 6.98H16.21L11.83 0.42C11.64 0.14 11.32 0 11 0C10.68 0 10.36 0.14 10.17 0.43L5.79 6.98H1C0.45 6.98 0 7.43 0 7.98C0 8.07 0.01 8.16 0.04 8.25L2.58 17.52C2.81 18.36 3.58 18.98 4.5 18.98H17.5C18.42 18.98 19.19 18.36 19.43 17.52L21.97 8.25L22 7.98C22 7.43 21.55 6.98 21 6.98ZM11 2.78L13.8 6.98H8.2L11 2.78ZM4.51 16.99L17.5 16.98L19.7 8.98H2.31L4.51 16.99Z"
                    fill="#F37A20"
                  />
                </svg>
              </div>
            </div>
            <div class="order color-def">
              <div class="order-id">Order ID {{ order.parentOrderId }}</div>
              <!-- Hardcoding to use first orderData. To be changed when we get more details on this page -->
              <div class="order-status">
                {{ order.orderData[Object.keys(order.orderData)[0]].state }}
              </div>
              <div class="order-date">
                {{
                  new Date(
                    Date.parse(
                      order.orderData[Object.keys(order.orderData)[0]]
                        .created_at
                    )
                  ).toDateString()
                }}
              </div>
            </div>
            <div class="order-price">
              ₹
              {{
                order.orderData[Object.keys(order.orderData)[0]].payment.params
                  .amount
              }}
            </div>
          </div>
        </CardContent>
        <div><hr class="sf-divider divider" /></div>
      </div>
      </div>
       <!-- Empty order page -->
    <div v-else>
      <div class="emptyOrderListPage"><h5>No Orders to Display</h5></div>
      <div class="sf-button--pure sf-quantity-selector__button sf-button">
        <button class="orderNowButtonForEmptyOrderListPage">
          <nuxt-link class="orderNowButtonForEmptyOrderListPageChild" :to="localePath('/')">Order Now</nuxt-link>
        </button>
      </div>
    </div>
    </div>
  </div>
</template>
<script>
import { SfButton, SfIcon } from '@storefront-ui/vue';

import { ref, onBeforeMount } from '@vue/composition-api';

import LoadingCircle from '~/components/LoadingCircle';

import CardContent from '~/components/CardContent.vue';

export default {
  middleware: 'auth',
  name: 'Orders',
  components: {
    SfButton,
    SfIcon,
    CardContent,
    LoadingCircle,
  },
  setup(_, context) {
    const orders = ref([]);
    const enableLoader = ref(false);

    onBeforeMount(() => {
      orders.value = JSON.parse(localStorage.getItem('orderHistory'));
      enableLoader.value = false;
    });

    const goToOrder = (parentOrderId) => {
      context.root.$router.push({
        path: '/orderdetails',
        query: {
          id: parentOrderId,
        },
      });
    };

    const goBack = () => context.root.$router.back();
    const isOrderreceive = false;
    return {
      orders,
      enableLoader,
      goToOrder,
      goBack,
      isOrderreceive,
    };
  },
};
</script>
<style lang="scss" scoped>
.top-bar {
  align-items: center;
  display: flex;
  // margin-top: 45px;
  font-size: 18px;
  justify-content: space-around;
  height: 60px;
  font-weight: 500;
  background: white;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.07);
}

.order-details {
  margin: 8px 0px;
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: flex-start;
}

.icon_back {
  position: absolute;
  left: 0;
  margin: 10px;
}

.address-bar-icon {
  border-radius: 50%;
  background: #faefe9;
  align-items: center;
  width: 46px;
  height: 46px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}

.order {
  width: 64%;
  display: flex;
  flex-direction: column;
  // margin: 16px 10px;
}

.order-id {
  font-size: 16px;
  font-weight: 500;
  margin: 6px 0px;
  color: #37474f;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.order-status {
  font-size: 12px;
}

.order-date {
  font-size: 12px;
}

.order-icon {
  height: 100%;
  display: flex;
  align-items: center;
}

.order-price {
  font-size: 18px;
  font-weight: 700;
  color: #f37a20;
}

.details {
  margin: 2px 20px;
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
.emptyOrderListPage {
  display: flex;
  justify-content: center;
  font-family: inherit;
  font-style: normal;
  font-weight: 800;
  font-size: 22px;
  line-height: 20px;
  color: #c4c4c4;
  margin-top: 4rem;
}
.orderNowButtonForEmptyOrderListPage {
  background: #f37a20;
  border-radius: 5px;
  padding: 10px;
  margin-top: 10px;
  border-style: none;
  width: 111px;
  border-style: none;
}
.orderNowButtonForEmptyOrderListPageChild {
  color: #ffffff;
  font-size: 14px;
  font-weight: bold;
}
</style>
