
import { gql } from 'urql';
import { apolloClient } from './index';

const request = {
    "ethereumAddress": "0xe0E040ADe1B1F23BbFaa2a22235Cc692310a40Ab"
};
const getDefaultProfile = `
query DefaultProfile($request: DefaultProfileRequest!) {
    defaultProfile(request: $request) {
      id
      handle
      coverPicture {
        ... on MediaSet {
          original {
            url
          }
        }
      }
    }
  }
  `
export async function fetchDefaultProfile() {
    try {
        const returnedDefaultProfile = await apolloClient.query(
            {
                query: gql(getDefaultProfile),
                variables: {
                    request
                },
            }
        )
        const response = returnedDefaultProfile.data.defaultProfile;
        //   console.log("Default Profile? " + JSON.stringify(response))
        return response;
    } catch (err) {
        console.log('error fetching profile...', err);
    }
}
fetchDefaultProfile();