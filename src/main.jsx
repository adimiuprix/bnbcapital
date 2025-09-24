import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RainbowKitProvider  } from '@rainbow-me/rainbowkit'
import { config } from './config/wagmi'

import App from './App.jsx'
import '@rainbow-me/rainbowkit/styles.css'

const queryClient = new QueryClient()

const myCustomTheme = {
  blurs: {
    modalOverlay: 'blur(0px)',
  },
  colors: {
    accentColor: '#242121ff',
    accentColorForeground: '#0c6',
    actionButtonBorder: '#00da6f',
    actionButtonBorderMobile: '#00da6f',
    actionButtonSecondaryBackground: '#242121ff',
    closeButton: '#0c6',
    closeButtonBackground: '#242121ff',
    connectButtonBackground: '#242121ff',
    connectButtonBackgroundError: '#FF4D4D', // bisa tetep merah error
    connectButtonInnerBackground: '#242121ff',
    connectButtonText: '#0c6',
    connectButtonTextError: '#FFF',
    connectionIndicator: '#0EFF88',
    downloadBottomCardBackground: '#242121ff',
    downloadTopCardBackground: '#242121ff',
    error: '#FF4D4D',
    generalBorder: '#00da6f',
    generalBorderDim: '#555',
    menuItemBackground: '#242121ff',
    modalBackdrop: '#242121ff',
    modalBackground: '#242121ff',
    modalBorder: '#00da6f',
    modalText: '#0c6',
    modalTextDim: '#AAA',
    modalTextSecondary: '#CCC',
    profileAction: '#0EFF88',
    profileActionHover: '#00CC66',
    profileForeground: '#0c6',
    selectedOptionBorder: '#00da6f',
    standby: '#666',
  },
  fonts: {
    body: 'Inter, sans-serif',
  },
  radii: {
    actionButton: '20px',
    connectButton: '20px',
    menuButton: '20px',
    modal: '16px',
    modalMobile: '12px',
  },
  shadows: {
    connectButton: 'none',
    dialog: '0 8px 20px rgba(0, 0, 0, 0.3)',
    profileDetailsAction: '0 2px 4px rgba(0, 0, 0, 0.2)',
    selectedOption: '0 0 0 2px var(--border)',
    selectedWallet: '0 0 0 2px var(--border)',
    walletLogo: '0 2px 4px rgba(0,0,0,0.3)',
  },
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider theme={myCustomTheme}>
          <App />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </StrictMode>,
)
