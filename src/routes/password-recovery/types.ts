export type payload_type = {
  code: string;
  password: string;
};
export type prop_type = {
  handleVerification(payload: payload_type, rest: any): void;
};
