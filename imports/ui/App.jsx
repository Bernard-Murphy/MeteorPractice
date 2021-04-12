import React from 'react';
import Head from './components/Head';
import Main from './components/Main';
import Login from './components/Login';
import CreateAccount from './components/CreateAccount';
import Scan from './components/Main_Submenu_Items/Scan';
import Locations from './components/Main_Submenu_Items/Locations';
import Vehicles from './components/Main_Submenu_Items/Vehicles';
import Machines from './components/Main_Submenu_Items/Machines';
import Changed from './components/Main_Submenu_Items/Changed';
import Offices from './components/Main_Submenu_Items/Offices';
import LocateItem from './components/Main_Submenu_Items/LocateItem';
import ManageMenu from './components/Main_Submenu_Items/ManageMenu';
import ManageVehicles from './components/Main_Submenu_Items/ManageVehicles';
import UserSettings from './components/Main_Submenu_Items/UserSettings';
import { Route, useLocation, Switch, useHistory } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import ManageUsers from './components/Main_Submenu_Items/ManageUsers';
import User from './components/Main_Submenu_Items/User';
import Vehicle from './components/Main_Submenu_Items/Vehicle';



const App = (props) => {
  /* Constants history and location are passed as props to all of the components so that they can have access to the browser 
  history and properly navigate between pages. */
  const history = useHistory();
  const location = useLocation();

  return (
    /* Routes should be moved into their own component called "Routes". 
    
    AnimatePresence is what allows pages to fade in and out. In most of the components' render methods, they are surrounded by a motion.div or similar that looks something like this:
    
    <motion.div exit={{ opacity: 0 }} animate={{ opacity: 1 }} initial={{ opacity: 0 }}>
    
    The "initial" property applied to the component immediately as it starts rendering.
    The "animate" property is applied to the component when it is finished rendering.
    The "exit" property is applied to the component after it is unmounted.
    
    The "exitBeforeEnter" flag in AnimatePresence allows the previous component to completely finish transitioning before the new component begins rendering. */
    <div id="div-main">
      <AnimatePresence exitBeforeEnter>
        <Switch location={location} key={location.pathname}>
          <Route path="/usersettings">
            <Head location={location} history={history}/> 
            <UserSettings location={location} history={history}/> 
          </Route>
          <Route path="/vehicles/:id">
            <Head location={location} history={history}/> 
            <Vehicle location={location} history={history}/> 
          </Route>
          <Route path="/users/:id">
            <Head location={location} history={history}/> 
            <User location={location} history={history}/> 
          </Route>
          <Route path="/register">
             <Head location={location} history={history}/> 
             <CreateAccount location={location} history={history}/> 
          </Route>
          <Route path="/login"> 
            <Head location={location} history={history}/> 
            <Login location={location} history={history}/> 
          </Route>
          <Route path="/scan"> 
            <Head location={location} history={history}/> 
            <Scan location={location} history={history}/> 
          </Route>
          <Route path="/locations"> 
            <Head location={location} history={history}/> 
            <Locations location={location} history={history}/> 
          </Route>
          <Route path="/vehicles">
            <Head location={location} history={history}/> 
            <Vehicles location={location} history={history}/> 
          </Route>
          <Route path="/changed">
            <Head location={location} history={history}/> 
            <Changed location={location} history={history}/> 
          </Route>
          <Route path="/machines">
            <Head location={location} history={history}/> 
            <Machines location={location} history={history}/> 
          </Route>
          <Route path="/offices">
            <Head location={location} history={history}/> 
            <Offices location={location} history={history}/> 
          </Route>
          <Route path="/locate">
            <Head location={location} history={history}/> 
            <LocateItem location={location} history={history}/> 
          </Route>
          <Route path="/manageusers">
            <Head location={location} history={history}/> 
            <ManageUsers location={location} history={history}/> 
          </Route>
          <Route path="/managevehicles">
            <Head location={location} history={history}/> 
            <ManageVehicles location={location} history={history}/> 
          </Route>
          <Route path="/manage">
            <Head location={location} history={history}/> 
            <ManageMenu location={location} history={history}/> 
          </Route>
          
          <Route path="/"> 
            <Head location={location} history={history}/> 
            <Main location={location} history={history}/> 
          </Route>
          <Route path="/" render={() => <h1>Not Found</h1>}/>
        </Switch>
      </AnimatePresence>              
    </div>
  )
}


export default App;