const initialState = {
  user: {}
};

export default function appReducer(state = initialState, action) {
  switch (action.type) {
    case 'user': {
      return { ...state, user: {...action.payload } };
    }
    case 'photoId': {
      return {...state, user: {...state.user, ...action.payload }};
    }
    default:
      return state;
  }
}