import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ILLogo} from '../../assets';
import {fonts} from '../../utils';
import {colors} from '../../utils/colors';
import {Firebase} from '../../config';

const Splash = ({navigation}) => {
  useEffect(() => {
    const unsubscribe = Firebase.auth().onAuthStateChanged((user) => {
      setTimeout(() => {
        if (user) {
          // jika user sudah login
          navigation.replace('MainApp');
        } else {
          // jika user belom login
          navigation.replace('GetStarted');
        }
      }, 3000);
    });

    return () => unsubscribe();
  }, [navigation]);
  return (
    <View style={styles.page}>
      <ILLogo />
      <Text style={styles.title}>My Doctor CS</Text>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.white,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    marginTop: 20,
  },
});
