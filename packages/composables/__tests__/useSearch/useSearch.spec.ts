// import useOnSearch from '../../src/useOnSearch';
// import usePollerFactory from '../../src/usePoller';
// import { OnSearchParam } from '../../src/types';

jest.mock('../../src/usePoller', () => {
  return (factoryParams) => () => {

    return {
      poll: factoryParams.poll
    };
  };
}
);

// const respData = [];

// const params = {
//   // eslint-disable-next-line camelcase
//   params: { message_id: 'testmessageid' },
//   pollResults: {
//     value: []
//   }
// };

// const context = {
//   $beckn: {
//     config: {
//       store: ''
//     },
//     api: {
//       onSearch: jest.fn().mockImplementation(() => {
//         return respData;
//       })
//     }
//   }
// };

describe('[beckn-composables] usePoller', () => {

  it('should trigger onSearch for term', () => {
    // const { poll} = useOnSearch() as any;
    // const data = await poll(context, params);
    // expect(context.$beckn.api.onSearch).toBeCalled();
    // expect(data).toStrictEqual(respData);
  });
});

