const followUser = `
  mutation($request: FollowRequest!) { 
    createFollowTypedData(request: $request) {
      id
      expiresAt
      typedData {
        domain {
          name
          chainId
          version
          verifyingContract
        }
        types {
          FollowWithSig {
            name
            type
          }
        }
        value {
          nonce
          deadline
          profileIds
          datas
        }
      }
    }
  }
`;

const authenticate = `
  mutation Authenticate(
    $address: EthereumAddress!
    $signature: Signature!
  ) {
    authenticate(request: {
      address: $address,
      signature: $signature
    }) {
      accessToken
      refreshToken
    }
  }
`;

const refresh = `
  mutation Refresh(
    $refreshToken: Jwt!
  ) {
    refresh(request: {
      refreshToken: $refreshToken
    }) {
      accessToken
      refreshToken
    }
  }
`;

const broadcast = `
	mutation Broadcast($request: BroadcastRequest!) {
		broadcast(request: $request) {
			... on RelayerResult {
				txHash
			}
			... on RelayError {
				reason
			}
		}
	}
`;

/* UnfollowRequest
 * const unfollowRequestData = { profile: ProfileId! }
*/

const createUnfollowTypedData = `
  mutation($request: UnfollowRequest!) { 
    createUnfollowTypedData(request: $request) {
      id
      expiresAt
      typedData {
        domain {
          name
          chainId
          version
          verifyingContract
        }
        types {
          BurnWithSig {
            name
            type
          }
        }
        value {
          nonce
          deadline
          tokenId
        }
      }
    }
 }
`;

const createProfileMetadataTypedData = `
  mutation CreateSetProfileMetadataTypedData(
    $profileId: ProfileId!, $metadata: Url!
  ) 
  {
    createSetProfileMetadataTypedData(request: { profileId: $profileId, metadata: $metadata }) 
    {
      id
      expiresAt
      typedData {
        types {
          SetProfileMetadataURIWithSig {
            name
            type
          }
        }
        domain {
          name
          chainId
          version
          verifyingContract
        }
        value {
          nonce
          deadline
          profileId
          metadata
        }
      }
    }
  }
`;
const CREATE_SET_DEFAULT_PROFILE_TYPED_DATA = `
  mutation($request: CreateSetDefaultProfileRequest!) { 
    createSetDefaultProfileTypedData(request: $request) {
      id
      expiresAt
      typedData {
        types {
          SetDefaultProfileWithSig {
            name
            type
          }
        }
        domain {
          name
          chainId
          version
          verifyingContract
        }
        value {
          nonce
          deadline
          wallet
          profileId
        }
      }
    }
 }
 `;

export {
  followUser,
  authenticate,
  refresh,
  createUnfollowTypedData,
  broadcast,
  createProfileMetadataTypedData,
  CREATE_SET_DEFAULT_PROFILE_TYPED_DATA,
};
