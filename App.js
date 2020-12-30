import * as React from 'react';
import { Button, View,Image } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import WorldStatistics from './components/WorldStatistics';
import CountryStatistics from './components/CountryStatistics';
import FavouriteCountries from './components/FavouriteCountries';

const Drawer = createDrawerNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="World Statistics"
        screenOptions={{
          headerShown: true,
        }}>
        <Drawer.Screen name="World Statistics" component={WorldStatistics} />
        <Drawer.Screen
          name="Country Statistics"
          component={CountryStatistics}
        />
        <Drawer.Screen
          name="Favourite Countries"
          component={FavouriteCountries}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  )
}
