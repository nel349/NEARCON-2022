/* eslint-disable no-console */
/* eslint-disable max-len */
/* eslint-disable consistent-return */
import { ethers, utils } from 'ethers';
import omitDeep from 'omit-deep';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { refresh as refreshMutation, CREATE_SET_DEFAULT_PROFILE_TYPED_DATA } from './mutations';
import {
  createClient, basicClient, STORAGE_KEY, LENS_HUB_CONTRACT_ADDRESS, LENS_HUB_ABI,
} from '.';

export function trimString(string, length) {
  if (!string) return null;
  return string.length < length ? string : `${string.substr(0, length - 1)}...`;
}

export function parseJwt(token) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => `%${(`00${c.charCodeAt(0).toString(16)}`).slice(-2)}`).join(''));

  return JSON.parse(jsonPayload);
}

export async function refreshAuthToken() {
  console.log('Z: ');
  const {accessToken, address} = await AsyncStorage.getItem(STORAGE_KEY);
  console.log('A: ', accessToken);
  if (!accessToken) return;

  console.log('A');
  try {
    const authData = await basicClient.mutation(refreshMutation, {
      refreshToken: token.refreshToken,
    }).toPromise();
    console.log('b');
    if (!authData.data) return;

    const { accessToken, refreshToken } = authData.data.refresh;
    const { exp } = parseJwt(refreshToken);
    console.log('C');
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify({
        accessToken, refreshToken, exp, address
      }));
    } catch (err) {
      console.log('error: AsyncStorage _ ', err);
    }

    return {
      accessToken,
    };
  } catch (err) {
    console.log('error refreshAuthToken:', err);
  }
}

// export function getSigner() {
//   const provider = new ethers.providers.Web3Provider(window.ethereum);
//   return provider.getSigner();
// }

export function signedTypeData(domain, types, value, signer) {
  // eslint-disable-next-line no-underscore-dangle
  return signer._signTypedData(
    omitDeep(domain, '__typename'),
    omitDeep(types, '__typename'),
    omitDeep(value, '__typename'),
  );
}

export function splitSignature(signature) {
  return utils.splitSignature(signature);
}

export const lensHub = (signer) => new ethers.Contract(
  LENS_HUB_CONTRACT_ADDRESS,
  LENS_HUB_ABI,
  signer,
);

export async function setDefaultProfile(signer) {
  // console.log('my signer: inside set defaultProfile', signer);

  
  // const storageData = await AsyncStorage.getItem(STORAGE_KEY);
  // const storageDataParsed = JSON.parse(storageData);

  // console.log('storageDataParsed in  setDefaultProfile: ', storageDataParsed);

  // if (storageDataParsed) {
    // const {signer} = storageDataParsed

        console.log('signer setDefaultProfile: ', signer);


    const setDefaultProfileRequest = {
      profileId: '0x443c', // handle normanlopez349
    };
    const urqlClient = await createClient();
    const result = await urqlClient.mutation(CREATE_SET_DEFAULT_PROFILE_TYPED_DATA, {
      request: setDefaultProfileRequest,
    }).toPromise();
  
    // console.log('result setDefaultProfile: ', result);
  
    const { typedData } = result.data.createSetDefaultProfileTypedData;
  
    const signature = await signedTypeData(typedData.domain, typedData.types, typedData.value, signer);
    const { v, r, s } = splitSignature(signature);
  
    const tx = await lensHub(signer).setDefaultProfileWithSig({
      profileId: typedData.value.profileId,
      wallet: typedData.value.wallet,
      sig: {
        v,
        r,
        s,
        deadline: typedData.value.deadline,
      },
    });
    console.log('default profile tx hash ', tx.hash);

  // }  
}

export function generateRandomColor() {
  const maxVal = 0xFFFFFF; // 16777215
  let randomNumber = Math.random() * maxVal;
  randomNumber = Math.floor(randomNumber);
  randomNumber = randomNumber.toString(16);
  const randColor = randomNumber.padStart(6, 0);
  return `#${randColor.toUpperCase()}`;
}

export const baseMetadata = {
  version: '1.0.0',
  image: null,
  imageMimeType: null,
  mainContentFocus: 'TEXT',
  contentWarning: null,
  location: '',
  cover_picture: '',
  attributes: [
    {
      traitType: 'string',
      key: 'type',
      value: 'post',
    },
  ],
  media: [],
  appId: 'NaderDabitLensStarter',
};
