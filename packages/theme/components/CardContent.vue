<template>
  <div class="card-content">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'CardContent',
  props: {
    enable: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style lang="scss" scoped>
.card-content {
  padding: 10px 0px;
  display: flex;
  width: 100%;
}

</style>
