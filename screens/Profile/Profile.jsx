import React, {
  useEffect,
  useState
} from 'react'
import { Button, View, SafeAreaView, FlatList, Image, Text } from 'react-native'
import PropTypes from 'prop-types'
import Posts from './Posts'
import { styles } from './style'
import { useNavigation } from '@react-navigation/native';
import { fetchDefaultProfile } from '../../lens_protocol/aurora/profiles';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Profile2(props) {
  const [userProfile, setUserProfile] = useState();
  const [connected, setConnected] = useState(false);
  // const [internetCheck, setInternetCheck] = useState(0);


  const renderContactHeader = () => {
    // console.log("id: " + id.hex);
    // console.log("coverPicture: " + coverPicture);
    return (
      <View style={styles.headerContainer}>
        <View style={styles.userRow}>
          <Image
            style={styles.userImage}
            source={{ uri: getCoverPicture() ?? "" }}
          />
          <View style={styles.userNameRow}>
            <Text style={styles.userNameText}>{getHandle() ?? ""}</Text>
          </View>
          <View style={styles.userBioRow}>
            <Text style={styles.userBioText}>{"id: " + getId()}</Text>
          </View>
        </View>
      </View>
    )
  }

  const getId = () => {
    if (userProfile !== undefined && userProfile.id !== undefined) {
      return userProfile.id.hex + ""
    }
    return ""
  }
  const getCoverPicture = () => {
    if (userProfile !== undefined && userProfile.coverPicture !== undefined &&
      userProfile.coverPicture.original !== undefined) {
      return userProfile.coverPicture.original.url
    }
    return ""
  }

  const getHandle = () => {
    if (userProfile !== undefined) {
      return userProfile.handle
    }
    return ""
  }

  useEffect(async () => {

    try {
      const storageData = await AsyncStorage.getItem('LH_STORAGE_KEY');

      if ( storageData != null){
        const {address}  = JSON.parse(storageData);
        console.log('address= ', address);

        if (address !== undefined || address != null) setConnected(true);

        const profile = await fetchDefaultProfile(address);
        // console.log('current profile = ', JSON.stringify(profile))
        setUserProfile(profile)
      } else {
        setConnected(false);
      }
    }
    catch (err) {
      setConnected(false);
    }

    try {



      // const chainId = '1313161555' // aurora testnet
      // const COVALENT_API_KEY = 'ckey_a7d90c20666d4d1dbeda3631002'
      // const url = `https://api.covalenthq.com/v1/${chainId}/address/${address}/balances_v2/\?quote-currency\=USD\&format\=JSON\&nft\=true\&no-nft-fetch\=false\&key\=${COVALENT_API_KEY}`
      // const response = await axios.get(url);

      // const { items } = response.data.data;


      // item.filter

      // const t =  items?.filter((t) => t.type === "nft")
      //   ?.filter((t) => t.supports_erc?.includes("erc721"))

      // console.log('response: covalent: ' + JSON.stringify(t))
    }
    catch (err) {
      console.log('error fetching tokens/nfts');
    }

    // console.log ('props: ' + JSON.stringify(props));

  }, [props], connected)

  Profile2.propTypes = {
    avatar: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    bio: PropTypes.string.isRequired,
    containerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
    tabContainerStyle: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.number,
    ]),
    posts: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        words: PropTypes.string.isRequired,
        sentence: PropTypes.string.isRequired,
        paragraph: PropTypes.string.isRequired,
        image: PropTypes.string,
        user: PropTypes.shape({
          name: PropTypes.string.isRequired,
          username: PropTypes.string.isRequired,
          avatar: PropTypes.string.isRequired,
          email: PropTypes.string.isRequired,
        }),
      })
    ).isRequired,
  }

  const navigation = useNavigation();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Button
        title={connected ? "Connected" : "Connect Wallet" }
        onPress={
          async () => { navigation.navigate('ConnectScreen') }
        }
        color = {connected ? 'greenyellow' : ''}
      />
      <FlatList
        ListHeaderComponent={renderContactHeader}
        ListFooterComponent={<Posts containerStyle={styles.sceneContainer} posts={props.posts} />}
      />
    </SafeAreaView>
  )
}


