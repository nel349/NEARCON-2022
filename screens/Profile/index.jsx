import React from 'react'
import PropTypes from 'prop-types'

import contactData from '../../mocks/contact.json'

import Profile2 from './Profile'



const ProfileScreen = (props) => {
  const newprops = {props, ...contactData};
  return <Profile2 {...newprops} />
}

ProfileScreen.navigationOptions = () => ({
  header: null,
})

ProfileScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
}

export default ProfileScreen
