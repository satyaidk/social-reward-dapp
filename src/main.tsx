import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider, http, createConfig } from 'wagmi'
import { base, mainnet, polygon } from 'viem/chains'
import { getDefaultConfig, RainbowKitProvider, lightTheme, darkTheme } from '@rainbow-me/rainbowkit'
import '@rainbow-me/rainbowkit/styles.css'
import './index.css'
import App from './App.tsx'

const queryClient = new QueryClient()

const wagmiConfig = getDefaultConfig({
	appName: 'Scan2Share',
	projectId: 'demo-scan2share',
	chains: [mainnet, polygon, base],
	ssr: false,
	transports: {
		[mainnet.id]: http(),
		[polygon.id]: http(),
		[base.id]: http(),
	},
})

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<WagmiProvider config={wagmiConfig}>
			<QueryClientProvider client={queryClient}>
				<RainbowKitProvider theme={{ lightMode: lightTheme(), darkMode: darkTheme() }}>
					<BrowserRouter>
						<App />
					</BrowserRouter>
				</RainbowKitProvider>
			</QueryClientProvider>
		</WagmiProvider>
	</React.StrictMode>,
)
