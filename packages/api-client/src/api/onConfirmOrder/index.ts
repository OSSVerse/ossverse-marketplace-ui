import { Config } from './../../types/Setup';
import * as sa from 'superagent';
import { AckResponse } from '../../types/BecknClientApi';
import { Context } from '@vue-storefront/core';

export default async function onConfirmOrder(
  context: Context,
  params: Record<string, unknown>,
  token: string
): Promise<AckResponse> {
  const config = context.config as Config;
  const client = context.client as sa.SuperAgent<sa.SuperAgentRequest>;
  return client
    .get(config.api.url + config.api.endpoints.onConfirmOrder)
    .set({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    })
    .query(params)
    .then((res) => {
      return res.body as AckResponse;
    });
}
