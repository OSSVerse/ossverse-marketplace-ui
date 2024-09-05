<template>
  <div>
    <div class="s-p-addcart">
      <button
        v-if="_value == 0"
        class="color-primary sf-button add-btn"
        :disabled="false"
        link=""
        @click="changeItemNumber('add')"
      >
        <SfIcon icon="add_to_cart" size="xs" color="white" :coverage="1" /> Add
        to Cart
      </button>
      <div v-else class="item-counter">
        <button
          class="sf-button--pure sf-quantity-selector__button sf-button"
          :disabled="false"
          data-testid="+"
          @click="changeItemNumber('remove')"
        >
          −
        </button>
        <div
          class="quantity-value"
          :value="_value.value"
          data-testid="sf-quantity-selector"
        >
          {{ _value }}
        </div>
        <button
          class="sf-button--pure sf-quantity-selector__button sf-button"
          :disabled="false"
          data-testid="-"
          @click="changeItemNumber('add')"
        >
          +
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import { SfInput, SfIcon } from '@storefront-ui/vue';
import { ref } from '@vue/composition-api';

export default {
  name: 'AddToCart',
  components: {
    SfInput,
    SfIcon
  },
  props: {
    value: { type: Number, default: 0 },
    maxLimit: { type: Number, default: 100 }
  },
  setup(props, { emit}) {
    const _value = ref(props.value);
    const _maxLimit = ref(props.maxLimit);
    const changeItemNumber = (type) => {
      if (type === 'add') {
        if (_maxLimit.value) {
          if (_value.value < _maxLimit.value) {
            _value.value++;
          }
        } else {
          _value.value++;
        }
      } else if (type === 'remove') {
        if (_value.value > 0) {
          _value.value--;
        }
      }
      emit('updateItemCount', _value.value);
    };
    return {
      _value,
      _maxLimit,
      changeItemNumber
    };
  }
};
</script>
<style lang="scss" scoped>
.quantity {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .quantity-value {
    margin-top: 10px;
  }
}
</style>
