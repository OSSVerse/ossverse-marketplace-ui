import { apiClientFactory } from '@vue-storefront/core';
import getProduct from './api/getProduct';
import getCategory from './api/getCategory';
import onSearch from './api/onSearch';
import getQuote from './api/getQuote';
import onGetQuote from './api/onGetQuote';
import initializeOrder from './api/initializeOrder';
import onInitializeOrder from './api/onInitializeOrder';

import orderPolicy from './api/orderPolicy';

import confirmOrder from './api/confirmOrder';
import onConfirmOrder from './api/onConfirmOrder';

import { orderStatus, onOrderStatus } from './api/orderStatus';
import { track, onTrack } from './api/track';

import { support, onSupport } from './api/support';

const defaultSettings = {};
import * as request from 'superagent';

const onCreate = (settings) => ({
  config: {
    ...defaultSettings,
    ...settings
  },
  client: request
});

const { createApiClient } = apiClientFactory<any, any>({
  onCreate,
  api: {
    getProduct,
    getCategory,
    onSearch,
    getQuote,
    onGetQuote,
    initializeOrder,
    onInitializeOrder,
    confirmOrder,
    onConfirmOrder,
    orderStatus,
    onOrderStatus,
    track,
    onTrack,
    support,
    onSupport,
    orderPolicy
  }
});

export { createApiClient };
