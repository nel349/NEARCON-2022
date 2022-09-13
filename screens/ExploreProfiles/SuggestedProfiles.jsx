/* eslint-disable max-len */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-param-reassign */
/* eslint-disable prefer-destructuring */
import React, {
  useEffect,
  useState,
} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity
} from 'react-native';
import { Avatar } from 'react-native-elements'

import { generateRandomColor } from '../../lens_protocol/api-polygon/utils';
import {
  createClient, recommendProfiles, getPublications, getDefaultProfile,
} from '../../lens_protocol/api-polygon';
import PropTypes from 'prop-types';
import { flatListStyles, RecommendedProfileStyles } from './styles'
import RecommendedProfile from './RecommendedProfile';
import { useNavigation } from '@react-navigation/native';

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  headerContainer: {
    alignItems: 'center',
    backgroundColor: '#FFF',
    marginBottom: 10,
    marginTop: 45,
  },
  indicatorTab: {
    backgroundColor: 'transparent',
  },
  scroll: {
    backgroundColor: '#FFF',
  },
  sceneContainer: {
    marginTop: 10,
  },
  socialIcon: {
    marginLeft: 14,
    marginRight: 14,
  },
  socialRow: {
    flexDirection: 'row',
  },
  tabBar: {
    backgroundColor: '#EEE',
  },
  tabContainer: {
    flex: 1,
    marginBottom: 12,
  },
  tabLabelNumber: {
    color: 'gray',
    fontSize: 12.5,
    textAlign: 'center',
  },
  tabLabelText: {
    color: 'black',
    fontSize: 22.5,
    fontWeight: '600',
    textAlign: 'center',
  },
  userBioRow: {
    marginLeft: 40,
    marginRight: 40,
  },
  userBioText: {
    color: 'gray',
    fontSize: 13.5,
    textAlign: 'center',
  },
  userImage: {
    borderRadius: 60,
    height: 120,
    marginBottom: 10,
    width: 120,
  },
  userNameRow: {
    marginBottom: 10,
  },
  userNameText: {
    color: '#5B5A5A',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  userRow: {
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    marginBottom: 12,
  },
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

export default function Profile4({ avatar, name, bio, data }) {

  const [profiles, setProfiles] = useState([]);
  const navigation = useNavigation();

  Profile4.propTypes = {
    avatar: PropTypes.string,
    name: PropTypes.string,
    bio: PropTypes.string,
    data: PropTypes.any,
  }

  const getRecommendedProfiles = async () => {
    try {
      const urqlClient = await createClient();
      const response = await urqlClient.query(recommendProfiles).toPromise();
      const profileData = await Promise.all(
        response.data.recommendedProfiles.map(async (profile) => {
          const pub = await urqlClient.query(getPublications, { id: profile.id, limit: 1 })
            .toPromise();
          profile.publication = pub.data.publications.items[0];
          profile.backgroundColor = generateRandomColor();
          return profile;
        }),
      );
      setProfiles(profileData);
    } catch (err) {
      console.log('error fetching recommended profiles: ', err);
    }
  };

  useEffect(() => {
    getRecommendedProfiles();
  }, []);


  const renderItem = (profile) => {
    // console.log('render: ', profile);

    return (
      <TouchableOpacity
      // style={[styles.list, data.item.selectedClass]}      
      onPress={() => navigation.navigate('SuggestedProfile', {profile})}
      >
        <RecommendedProfile {...profile} />
      </TouchableOpacity>
    );
  }


  return (
    <SafeAreaView >
      <FlatList
        data={profiles}
        ItemSeparatorComponent={() => { return (<View style={flatListStyles.line} />) }}
        scrollEnabled={true}
        // removeClippedSubviews={false}
        // contentContainerStyle={[styles2.container, styles.sceneContainer]}

        renderItem={item => renderItem(item.item)}
      />
    </SafeAreaView>
  );
}
