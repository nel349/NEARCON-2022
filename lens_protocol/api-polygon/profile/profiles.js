const createFreeFollowProfile = `
mutation CreateProfile 
{
    createProfile(request:{ 
                  handle: "devjoshstevens",
                  profilePictureUri: null,   
                  followModule: {
                       freeFollowModule: true
                    }
                  }) 
    {
      ... on RelayerResult 
        {
            txHash
        }
      ... on RelayError
        {
            reason
        }
      __typename
    }
}
`

const createNoFollowProfile = `
mutation CreateProfile {
    createProfile(request:{ 
                  handle: "devjoshstevens",
                  profilePictureUri: null,   
                  followModule: {
                       revertFollowModule: true
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

export {
    createFreeFollowProfile,
    createNoFollowProfile
}


