import React from 'react';
import op from '../methods/opacity';
import addHoverEffects from '../methods/addHoverEffects';
import { login, logout } from '../../redux/actions';
import { connect } from 'react-redux';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

class Login extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            username: "",
            password: "",
            transitioned: false
        }
    }

    componentDidUpdate(){
        /* Once this component learns from the Redux store that the user is logged in, they will be redirected to the main 
        page. The "transitioned" property is there to ensure that the component is not updating ad infinitum while the page 
        transitions. There is almost certainly a better way of doing it than this, and in the final version, this will 
        probably not be here.  */ 

        if (this.props.loggedIn === true){
            if (this.state.transitioned === false){
                this.props.history.push('/');
                this.setState({
                    ...this.state,
                    transitioned: true
                })
            }
        }
    }

    componentDidMount(){
        /* If the user navigates to this page while logged in, they will be logged out. */
        if (this.props.loggedIn === true){
            this.props.logout();
        }

        // Allows the user to submit the form using the enter key. 
        document.querySelector('#div-login-fields').addEventListener('keypress', (e) => {
            if (e.key === "Enter"){
                this.formSubmit();
            }
        })

        addHoverEffects();

        // Adds opacity hover effects to the "Create Account" and "Forgot Password" buttons.
        const menuItemsHalf = document.getElementsByClassName('div-menu-items-half');
        for (let i = 0; i < menuItemsHalf.length; i++){
            menuItemsHalf[i].addEventListener('mouseenter', () => {
                op.removeOpacity([`div-menu-${[i + 1]}`, `p-menu-${[i + 1]}`]);
            })
            menuItemsHalf[i].addEventListener('mouseleave', () => {
                op.returnOpacity([`div-menu-${[i + 1]}`, `p-menu-${[i + 1]}`])
            })
        }
    }

    inputHandler = e => {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        })
    }


    formSubmit = () => {
        this.props.login(this.state.username, this.state.password)
    }



    render(){
        // Information on motion.div can be found in the App.jsx file.
        return (
            <motion.div exit={{ opacity: 0 }} animate={{ opacity: 1 }} initial={{ opacity: 0 }}>
                <div id="div-login-fields">
                    <div className="div-login-field">
                        <p className="h3-login-field">Username:</p>
                        <input name="username" onChange={this.inputHandler} className="input-login-field"></input>
                    </div>
                    <div className="div-login-field">
                        <p className="h3-login-field">Password:</p>
                        <input type="password" name="password" onChange={this.inputHandler} className="input-login-field"></input>
                    </div>

                    <div id="div-menu-0" onClick={this.formSubmit} className="div-menu-items">
                        <p id="p-menu-0" className="p-menu-items">Login</p>
                    </div>
                    <div className="div-item-holder">
                        <Link to='/register' id="div-menu-1" className="div-menu-items-half">
                            <p id="p-menu-1" className="p-menu-items-half">Create Account</p>
                        </Link>
                        <div id="div-menu-2" className="div-menu-items-half">
                            <p id="p-menu-2" className="p-menu-items-half">Forgot Password</p>
                        </div>
                    </div>
                </div>
            </motion.div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        loggedIn: state.loggedIn
    }
  }
  
  export default connect(mapStateToProps, {login, logout})(Login)