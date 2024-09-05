<template>
  <div>
    <slot name="locationInput">
      <div class="position-relative">
        <input
          ref="locationAutocomplete"
          v-model="location"
          type="text"
          placeholder="Enter Location"
          aria-label="Select Location"
          class="
            sf-header__search
            be-search-location
            sf-search-bar
            sf-header__search
            be-search-location
          "
          v-e2e="'app-location-sidebar-input'"
        />
         <SfButton
                  class="button-pos sf-button--pure"
                  >
                  <span class="sf-search-bar__icon">
                    <SfIcon color="var(--c-text)" size="18px" icon="search" />
                  </span>
                </SfButton>
        </div>
        <ul class="location-list">
          <li v-for="(result, i) in searchResults" :key="i" @click="getLocationDetails(result)" v-e2e="'app-location-sidebar-input-options'" >
            <SfButton
              class="button-pos sf-button--pure pos-left"
            >
              <span class="sf-search-bar__icon">
                <SfIcon color="var(--c-text)" size="10px" icon="marker" />
              </span>
            </SfButton>
            {{ result.structured_formatting.main_text }}
            <p>{{ result.structured_formatting.secondary_text }} </p>
          </li>
        </ul>

    </slot>
  </div>
</template>

<script>
import { SfButton, SfIcon } from '@storefront-ui/vue';
export default {
  data: () => ({
    location: '',
    searchResults: [],
    service: null,
    geocodeService: null
  }),
  created() {
    this.service = new window.google.maps.places.AutocompleteService();
    this.geocodeService = new window.google.maps.Geocoder();
  },
  mounted() {
    this.$refs.locationAutocomplete.focus();
  },
  methods: {
    displaySuggestions (predictions, status) {
      if (status !== window.google.maps.places.PlacesServiceStatus.OK) {
        this.searchResults = [];
        return;
      }
      this.searchResults = predictions;
    },
    getLocationDetails (selectedLocation) {
      this.location = selectedLocation.description;
      this.geocodeService.geocode({placeId: selectedLocation.place_id}).then(response =>{
        this.$emit('locationSelected', response.results[0].geometry.location.lat(), response.results[0].geometry.location.lng(), selectedLocation.description);
        // eslint-disable-next-line no-alert
      }).catch(err => alert(err));
    }
  },
  watch: {
    location (newValue) {
      if (newValue) {
        this.service.getPlacePredictions({
          input: this.location,
          types: ['geocode']
        }, this.displaySuggestions);
      }
    }
  },
  name: 'LocationSearchBar',
  components: {
    SfButton,
    SfIcon
  }
};
</script>
<style lang="scss" scoped>
.button-pos {
  position: absolute;
  right: 0;
  top: 0;
}
</style>
