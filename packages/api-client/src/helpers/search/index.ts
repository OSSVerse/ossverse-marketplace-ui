import {
  SearchRequest,
  SearchType,
  SearchItemsWhere,
  OnSearchRequest,
  PollRequest
} from './../../types/Search';

export const buildSearchRequest = (search?: SearchItemsWhere): SearchRequest => {
  if (search) {
    return new SearchRequest(
      search.itemContains,
      SearchType.ITEM,
      search.locationIs,
      search.limit,
      search.offset
    ).toParams();
  }
};

export const buildOnSearchRequest = (pollRequest?: PollRequest) => {
  if (pollRequest) {
    return new OnSearchRequest(
      pollRequest.message_id,
      pollRequest.limit,
      pollRequest.skip
    ).toParams();
  }
};
