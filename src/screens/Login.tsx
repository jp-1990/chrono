import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { StackParams } from '../Navigation';

import { AppTitle, AuthForm, SignUpButton } from '../Components/AuthUI';
import { TextButton, Header } from '../Components/Common';

import { useLogin } from '../hooks';

import { base, colors } from '../styles';
const { screen, contentWrapper } = base;

type LoginScreenNavigationProp = StackNavigationProp<StackParams, 'Login'>;

interface Props {
  navigation: LoginScreenNavigationProp;
}

const Login: React.FC<Props> = ({ navigation }) => {
  const [values, setValues] = useState<{ [key: string]: string }>({});
  const { login, error } = useLogin();

  const handleLogin = () => {
    login(values.Email || '', values.Password || '');
  };

  return (
    <View style={styles.screen}>
      <Header statusBar="light" />
      <ScrollView>
        <View style={styles.contentWrapper}>
          <AppTitle
            title1="chrono"
            title2="focus"
            subtitle="Optimise your time"
          />
          <View style={styles.inputContainer}>
            <AuthForm
              values={values}
              setValues={setValues}
              inputLabels={['Email', 'Password']}
              submitLabel={'Log in'}
              onSubmit={handleLogin}
              errorMessage={error}
            />
            <TextButton
              onPress={() => navigation.navigate('ForgottenPassword')}
              label="Forgotten password?"
              color={colors.textSecondary}
              ripple={colors.buttonTextRipple}
            />
          </View>
          <SignUpButton
            onPress={() => navigation.navigate('SignUp')}
            labelColor={colors.textPrimary}
            buttonColor={colors.buttonSecondary}
            ripple={colors.buttonSecondaryRipple}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  screen: screen,
  contentWrapper: contentWrapper,
  inputContainer: { alignItems: 'center', width: '100%' },
});
