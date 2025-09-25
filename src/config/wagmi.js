import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { mainnet, base, avalanche, sepolia, bsc } from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'Wallet Monitor',
  projectId: 'demo-project-id',
  chains: [mainnet, base, avalanche, sepolia, bsc],
  ssr: false,
});
