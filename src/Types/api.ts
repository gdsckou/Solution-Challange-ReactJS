export type GetMethod  = (endpoint: string, header: object) => any;
export type PostMethod = (endpoint: string, body: object, header: object) => any;