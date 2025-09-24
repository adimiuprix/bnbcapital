import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { mainnet, base, avalanche } from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'Wallet Monitor',
  projectId: 'demo-project-id',
  chains: [mainnet, base, avalanche],
  ssr: false,
});