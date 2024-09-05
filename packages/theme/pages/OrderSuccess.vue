<template>
  <div id="payment">
    <div class="top-bar header-top"></div>
    <div class="content header-push">
      <div class="sub-heading">
        <img src="~/assets/images/success-order.svg" />
      </div>
      <div class="details">
        <div class="sub-heading dis-block">
          <div class="p-name flex-set">Success!</div>
          <div class="p-name flex-set">Your Order Has Been Placed</div>
        </div>
        <div class="sub-heading">
          Thank You! Your order is currently being processed
        </div>
        <button
          class="sf-button button color-primary"
          link=""
          @click="goToOrderDetails"
        >
          <!-- button icon template  -->
          <slot name="buttonIcon" />
          <div class="f-btn-text">View Order</div>
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import { SfButton, SfRadio, SfIcon } from '@storefront-ui/vue';

// import { ref, computed } from '@vue/composition-api';
// import { onMounted } from '@vue/composition-api';
// import helpers from '../helpers/helpers';
// import { useCart } from '@vue-storefront/beckn';

import Card from '~/components/Card.vue';

import Footer from '~/components/Footer.vue';
import CardContent from '~/components/CardContent.vue';
export default {
  middleware: 'auth',
  name: 'OrderSuccess',
  components: {
    SfButton,
    SfIcon,
    Card,
    CardContent,
    SfRadio,
    Footer,
  },
  setup(_, context) {
    const parentOrderId = context.root.$route.query.id;

    const goToOrderDetails = () => {
      context.root.$router.push({
        path: '/orderdetails',
        query: {
          id: parentOrderId,
        },
      });
    };
    return {
      goToOrderDetails,
    };
  },
};
</script>
<style lang="scss" scoped>
// .header-top{
//     position: fixed;
//     width: 100%;
//     top: 45px;
//     z-index: 9;
// }
// .header-push{
//     top: 107px;
//     position: relative;
//     padding-bottom: 107px;
// }
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

.dis-block {
  display: block !important;
}

.details {
  margin: 2px 20px;
}

.content {
  margin: 2px 20px;
}

.p-name {
  font-size: 16px;
  font-weight: 600;
  color: #37474f;
}

.button {
  width: 100%;
}

.flex-set {
  display: flex;
  justify-content: space-around;
}

.sub-heading {
  margin: 34px 0px;
  display: flex;
  justify-content: space-around;
}
</style>
