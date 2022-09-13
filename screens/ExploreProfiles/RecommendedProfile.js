import React from 'react'
import { Dimensions, Image, View, Text, StyleSheet } from 'react-native'
import { Avatar } from 'react-native-elements'
import PropTypes from 'prop-types'

import { datetime } from '../../utils'

const styles = StyleSheet.create({
  container: {
    borderWidth: 0,
    justifyContent: 'space-between',
    marginBottom: 5,
    marginLeft: 12,
    marginRight: 12,
    marginTop: 10,
    padding: 0,
  },
  date: {
    color: 'gray',
    fontSize: 12.5,
  },
  postRow: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingBottom: 6,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 6,
    width: Dimensions.get('window').width * 1,
  },
  postImage: {
    backgroundColor: 'rgba(0, 0, 0, 0.075)',
    height: 200,
  },
  userImage: {
    marginRight: 12,
  },
  wordRow: {
    marginBottom: 10,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 6,
  },
  wordText: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 22,
  },
})

const RecommendedProfile = (profile) => {

  // console.log("profile in Post: ", profile)

  return (
    <View style={[styles.container]}>
      <View style={styles.postRow}>
        <View style={styles.userImage}>
          
        {profile.picture && profile.picture.original ?
          (<Avatar
            rounded
            size="medium"
            source={{
              uri: profile.picture.original.url ,
            }}
          />) : (
            <Avatar
            rounded
            size="medium"
            source={{
              uri: "./assets/images/placeholder_avatar.jpeg" ,
            }}
          />
          )
        } 
        </View>
        <View>
          <Text>{profile.name}</Text>
          <Text style={styles.date}>
            {profile.handle}
          </Text>
        </View>
      </View>
      {/* <View style={styles.wordRow}>
    <Text style={styles.wordText}>{sentences}</Text>
  </View> */}
      {/* {image && <Image style={styles.postImage} source={{uri: image}} />} */}
    </View>
  )
}

// Post.propTypes = {
//   containerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
//   image: PropTypes.string,
//   user: PropTypes.shape({
//     name: PropTypes.string.isRequired,
//     avatar: PropTypes.string.isRequired,
//   }).isRequired,
//   createdDate: PropTypes.string.isRequired,
//   sentences: PropTypes.string.isRequired,
// }

// Post.defaultProps = {
//   containerStyle: {},
//   image: null,
// }

export default RecommendedProfile
