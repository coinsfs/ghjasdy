import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { 
  RainbowKitProvider, 
  getDefaultWallets,
  connectorsForWallets,
} from '@rainbow-me/rainbowkit';
import {
  walletConnectWallet,
  trustWallet,
  ledgerWallet
} from '@rainbow-me/rainbowkit/wallets';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { mainnet } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import '@rainbow-me/rainbowkit/styles.css';
import App from './App.tsx';
import './index.css';

const projectId = '3bf26c277abb57e44af9fcc2121db184';

const { chains, publicClient } = configureChains(
  [mainnet],
  [publicProvider()]
);

const { wallets } = getDefaultWallets({
  appName: '$CIGAR Protocol',
  projectId,
  chains,
});

const demoWallets = [
  walletConnectWallet({ projectId, chains }),
  trustWallet({ projectId, chains }),
  ledgerWallet({ projectId, chains })
];

const connectors = connectorsForWallets([
  {
    groupName: 'Recommended',
    wallets: [...wallets, ...demoWallets]
  }
]);

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>
        <App />
      </RainbowKitProvider>
    </WagmiConfig>
  </StrictMode>
);