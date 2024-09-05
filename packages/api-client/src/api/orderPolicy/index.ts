import { Config } from './../../types/Setup';
import * as sa from 'superagent';
import { AckResponse } from '../../types/BecknClientApi';
import { initializeOrderParam } from '../../types/initializeOrder';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default async function orderPolicy(context, params: initializeOrderParam): Promise<AckResponse> {
  const config = (context.config as Config);
  const client = (context.client as sa.SuperAgent<sa.SuperAgentRequest>);

  console.log('in policy');
  return client.post(config.api.url + config.api.endpoints.orderPolicy)
    .send(params)
    .then(res => {
      console.log(res);

      return (res.body as AckResponse);
    });
}

