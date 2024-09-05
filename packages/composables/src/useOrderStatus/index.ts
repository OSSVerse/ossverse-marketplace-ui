import { AckResponse } from '@vue-storefront/beckn-api';
import { Context } from '@vue-storefront/core';
import usePollerFactory from '../usePoller';

import config from '../../beckn.config.js';

const factoryParams = {
  poll: async (context: Context, { params, token }): Promise<any> => {
    const ackResponse: AckResponse = await context.$beckn.api.onOrderStatus(
      params,
      token
    );
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
    // if (newResults?.message?.order) {
    //   return false;
    // }
    return true;
  },
  init: async (context: Context, { params, token }) => {
    const ackResponse: AckResponse = await context.$beckn.api.orderStatus(
      params,
      token
    );
    if (ackResponse.error?.code) {
      throw ackResponse.error;
    }
    return ackResponse;
  },
  pollTime: () => {
    return config.timers.orderStatus.poll;
  },
  intervalTime: () => {
    return config.timers.orderStatus.interval;
  }
};

export default usePollerFactory(factoryParams);
