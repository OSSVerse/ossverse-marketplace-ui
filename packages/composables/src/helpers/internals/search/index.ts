// import { AgnosticFacetSearchParams } from '@vue-storefront/core';
// import { SearchItemsWhere } from '@vue-storefront/beckn-api';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const buildSearchItemsWhere = (params) => {
  const paramsObj: { [k: string]: any } = {
    locationIs: params.locationIs,
    offset: params.page * params.itemsPerPage,
    limit: params.itemsPerPage
  };
  const { searchBy } = params;
  if (searchBy) {
    if (searchBy === 'search-by-all') {
      paramsObj.itemContains = params.term;
    } else if (searchBy === 'search-by-seller') {
      // eslint-disable-next-line camelcase
      paramsObj.provider_name = params.term;
    } else if (searchBy === 'search-by-category') {
      // eslint-disable-next-line camelcase
      paramsObj.category_name = params.term;
    }
  } else if (params.term) {
    paramsObj.itemContains = params.term;
  }

  if (params.providerId) paramsObj.providerId = params.providerId;
  return paramsObj;
};

