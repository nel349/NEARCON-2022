import * as WebBrowser from "expo-web-browser";
import Web3Auth, { State } from "@web3auth/react-native-sdk";
import { LOGIN_PROVIDER, OPENLOGIN_NETWORK } from "@web3auth/react-native-sdk";
import * as Linking from 'expo-linking';
import React, { useState } from "react";
import { Alert, Button, Text } from 'react-native'
import "@ethersproject/shims"
import { ethers } from "ethers";

import Constants, { AppOwnership } from "expo-constants";
// import { Web3Auth } from "@web3auth/web3auth";
// import { CHAIN_NAMESPACESS } from "@web3auth/base";

export const web3auth = new Web3Auth(WebBrowser, {
    clientId: "BBkHBJfV0AFEzmutZVYimGb83rICaJK_0VlMVw86aigYExsNj-jtbZzvv5cV14wLWYp9y-gmp2DxWwCLsTQvbvg",
    network: OPENLOGIN_NETWORK.TESTNET,
});


export const login = async () => {
    const scheme = "myapp";
    const resolvedRedirectUrl = Linking.createURL("web3auth", { scheme: scheme });

    return await web3auth.login({
        loginProvider: LOGIN_PROVIDER.GOOGLE,
        redirectUrl: resolvedRedirectUrl,
    });
}


export const Web3AuthScreen = () => {

    const [connected, setConnected] = useState({});
    const [session, setSession] = useState<State>();

    type Network = { chainId: number, name: string }

    return (
        <>
            <Button title="Login" onPress={async () => {

                try {
                    const state = await login();
                    setSession(state);

                } catch (e) {
                    console.log('Error: ' + e);
                }
            }}></Button>
            <Button title="Get User Info" onPress={() => {
                const userInfo = session?.userInfo
                Alert.alert('Hi! ' + JSON.stringify(userInfo))
            }}></Button>

            <Button title="Get Balance" onPress={async () => {
                const network: Network = {
                    name: 'Aurora Testnet',
                    chainId: 1313161555,
                }
                const provider = new ethers.providers.JsonRpcProvider('https://testnet.aurora.dev', network)

                const signer = new ethers.Wallet(session?.privKey as string, provider);
                const address = await signer.getAddress()
                signer.getBalance(address).then((balance) => {
                    // convert a currency unit from wei to ether
                    const balanceInEth = ethers.utils.formatEther(balance)
                    console.log(`balance: ${balanceInEth} ETH`)
                })
            }}></Button>
            <Button title="Send Transaction" onPress={() => {
                const network: Network = {
                    name: 'Aurora Testnet',
                    chainId: 1313161555,
                }
                const provider = new ethers.providers.JsonRpcProvider('https://testnet.aurora.dev', network);
                const signer = new ethers.Wallet(session?.privKey as string, provider);
                const tx = {
                    to: "0x8ba1f109551bD432803012645Ac136ddd64DBA72",
                    value: ethers.utils.parseEther("1.0")
                  }
                signer.sendTransaction(tx);
            }}></Button>
            {/*<Button title="Get Chain ID" onPress={()=>{}}></Button>
            <Button title="Get Accounts" onPress={()=>{}}></Button>
            
            
            <Button title="Get Private Key" onPress={()=>{}}></Button>
            <Button title="Log Out" onPress={()=>{}}></Button> */}
        </>
    );
}






