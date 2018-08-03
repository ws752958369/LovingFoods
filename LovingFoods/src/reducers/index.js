import {
    combineReducers
} from 'redux';

import FeedReducer from './FeedEntryReducer';
//import HomeReducer from './HomeEntryReducer';
import FeedDetailReducer from './FeedDetailReducer';
import StatusBarReducer from './StatusBarReducer';
import LoginReducer from './LoginReducer';
import HomePageReducer from './HomePageReducer';

const rootReducer = combineReducers({
    'FeedReducer': FeedReducer,
    //'HomeReducer': HomeReducer,
    'FeedDetailReducer': FeedDetailReducer,
    'StatusBar': StatusBarReducer,
    'Login': LoginReducer,
    'HomePage': HomePageReducer,
});

export default rootReducer;