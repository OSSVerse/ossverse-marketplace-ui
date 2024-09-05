<template> </template>

<script>
export default {
  asyncData() {
    /* eslint-disable no-undef */
    $nuxt.$fire.auth.signOut();
  }
};
</script>

<style></style>
