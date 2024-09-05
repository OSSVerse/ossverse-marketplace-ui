<template>
  <transition name="dropdown-content">
    <div v-if="active" class="drop">
      <div class="rahul">
        <nuxt-link :to="localePath('/orders')"> My Orders </nuxt-link>
      </div>
      <div><hr class="sf-divider" /></div>
      <div class="rahul">
        <nuxt-link :to="localePath('/support')"> Support </nuxt-link>
      </div>
      <div><hr class="sf-divider" /></div>
      <div class="rahul">
        <nuxt-link v-if="isUserAuthenticated()" :to="localePath('/Logout')"
          >Logout</nuxt-link
        >
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'DropdownContent',
  inject: ['sharedState'],

  setup(props, { root }) {
    const isUserAuthenticated = () => {
      if (root.$store.$fire.auth.currentUser === null) {
        return false;
      }
      return true;
    };

    return {
      isUserAuthenticated,
    };
  },

  computed: {
    active() {
      return this.sharedState.active;
    },
  },
};
</script>

<style>
.drop {
  display: block;
  position: absolute;
  right: -6px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  width: 8rem;
  border-radius: 10px;
  margin-top: 2.1rem;
  margin-right: -0.4rem;
}
.rahul {
  padding: 10px;
}
.rahul:hover {
  background: #f37a20;
  border-radius: 5px;
  color: #ffff;
}
</style>
