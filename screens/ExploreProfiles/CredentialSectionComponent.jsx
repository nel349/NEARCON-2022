import React, {useEffect, useState} from 'react';
import { Button, TouchableOpacity, Text, StyleSheet, BackHandler } from 'react-native'
import { useWalletConnect } from '@walletconnect/react-native-dapp';
import { signIn } from '../../lens_protocol/api-polygon/authenticate'
import { setDefaultProfile } from '../../lens_protocol/api-polygon/utils'
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getSigner} from '../../lens_protocol/aurora'
import { login } from '../initial/Web3AuthScreen'

const styles = StyleSheet.create({
    buttonStyle: {
      backgroundColor: '#3399FF',
      borderWidth: 0,
      color: '#FFFFFF',
      borderColor: '#3399FF',
      height: 40,
      alignItems: 'center',
      borderRadius: 30,
      marginLeft: 35,
      marginRight: 35,
      marginTop: 20,
      marginBottom: 20,
    },
    buttonTextStyle: {
      color: '#FFFFFF',
      paddingVertical: 10,
      paddingHorizontal: 15,
      fontSize: 16,
      fontWeight: '600',
    },
  });


export const CredentialSectionComponent = () => {
  const connector = useWalletConnect();
  const navigation = useNavigation();

  const connectWallet = React.useCallback(async () => {
    const session = await connector.connect();
    await AsyncStorage.setItem('LH_STORAGE_KEY', JSON.stringify({ address: session.accounts[0]}))
    
    navigation.navigate('Profile', {c:true});
    // console.log('address to save: ' + session.accounts[0])
    // console.log('address privateKey: ' + connector.approveSession)
}, [connector]);
  const killSession = React.useCallback(() => {
    connector.killSession();
    AsyncStorage.clear();
    navigation.navigate('Profile', {a:false});
}, [connector]);
  const [signer, setSigner] = useState({});

  const shortenAddress = (address) => `${address.slice(0, 6)}...${address.slice(
    address.length - 4,
    address.length,
  )}`;

    return (
        <>
            <Button
                title="Set default profile"
                onPress={() => setDefaultProfile(signer)}
            />

            <Button
                title="Create Profile"
                onPress={
                    () => navigation.navigate('CreateProfileForm', {signer: signer})
                }
            />
            <Button
                title="Set Profile Metadata"
                onPress={
                    () => { }
                }
            />

            <Button
                title="Connect to Near"
                onPress={
                    () => { navigation.navigate('WebViewComponent')}
                }
            />

            <Button
                title="Web3Auth"
                onPress={
                    () => { navigation.navigate('Web3AuthScreen')}
                }
            />   
            <Button
                title="Mint NFT Screen"
                onPress={
                    () => { navigation.navigate('MintNFTScreen')}
                }
            />   

            {
                !connector.connected && (
                    <TouchableOpacity onPress={connectWallet} style={styles.buttonStyle}>
                        <Text style={styles.buttonTextStyle}>Connect a Wallet</Text>
                    </TouchableOpacity>
                )
            }
            {
                !!connector.connected && (
                    <>
                        <Text>{shortenAddress(connector.accounts[0])}</Text>
                        <TouchableOpacity onPress={killSession} style={styles.buttonStyle}>
                            <Text style={styles.buttonTextStyle}>Disconnect Wallet</Text>
                        </TouchableOpacity>

                        <Button title="Sign in" onPress={async () => {
                            const storedData = await AsyncStorage.getItem('currentChain');
                            if (storedData){
                                const { chain } = JSON.parse(storedData)
                                if (chain == 'Aurora Testnet') {
                                    const signer = await getSigner(connector);
                                    setSigner(signer)
                                    console.log('signed Aurora with Signer: ' + await signer.getAddress())
                                }
                                else {
                                    const {signer} = await signIn(connector.accounts[0], connector)
                                    // console.log('Sign in on press ', signer)
                                    setSigner(signer)
                                }
                            }
                        }} />
                    </>
                )
            }
        </>
    )

}