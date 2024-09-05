import { AckResponse } from '@vue-storefront/beckn-api';
import { Context, useFacetFactory, FacetSearchResult } from '@vue-storefront/core';
import { buildSearchItemsWhere } from '../helpers/internals/search';
import { FacetResultsData } from '../types';

const factoryParams = {
  search: async (context: Context, params: FacetSearchResult<FacetResultsData>): Promise<FacetResultsData> => {
    const searchParams = buildSearchItemsWhere(params.input);
    // console.log('ssssssssssssssssssssssssssssssssssssssssssssssssss', params.input, searchParams);
    const ackResponse: AckResponse = await context.$beckn.api.getProduct(searchParams);
    return {
      ackResponse
    };
  }
};

export default useFacetFactory<any>(factoryParams);
