export interface DomainsInterface {
  name: string;
  level: number;
  nameservers: Array<string>;
  is_idna: boolean;
  properties: object;
  is_public: boolean;
}
