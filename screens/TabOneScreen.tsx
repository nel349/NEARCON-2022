import React from 'react';
import { Button, StyleSheet, TouchableOpacity } from 'react-native';

import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import { useWalletConnect } from '@walletconnect/react-native-dapp';

import WalletConnectProvider from "@walletconnect/web3-provider";
import { ethers } from "ethers"
import axios from 'axios';

const shortenAddress = (address: string) => {
  return `${address.slice(0, 6)}...${address.slice(
    address.length - 4,
    address.length
  )}`;
}

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  const connector = useWalletConnect();

  const connectWallet = React.useCallback(async () => {
    return connector.connect();
  }, [connector]);

  const getProvider = async () => {
        const provider = new WalletConnectProvider({
        rpc: {
          1: "https://mainnet.mycustomnode.com",
          3: "https://ropsten.mycustomnode.com",
          100: "https://dai.poa.network",
          80001: "https://polygon-mumbai.g.alchemy.com/v2/wDKjb83mAC3ok5MgMg1vWvc78NAa59zo"
        },
        chainId: 80001,
        connector: connector,
        qrcode: false,
      })
  
    await provider.enable();
    const ethers_provider = new ethers.providers.Web3Provider(provider);
    const signer = ethers_provider.getSigner();
    const address = await signer.getAddress();
    const signer2 = ethers_provider.getSigner(address)

    console.log("signer2: ", signer2 )


    axios.post("https://q6zmovi0j9.execute-api.us-east-2.amazonaws.com/deploy", signer).then(res => {
      console.log(res);
      console.log("RES DATA: ", res.data)
    })
    .catch(error => console.log("ERROR LOG: ", error));

    // console.log("signer =", signer)

    

  }

  const killSession = React.useCallback(() => {
    return connector.killSession();
  }, [connector]);
// Draft transaction
// const tx = {
//   from: "0xbc28Ea04101F03aA7a94C1379bc3AB32E65e62d3", // Required
//   to: "0x89D24A7b4cCB1b6fAA2625Fe562bDd9A23260359", // Required (for non contract deployments)
//   data: "0x", // Required
//   gasPrice: "0x02540be400", // Optional
//   gas: "0x9c40", // Optional
//   value: "0x00", // Optional
//   nonce: "0x0114", // Optional
// };

//   connector.signTransaction(tx).then((result) => {
//       console.log(result);
//   })

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      {!connector.connected && (
        <TouchableOpacity onPress={connectWallet} style={styles.buttonStyle}>
          <Text style={styles.buttonTextStyle}>Connect a Wallet</Text>
        </TouchableOpacity>
      )}
      {!!connector.connected && (
        <>
          <Text>{shortenAddress(connector.accounts[0])}</Text>
          <TouchableOpacity onPress={killSession} style={styles.buttonStyle}>
            <Text style={styles.buttonTextStyle}>Log out</Text>
          </TouchableOpacity>

          <Button  title="get provider "onPress={getProvider}></Button>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  buttonStyle: {
    backgroundColor: "#3399FF",
    borderWidth: 0,
    color: "#FFFFFF",
    borderColor: "#3399FF",
    height: 40,
    alignItems: "center",
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 20,
  },
  buttonTextStyle: {
    color: "#FFFFFF",
    paddingVertical: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    fontWeight: "600",
  },
});
