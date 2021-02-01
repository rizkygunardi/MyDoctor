import React, {useEffect, useState} from 'react';
import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import {
  DummyHospital1,
  DummyHospital2,
  DummyHospital3,
  ILHospitalBG,
} from '../../assets';
import {ListHospital} from '../../components';
import {Firebase} from '../../config';
import {colors, fonts, showError} from '../../utils';

const Hospitals = () => {
  const [hospi, setHospi] = useState([]);

  //pemanggilan data
  useEffect(() => {
    Firebase.database()
      .ref('hospital/')
      .once('value')
      .then((res) => {
        console.log('data: ', res.val());
        //jika ada perubahan data maka akan melooping
        if (res.val()) {
          setHospi(res.val());
        }
      })
      .catch((err) => {
        showError(err.message);
      });
  }, []);
  return (
    <View style={styles.page}>
      <ImageBackground source={ILHospitalBG} style={styles.background}>
        <Text style={styles.title}>Nearby Hospitals</Text>
        <Text style={styles.desc}>3 tersedia</Text>
      </ImageBackground>
      <View style={styles.content}>
        {hospi.map((item) => {
          return (
            <ListHospital
              type={item.type}
              title={item.title}
              image={item.image}
              address={item.address}
            />
          );
        })}
      </View>
    </View>
  );
};

export default Hospitals;

const styles = StyleSheet.create({
  page: {backgroundColor: colors.secondary, flex: 1},
  background: {
    height: 240,
    padding: 30,
  },
  title: {
    fontSize: 20,
    fontFamily: fonts.primary[600],
    color: colors.white,
    textAlign: 'center',
  },
  desc: {
    fontSize: 14,
    fontFamily: fonts.primary[300],
    color: colors.white,
    textAlign: 'center',
    marginTop: 6,
  },
  content: {
    backgroundColor: colors.white,
    borderRadius: 20,
    flex: 1,
    marginTop: -30,
    paddingTop: 16,
  },
});
