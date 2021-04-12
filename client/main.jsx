import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import  App  from '/imports/ui/App';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from '/imports/redux/reducer';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';


const store = createStore(
  reducer,
  applyMiddleware(thunk)
)

Meteor.startup(() => {
  render(
    <Provider store={store}>
        <BrowserRouter>
          <App/>
        </BrowserRouter>
    </Provider>
  , document.getElementById('react-target'));
});
