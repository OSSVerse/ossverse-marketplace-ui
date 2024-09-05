<template>
  <div id="home">
    <OpenSearch />
    <div @click="openCart"></div>
  </div>
</template>
<script>
import OpenSearch from '../components/OpenSearch';
import { useUiState } from '~/composables';
import { onMounted } from '@vue/composition-api';
import helpers from '../helpers/helpers';
import { useCart } from '@vue-storefront/beckn';

const { toggleCartSidebar } = useUiState();
export default {
  name: 'Home',
  components: {
    OpenSearch
  },
  methods: {
    openCart() {
      toggleCartSidebar();
    }
  },
  setup() {
    const { load } = useCart();
    onMounted(() => {
      if (localStorage.getItem('cartData')) {
        const cartData = JSON.parse(localStorage.getItem('cartData'));
        const days = helpers.calculateDays(cartData.cartTime, new Date());
        if (days > 7) {
          localStorage.removeItem('cartData');
          localStorage.removeItem('transactionId');
        }
      }
      load();
    });
  }
};
</script>
