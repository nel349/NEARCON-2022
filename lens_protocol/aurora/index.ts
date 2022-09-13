import { ethers } from 'ethers';
import { LENS_HUB_ABI } from '../api-polygon';
export { getSigner } from './authenticate';

export {basicClient, APIURL, apolloClient} from './client'

export const LENS_CREATE_PROFILE_CONTRACT_ADDRESS_AURORA = '0x5E10f82E63d4c3c5ce26e2258E168C148692211e'
export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';

export const lensHub = (signer: any) => new ethers.Contract(
    LENS_CREATE_PROFILE_CONTRACT_ADDRESS_AURORA,
    LENS_HUB_ABI,
    signer,
  );