import React from 'react'

import {createStore,compose,applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import reducers from '../reducers';

const store = createStore(reducers,compose(applyMiddleware(thunk),window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));

function DataProvider({children}) {
    return (
        <Provider store={store}>
            {children}
        </Provider>
    )
}

export default DataProvider;
