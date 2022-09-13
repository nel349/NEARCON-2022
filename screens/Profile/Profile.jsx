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


export default function Profile2 (props) {
  const [userProfile, setUserProfile] = useState();

  const renderContactHeader = () => {
    // console.log("id: " + id.hex);
    // console.log("coverPicture: " + coverPicture);
    return (
      <View style={styles.headerContainer}>
        <View style={styles.userRow}>
          <Image
            style={styles.userImage}
            source={{uri: getCoverPicture() ?? ""}}
          />
          <View style={styles.userNameRow}>
            <Text style={styles.userNameText}>{getHandle() ?? ""}</Text>
          </View>
          <View style={styles.userBioRow}>
            <Text style={styles.userBioText}>{"id: "+ getId()}</Text>
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
      userProfile.coverPicture.original !== undefined ) {
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

  useEffect( async () => {
    try {
      const profile = await fetchDefaultProfile();
      // console.log('current profile = ', JSON.stringify(profile))
      setUserProfile(profile)
    }
    catch (err) {

    }

  })

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
      <SafeAreaView style={{flex: 1}}>
        <Button
                title="Connect Wallet"
                onPress={
                    async () => { navigation.navigate('ConnectScreen') }
                }
        /> 
        <FlatList
          ListHeaderComponent={ renderContactHeader }
          ListFooterComponent={<Posts containerStyle={styles.sceneContainer} posts={props.posts} />}
        />
      </SafeAreaView>
    )
}


