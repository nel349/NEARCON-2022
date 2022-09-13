
import { gql } from 'urql';
import { apolloClient } from './index';

const getChallenge = `
query Query($request: ChallengeRequest!) {
    challenge(request: $request) {
      text
    }
  }
`

const request = {
      "address": "hey POSTMAN!!"
}

export async function fetchChallenge() {
    try {
      const returnedChallenge = await apolloClient.query(
        {
          query: gql(getChallenge),
          variables: {
            request
          },
        }
      )
      const challengeText = returnedChallenge.data.challenge.text;
      console.log("What was my challenge? " + JSON.stringify(challengeText))
    } catch (err) {
      console.log('error fetching profile...', err);
    }
}
// fetchChallenge();