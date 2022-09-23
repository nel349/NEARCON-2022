import * as React from 'react';
import { Button, Icon } from 'react-native-elements';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Profile2 from './screens/Profile';
import Profile4 from './screens/ExploreProfiles';
import {CreateProfileForm} from './screens/ExploreProfiles/CreateProfileForm';
import { MyWebComponent } from './components/WebViewComponent'
import { ConnectScreen } from './screens/initial/ConnectScreen';
import SuggestedProfileScreen from './screens/ExploreProfiles/SuggestProfileScreen';
import { Web3AuthScreen } from './screens/initial/Web3AuthScreen';

const Profile2Stack = createStackNavigator();

function Profile2StackScreen() {
  return (
    <Profile2Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Profile2Stack.Screen name="Profile" component={Profile2} />
      <Profile4Stack.Screen name="CreateProfileForm" component={CreateProfileForm} />
      <Profile4Stack.Screen name="WebViewComponent" component={MyWebComponent}
       options={{
          headerRight: () => (
            <Button
              onPress={() => alert('This is a button!')}
              title="Info"
            />
          ),
        }} />

      <Profile4Stack.Screen name="ConnectScreen" component={ConnectScreen} />
      <Profile4Stack.Screen name="Web3AuthScreen" component={Web3AuthScreen} />
    </Profile2Stack.Navigator>
  );
}

const Profile4Stack = createStackNavigator();
function Profile4StackScreen() {
  return (
    <Profile4Stack.Navigator
      screenOptions={{
        headerShown: false
      }}>
      <Profile4Stack.Screen name="Profile" component={Profile4} />
      <Profile4Stack.Screen name="SuggestedProfile" component={SuggestedProfileScreen} />
      <Profile4Stack.Screen name="CreateProfileForm" component={CreateProfileForm} />
      <Profile4Stack.Screen name="WebViewComponent" component={MyWebComponent} />
    </Profile4Stack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

const HomeIcon = (props: any) => (
  <Icon
    name="lens"
    type="material"
    size={26}
    color={props.focused ? '#adacac' : '#ededed'} tvParallaxProperties={undefined}  />
);

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator 
        initialRouteName={"Home"}
        screenOptions={{
          tabBarIcon: props => <HomeIcon tintColor={undefined} {...props}/>,
          tabBarActiveTintColor: 'blue',
          tabBarInactiveTintColor: 'gray',
          tabBarShowLabel: true,
          headerShown: true,

          tabBarLabelStyle: {
            fontSize: 12,
          },
          tabBarIconStyle: {
            width: 30,
            height: 30,
          },
          tabBarStyle: {
            // backgroundColor: 'transparent',
            justifyContent: 'center',
          },
        }}
      >
        <Tab.Screen name="Home" component={Profile2StackScreen} />
        <Tab.Screen name="Explore Profiles" component={Profile4StackScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

