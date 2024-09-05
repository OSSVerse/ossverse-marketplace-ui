import { Config } from './../../types/Setup';
import * as sa from 'superagent';
import { onInitializeOrderParam } from '../../types/initializeOrder';
import { AckResponse } from '../../types/BecknClientApi';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default async function onInitializeOrder(
  context,
  params: onInitializeOrderParam,
  token: string
): Promise<AckResponse> {
  const config = context.config as Config;
  const client = context.client as sa.SuperAgent<sa.SuperAgentRequest>;
  return client
    .get(config.api.url + config.api.endpoints.onInitializeOrder)
    .set({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    })
    .query(params)
    .then((res) => {
      return res.body as AckResponse;
    });
}
