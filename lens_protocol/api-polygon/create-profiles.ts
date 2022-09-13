import { gql, apolloClient } from './profile/apollo-client';
// this is showing you how you use it with react for example
// if your using node or something else you can import using
// @apollo/client/core!


const CREATE_PROFILE = `
mutation($request: CreateProfileRequest!) { 
  createProfile(request: $request) {
    ... on RelayerResult {
      txHash
    }
    ... on RelayError {
      reason
    }
    __typename
  }
}
`

const CREATE_FREE_FOLLOW_PROFILE =`
mutation CreateProfile ($handle: CreateHandle!, $profilePictureUri: Url!) {
  createProfile(request:{ 
                handle: $handle,
                profilePictureUri: $profilePictureUri,   
                followModule: {
                     freeFollowModule: true
                  }
                }) {
    ... on RelayerResult {
      txHash
    }
    ... on RelayError {
      reason
    }
    __typename
  }
}
`




export const createProfileRequest = async (createProfileRequest: any)  => {

  // console.log("link ", apolloClient.link.request().toString())
  return (await apolloClient()).mutate({
    mutation: gql(CREATE_PROFILE),
    variables: {
      request: createProfileRequest
    },
  });
}

// profiles created
/*
  handle1, handle2, normanlopez349, norman15, norman15666
*/

export const createProfileFreeFollowRequest = async (handle:string, profilePictureUri:string)  => {
    // console.log('attempting in createProfileFreeFollowRequest : ', createProfileRequest.handle, createProfileRequest.profilePictureUri);
  console.log("attempt in  createProfileFreeFollowRequest", handle, profilePictureUri)
  return (await apolloClient()).mutate({
    mutation: gql(CREATE_FREE_FOLLOW_PROFILE),
    variables: {
      handle: handle,
      profilePictureUri: profilePictureUri
    },
  });
}