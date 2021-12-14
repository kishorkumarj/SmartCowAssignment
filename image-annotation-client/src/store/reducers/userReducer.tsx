import update from 'immutability-helper';
import * as actionTypes from '../actionTypes';

const initialState = {
  username: '',
  firstName: '',
  lastName: '',
  email: '',
  loggedIn: false,
  role: ''
}

const userReducer = (state = initialState, action: any) => {
  switch(action.type){

    case actionTypes.SET_LOGIN:
      return update(state, {
        loggedIn: {$set: true},
        username: {$set: action.username},
        firstName: {$set: action.firstName},
        lastName: {$set: action.lastName},
        email: {$set: action.email},
        role: {$set: action.role},
      })
    
    case actionTypes.SET_LOGOUT:
      return update(state, {
        loggedIn: {$set: false},
        username: {$set: ''},
        firstName: {$set: ''},
        lastName: {$set: ''},
        email: {$set: ''},
        role: {$set: ''},
      })

    case actionTypes.SET_USER:
      return update(state, {
        username: {$set: action.username},
        firstName: {$set: action.firstName},
        lastName: {$set: action.lastName},
        email: {$set: action.email},
        role: {$set: action.role},
      })
  }

  return state;
}

export default userReducer;