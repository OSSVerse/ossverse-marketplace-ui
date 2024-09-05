import onSearch from '../../src/api/onSearch';

/* eslint  camelcase: 0 */

const params = {
  message_id: 'testid'
};

const resp = {
  message: {
    ack: {
      status: 'ACK'
    }
  }
};

const thenHandler = {
  then: jest.fn().mockImplementation(() => {
    return Promise.resolve(resp);
  })
};

const queryHandler = {
  query: jest.fn().mockReturnValue(thenHandler)
};

const context = {
  config: {
    locale: 'en',
    acceptLanguage: ['en', 'de'],
    currency: 'USD',
    country: 'UK',
    api: {
      url: 'host',
      endpoints: { onSearch: 'on_search' }
    }

  },
  client: {
    get: jest.fn().mockReturnValue(queryHandler)
  }
};

describe('[beckn-api-client] onSearch', () => {
  it('fetches products with messageid params', async () => {
    const data = await onSearch(context, params);
    expect(context.client.get).toBeCalled();
    expect(queryHandler.query).toBeCalled();
    expect(thenHandler.then).toBeCalled();
    expect(data).toBe(resp);

  });

});
