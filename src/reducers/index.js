import {combineReducers} from 'redux';
import {NavigationActions} from 'react-navigation';

import {AppNavigator} from '../navigators/AppNavigator';

import createUser from './create-user';
import userInfo from './user-info';

const firstAction = AppNavigator.router.getActionForPathAndParams('Loading');
const initialNavState = AppNavigator.router.getStateForAction(firstAction);

function nav(state = initialNavState, action) {
    let nextState;
    switch (action.type) {

        case 'FirstBack':
            state['exit'] = 1;
            break;

        case 'Register':
            nextState = AppNavigator.router.getStateForAction(
                NavigationActions.navigate({routeName: 'Register'}),
                state
            );
            break;

        case 'Login':
            nextState = AppNavigator.router.getStateForAction(
                NavigationActions.navigate({routeName: 'App'}),
                state
            );
            break;

        case 'Logout':
            state['exit'] = 1;
            nextState = AppNavigator.router.getStateForAction(
                NavigationActions.navigate({routeName: 'Login'}),
                state
            );
            break;
        default:
            if (action.type === 'Navigation/NAVIGATE') {
                state['exit'] = undefined;
            }
            nextState = AppNavigator.router.getStateForAction(action, state);
            break;
    }

    return nextState || state;
}

const AppReducer = combineReducers({
    nav,
    userInfo,
    createUser
});

export default AppReducer;