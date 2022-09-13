/* eslint-disable react/prop-types */
// SignUp.js
import React from 'react';
import {
  View,
  Button,
  TextInput,
  StyleSheet,
} from 'react-native';
import { createFreeFollowProfile } from '../../lens_protocol/api-polygon';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {LENS_HUB_ABI} from '../../lens_protocol/api-polygon'
import { lensHub, ZERO_ADDRESS } from '../../lens_protocol/aurora';
import { BytesLike, Signer } from 'ethers';

type CreateProfileDataStruct = {
  to: string;
  handle: string;
  imageURI: string;
  followModule: string;
  followModuleInitData: BytesLike;
  followNFTURI: string;
};


export default class SignUp extends React.Component {

  onChangeText = (key: string, val: string) => {
    this.setState({ [key]: val });
  };

  signUp = async () => {
    const { username, profilePictureUri } = this.state;

    try {
      const storedData = await AsyncStorage.getItem('currentChain');
      // console.log('props', this.props);
      if (storedData) {
        const { chain } = JSON.parse(storedData)

        if (chain == 'Aurora Testnet') {
          // console.log('storedData', chain);
          const signer = this.props.route.params.signer;

          console.log('signer: ', signer);

          const address = await signer.getAddress();

          console.log('address: ', address);

          const inputStruct: CreateProfileDataStruct = {
            to: '0xe0E040ADe1B1F23BbFaa2a22235Cc692310a40Ab',
            handle: 'handle133334eeeee33',
            imageURI: 'https://ipfs.io/ipfs/QmY9dUwYu67puaWBMxRKW98LPbXCznPwHUbhX5NeWnCJbX',
            followModule: ZERO_ADDRESS,
            followModuleInitData: [],
            followNFTURI: 'https://ipfs.io/ipfs/QmTFLSXdEQ6qsSzaXaCSNtiv6wA56qq87ytXJ182dXDQJS',
          };
        
          const tx = await lensHub(signer).createProfile(inputStruct);
          console.log('default profile tx hash ', tx.hash);
        }
        else {
          const txHashProfile = await createFreeFollowProfile(username, profilePictureUri);
  
          console.log('attempting : ', username, profilePictureUri);
    
          console.log('txHashProfile: ', txHashProfile);
    
          console.log('user successfully signed up!: ', txHashProfile);
        }
      }
    } catch (err) {
      console.log('error signing up: ', err);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="handle"
          autoCapitalize="none"
          placeholderTextColor="white"
          onChangeText={(val) => this.onChangeText('username', val)}
        />
        <TextInput
          style={styles.input}
          placeholder="picture url"
          secureTextEntry={false}
          autoCapitalize="none"
          placeholderTextColor="white"
          onChangeText={(val) => this.onChangeText('profilePictureUri', val)}
        />
        <Button
          title="Create Profile"
          onPress={this.signUp}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    width: 350,
    height: 55,
    backgroundColor: '#42A5F5',
    margin: 10,
    padding: 8,
    color: 'white',
    borderRadius: 14,
    fontSize: 18,
    fontWeight: '500',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
