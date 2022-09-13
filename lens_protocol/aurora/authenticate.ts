import { ethers } from "ethers";
import WalletConnectProvider from '@walletconnect/web3-provider';

export const getSigner = async (connector: any) => {
    try {
        const provider = new WalletConnectProvider({
            rpc: {
                1313161555: 'https://testnet.aurora.dev',
            },
            chainId: 1313161555,
            connector,
            qrcode: false,
        });

        await provider.enable();
        const ethersProvider = new ethers.providers.Web3Provider(provider);
        const signer = ethersProvider.getSigner();
        return signer
    } catch (err) {
        console.log('error signIn: ', err);
    }
};