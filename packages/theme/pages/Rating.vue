<template>
  <div class="rating-page">
    <div class="top-bar">Rating</div>
    <div class="details">
      <div v-if="!submitted">
        <div class="div-padding">
          <div class="head">Add a rating <b>ABC mart</b></div>
          <div class="stars">
            <img
              v-for="(star, index) in starArr"
              :key="index"
              :src="index < bppRating ? '/icons/yStar.svg' : '/icons/sStar.svg'"
              alt=""
              @click="bppRating = index + 1"
            />
          </div>
          <div class="input-container">
            <div class="label">Write your Review here</div>
            <textarea class="review" name="review1" rows="3"></textarea>
          </div>
        </div>
        <div class="sf-divider"></div>
        <div></div>
        <div class="div-padding">
          <div class="head">Add a rating <b>Manjunath</b></div>
          <div class="stars">
            <img
              v-for="(star, index) in starArr"
              :key="index"
              :src="
                index < deliveryBoyRating
                  ? '/icons/yStar.svg'
                  : '/icons/sStar.svg'
              "
              alt=""
              @click="deliveryBoyRating = index + 1"
            />
          </div>
          <div class="input-container">
            <div class="label">Write your Review here</div>
            <textarea class="review" name="review2" rows="3"></textarea>
          </div>
          <button
            class="sf-button color-primary"
            :class="{
              'is-disabled--button': bppRating === 0 || deliveryBoyRating === 0,
            }"
            @click="submitted = true"
            :disabled="bppRating === 0 || deliveryBoyRating === 0"
          >
            <div>Submit Review</div>
          </button>
          <button class="sf-button color-light skip" @click="goBack">
            <div>skip</div>
          </button>
        </div>
      </div>
      <div v-if="submitted" class="submitted">
        <img src="/icons/ratingSubmitted.svg" alt="" />
        <div class="head">Thank You!</div>
        <div class="sub">Have a nice day</div>
        <button class="sf-button color-primary" @click="goBack">
          <div>Go back Home</div>
        </button>
      </div>
      <div v-if="false"></div>
    </div>
  </div>
</template>
<script>
import {} from '@storefront-ui/vue';
import { ref } from '@vue/composition-api';

export default {
  middleware: 'auth',
  name: 'rating',
  components: {},
  setup(_, context) {
    const bppRating = ref(0);
    const deliveryBoyRating = ref(0);
    const starArr = Array(5);
    const submitted = ref(false);
    const goBack = () => context.root.$router.push('/');

    return {
      goBack,
      bppRating,
      deliveryBoyRating,
      starArr,
      submitted
    };
  }
};
</script>

<style lang="scss" scoped>
.rating-page {
  position: relative;
  // margin-top: 45px;
  height: calc(100vh - 45px);
  .sf-button {
    width: -webkit-fill-available;
    border-radius: 3px;
  }
  .top-bar {
    height: 60px;
    background: white;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.07);
    font-weight: 500;
    font-size: 18px;
    color: #181725;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .details {
    height: calc(100vh - 105px);
    overflow: scroll;
    .div-padding {
      padding: 0 20px;
      .head {
        font-weight: 500;
        font-size: 14px;
        padding-top: 25px;
      }
      .stars {
        display: flex;
        width: 200px;
        justify-content: space-between;
        padding: 20px 0;
      }
      .input-container {
        background: #f0f1f2;
        border-radius: 8px 8px 0px 0px;
        height: 100px;
        padding: 5px 10px;
        border-bottom: 2px solid #43464e;
        margin-bottom: 30px;
        .label {
          font-size: 12px;
        }
        .review {
          margin-top: 10px;
          width: -webkit-fill-available;
          font-size: 16px;
          background: #f0f1f2;
          border: unset;
        }
      }
      .input-container:focus-within {
        border-bottom: 2px solid #f37a20;
      }
      .skip {
        margin-top: 15px;
        color: black;
      }
    }
    .submitted {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 40px 20px;
      .head {
        font-weight: 500;
        font-size: 24px;
        margin: 25px 0;
      }
      .sub {
        color: #6c6c6e;
        font-size: 17px;
        margin-bottom: 70px;
      }
    }
  }
}
</style>
