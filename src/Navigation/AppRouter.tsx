import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import moment from "moment";

import Login from "../Screens/Login";
import ForgottenPassword from "../Screens/ForgottenPassword";
import SignUp from "../Screens/SignUp";
import Dashboard from "../Screens/Dashboard";
import Timeline from "../Screens/Timeline";
import Reports from "../Screens/Reports";

import { useStoreState } from "../global-store";

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
};
const Stack = createStackNavigator<StackParams>();

export const AppRouter = () => {
  // check auth state
  const { token, tokenExpires } = useStoreState((state) => state.auth);
  const now = moment();
  const tokenNotExpired = moment(Number(tokenExpires)) > now;
  const tokenValid = token && tokenNotExpired;

  // render relevant screens based on auth state
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
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
        <>
          <Stack.Screen name="Dashboard" component={Dashboard} />
          <Stack.Screen name="Timeline" component={Timeline} />
          <Stack.Screen name="Reports" component={Reports} />
        </>
      )}
    </Stack.Navigator>
  );
};
