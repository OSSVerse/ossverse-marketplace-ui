import { Config } from './../../types/Setup';
import * as sa from 'superagent';
import { AckResponse } from '../../types/BecknClientApi';
import { initializeOrderParam } from '../../types/initializeOrder';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default async function initiatizeOrder(
  context,
  params: initializeOrderParam,
  token
): Promise<AckResponse> {
  const config = context.config as Config;
  const client = context.client as sa.SuperAgent<sa.SuperAgentRequest>;
  return client
    .post(config.api.url + config.api.endpoints.initializeOrder)
    .set({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    })
    .send(params)
    .then((res) => {
      return res.body as AckResponse;
    });
}
