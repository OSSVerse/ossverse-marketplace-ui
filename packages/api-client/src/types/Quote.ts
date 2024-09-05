export interface quoteParam {
  context: {
    // eslint-disable-next-line camelcase
    transaction_id: string;
    // eslint-disable-next-line camelcase
    bpp_id: string;
  };
  message: {
    cart: {
      items: [
        {
          id: string;
          quantity: {
            count: number;
          };
          // eslint-disable-next-line camelcase
          bpp_id: string;
          provider: {
            id: string;
            locations: string[];
          };
        }
      ];
    };
  };
}

export interface onQuoteParam {
  // eslint-disable-next-line camelcase
  messageIds: string;
}
