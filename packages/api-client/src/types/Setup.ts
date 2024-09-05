export interface ApiEndpoints {
  search: string
  onSearch: string
  getQuote: string,
  onGetQuote: string,
  initializeOrder: string,
  onInitializeOrder: string,
  confirmOrder: string,
  onConfirmOrder: string,
  cancel: string,
  onCancel: string,
  orderStatus: string,
  onOrderStatus: string,
  track: string,
  onTrack: string,
  support: string,
  onSupport: string,
  orderPolicy: string,
}

export interface ApiConfig {
  url: string;
  endpoints: ApiEndpoints
}

export interface Config {
  api: ApiConfig;
}
