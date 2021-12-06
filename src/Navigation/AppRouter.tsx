import React, { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import moment from 'moment';

import {
  Login,
  ForgottenPassword,
  SignUp,
  Dashboard,
  Timeline,
  Reports,
  Loading,
} from '../Screens';

import { useRehydrateAuth } from '../hooks';
import { useStoreState } from '../global-store';

type RouteParams = {
  id: string;
};
export type StackParams = {
  Login?: RouteParams;
  ForgottenPassword?: RouteParams;
  SignUp?: RouteParams;
  Dashboard?: RouteParams;
  Timeline?: RouteParams;
  Reports?: RouteParams;
  Loading?: undefined;
};
const Stack = createStackNavigator<StackParams>();

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
      {!tokenValid && (
        <>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen
            name="ForgottenPassword"
            component={ForgottenPassword}
          />
          <Stack.Screen name="SignUp" component={SignUp} />
        </>
      )}
      {tokenValid && (
        <>
          <Stack.Screen name="Dashboard" component={Dashboard} />
          <Stack.Screen name="Timeline" component={Timeline} />
          <Stack.Screen name="Reports" component={Reports} />
        </>
      )}
    </Stack.Navigator>
  );
};
