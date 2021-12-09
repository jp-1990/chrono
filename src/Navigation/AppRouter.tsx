import React, { useState, useEffect } from 'react';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import {
  createBottomTabNavigator,
  BottomTabNavigationProp,
} from '@react-navigation/bottom-tabs';
import moment from 'moment';

import {
  Login,
  ForgottenPassword,
  SignUp,
  Dashboard,
  Timeline,
  MainStatistics,
  Reports,
  Loading,
} from '../Screens';

import { useRehydrateAuth } from '../hooks';
import { useStoreState } from '../global-store';
import { CompositeNavigationProp, RouteProp } from '@react-navigation/core';

type RouteParams = {
  id: string | undefined;
};
export type StackParams = {
  Login?: RouteParams;
  ForgottenPassword?: RouteParams;
  SignUp?: RouteParams;
  Loading?: undefined;
  App?: RouteParams;
};
export type TabParams = {
  Dashboard?: RouteParams;
  Timeline?: RouteParams;
  Statistics?: RouteParams;
  Profile?: RouteParams;
};

export type StackNavProp<T extends keyof StackParams> = CompositeNavigationProp<
  StackNavigationProp<StackParams, T>,
  BottomTabNavigationProp<TabParams>
>;
export type StackRouteProp = RouteProp<StackParams>;
export type TabRouteProp = RouteProp<TabParams>;

const Stack = createStackNavigator<StackParams>();
const Tab = createBottomTabNavigator<TabParams>();

const AppTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="Dashboard"
      screenOptions={{
        headerShown: false,
        tabBarStyle: { display: 'none' },
      }}
    >
      <Tab.Screen name="Dashboard" component={Dashboard} />
      <Tab.Screen name="Timeline" component={Timeline} />
      <Tab.Screen name="Statistics" component={Reports} />
      <Tab.Screen name="Profile" component={MainStatistics} />
    </Tab.Navigator>
  );
};

export const AppRouter = () => {
  const [rehydratingState, setRehydratingState] = useState<boolean>(true);
  const { rehydrateToken } = useRehydrateAuth();

  useEffect(() => {
    const rehydrateAsync = async () => {
      await rehydrateToken();
      setRehydratingState(false);
    };
    // rehydrate auth state
    if (rehydratingState) rehydrateAsync();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // check auth state
  const { token, tokenExpires } = useStoreState((state) => state.auth);
  const now = moment();
  const tokenNotExpired = moment(tokenExpires) > now;
  const tokenValid = token && tokenNotExpired;

  // render relevant screens based on auth state
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {rehydratingState && <Stack.Screen name="Loading" component={Loading} />}
      {!tokenValid ? (
        <>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen
            name="ForgottenPassword"
            component={ForgottenPassword}
          />
          <Stack.Screen name="SignUp" component={SignUp} />
        </>
      ) : (
        <Stack.Screen name="App" component={AppTabs} />
      )}
    </Stack.Navigator>
  );
};
