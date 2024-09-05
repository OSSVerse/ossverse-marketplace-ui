<template>
  <div class="sf-gallery product-gallery">
    <div>
      <div ref="glide" class="glide">
        <div class="glide__track" data-glide-el="track">
          <ul class="glide__slides">
            <li
              v-for="(picture, index) in images"
              :key="'slide-' + index"
              class="glide__slide"
            >
              <!-- @mouseover="startZoom(picture)"
            @mousemove="moveZoom($event, index)"
            @mouseout="removeZoom(index)" -->
              <SfImage
                ref="sfGalleryBigImage"
                class="sf-gallery__big-image"
                :src="picture"
                :alt="'none'"
                :width="imageWidth"
                :height="imageHeight"
                @click="$emit('click:stage', { picture, index })"
              />
            </li>
          </ul>
        </div>
      </div>
      <!-- <transition name="sf-fade">
        <div
          v-if="outsideZoom && pictureSelected"
          ref="outSide"
          :style="{ width: `${imageWidth}px`, height: `${imageHeight}px` }"
        >
          <SfImage
            ref="imgZoom"
            class="sf-gallery__zoom"
            :src="pictureSelected"
            :width="imageWidth"
            :height="imageHeight"
            :lazy="false"
          />
        </div>
      </transition> -->
    </div>
    <!-- <div class="corousel_indicator"> -->
    <ul class="corousel_indicators">
      <li
        v-for="(picture, index) in images"
        :key="index"
        class="indili"
        :class="{ 'active': index==activeIndex }"
      ></li>
    </ul>
    <!-- </div> -->
  </div>
</template>
<script>
import Glide from '@glidejs/glide';
import { SfImage, SfButton } from '@storefront-ui/vue';
export default {
  name: 'SfGallery',
  components: {
    SfImage,
    SfButton
  },
  props: {

    /**
     * Images list
     */
    images: {
      type: Array,
      default: () => []
    },

    /**
     * Images width, without unit
     */
    imageWidth: {
      type: [Number, String],
      default: 422
    },

    /**
     * Images height, without unit
     */
    imageHeight: {
      type: [Number, String],
      default: 664
    },

    /**
     * Thumb width, without unit
     */
    thumbWidth: {
      type: [Number, String],
      default: 160
    },

    /**
     * Thumb height, without unit
     */
    thumbHeight: {
      type: [Number, String],
      default: 160
    },

    /**
     * Initial image number (starting from 1)
     */
    current: {
      type: Number,
      default: 1
    },

    /**
     * Glide slider options (https://glidejs.com/docs/options/)
     */
    sliderOptions: {
      type: Object,
      default() {
        return {
          type: 'slider',
          autoplay: false,
          rewind: false,
          gap: 0
        };
      }
    },

    /**
     * Image zoom inside or overlap the stage
     */
    outsideZoom: {
      type: Boolean,
      default: false
    },

    /**
     * Toogle for image zoom or overlap the stage
     */
    enableZoom: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      positionStatic: {},
      eventHover: {},
      pictureSelected: '',
      glide: null,
      activeIndex: this.current - 1,
      style: ''
    };
  },
  computed: {
    mapPictures() {
      // map images to handle picture tags with SfImage
      return this.images.map(({ desktop, big }) => ({
        mobile: desktop,
        desktop: big
      }));
    },
    updatedSliderOptions() {
      return { ...this.sliderOptions, startAt: this.activeIndex };
    }
  },
  mounted() {
    this.$nextTick(() => {
      // handle slider with swipe and transitions with Glide.js
      // https://glidejs.com/docs/
      if (this.images.length < 1) return;
      const glide = new Glide(this.$refs.glide, this.updatedSliderOptions);
      glide.on('run', () => {
        this.go(glide.index);
      });
      glide.mount();
      this.glide = glide;
    });
  },
  beforeDestroy() {
    if (this.glide) {
      this.glide.destroy();
    }
  },
  methods: {
    go(index) {
      // debugger
      if (!this.glide) return;
      this.activeIndex = index;

      /**
       * Event for current image change (`v-model`)
       * @type {Event}
       */
      this.$emit('click', index + 1);
      if (this.glide) {
        this.glide.go(`=${index}`);
      }
    }
  }
};
</script>
<style lang="scss">
@import '~@storefront-ui/shared/styles/components/molecules/SfGallery.scss';

.corousel_indicators {
  position: relative;
  bottom: 25px;
  display: flex;
  margin: auto;

  .indili {
    width: 4px;
    height: 4px;
    background: #b3b3b3;
    margin: 2px;
    border-radius: 50%;
    list-style-type: none;
  }

  .active{
    width: 16px;
    border-radius: 36%;
    height: 3px;
    background: #F37A20;
  }
}
</style>
