import { AckResponse } from '@vue-storefront/beckn-api';
import { Context } from '@vue-storefront/core';
import usePollerFactory from '../usePoller';

import config from '../../beckn.config.js';

const factoryParams = {
  poll: async (): Promise<any> => {
    return null;
  },

  dataHandler: (_, { newResults }) => {
    return newResults;
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  continuePolling: (_, { oldResults, newResults }) => {
    if (newResults?.error) {
      return false;
    }
    return true;
  },
  init: async (context: Context, { params }) => {
    const ackResponse: AckResponse = await context.$beckn.api.orderPolicy(params);
    if (ackResponse.error?.code) {
      throw ackResponse.error;
    }
    return ackResponse;
  },
  pollTime: () => {
    return config.timers.orderPolicy.poll;
  },
  intervalTime: () => {
    return config.timers.orderPolicy.interval;
  }

};

export default usePollerFactory(factoryParams);
