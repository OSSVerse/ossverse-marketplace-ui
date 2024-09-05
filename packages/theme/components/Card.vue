<template>
  <div class="card">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'Card',
  props: {
    enable: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style lang="scss" scoped>
.card {
  border-radius: 10px;
  background: white;
  padding: 10px 15px;
 box-shadow: 0px 10px 40px rgba(0, 0, 0, 0.03);
 .card-content{
    font-size: 17px;
 }

}
</style>
