export enum SearchType {
    // item, brand, offer, vendor, category
    ITEM = 'item',
    BRAND = 'brand',
    OFFER = 'offer',
    VENDOR = 'vendor',
    CATEGORY = 'category',
}

export class SearchRequest {
  constructor(
        public searchString: string,
        public searchType: SearchType,
        public location?: string,
        public limit?: number,
        public offset?: number) {}

  toParams() {
    return Object.assign({},
      this.searchString && {searchString: this.searchString},
      this.searchType && {searchType: this.searchType},
      this.location && {location: this.location},
      this.limit && {limit: this.limit},
      this.offset && {offset: this.offset}
    );

  }

}

export interface BaseSearchWhere {
    limit?: number;
    offset?: number;
    locationIs?: string
}

export interface SearchItemsWhere extends BaseSearchWhere{
    itemContains: string
}
export interface PollRequest {
  // eslint-disable-next-line camelcase
  message_id: string
  limit?: number,
  skip?: number
}
export class OnSearchRequest {
  constructor(
        // eslint-disable-next-line camelcase
        public messageId: string,
        public limit?: number,
        public skip?: number) {}

  toParams() {
    return Object.assign({},
      // eslint-disable-next-line camelcase
      this.messageId && {messageId: this.messageId},
      this.limit && {limit: this.limit},
      this.skip && {skip: this.skip}
    );
  }
}
