<template>
  <div>
    <div class="top-bar">
      <div @click="goBack" class="sf-chevron--left sf-chevron icon_back">
        <span class="sf-search-bar__icon">
          <SfIcon color="var(--c-primary)" size="20px" icon="chevron_left" />
        </span>
      </div>
      <div class="header-push">Sign in</div>
    </div>
    <div class="open-search">
      <h3>
        Open <br />
        Commerce
      </h3>
      <h4>for All</h4>
      <div class="socialMedia-login-container">
        <div>
          <SfButton
            class="google-button"
            aria-label="Google login"
            type="button"
            @click="googleLogin"
            ><span class="span-text">
              <!-- TO DO :- to rearrange these icons after having a discussion with the designer -->
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 21 21"
                width="21px"
                height="21px"
              >
                <g id="surface8408064">
                  <path
                    style="
                      stroke: none;
                      fill-rule: nonzero;
                      fill: rgb(100%, 100%, 100%);
                      fill-opacity: 1;
                    "
                    d="M 10.917969 20.160156 C 5.589844 20.160156 1.257812 15.828125 1.257812 10.5 C 1.257812 5.171875 5.589844 0.839844 10.917969 0.839844 C 13.332031 0.839844 15.640625 1.734375 17.425781 3.359375 L 17.75 3.65625 L 14.5625 6.839844 L 14.269531 6.589844 C 13.332031 5.789062 12.144531 5.347656 10.917969 5.347656 C 8.078125 5.347656 5.761719 7.660156 5.761719 10.5 C 5.761719 13.339844 8.078125 15.652344 10.917969 15.652344 C 12.96875 15.652344 14.585938 14.605469 15.351562 12.824219 L 10.5 12.824219 L 10.5 8.472656 L 19.96875 8.488281 L 20.039062 8.820312 C 20.535156 11.164062 20.136719 14.613281 18.136719 17.082031 C 16.480469 19.125 14.050781 20.160156 10.917969 20.160156 Z M 10.917969 20.160156 "
                  />
                </g></svg></span
            ><span class="social-span-content"
              >Sign in with Google</span
            ></SfButton
          >
        </div>
        <div>
          <SfButton
            class="facebook-button"
            aria-label="facebook login"
            type="button"
            @click="facebookLogin"
          >
            <span class="span-text">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 21 21"
                width="21px"
                height="21px"
              >
                <g id="surface8413142">
                  <path
                    style="
                      stroke: none;
                      fill-rule: nonzero;
                      fill: rgb(100%, 100%, 100%);
                      fill-opacity: 1;
                    "
                    d="M 10.5 1.261719 C 5.398438 1.261719 1.261719 5.398438 1.261719 10.5 C 1.261719 15.132812 4.671875 18.957031 9.117188 19.625 L 9.117188 12.949219 L 6.832031 12.949219 L 6.832031 10.519531 L 9.117188 10.519531 L 9.117188 8.902344 C 9.117188 6.226562 10.421875 5.054688 12.648438 5.054688 C 13.710938 5.054688 14.273438 5.132812 14.542969 5.167969 L 14.542969 7.289062 L 13.023438 7.289062 C 12.082031 7.289062 11.75 8.183594 11.75 9.191406 L 11.75 10.519531 L 14.519531 10.519531 L 14.140625 12.949219 L 11.75 12.949219 L 11.75 19.644531 C 16.261719 19.035156 19.738281 15.175781 19.738281 10.5 C 19.738281 5.398438 15.601562 1.261719 10.5 1.261719 Z M 10.5 1.261719 "
                  />
                </g></svg></span
            ><span class="social-span-content"
              >Sign in with Facebook
            </span></SfButton
          >
        </div>
      </div>
    </div>
    <div></div>
  </div>
</template>

<script>
import { SfButton, SfIcon } from '@storefront-ui/vue';
// import {state} from '../store/index.js'

export default {
  middleware: 'auth',
  name: 'Login',
  components: {
    SfIcon,
    SfButton
  },
  setup(_, context) {
    const goBack = () => context.root.$router.back();
    return {
      goBack
    };
  },
  methods: {
    facebookLogin() {
      /* eslint-disable no-undef */

      const provider = new $nuxt.$fireModule.auth.FacebookAuthProvider();
      provider.addScope('email');
      this.$fire.auth
        .signInWithPopup(provider)
        .catch((error) => {
          this.snackbarText = error.message;
          this.snackbar = true;
        })
        .then(() => {
          // we are signed in
          $nuxt.$router.push('/');
        });
    },
    googleLogin() {
      /* eslint-disable no-undef */
      const provider = new $nuxt.$fireModule.auth.GoogleAuthProvider();
      provider.addScope('email');
      this.$fire.auth
        .signInWithPopup(provider)
        .catch((error) => {
          this.snackbarText = error.message;
          this.snackbar = true;
        })
        .then(() => {
          // we are signed in
          // console.log("STATE1",state)
          $nuxt.$router.push('/');
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.top-bar {
  align-items: center;
  display: flex;
  font-size: 18px;
  justify-content: space-around;
  height: 60px;
  font-weight: 500;
  background: white;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.07);
  .icon_back {
    position: absolute;
    left: 0;
    margin: 10px;
  }
}

.open-search {
  @media (min-width: 560px) {
    padding-top: 40px;
    width: 50%;
    margin: auto;
  }
  padding: 40px 28px;
  h3 {
    font-size: 40px;
    font-weight: 800;
    color: #f37a20;
    line-height: 45px;
  }
  h4 {
    font-size: 27px;
    font-weight: 800;
    line-height: 30px;
  }
  .socialMedia-login-container {
    padding-top: 41px;
  }
  .span-text {
    padding-right: 225px;
  }

  .social-span-content {
    position: absolute;
  }
  .google-button {
    width: 300px;
    text-transform: capitalize;
    border-radius: 6px;
    background: #5383ec;
  }
  .facebook-button {
    width: 300px;
    margin-top: 30px;
    text-transform: capitalize;
    border-radius: 6px;
    background: #4a66ac;
  }
}
</style>
