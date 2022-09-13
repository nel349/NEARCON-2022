import React from 'react'
import PropTypes from 'prop-types'

import contactData from '../../mocks/contact.json'

import Profile2 from './Profile'

const ProfileScreen = () => <Profile2 {...contactData} />

ProfileScreen.navigationOptions = () => ({
  header: null,
})

ProfileScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
}

export default ProfileScreen
