<template>
  <Card>
    <CardContent>
      <div class="address-bar-icon">
        <svg
          width="19"
          height="21"
          viewBox="0 0 19 21"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M17.7402 19.0747V17.0747C17.7402 16.0138 17.3188 14.9964 16.5687 14.2463C15.8185 13.4961 14.8011 13.0747 13.7402 13.0747H5.74023C4.67937 13.0747 3.66195 13.4961 2.91181 14.2463C2.16166 14.9964 1.74023 16.0138 1.74023 17.0747V19.0747M13.7402 5.07471C13.7402 7.28385 11.9494 9.07471 9.74023 9.07471C7.5311 9.07471 5.74023 7.28385 5.74023 5.07471C5.74023 2.86557 7.5311 1.07471 9.74023 1.07471C11.9494 1.07471 13.7402 2.86557 13.7402 5.07471Z"
            stroke="black"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
      <div class="address-text">{{ name }}</div>
    </CardContent>
    <div><hr class="sf-divider divider" /></div>
    <CardContent>
      <div class="address-bar-icon">
        <svg
          width="20"
          height="24"
          viewBox="0 0 20 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M19 10C19 17 10 23 10 23C10 23 1 17 1 10C1 7.61305 1.94821 5.32387 3.63604 3.63604C5.32387 1.94821 7.61305 1 10 1C12.3869 1 14.6761 1.94821 16.364 3.63604C18.0518 5.32387 19 7.61305 19 10Z"
            stroke="black"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M10 13C11.6569 13 13 11.6569 13 10C13 8.34315 11.6569 7 10 7C8.34315 7 7 8.34315 7 10C7 11.6569 8.34315 13 10 13Z"
            stroke="black"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
      <div class="address-text">
        {{ building + ' ' + address + ' ' + pincode }}
      </div>
    </CardContent>
    <div><hr class="sf-divider divider" /></div>
    <CardContent>
      <div class="address-bar-icon">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14.57 5.37109C15.5467 5.56166 16.4443 6.03935 17.148 6.74303C17.8517 7.44671 18.3294 8.34436 18.52 9.32109L14.57 5.37109ZM14.57 1.37109C16.5992 1.59653 18.4915 2.50527 19.9362 3.9481C21.3808 5.39093 22.292 7.2821 22.52 9.31109L14.57 1.37109ZM21.52 17.2911V20.2911C21.5211 20.5696 21.464 20.8453 21.3525 21.1004C21.2409 21.3556 21.0773 21.5847 20.872 21.773C20.6668 21.9612 20.4245 22.1046 20.1607 22.1938C19.8969 22.283 19.6173 22.3162 19.34 22.2911C16.2628 21.9567 13.307 20.9052 10.71 19.2211C8.29378 17.6858 6.24529 15.6373 4.70995 13.2211C3.01993 10.6123 1.9682 7.64209 1.63995 4.55109C1.61496 4.27456 1.64783 3.99585 1.73645 3.73272C1.82508 3.46958 1.96752 3.22778 2.15472 3.02271C2.34191 2.81765 2.56976 2.6538 2.82374 2.54162C3.07773 2.42943 3.35229 2.37136 3.62995 2.37109H6.62995C7.11526 2.36632 7.58574 2.53817 7.95371 2.85463C8.32168 3.17108 8.56203 3.61054 8.62995 4.09109C8.75658 5.05116 8.9914 5.99382 9.32995 6.90109C9.4645 7.25902 9.49362 7.64801 9.41386 8.02197C9.3341 8.39594 9.14882 8.7392 8.87995 9.01109L7.60995 10.2811C9.03351 12.7846 11.1064 14.8575 13.61 16.2811L14.88 15.0111C15.1518 14.7422 15.4951 14.5569 15.8691 14.4772C16.243 14.3974 16.632 14.4266 16.99 14.5611C17.8972 14.8996 18.8399 15.1345 19.8 15.2611C20.2857 15.3296 20.7294 15.5743 21.0465 15.9486C21.3636 16.3229 21.5321 16.8007 21.52 17.2911Z"
            stroke="black"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
      <div class="address-text">{{ mobile }}</div>
    </CardContent>
  </Card>
</template>

<script>
import Card from '~/components/Card.vue';
import CardContent from '~/components/CardContent.vue';
export default {
  name: 'AddressCard',
  components: {
    Card,
    CardContent
  },
  props: {
    name: {
      type: String,
      default: ''
    },
    address: {
      type: String,
      default: ''
    },
    mobile: {
      type: String,
      default: ''
    },
    building: {
      type: String,
      default: ''
    },
    pincode: {
      type: String,
      default: ''
    }
  },
  setup() {}
};
</script>

<style lang="scss" scoped>
.address-bar-icon {
  margin: 10px 10px 1px 10px;
}

.address-text {
  align-self: center;
  margin-left: 6px;
}
</style>
