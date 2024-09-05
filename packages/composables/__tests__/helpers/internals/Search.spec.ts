// import { AgnosticFacetSearchParams } from '@vue-storefront/core';
// import { buildSearchItemsWhere } from '../../../src/helpers/internals/search';

describe('[beckn-composables] helpers/internals/search', () => {

  //   const agnosticParams: AgnosticFacetSearchParams = {
  //     term: 'sofa',
  //     page: 2,
  //     itemsPerPage: 20
  //   };

  it('should create search items where from agnostic search params', () => {
    // const searchParams = buildSearchItemsWhere(agnosticParams);
    // expect(searchParams.itemContains).toBe(agnosticParams.term);
    // expect(searchParams.limit).toBe(agnosticParams.itemsPerPage);
    // expect(searchParams.offset).toBe(agnosticParams.page * agnosticParams.itemsPerPage);
    // expect(searchParams.locationIs).toBeUndefined();
  });

  it('should return undefined when term is undefined', () => {
    // const searchParams = buildSearchItemsWhere({});
    // expect(searchParams).toBeUndefined();
  });

});
