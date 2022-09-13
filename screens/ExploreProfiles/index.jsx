import React from 'react'
import PropTypes from 'prop-types'

import contactData from '../../mocks/contact.json'

import Profile4 from './SuggestedProfiles'

const ProfileScreen = () => <Profile4 {...contactData} />

ProfileScreen.navigationOptions = () => ({
  header: null,
})

ProfileScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
}

export default ProfileScreen
