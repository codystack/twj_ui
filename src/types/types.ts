// crypto related types.

interface User {
  id: string;
  sn: string;
  email: string;
  reference: string | null;
  first_name: string;
  last_name: string;
  display_name: string | null;
  created_at: string;
  updated_at: string;
}

interface Network {
  id: string;
  name: string;
  deposits_enabled: boolean;
  withdraws_enabled: boolean;
}

export interface Wallet {
  id: string;
  name: string;
  currency: string;
  balance: string;
  locked: string;
  staked: string;
  user: User;
  converted_balance: string;
  reference_currency: string;
  is_crypto: boolean;
  created_at: string;
  updated_at: string;
  blockchain_enabled: boolean;
  default_network: string;
  networks: Network[];
  deposit_address: string;
  destination_tag: string | null;
  qrCodeBase64: string | null;
}
