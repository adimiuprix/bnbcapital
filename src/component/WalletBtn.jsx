import { FaWallet } from "react-icons/fa"
import { ConnectButton } from "@rainbow-me/rainbowkit"

export default function WalletBtn(){
    return(
        <ConnectButton.Custom>
            {({ account, chain, openConnectModal, openAccountModal, authenticationStatus, mounted }) => {
                if (!mounted) return null
                const ready = mounted && authenticationStatus !== 'loading'
                const connected = ready && account && chain && (!authenticationStatus || authenticationStatus === 'authenticated')

                return (
                    <div {...(!ready && { 'aria-hidden': true, style: { opacity: 0, pointerEvents: 'none', userSelect: 'none' } })}>
                        {!connected ? (
                            <button onClick={openConnectModal} className="wallet-btn">
                                <FaWallet /> Connect Wallet
                            </button>
                        ) : (
                            <button onClick={openAccountModal} className="wallet-btn">
                                {account.displayName}
                            </button>
                        )}
                    </div>
                );
            }}
        </ConnectButton.Custom>
    )
}