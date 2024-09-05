<template>
  <div>
    <div class="modal-heading">{{ headingText }}</div>
    <div><hr class="sf-divider" /></div>
    <div class="address-inputs-container">
      <SfInput
        v-e2e="'name-input'"
        :valid="!validateInput('Name')"
        :errorMessage="validateInput('Name')"
        v-model="address.name"
        :type="'text'"
        :label="'Name*'"
        :name="'Name'"
      />
      <SfInput
        v-e2e="'mobile-input'"
        :valid="!validateInput('mobile')"
        :errorMessage="validateInput('mobile')"
        v-model="address.mobile"
        :type="'number'"
        :label="'Mobile Number*'"
        pattern="[0-9]{10}"
        maxlength="10"
        autocomplete="tel"
        :name="'mobile'"
      />
      <SfInput
        v-e2e="'pin-input'"
        v-model="address.pincode"
        :type="'number'"
        :maxlength="6"
        :max="999999"
        min="0"
        pattern="[0-9]{6}"
        :label="'Pincode*'"
        :name="'Pincode'"
        :valid="!validateInput('Pincode')"
        :errorMessage="validateInput('Pincode')"
      />
      <SfInput
        v-e2e="'full-address-input'"
        :valid="!validateInput('address')"
        :errorMessage="validateInput('address')"
        v-model="address.address"
        :type="'text'"
        :label="'Complete Address*'"
        :name="'address'"
      />
      <SfInput
        v-e2e="'building-input'"
        v-model="address.building"
        :type="'text'"
        :label="'Building Name Floor*'"
        :name="'building'"
      />
      <SfInput
        v-e2e="'landmark-input'"
        v-model="address.landmark"
        :type="'text'"
        :label="'Landmark*'"
        :name="'locality'"
        @change="() => {}"
      />
      <SfButton
        v-e2e="'add-address'"
        class="address-button"
        aria-label="Close modal"
        type="button"
        @click="saveDetails"
        style="width: 100%"
        :disabled="!buttonEnable"
        >{{ buttonText }}</SfButton
      >
    </div>
  </div>
</template>

<script>
import { SfButton, SfInput } from '@storefront-ui/vue';
import { ref, computed, watch } from '@vue/composition-api';
export default {
  name: 'AddressInputs',
  components: {
    SfButton,
    SfInput
  },
  props: {
    buttonText: {
      type: String,
      default: ''
    },
    headingText: {
      type: String,
      default: ''
    },
    addressDetails: {
      type: Object,
      default: {
        name: '',
        mobile: '',
        building: '',
        landmark: '',
        address: ''
      }
    },
    buttonEnable: { type: Boolean, default: true }
  },
  setup(props, { emit }) {
    const address = ref(props.addressDetails);

    const valid = ref({
      address: false,
      pincode: false,
      mobile: false,
      name: false,
      building: false
    });

    const validateInput = (field) => {
      const re = /^[0-9\b]+$/;
      const regforSpecialCharacters = /[!@#$%^&*()_+\=\[\]{};':"\\|.<>\/?]+/;
      switch (field) {
        case 'Name':
          if (address.value.name && address.value.name.length < 4) {
            return 'Please enter a valid name';
          }
          break;
        case 'mobile':
          if (
            address.value.mobile &&
            (!re.test(address.value.mobile) ||
              address.value.mobile.length !== 10)
          ) {
            return 'Please enter a valid mobile';
          }
          break;
        case 'address':
          if (
            address.value.address &&
            regforSpecialCharacters.test(address.value.address)
          ) {
            return 'Please use valid characters';
          }
          break;
        case 'Pincode':
          if (
            address.value.pincode &&
            (!re.test(address.value.pincode) ||
              address.value.pincode.length !== 6)
          ) {
            return 'Please enter a valid pincode';
          }
          break;
        default:
          break;
      }
      return '';
    };

    const autoComplete = new window.google.maps.places.AutocompleteService();
    const geoCoder = new window.google.maps.Geocoder();
    watch(
      () => address.value.pincode,
      (newValue) => {
        if (newValue.length === 6) {
          // call google Geolocationapi
          autoComplete.getPlacePredictions(
            {
              input: newValue,
              types: ['geocode']
            },
            (predictions, status) => {
              if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                const loc = predictions[0];
                geoCoder
                  .geocode({ placeId: loc.place_id })
                  .then((response) => {
                    const adds = response.results[0].address_components;
                    console.log('address', adds);
                    const state = adds.find((v) => {
                      return v.types[0] === 'administrative_area_level_1';
                    });
                    const city = adds.find((v) => {
                      return v.types[0] === 'locality';
                    });
                    let addressString = '';
                    for (let i = 1; i < adds.length - 1; i++) {
                      addressString += adds[i].long_name + ', ';
                    }
                    let subAddressString = addressString.substring(
                      0,
                      addressString.length - 2
                    );
                    address.value.address = subAddressString;

                    // eslint-disable-next-line camelcase
                    address.value.city = city.long_name;
                    // eslint-disable-next-line camelcase
                    address.value.state = state.long_name;

                    console.log('Addres setState', address.value);
                  })
                  // eslint-disable-next-line no-alert
                  .catch((err) => alert(err));
              }
            }
          );
        }
      }
    );

    const isFieldsValid = computed(() => {
      address.value.valid =
        valid.value.address &&
        valid.value.name &&
        valid.value.mobile &&
        valid.value.pincode &&
        valid.value.building;
      return (
        valid.value.address &&
        valid.value.name &&
        valid.value.mobile &&
        valid.value.pincode &&
        valid.value.building
      );
    });

    const saveDetails = () => {
      emit('getAddress', isFieldsValid.value);
      emit('initCall');
    };

    return {
      address,
      saveDetails,
      valid,
      isFieldsValid,
      validateInput
    };
  }
};
</script>

<style lang="scss" scoped>
.card {
  border-radius: 10px;
  background: white;
  padding: 10px 28px;
  box-shadow: 0px 10px 40px 0px #00000008;
}

.address-inputs-container {
  margin: 12px 28px;
}

.modal-heading {
  margin: 20px;
  font-size: 20px;
  font-weight: 500;
}
</style>
