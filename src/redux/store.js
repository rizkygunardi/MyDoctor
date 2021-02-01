import {createStore} from 'redux';

//const [profile, setProfile] = useState();
const initialState = {
  loading: false,
  name: 'Rizky',
  address: 'Mandala',
};

//fungsi action untuk merubah nilai pada state ini sendiri
//contoh loading tidak semua false, terkadang ada beberapa yang membutuhkan nilai true
const reducer = (state = initialState, action) => {
  if (action.type === 'SET_LOADING') {
    return {
      ...state,
      loading: action.value,
    };
  }
  return state;
};

const store = createStore(reducer);

export default store;
