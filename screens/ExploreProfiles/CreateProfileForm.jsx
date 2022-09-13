// SignUp.js
import React from 'react';
import {
  View,
  Button,
  TextInput,
  StyleSheet,
} from 'react-native';
import { createFreeFollowProfile } from '../../lens_protocol/api-polygon';

export default class SignUp extends React.Component {

  onChangeText = (key, val) => {
    this.setState({ [key]: val });
  };

  signUp = async () => {
    const { username, profilePictureUri } = this.state;
    try {
      // const txHashProfile = await createProfile(username, profilePictureUri);

      const txHashProfile = await createFreeFollowProfile(username, profilePictureUri);

      console.log('attempting : ', username, profilePictureUri);

      console.log('txHashProfile: ', txHashProfile);

      console.log('user successfully signed up!: ', txHashProfile);
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
