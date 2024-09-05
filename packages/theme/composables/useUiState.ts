import Vue from 'vue';
import VueCompositionAPI, { reactive, computed } from '@vue/composition-api';

// We need to register it again because of Vue instance instantiation issues
Vue.use(VueCompositionAPI);

const state = reactive({
  isCartSidebarOpen: false,
  isWishlistSidebarOpen: false,
  isLoginModalOpen: false,
  isCategoryGridView: true,
  isFilterSidebarOpen: false,
  isSearchOpen: false,
  searchString: '',
  IsSearchVisible: true,
  selectedLocation: {
    latitude: '',
    longitude: '',
    address: ''
  },
  clearCartPopup: false,
  enableLoadindBar: false,
  explorePageData: null
});

const useUiState = () => {
  const isCartSidebarOpen = computed(() => state.isCartSidebarOpen);
  const toggleCartSidebar = () => {
    state.isCartSidebarOpen = !state.isCartSidebarOpen;
  };

  const isWishlistSidebarOpen = computed(() => state.isWishlistSidebarOpen);
  const toggleWishlistSidebar = () => {
    state.isWishlistSidebarOpen = !state.isWishlistSidebarOpen;
  };

  const isLoginModalOpen = computed(() => state.isLoginModalOpen);
  const toggleLoginModal = () => {
    state.isLoginModalOpen = !state.isLoginModalOpen;
  };

  const isCategoryGridView = computed(() => state.isCategoryGridView);
  const changeToCategoryGridView = () => {
    state.isCategoryGridView = true;
  };
  const changeToCategoryListView = () => {
    state.isCategoryGridView = false;
  };

  const isFilterSidebarOpen = computed(() => state.isFilterSidebarOpen);
  const toggleFilterSidebar = () => {
    state.isFilterSidebarOpen = !state.isFilterSidebarOpen;
  };

  const isSearchOpen = computed(() => state.isSearchOpen);
  const toggleSearch = (value = !state.isSearchOpen) => {
    state.isSearchOpen = value;
  };

  const searchString = computed(() => state.searchString);
  const changeSearchString = (data) => {
    state.searchString = data;

  };

  const IsSearchVisible = computed(() => state.IsSearchVisible);
  const toggleSearchVisible = (value = !state.IsSearchVisible) => {
    state.IsSearchVisible = value;
  };

  const selectedLocation = computed(() => state.selectedLocation);
  const updateLocation = (location) => {
    state.selectedLocation = location;
  };

  const clearCartPopup = computed(() => state.clearCartPopup);
  const changeClearCart = (value: boolean) => {
    state.clearCartPopup = value;
  };

  const enableLoadindBar = computed(() => state.enableLoadindBar);
  const toggleLoadindBar = (value = !state.enableLoadindBar) => {
    state.enableLoadindBar = value;
  };

  const explorePageData = computed(() => state.explorePageData);
  const updateExpPageData = (data) => {
    state.explorePageData = data;
  };

  return {
    isCartSidebarOpen,
    isWishlistSidebarOpen,
    isLoginModalOpen,
    isCategoryGridView,
    isFilterSidebarOpen,
    isSearchOpen,
    searchString,
    IsSearchVisible,
    selectedLocation,
    clearCartPopup,
    enableLoadindBar,
    explorePageData,
    toggleCartSidebar,
    toggleWishlistSidebar,
    toggleLoginModal,
    changeToCategoryGridView,
    changeToCategoryListView,
    toggleFilterSidebar,
    toggleSearch,
    changeSearchString,
    toggleSearchVisible,
    updateLocation,
    changeClearCart,
    toggleLoadindBar,
    updateExpPageData
  };
};

export default useUiState;
