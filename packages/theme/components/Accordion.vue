<template>
  <div class="sf-accordion-item no-border">
    <!-- @slot -->
    <!-- <slot
      name="header"
      v-bind="{
        header,
        isOpen,
        accordionClick,
        showChevron: $parent.showChevron,
      }"
    > -->
      <SfButton
        :aria-pressed="isOpen.toString()"
        :aria-expanded="isOpen.toString()"
        :class="{ 'is-open': isOpen }"
        class="sf-button--pure sf-accordion-item__header no-border padding-head"
        @click="accordionClick"
      >
        {{ header }}
        <!-- @slot here you can add additional information about this item -->
        <!-- <slot name="additional-info" /> -->
        <SfChevron
          tabindex="0"
          class="sf-accordion-item__chevron"
          :class="{ 'sf-chevron--right': !isOpen }"
        />
      </SfButton>
    <!-- </slot> -->
    <transition class="accordian__transition-content" >
      <div v-if="isOpen">
        <div class="sf-accordion-item__content no-border">
          <!-- @slot -->
          <slot />
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
// import { focus } from "../../../../utilities/directives";
import { SfChevron, SfButton } from '@storefront-ui/vue';
export default {
  name: 'SfAccordionItem',
  //   directives: { focus },
  components: {
    SfChevron,
    SfButton
  },
  props: {
    header: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      isOpen: false
    };
  },
  methods: {
    accordionClick() {
      this.$parent.$emit('toggle', this._uid);
    }
  }
};
</script>
<style lang="scss">
@import "~@storefront-ui/shared/styles/components/organisms/SfAccordion.scss";

.no-border{
  border: 0px;
  padding: 0px;
}

.padding-head{
  padding: 10px 15px;
}
.sf-accordion-item{
  .sf-chevron__bar{
    background: var(--chevron-color,var(--c-primary));
  }
}
</style>
