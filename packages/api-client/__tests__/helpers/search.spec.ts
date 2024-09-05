import {
  buildSearchRequest
} from './../../src/helpers/search';
import { SearchItemsWhere, SearchType } from './../../src/types/Search';

describe('[beckn-api-client] helpers/search', () => {

  const searchItemsWhere: SearchItemsWhere = {
    itemContains: 'sofa',
    locationIs: '40.741895,-73.989308'
  };

  it('should return search for items by text and location', () => {
    const expectedQuery = {
      searchString: searchItemsWhere.itemContains,
      searchType: SearchType.ITEM,
      location: searchItemsWhere.locationIs
    };
    expect(buildSearchRequest(searchItemsWhere)).toStrictEqual(expectedQuery);
  });

  it('should return undefined search when input is undefined', () => {
    expect(buildSearchRequest(undefined)).toBeUndefined;
  });

  it('should return search by item text when locationIs param is undefined', () => {
    const expectedQuery = {
      searchString: searchItemsWhere.itemContains,
      searchType: SearchType.ITEM
    };
    expect(buildSearchRequest({itemContains: searchItemsWhere.itemContains, locationIs: undefined})).toStrictEqual(expectedQuery);
  });

  it('should return search by location when itemContains param is undefined', () => {
    const expectedQuery = {
      searchType: SearchType.ITEM,
      location: searchItemsWhere.locationIs
    };
    expect(buildSearchRequest({itemContains: undefined, locationIs: searchItemsWhere.locationIs})).toStrictEqual(expectedQuery);
  });
});
