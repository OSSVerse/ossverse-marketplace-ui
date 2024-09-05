import { Config } from '../../types/Setup';
import * as sa from 'superagent';
import { onInitializeOrderParam } from '../../types/initializeOrder';
import { AckResponse } from '../../types/BecknClientApi';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function track(
  context: { config: Config; client: sa.SuperAgent<sa.SuperAgentRequest> },
  params: onInitializeOrderParam,
  token: string
): Promise<AckResponse> {
  const config = context.config as Config;
  const client = context.client as sa.SuperAgent<sa.SuperAgentRequest>;

  return client
    .post(config.api.url + config.api.endpoints.track)
    .send(params)
    .set({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    })
    .then((res) => {
      return res.body as AckResponse;
    });
}

export async function onTrack(
  context: { config: Config; client: sa.SuperAgent<sa.SuperAgentRequest> },
  params: onInitializeOrderParam,
  token: string
): Promise<AckResponse> {
  const config = context.config as Config;
  const client = context.client as sa.SuperAgent<sa.SuperAgentRequest>;
  return client
    .get(config.api.url + config.api.endpoints.onTrack)
    .query(params)
    .set({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    })
    .then((res) => {
      return res.body as AckResponse;
    });
}
