import React from 'react';
import Create from './Create';
import Read from './Read';
import Update from './Update';
import Delete from './Delete';


export const App = () => {
  // const messages = useTracker(() => {
  //   return Messages.find().fetch();
  // });
  return (
    <div>
      <h1 id="h1-crud-practice">Random Meteor CRUD stuff</h1>
      <div id="div-crud-ops">
        <Create/>
        <Read/>
        <Update/>
        <Delete/>
      </div>
      <div id="div-info">
      {/* <ul>{messages.map(
        message => <li key={Math.random()}>
          <p>{message.name}</p>
        </li>
      )}</ul> */}
      </div>
    </div>
  )
  
};
