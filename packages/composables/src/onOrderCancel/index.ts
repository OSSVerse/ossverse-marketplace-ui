import { AckResponse } from '@vue-storefront/beckn-api';
import { Context } from '@vue-storefront/core';
import usePollerFactory from '../usePoller';

import config from '../../beckn.config.js';
const factoryParams = {
  poll: async (context: Context, { params }): Promise<any> => {
    const ackResponse: AckResponse = await context.$beckn.api.onOrderStatus(params);
    if (ackResponse.error?.code) {
      throw ackResponse.error;
    }
    return ackResponse;
  },

  dataHandler: (_, { newResults }) => {
    return newResults;
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  continuePolling: (_, { oldResults, newResults }) => {
    if (newResults?.message?.initialized) {
      return false;
    }
    return true;
  },
  init: async (context: Context, { params }) => {
    const ackResponse: AckResponse = await context.$beckn.api.orderStatus(params);
    if (ackResponse.error?.code) {
      throw ackResponse.error;
    }
    return ackResponse;
  },
  pollTime: () => {
    return config.timers.order.poll;
  },
  intervalTime: () => {
    return config.timers.order.interval;
  }

};

export default usePollerFactory(factoryParams);
