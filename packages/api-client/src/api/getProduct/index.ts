import { CustomQuery, Logger } from '@vue-storefront/core';
import { Config } from './../../types/Setup';
import * as sa from 'superagent';
// import { SearchItemsWhere } from '../../types/Search';
import { AckResponse } from '../../types/BecknClientApi';
import { Context } from '@vue-storefront/core';

/* eslint  camelcase: 0 */

// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/explicit-module-boundary-types
export default async function getProduct(context: Context, params: any, customQuery?: CustomQuery): Promise<AckResponse> {
  console.log('ssssssssssssssssssssssssssssssssssssssssssssssssss');
  const criteriaData: { [k: string]: any } = {
    delivery_location: params.locationIs
  };
  if (params.providerId) criteriaData.provider_id = params.providerId;
  if (params.itemContains) criteriaData.search_string = params.itemContains;

  const qParams = {
    context: {
      // transaction_id: "string",
      // bpp_id: "string"
    },
    message: {
      criteria: criteriaData
    }
  };
  const config = (context.config as Config);
  const client = (context.client as sa.SuperAgent<sa.SuperAgentRequest>);
  Logger.error(qParams);
  return client.post(config.api.url + config.api.endpoints.search)
    .send(qParams)
    .then(res => {
      return (res.body as AckResponse);
    }).catch(err => {
      console.log(err);

      throw new Error('Error in Api');
    });

  /* return Promise.resolve({
    data: [],
    total: 0
  });*/
}

