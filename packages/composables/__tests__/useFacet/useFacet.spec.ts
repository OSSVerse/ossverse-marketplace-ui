// import { AgnosticFacetSearchParams } from '@vue-storefront/core';
// import useFacet from '../../src/useFacet';

// const agnosticParams: AgnosticFacetSearchParams = {
//   term: 'sofa',
//   page: 2,
//   itemsPerPage: 20
// };

// const context = {
//   $beckn: {
//     api: {
//       getProduct: jest.fn(() => ({
//         message: {
//           ack: {
//             status: 'ACK'
//           }
//         }
//       }))
//     }
//   }
// };

jest.mock('@vue-storefront/core', () => ({
  useFacetFactory: (factoryParams) => () => {
    return {
      search: factoryParams.search
    };
  }
}));

describe('[beckn-composables] useFacet', () => {

  it('should trigger get product for term', () => {
    // const { search } = useFacet() as any;
    // await search(context, {input: agnosticParams} as any);
    // expect(context.$beckn.api.getProduct).toBeCalled();
  });
});

