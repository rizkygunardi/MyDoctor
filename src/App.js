import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Router from './router';
import FlashMessage from 'react-native-flash-message';
import {Loading} from './components';
//setup yang dibutuhkan oleh redux adalah provider
import {Provider, useSelector} from 'react-redux';
import store from './redux/store';
import {LogBox} from 'react-native';
//fungsi provider yaitu untuk mengumpulkan semua store yang telah dibuat

const MainApp = () => {
  //pada function loading menggunakan state management
  //state management adalah useState yang digunakan secara global sehingga kita hanya perlu memanggil
  //state loading cukup 1 kali tanpa harus membuat state secara umum.
  //karena secara default useState hanya berlaku pada 1 page saja.
  //pada tahap ini menggunakan redux

  //ini pemanggilan atau implementasi state pada store
  const stateGlobal = useSelector((state) => state);
  LogBox.ignoreLogs(['Setting a timer']);

  return (
    <>
      <NavigationContainer>
        <Router />
      </NavigationContainer>
      <FlashMessage position="top" />
      {stateGlobal.loading && <Loading />}
    </>
  );
};

//membuat component baru HANYA berisi provider agar store yang digunakan akan lebih mudah/khusus
const App = () => {
  return (
    <Provider store={store}>
      <MainApp />
    </Provider>
  );
};

export default App;
