/* eslint-disable react/prop-types */
// SignUp.js
import React, { useState } from 'react';
import {
  View,
  Button,
  TextInput,
  StyleSheet,
  Modal,
  Alert,
  Pressable,
  Text,
  Linking
} from 'react-native';
import { createFreeFollowProfile } from '../../lens_protocol/api-polygon';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LENS_HUB_ABI } from '../../lens_protocol/api-polygon'
import { lensHub, ZERO_ADDRESS } from '../../lens_protocol/aurora';
import { BytesLike, Signer } from 'ethers';
import { modalStyles } from './styles';

type CreateProfileDataStruct = {
  to: string;
  handle: string;
  imageURI: string;
  followModule: string;
  followModuleInitData: BytesLike;
  followNFTURI: string;
};

export const CreateProfileForm = (props: { route: { params: { signer: any; }; }; }) => {

  const [modalVisible, setModalVisible] = useState(false);
  const [txHash, settxHash] = useState('');
  let handle: string;
  let imageURI: string;


  // const onChangeText = (handle: string, val: string) => {
  //   handle = val
  // };

  const signUp = async () => {

    try {
      const storedData = await AsyncStorage.getItem('currentChain');
      // console.log('props', this.props);
      if (storedData) {
        const { chain } = JSON.parse(storedData)

        if (chain == 'Aurora Testnet') {
          // console.log('storedData', chain);
          const signer = props.route.params.signer;

          // console.log('signer: ', signer);

          const address = await signer.getAddress();

          console.log('address: ', address);

          const inputStruct: CreateProfileDataStruct = {
            to: address,
            handle: handle,
            imageURI: 'https://ipfs.io/ipfs/QmY9dUwYu67puaWBMxRKW98LPbXCznPwHUbhX5NeWnCJbX',
            followModule: ZERO_ADDRESS,
            followModuleInitData: [],
            followNFTURI: 'https://ipfs.io/ipfs/QmTFLSXdEQ6qsSzaXaCSNtiv6wA56qq87ytXJ182dXDQJS',
          };



          const tx = await lensHub(signer).createProfile(inputStruct);
          console.log('default profile tx hash ', tx.hash);
          settxHash(tx.hash);
          setModalVisible(true);
        }
        else {
          const txHashProfile = await createFreeFollowProfile(handle,);

          console.log('attempting : ', handle, imageURI);

          console.log('txHashProfile: ', txHashProfile);

          console.log('user successfully signed up!: ', txHashProfile);
        }
      }
    } catch (err) {
      console.log('error signing up: ', err);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="handle"
        autoCapitalize="none"
        placeholderTextColor="white"
        onChangeText={(val) => {
          handle = val
          console.log('attempting : ', handle, imageURI);
        }}
      />
      <TextInput
        style={styles.input}
        placeholder="picture url"
        secureTextEntry={false}
        autoCapitalize="none"
        placeholderTextColor="white"
        onChangeText={(val) => { imageURI = val }}
      />
      <Button
        title="Create Profile"
        onPress={signUp}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={modalStyles.centeredView}>
          <View style={modalStyles.modalView}>
          <Text style={modalStyles.modalText}>
              Profile created successfully.
            </Text>
            <Text style={{ color: 'blue' }}
              onPress={() => {
                const linkURL = `https://testnet.aurorascan.dev/tx/${txHash}`;
                Linking.openURL(linkURL)
                }}>
              Click here for TX details.
            </Text>
            <Pressable
              style={[modalStyles.button, modalStyles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={modalStyles.textStyle}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
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
