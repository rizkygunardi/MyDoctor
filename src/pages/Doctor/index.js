import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {Gap} from '../../components/atoms';
import {
  DoctorCategory,
  HomeProfile,
  NewsItem,
  RatedDoctor,
} from '../../components/molecules';
import {colors, fonts, showError} from '../../utils';
import {Firebase} from '../../config';

const Doctor = ({navigation}) => {
  const [news, setNews] = useState([]);
  const [categoryDoctor, setCategoryDoctor] = useState([]);
  const [doctors, setDoctors] = useState([]);

  //pemanggilan data dari firebase, digunakan pada looping news item
  useEffect(() => {
    getCategoryDoctor();
    getTopRatedDoctors();
    getNews();
  }, []);

  //supaya gampang untuk dibaca jadi dibuat fungsi tersendiri
  const getTopRatedDoctors = () => {
    Firebase.database()
      .ref('doctors/')
      .orderByChild('rate')
      .limitToLast(3)
      .once('value')
      .then((res) => {
        console.log('top rated category: ', res.val());
        //coba looping, jika ada perubahan pada news
        if (res.val()) {
          const oldData = res.val();
          const data = [];
          Object.keys(oldData).map((key) => {
            data.push({
              id: key,
              data: oldData[key],
            });
          });
          //disini menyimpan perubahan dari state rated
          setDoctors(data);
        }
      })
      .catch((err) => {
        showError(err.message);
      });
  };

  //untuk merubah data objek menjadi array.
  //karena kalo langsung generate dari firebase keluarannya objek
  //berbeda dengan kita masukkan secara manual

  const getCategoryDoctor = () => {
    Firebase.database()
      .ref('category_doctor/')
      .once('value')
      .then((res) => {
        //console.log('category doctor: ', res.val());
        //coba looping, jika ada perubahan pada news
        if (res.val()) {
          //mengecek data kosong kalo ada maka akan difilter
          const data = res.val();
          const filterData = data.filter((el) => el !== null);
          setCategoryDoctor(filterData);
        }
      })
      .catch((err) => {
        showError(err.message);
      });
  };

  const getNews = () => {
    Firebase.database()
      .ref('news/')
      .once('value')
      .then((res) => {
        //coba looping, jika ada perubahan pada news
        if (res.val()) {
          const data = res.val();
          const filterData = data.filter((el) => el !== null);
          setNews(filterData);
        }
      })
      .catch((err) => {
        showError(err.message);
      });
  };
  return (
    <View style={styles.page}>
      <View style={styles.content}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.wrapperSection}>
            <Gap height={30} />
            <HomeProfile onPress={() => navigation.navigate('UserProfile')} />
            <Text style={styles.welcome}>Mau Konsultasi Apa Hari Ini?</Text>
          </View>
          <View style={styles.wrapperScroll}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.container}>
                <Gap width={32} />
                {categoryDoctor.map((item) => {
                  return (
                    <DoctorCategory
                      key={`category-${item.id}`}
                      category={item.category}
                      onPress={() => navigation.navigate('ChooseDoctor', item)}
                    />
                  );
                })}
                <Gap width={22} />
              </View>
            </ScrollView>
          </View>
          <View style={styles.wrapperSection}>
            <Text style={styles.sectionLabel}>Top Rated Doctors</Text>
            {doctors.map((doctor) => {
              return (
                <RatedDoctor
                  key={doctor.id}
                  name={doctor.data.fullName}
                  desc={doctor.data.profession}
                  avatar={{uri: doctor.data.photo}}
                  onPress={() => navigation.navigate('DoctorProfile', doctor)}
                />
              );
            })}
            <Text style={styles.sectionLabel}>Good News</Text>
          </View>
          {news.map((item) => {
            return (
              <NewsItem
                key={item.id}
                title={item.title}
                date={item.date}
                image={item.image}
              />
            );
          })}
          <Gap height={30} />
        </ScrollView>
      </View>
    </View>
  );
};

export default Doctor;

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.secondary,
    flex: 1,
  },
  content: {
    backgroundColor: colors.white,
    flex: 1,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  wrapperSection: {
    paddingHorizontal: 16,
  },
  welcome: {
    fontSize: 20,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    marginTop: 30,
    marginBottom: 16,
    maxWidth: 209,
  },
  container: {
    flexDirection: 'row',
  },
  wrapperScroll: {
    marginHorizontal: -16,
  },
  sectionLabel: {
    fontSize: 16,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    marginTop: 30,
    marginBottom: 16,
  },
});
