import { AckResponse } from '@vue-storefront/beckn-api';
import { Context } from '@vue-storefront/core';
import usePollerFactory from '../usePoller';

import config from '../../beckn.config.js';
import { buildSearchItemsWhere } from '../helpers/internals/search';

const factoryParams = {
  poll: async (context: Context, params): Promise<any> => {
    params = params.params;
    const ackResponse: AckResponse = await context.$beckn.api.onSearch(params);
    if (ackResponse?.error) {
      throw new Error('Error in Api');
    }
    // const ackResponse: AckResponse = await context.$beckn.api.onSearch(params);
    if (ackResponse.error?.code) {
      throw ackResponse.error;
    }
    return ackResponse;
  },

  dataHandler: (_, { oldResults, newResults }) => {
    const catalogs = newResults.message?.catalogs ?? null;
    if (oldResults === null) {
      oldResults = [];
    }
    if (catalogs) {
      const oldCodes = oldResults.map((obj) => {
        return obj.bpp_descriptor ? obj.bpp_descriptor.name : null;
      });
      const data = catalogs.filter((bpp) => {
        if (bpp.bpp_descriptor) {
          return !oldCodes.includes(bpp.bpp_descriptor.name);
        }
        return null;
      });
      return [...oldResults, ...data];
    }
    return oldResults;
  },

  continuePolling: () => {
    return true;
  },
  init: async (context: Context, { params }) => {
    const searchParams = buildSearchItemsWhere(params.input);
    const ackResponse: AckResponse = await context.$beckn.api.getProduct(
      searchParams
    );
    return {
      ackResponse
    };
  },
  pollTime: () => {
    return config.timers.search.poll;
  },
  intervalTime: () => {
    return config.timers.search.interval;
  }
};

export default usePollerFactory(factoryParams);
