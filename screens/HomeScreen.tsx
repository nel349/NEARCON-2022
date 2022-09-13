import React, { useEffect, useState } from 'react';
import { Alert, Button, ImageSourcePropType, StyleSheet } from 'react-native';
import { Text, View } from '../components/Themed';
import QRCode from 'react-native-qrcode-svg';
import axios from 'axios';
import QRScanner from '../components/QRScanner';


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
});

export const HomeScreen = ({route, navigation}) =>  {

  const baseUrl = 'https://ix2jdgd57h.execute-api.us-east-2.amazonaws.com/';
  const publicAddressUrl = 'https://scezj0nqzh.execute-api.us-east-2.amazonaws.com/constructlink'
  const [qrUrl, setQrUrl] = useState('null');

  useEffect (() => {
    const source = axios.CancelToken.source();
    const url = `${baseUrl}/url`;
    const fetchUrl = async () => {
      try {
        const response = await axios.get(url, { cancelToken: source.token });

        setQrUrl(response.data.url)
        console.log(response.data);
        console.log(`url = ${qrUrl}`)
      } catch (error) {
        if(axios.isCancel(error)){
          console.log('Data fetching cancelled');
        }else{
        // Handle error
        }
      }
    };
    fetchUrl();
    return () => source.cancel("Data fetching cancelled");
  } )

  const { scannedPublicAddress } = route.params

  let logoFromFile = require('../assets/images/polygon-matic-logo.png');
  // alert(`Bar code with data ${scannedPublicAddress} has been scanned! 3`);
  return (
    <View style={styles.container}>
      <QRCode 
        size={200}
        value={qrUrl}
        logo = {logoFromFile}
        logoBackgroundColor = {"#000000"}
       />

      <Button
        title="Scan Address"
        onPress={
          () => navigation.navigate('Scanner', {name:'MARIC'})
        }
      />
      <Button
        title="Make Post"
        onPress={
          async () => getPaymentConstructedLink(scannedPublicAddress)
        }
      />
      <Text>Scanned address: {scannedPublicAddress}</Text>

      <Button
        title="Wallet Connect"
        onPress={
          () => navigation.navigate('TabOneScreen')
        }
      />
    </View>
  );
};

export const ScannerScreen = ({ route, navigation }) => {
  const {name} = route.params
  return QRScanner({navigation});
};

async function getPaymentConstructedLink(publicAddressUrl: string) {
  let payload = { targetAddress: 'address', amountEth: 2, chainId: 1};
  let res = await axios.post(publicAddressUrl, payload);
  let data = res.data;
  console.log(data);
}
