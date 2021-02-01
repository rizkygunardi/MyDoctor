import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Header, Profile, Input, Button, Gap} from '../../components';
import {colors, getData, showError, storeData} from '../../utils';
import {Firebase} from '../../config';
import {showMessage} from 'react-native-flash-message';
import {launchImageLibrary} from 'react-native-image-picker';
import {ILNullPhoto} from '../../assets';

const UpdateProfile = ({navigation}) => {
  const [profile, setProfile] = useState({
    fullName: '',
    profession: '',
    email: '',
  });

  //untuk password dipisah karena jika pada perubahan password diikutkan
  //maka passeword akan ikut berubah (kosong) jadi harus dipisahkan
  const [password, setPassword] = useState('');
  const [photo, setPhoto] = useState(ILNullPhoto);
  const [photoDB, setPhotoDB] = useState('');

  //state untuk update data lama jadi baru
  useEffect(() => {
    getData('user').then((res) => {
      const data = res;
      setPhoto({uri: res.photo});
      setProfile(data);
    });
  }, []);

  const update = () => {
    //pengecekan password karena saat edit profile tidak semua user mengganti password
    if (password.length > 0) {
      if (password.length < 6) {
        showError('Password kurang dari 6 karakter CS, tambihan deui ahh');
      } else {
        // untuk update passeword
        updatePassword();
        updateProfileData();
        navigation.replace('MainApp');
      }
    } else {
      updateProfileData();
      navigation.replace('MainApp');
    }
  };

  //function untuk proses perubahan HANYA PASSWORD
  const updatePassword = () => {
    Firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        //update password
        user.updatePassword(password).catch((err) => {
          //untuk password salah
          showError(err.message);
        });
      }
    });
  };

  //function untuk proses perubahan HANYA DATA
  const updateProfileData = () => {
    const data = profile;
    data.photo = photoDB;
    Firebase.database()
      .ref(`users/${profile.uid}/`)
      .update(data)
      .then(() => {
        //untuk simpan ke local storage
        storeData('user', data);
      })
      .catch((err) => {
        showError(err.message);
      });
  };

  //component agar bisa merubah text, dipisahkan agar bisa dipake banyakan
  const changeText = (key, value) => {
    setProfile({
      ...profile,
      [key]: value,
    });
  };

  //agar photo bisa di ganti/update
  const getImage = () => {
    launchImageLibrary(
      {includeBase64: true, quality: 0.5, maxWidth: 200, maxHeight: 200},
      (response) => {
        console.log('Response: ', response);
        if (response.didCancel || response.error) {
          showError('WADUH si cs can milih fotona euy');
        } else {
          const source = {uri: response.uri};
          setPhotoDB(`data:${response.type};base64, ${response.base64}`);
          setPhoto(source);
        }
      },
    );
  };
  return (
    <View style={styles.page}>
      <Header title="Update Profile" onPress={() => navigation.goBack()} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Profile isRemove photo={photo} onPress={getImage} />
          <Gap height={26} />
          <Input
            label="Fullname"
            value={profile.fullName}
            onChangeText={(value) => changeText('fullName', value)}
          />
          <Gap height={24} />
          <Input
            label="Pekerjaan"
            value={profile.profession}
            onChangeText={(value) => changeText('profession', value)}
          />
          <Gap height={24} />
          <Input label="Email" value={profile.email} disable />
          <Gap height={24} />
          <Input
            label="Password"
            secureTextEntry
            value={password}
            onChangeText={(value) => setPassword(value)}
          />
          <Gap height={40} />
          <Button title="Save Profile" onPress={update} />
        </View>
      </ScrollView>
    </View>
  );
};

export default UpdateProfile;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.white,
  },
  content: {
    padding: 40,
    paddingTop: 0,
  },
});
