module.exports = {
  integrations: {
    beckn: {
      location: '@vue-storefront/beckn-api/server',
      configuration: {
        api: {
          url: 'http://65.0.184.252:9001/client',
          endpoints: {
            search: '/v1/search',
            onSearch: '/v1/on_search',
            getQuote: '/v2/get_quote',
            onGetQuote: '/v2/on_get_quote',
            initializeOrder: '/v2/initialize_order',
            onInitializeOrder: '/v2/on_initialize_order',
            confirmOrder: '/v2/confirm_order',
            onConfirmOrder: '/v2/on_confirm_order',
            cancel: '/v1/cancel',
            onCancel: '/v1/on_cancel',
            orderStatus: '/v2/order_status',
            onOrderStatus: '/v2/on_order_status',
            track: '/v2/track',
            onTrack: '/v2/on_track',
            support: '/v2/get_support',
            onSupport: '/v2/on_support',
            orderPolicy: '/v0/get_order_policy'
          }
        }
      }
    }
  }
};
