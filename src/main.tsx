import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { 
  RainbowKitProvider, 
  getDefaultWallets,
  connectorsForWallets,
  wallet
} from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { mainnet } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import '@rainbow-me/rainbowkit/styles.css';
import App from './App.tsx';
import './index.css';

const { chains, publicClient } = configureChains(
  [mainnet],
  [publicProvider()]
);

const projectId = '3bf26c277abb57e44af9fcc2121db184';

const connectors = connectorsForWallets([
  {
    groupName: 'Installed',
    wallets: [
      wallet.metaMask({ chains, projectId }),
      wallet.coinbase({ chains, appName: '$CIGAR Protocol' }),
      wallet.brave({ chains, projectId }),
    ]
  },
  {
    groupName: 'Recommended',
    wallets: [
      wallet.walletConnect({ chains, projectId }),
      wallet.trust({ chains, projectId }),
      wallet.ledger({ chains, projectId })
    ]
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