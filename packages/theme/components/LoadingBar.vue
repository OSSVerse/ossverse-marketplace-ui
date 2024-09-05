<template>
  <div v-show="enable" class="progress">
    <span class="progress-bar"></span>
  </div>
</template>

<script>

export default {
  name: 'LoadingBar',
  props: {
    enable: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style lang="scss" scoped>
* {
  box-sizing: border-box;
}

body {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: white;
}

.progress {
  width: 100%;
  height: 5px;
  background: #e1e4e8;
  overflow: hidden;
}

.progress-bar {
  display: block;
  height: 100%;
  background: linear-gradient(
    90deg,
    #f37a20 17.41%,
    #616161 53.73%,
    #f37a20 70%
  );
  background-size: 500% 100%;
  animation: progress-animation 2s linear infinite;
}

@keyframes progress-animation {
  0% {
    background-position: 100%;
  }

  100% {
    background-position: 0;
  }
}
</style>
