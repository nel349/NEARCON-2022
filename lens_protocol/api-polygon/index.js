/* eslint-disable global-require */
import { createClient as createUrqlClient } from 'urql';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getProfiles, getPublications } from './queries';
import { createProfileRequest, createProfileFreeFollowRequest } from './create-profiles.ts';
import { generateRandomColor } from './utils';

export const APIURL = 'https://api-mumbai.lens.dev/'; //     ? "https://api.lens.dev": "https://api-mumbai.lens.dev/";

export const STORAGE_KEY = 'LH_STORAGE_KEY';
export const LENS_HUB_CONTRACT_ADDRESS = '0xDb46d1Dc155634FbC732f92E853b10B288AD5a1d';
export const PERIPHERY_CONTRACT_ADDRESS = '0xeff187b4190E551FC25a7fA4dFC6cf7fDeF7194f';

export const basicClient = new createUrqlClient({
  url: APIURL,
});

export const LENS_HUB_ABI = require('./lens_hub_abi/abi.json');

export async function fetchProfile(id) {
  try {
    const urqlClient = await createClient();
    const returnedProfile = await urqlClient.query(getProfiles, { id }).toPromise();
    const profileData = returnedProfile.data.profiles.items[0];
    profileData.color = generateRandomColor();
    const pubs = await urqlClient.query(getPublications, { id, limit: 50 }).toPromise();
    return {
      profile: profileData,
      publications: pubs.data.publications.items,
    };
  } catch (err) {
    console.log('error fetching profile...', err);
  }
}

export async function createProfile(handle, url) {
  try {
    const createProfileResult = await createProfileRequest({
      handle, profilePictureUri: url,
    });
    console.log('returned Profile: ', createProfileResult);
    const { txHash } = createProfileResult.data;
    return txHash;
  } catch (err) {
    console.log('error creating profile...', err);
    console.log(JSON.stringify(err, null, 2));
  }
  return null;
}

export async function createFreeFollowProfile(handle, url) {
  try {
    const createProfileResult = await createProfileFreeFollowRequest(handle, url);
    console.log('returned Profile: ', createProfileResult);
    const { txHash } = createProfileResult.data;
    return txHash;
  } catch (err) {
    console.log('error creating profile...', err);
    console.log(JSON.stringify(err, null, 2));
  }
  return null;
}

export async function createClient() {
  const storageData = await AsyncStorage.getItem(STORAGE_KEY);
  const storageDataParsed = JSON.parse(storageData);
  // console.log("storageData in createClient= ", storageData);
  // console.log("storageData in createClient PARSED= ", storageDataParsed)
  if (storageDataParsed) {
    try {
      // const { accessToken } = await refreshAuthToken();
      const { accessToken } = storageDataParsed;

      console.log('access token: in createClient', accessToken);
      const urqlClient = new createUrqlClient({
        url: APIURL,
        fetchOptions: {
          headers: {
            'x-access-token': `Bearer ${accessToken}`,
          },
        },
      });
      return urqlClient;
    } catch (err) {
      return basicClient;
    }
  } else {
    return basicClient;
  }
}

export {
  recommendProfiles,
  getProfiles,
  getDefaultProfile,
  getPublications,
  searchProfiles,
  searchPublications,
  explorePublications,
  doesFollow,
  getChallenge,
  timeline,
} from './queries';

export {
  followUser,
  authenticate,
  refresh,
  createUnfollowTypedData,
  broadcast,
  createProfileMetadataTypedData,
} from './mutations';
