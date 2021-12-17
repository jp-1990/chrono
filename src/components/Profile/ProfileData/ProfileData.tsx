import React, { useState } from 'react';
import { View, StyleSheet, Image, Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import * as MediaLibrary from 'expo-media-library';

import { colors } from '../../../styles';
import { FormInputs, MainButton, Title } from '../../Common';

type FormInputState = {
  [key: string]: string;
};

const ProfileData = () => {
  const [formInputs, setFormInputs] = useState<FormInputState>({
    Username: '',
    Email: '',
  });

  const onEditImage = async () => {
    console.log('pressed');
    try {
      const permissions = await MediaLibrary.getPermissionsAsync();
      if (!permissions.granted) await MediaLibrary.requestPermissionsAsync();
      const assets = await MediaLibrary.getAssetsAsync();
      console.log(assets.assets.length);
    } catch (err) {
      console.log(err);
    }
  };

  const onSubmit = () => {
    console.log(formInputs);
  };
  return (
    <View style={styles.flex}>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Title title={'profile'} subtitle="Coming soon..." />
        </View>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={require('../../../assets/blank-profile-picture.jpg')}
          />
          <Pressable
            onPress={onEditImage}
            style={({ pressed }) => ({
              ...styles.editImageButton,
              opacity: pressed ? 0.8 : 1,
            })}
          >
            <MaterialIcons name="edit" size={30} color={colors.buttonText} />
          </Pressable>
        </View>
        <FormInputs
          inputLabels={['Username', 'Email']}
          setValues={setFormInputs}
          values={formInputs}
        />
        <MainButton
          label={'Update'}
          width="50%"
          colorBG={colors.buttonPrimary}
          colorText={colors.buttonText}
          ripple={colors.buttonPrimaryRipple}
          onPress={onSubmit}
        />
      </View>
    </View>
  );
};

export default ProfileData;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    paddingTop: 24,
    paddingBottom: 36,
    alignItems: 'center',
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 8,
  },
  imageContainer: {
    height: 200,
    width: 200,
    borderRadius: 10,
    marginTop: 15,
    marginBottom: 19,
  },
  image: {
    height: 200,
    width: 200,
    borderRadius: 10,
  },
  editImageButton: {
    position: 'absolute',
    height: 47,
    width: 47,
    backgroundColor: colors.buttonSecondary,
    bottom: 6,
    right: 6,
    borderColor: colors.buttonText,
    borderWidth: 1,
    borderRadius: 47,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flex: {
    flex: 1,
  },
});
