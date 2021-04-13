import React from 'react';
import op from '../methods/opacity';
import { connect } from 'react-redux';
import { logout } from '../../redux/actions';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';


class Head extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
            ...props,
            transitioned: false
        }
    }

    componentDidUpdate(){
        // If at any point a user is no longer logged in, they will be redirected to the login page. 
        if (this.props.loggedIn === true){
            if (this.state.transitioned === true){
                this.setState({
                    ...this.state,
                    transitioned: false
                })
            }
            
        }
        if (this.props.loggedIn === false){
            if (this.state.transitioned === false){
                this.props.history.push('/login');
                this.setState({
                    ...this.state,
                    transitioned: true
                })
            }
        }
    }


    componentDidMount(){
        if (window.location.pathname !== "/login" && window.location.pathname !== "/register"){
            // Adds opacity hover effects to the back and sign out buttons.

            const logOutDiv= document.querySelector('#div-sign-out');
            const backDiv = document.querySelector('#div-back-button');
            backDiv.addEventListener('mouseenter', () => {
                op.removeOpacity(['p-back', 'i-back']);
            })
            logOutDiv.addEventListener('mouseenter', () => {
                op.removeOpacity(['p-sign-out', 'i-sign-out']);
            })
            backDiv.addEventListener('mouseleave', () => {
                op.returnOpacity(['p-back', 'i-back']);
            })
            logOutDiv.addEventListener('mouseleave', () => {
                op.returnOpacity(['p-sign-out', 'i-sign-out']);
            })
        }
        
    }

    signOut = () => {
        // Fires the logout action.

        this.props.logout();
    }

    goBack = () => {
        // Navigates backwards in the user's browser history.

        this.props.history.goBack();
    }
    

    render(){
        /* Information on motion.header can be found in the App.jsx file.
        
        Unless the user is in the Login or Create Account screen, the user will be served a back button to navigate backwards, 
        a sign out button to sign out of their account, and information about the scanner including the user's username and 
        picture, the user's role, and the scanner's location. */ 

        switch (window.location.pathname){
            case "/login":
                return (
                    <motion.header exit={{ opacity: 0}} animate={{ opacity: 1 }} initial={{ opacity: 0 }}>
                        <h1 id="h1-login">Login</h1>
                    </motion.header>
                )
            case "/register":
                return (
                    <motion.header exit={{ opacity: 0}} animate={{ opacity: 1 }} initial={{ opacity: 0 }}>
                        <div onClick={this.goBack} id="div-back-button">
                            <i id="i-back" className="fas fa-4x fa-arrow-circle-left"></i>
                            <p id="p-back">Back</p>
                        </div>
                        <h1 id="h1-login">Create Account</h1>
                    </motion.header>
                )
            default:
                return (
                    <header>
                        <div onClick={this.goBack} id="div-back-button">
                            <i id="i-back" className="fas fa-4x fa-arrow-circle-left"></i>
                            <p id="p-back">Back</p>
                        </div>
                        <div id="div-user-info">
                            <img id="img-mugshot" src={this.state.mugshotUrl}></img>
                            <div id="div-name-position">
                                <h1 id="h1-name" className="text-center">{this.state.user}</h1>
                                <div id="div-position">
                                    <i id="i-position" className="fas fa-2x fa-toolbox"></i>
                                    <p id="p-position" className="text-center">- {this.state.userRole}</p>
                                </div>
                                <div id="div-location">
                                    <i id="i-location" className="fas fa-2x fa-map-marker-alt"></i>
                                    <p id="p-location" className="text-center">- {this.props.scannerLocation}</p>
                                </div>
                            </div>
                        </div>
                        <Link to="/login" id="div-sign-out">
                            <i id="i-sign-out" className="fas fa-4x fa-sign-out-alt"></i>
                            <p id="p-sign-out">Sign Out</p>
                        </Link>
                        
                    </header>
                )
        }
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        mugshotUrl: state.mugshotUrl,
        userRole: state.userRole,
        scannerLocation: state.scannerLocation,
        menu: state.menu,
        loggedIn: state.loggedIn
    }
}

export default connect(mapStateToProps, {logout})(Head)