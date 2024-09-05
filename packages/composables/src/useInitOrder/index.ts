import { AckResponse } from '@vue-storefront/beckn-api';
import { Context } from '@vue-storefront/core';
import usePollerFactory from '../usePoller';

import config from '../../beckn.config.js';
const factoryParams = {
  poll: async (context: Context, { params, token }): Promise<any> => {
    const ackResponse: AckResponse = await context.$beckn.api.onInitializeOrder(
      params,
      token
    );
    return ackResponse;
  },

  dataHandler: (_, { newResults }) => {
    return newResults;
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
 continuePolling: (_, { oldResults, newResults }) => {
    if (newResults.map((newResult) => newResult.message?.order)) {
      return false;
    }
    return true;
  },
  
  init: async (context: Context, { params, token }) => {
    const ackResponse: AckResponse = await context.$beckn.api.initializeOrder(
      params,
      token
    );
    return ackResponse;
  },
  pollTime: () => {
    return config.timers.initOrder.poll;
  },
  intervalTime: () => {
    return config.timers.initOrder.interval;
  }
};

export default usePollerFactory(factoryParams);
