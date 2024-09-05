<template>
    <div>
        <div class="sub-heading">
            <div class="p-name">{{heading}}</div>
        </div>
        <Card>
            <div
                :key="index + 'new'"
                v-for="(lineItem, index) in breakup"
            >
                <CardContent class="flex-space-bw">
                    <div class="address-text">{{lineItem.description}}</div>
                    <div class="address-text">{{lineItem.value}}</div>
                </CardContent>
            </div>
            <div><hr class="sf-divider divider" /></div>
            <CardContent class="flex-space-bw">
                <div class="address-text bold">Total Paid</div>
                <div class="address-text bold">{{totalPaid}}</div>
            </CardContent>
            <CardContent class="flex-space-bw" v-if="balance > 0">
                <div class="address-text">Balance</div>
                <div class="address-text">{{totalBalance}}</div>
            </CardContent>
            <CardContent class="flex-space-bw" v-if="balance > 0">
                <div class="address-text">Method</div>
                <div class="address-text">{{paymentMethod}}</div>
            </CardContent>
            <CardContent class="flex-space-bw" v-if="balance > 0">
                <div class="address-text">Transaction ID</div>
                <div class="address-text">{{transactionId}}</div>
            </CardContent>
        </Card>
    </div>

</template>
<script>
import { SfIcon } from '@storefront-ui/vue';
import CardContent from '~/components/CardContent.vue';
import Card from '~/components/Card.vue';

export default {
  name: 'OrderStatusCard',
  components: {
    SfIcon,
    Card,
    CardContent
  },
  props: {
    heading: { type: String, default: 'Payment'},
    totalPaid: { type: Number, default: 0 },
    totalBalance: { type: Number, default: 0 },
    breakup: { type: Array, default: [] },
    transactionId: { type: String, default: '' },
    paymentMethod: { type: String, default: '' },
    transactionStatus: {type: String, default: 'Pending'}
  },
  setup() {
    return {};
  }
};
</script>
<style lang="scss" scoped>
</style>
