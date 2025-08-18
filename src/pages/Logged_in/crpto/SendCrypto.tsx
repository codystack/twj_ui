import { Wallet } from "../../../types/types.ts";

interface SendCryptoProps {
  wallets: Wallet[];
}

const SendCrypto: React.FC<SendCryptoProps> = ({ wallets }) => {
  return <div>SendCrypto {JSON.stringify(wallets)}</div>;
};

export default SendCrypto;
// Was never used in the original code so far
