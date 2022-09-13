import {
    createClient,
    STORAGE_KEY, authenticate as authenticateMutation, getChallenge, getDefaultProfile,
} from '.';

import { parseJwt } from './utils';

import WalletConnectProvider from '@walletconnect/web3-provider';
import { ethers } from 'ethers';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { basicClient } from './index';

export const signIn = async (account, connector) => {
    try {
        //   setConnected(true);
        //   setUserAddress(account);
        console.log('before urqlClient');
        const urqlClient = basicClient;
        console.log('after urqlClient with address'  + JSON.stringify(urqlClient));
        const response = await urqlClient.query(getChallenge, {
            address: account,
        }).toPromise();

        console.log('HELOOW WITH ACCOUNT ', account);
        // const provider = new providers.Web3Provider(window.ethereum);

        const provider = new WalletConnectProvider({
            rpc: {
                // 1: "https://mainnet.mycustomnode.com",
                // 3: "https://ropsten.mycustomnode.com",
                // 100: "https://dai.poa.network",
                80001: 'https://polygon-mumbai.g.alchemy.com/v2/wDKjb83mAC3ok5MgMg1vWvc78NAa59zo',
            },
            chainId: 80001,
            connector,
            qrcode: false,
        });

        await provider.enable();
        const ethersProvider = new ethers.providers.Web3Provider(provider);

        const signer = ethersProvider.getSigner();
        //   setSigner(signertmp);

        //   console.log("signer: ", signer)

        const signature = await signer.signMessage(response.data.challenge.text);
        const authData = await urqlClient.mutation(authenticateMutation, {
            address: account, signature,
        }).toPromise();

        // console.log("after authData : ", authData)
        const { accessToken, refreshToken } = authData.data.authenticate;

        console.log('accessToken: ', accessToken);

        console.log('refreshToken: ', refreshToken);
        const accessTokenData = parseJwt(accessToken);
        //   getUserProfile(account);
        AsyncStorage.setItem(STORAGE_KEY, JSON.stringify({
            accessToken, refreshToken, exp: accessTokenData.exp, address: account
        }));

          return { account, signer}
    } catch (err) {
        console.log('error signIn: ', err);
    }
};


export const getUserProfile = async () => {
    const storageData = await AsyncStorage.getItem(STORAGE_KEY);
    const storageDataParsed = JSON.parse(storageData);
    // console.log("storageData in createClient= ", storageData);
    // console.log("storageData in createClient PARSED= ", storageDataParsed)
    if (storageDataParsed) {
        const { accessToken, address } = storageDataParsed;

        // console.log(` in getUserProfile= ${accessToken} and ${address} `);
        try {
            const urqlClient = await createClient();
            const response = await urqlClient.query(getDefaultProfile, {
                address,
            }).toPromise();

            // console.log('response in getUserProfile=  ', response);
            // return response.data.defaultProfile;
        } catch (err) {
            console.log('error fetching user profile...: ', err);
        }
    }
}