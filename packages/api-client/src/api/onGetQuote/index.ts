import { Config } from './../../types/Setup';
import * as sa from 'superagent';
import { onQuoteParam } from '../../types/Quote';
import { AckResponse } from '../../types/BecknClientApi';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default async function onGetQuote(
  context,
  params: onQuoteParam,
  token: string
): Promise<AckResponse> {
  const config = context.config as Config;
  const client = context.client as sa.SuperAgent<sa.SuperAgentRequest>;
  return client
    .get(config.api.url + config.api.endpoints.onGetQuote)
    .query(params)
    .set({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    })
    .then((res) => {
      return res.body as AckResponse;
    });
}
