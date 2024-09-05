<template>
  <section>
    <SfOverlay :transition="'sf-fade'" :visible="visible"> </SfOverlay>
    <transition :name="'sf-collapse-bottom'">
      <div
        v-if="visible"
        v-focus-trap
        v-click-outside="close"
        class="sf-modal__container modal_main_div"
      >
        <SfButton
          v-if="true"
          class="sf-button--pure sf-modal__close"
          aria-label="Close modal"
          type="button"
          @click="close"
          style="position: absolute; right: 20px; top: 24px"
        >
          <svg
            width="15"
            height="16"
            viewBox="0 0 15 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14.1728 13.7707L14.1728 13.7707L14.1719 13.7698L9.78201 9.33984L9.78178 9.33961L8.78812 8.35001L14.1718 2.93064C14.2847 2.81702 14.3765 2.69051 14.4343 2.55087C14.4912 2.41354 14.5257 2.26379 14.5257 2.113C14.5257 1.9547 14.5033 1.80358 14.4337 1.66254C14.3774 1.52708 14.2979 1.38921 14.1937 1.28434L14.1938 1.28429L14.1918 1.28252C14.0801 1.18128 13.9549 1.08914 13.8163 1.03103C13.6771 0.972649 13.5169 0.95 13.37 0.95C13.22 0.95 13.0714 0.984859 12.925 1.04153L12.925 1.04151L12.9238 1.04205C12.7852 1.10016 12.6595 1.19251 12.5573 1.29536L7.41441 6.47233L2.23871 1.26234L2.23873 1.26233L2.23775 1.2614C2.01962 1.05338 1.73321 0.950048 1.43693 0.950048C1.13825 0.950048 0.852004 1.07712 0.646101 1.28438C0.429215 1.5027 0.314346 1.77942 0.314103 2.07903C0.302894 2.37935 0.417791 2.66731 0.623268 2.88564L0.623256 2.88565L0.624163 2.88656L5.01401 7.31652L5.01424 7.31675L6.0079 8.30635L0.624206 13.7257C0.511328 13.8393 0.419491 13.9658 0.361692 14.1055C0.304846 14.2428 0.270313 14.3926 0.270312 14.5434C0.270312 14.7017 0.292671 14.8528 0.362342 14.9938C0.418584 15.1293 0.498123 15.2671 0.602311 15.372L0.602262 15.3721L0.604213 15.3738C0.715956 15.4751 0.84116 15.5672 0.979703 15.6253C1.1189 15.6837 1.27917 15.7064 1.42599 15.7064C1.57606 15.7064 1.7246 15.6715 1.87098 15.6148L1.87099 15.6148L1.87227 15.6143C2.01083 15.5562 2.13654 15.4638 2.23871 15.361L7.38161 10.184L12.5573 15.394L12.5573 15.394L12.5583 15.395C12.7764 15.603 13.0628 15.7063 13.3591 15.7063C13.6578 15.7063 13.944 15.5793 14.1499 15.372C14.3668 15.1537 14.4817 14.877 14.4819 14.5773C14.4931 14.277 14.3782 13.9891 14.1728 13.7707Z"
              fill="#181725"
              stroke="#181725"
              stroke-width="0.1"
            />
          </svg>
        </SfButton>
        <div ref="content" class="sf-modal__content content">
          <slot />
        </div>
      </div>
    </transition>
  </section>
</template>

<script>
import { SfOverlay, SfIcon, SfButton } from '@storefront-ui/vue';
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import {
  focusTrap,
  clickOutside
} from '@storefront-ui/vue/src/utilities/directives';
import {
  // ref, onMounted,
  watch,
  toRefs
} from '@vue/composition-api';

export default {
  name: 'ModalSlide',
  components: {
    SfOverlay,
    SfIcon,
    SfButton
  },
  directives: { focusTrap, clickOutside },
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { root, emit }) {
    const close = () => {
      emit('close');
    };
    const { visible } = toRefs(props);
    watch(visible, (value) => {
      if (value) {
        root.$nextTick(() => {
          disableBodyScroll(root.$refs.content);
        });
      } else {
        clearAllBodyScrollLocks();
      }
    });

    return {
      close
    };
  }
};
</script>
<style lang="scss" scoped>
.modal_main_div {
  z-index: 3;
  top: auto;
  border-radius: 20px 20px 0px 0px;
}

.sf-overlay {
  background: black;
  opacity: 60%;
}

.content {
  margin: 0;
  padding: 0;
}
</style>
