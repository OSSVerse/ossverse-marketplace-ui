/* eslint-disable camelcase */
export interface BecknContext{
    domain: string,
    country: string,
    city: string,
    action: string,
    core_version: string,
    bap_id: string,
    bap_uri: string,
    bpp_id: string,
    bpp_uri: string,
    transaction_id: string,
    message_id: string
}

export enum AckStatusType {
    ACK = 'ACK',
    NACK = 'NACK'
}

export interface Ack{
    status: AckStatusType
}

export interface AckMessage {
    ack: Ack
}

export interface Error {
    code: string,
    message: string
}
export interface AckResponse {
    context: BecknContext
    message: AckMessage
    error: Error
}

