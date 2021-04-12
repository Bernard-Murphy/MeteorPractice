import React from 'react';
import addHoverEffects from '../methods/addHoverEffects';
import checkEmail from '../methods/checkEmail';
import forbiddenCharacters from '../methods/forbiddenCharacters';
import allowedCharacters from '../methods/allowedCharacters';
import { Users } from '../../api/Users';
import bcrypt from 'bcryptjs';
import { connect } from 'react-redux';
import { motion } from 'framer-motion';

class CreateAccount extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            username: "",
            password1: "",
            password2: "",
            email: "",
            nameError: "",
            passwordError: "",
            emailError: ""
        }
    }

    componentDidMount(){
        // Allows users to submit the form by pressing the Enter key

        document.querySelector('#div-login-fields').addEventListener('keypress', (e) => {
            if (e.key === "Enter"){
                this.formSubmit();
            }
        })
        addHoverEffects();
    }

    inputHandler = e => {
        // Updates the state every time the user types things into any input field.

        this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        })
    }

    generateError = (field) => {
        // Removes the "display: hidden" on the appropriate error field.

        const element = document.querySelector(`#${field}`);
        element.classList.remove('hidden');
    }

    hideField = (field) => {
        // Adds the "display: hidden" attribute on the appropriate error field.

        const element = document.querySelector(`#${field}`);
        if (element.classList.contains('hidden') === false){
            element.classList.add('hidden');
        }
    }

    checkName = () => {
        /* Checks to make sure the username is within the allowed parameters. Usernames must be between 4 and 30 characters 
        long, and may only contain letters numbers, underscores and/or dashes. */

        if (this.state.username.length > 30){
            this.generateError("p-name-error")
            return "Your name is too long (Max: 30 chars)";
        } else if (this.state.username.length < 4) {
            this.generateError("p-name-error")
            return "Your name is too short (4 chars min)";
        } else if (allowedCharacters(this.state.username) === false){
            this.generateError("p-name-error")
            return "Forbidden characters detected in username";
        } else {
            return "";
        }
    }

    checkPasswords = () => {
        /* Checks to make sure that the passwords are within allowed parameters. Passwords must match, they must be between 8 
        and 64 characters in length, and they cannot contain backslashes or apostrophes. */

        if (this.state.password1.length > 64){
            this.generateError("p-password-error")
            return "Your password is too long (64 chars max)";
        } else if (this.state.password1.length < 6) {
            this.generateError("p-password-error")
            return "Your password is too short (6 chars min)";
        } else if (this.state.password1 !== this.state.password2){
            this.generateError("p-password-error")
            return "Your passwords do not match";
        } else if (forbiddenCharacters(this.state.password1)){
            this.generateError("p-password-error")
            return "Forbidden characters detected in password"
        } else {
            return "";
        }
    }

    checkEmailAddress = () => {
        /* Checks to make sure that the email address provided by the user is within the allowed parameters. Email addresses 
        must be properly formatted, they must be less than 128 characters in length, and they may not contain any backslashes, 
        or apostrophes. */

        if (checkEmail(this.state.email) === false){
            this.generateError("p-email-error")
            return "Invalid email address";
        } else if (this.state.email.length > 128){
            this.generateError("p-email-error")
            return "Your email address is too long (Max: 128 chars)";
        } else if (forbiddenCharacters(this.state.email)){
            this.generateError("p-email-error")
            return "Forbidden character(s) detected in email address"
        } else {
            return "";
        }
    }

    checkFields = () => {
        /* Runs the fields through all of the validations. If there are any errors that need to be addressed, it sets the 
        state with those new errors. If not, it sets the state with blank errors and returns true. */

        const nameError = this.checkName();
        const passError = this.checkPasswords();
        const emailError = this.checkEmailAddress();
        this.setState({
            ...this.state,
            nameError: nameError,
            passwordError: passError,
            emailError: emailError
        })
        if (nameError === "" && passError === "" && emailError === ""){
            return true
        }
    }


    formSubmit = async () => {
        /* Hides all of the errors, then checks the fields for new errors. If there are no errors, a message is revealed 
        informing the user that their account is being created. The password the user provided is then hashed and salted using 
        bcryptjs. The new user is then inserted into the Users Mongo collection, and the user is transferred to the Login 
        page. */
        this.hideField('p-name-error');
        this.hideField('p-password-error');
        this.hideField('p-email-error');
        this.hideField('div-error-main');
        if (this.checkFields()){
            const loadingMessage = document.querySelector('#div-loading');
            loadingMessage.classList.remove('hidden');
            const errorMessage = document.querySelector('#div-error-main');
            try {
                const passHash = await bcrypt.hash(this.state.password1, 8);
                Users.insert({
                    username: this.state.username,
                    password: passHash,
                    email: this.state.email,
                    mugShotUrl: "",
                    userRole: "Runner",
                    userPrivileges: "Regular"
                })
                document.location.href = "/login";
                
            } catch (err) {
                console.log(err)
                loadingMessage.classList.add('hidden');
                errorMessage.classList.remove('hidden');
            }
            
        }
    }


    render(){
        /* Information on motion.div can be found in the App.jsx file.
        
        Empty error message containers remain on the page and are hidden by default. If error messages are added to state, 
        these error message containers will be revealed. */ 

        return (
            <motion.div exit={{ opacity: 0 }} animate={{ opacity: 1 }} initial={{ opacity: 0 }}>
                <div id="div-login-fields">
                    <div className="div-login-field">
                        <p className="h3-login-field">Username:</p>
                        <input name="username" onChange={this.inputHandler} className="input-login-field"></input>
                        <p id="p-name-error" className="hidden p-error-message"><i className="i-error fas fa-exclamation-triangle"></i>{this.state.nameError}</p>
                    </div>
                    <div className="div-login-field">
                        <p className="h3-login-field">Password:</p>
                        <input type="password" name="password1" onChange={this.inputHandler} className="input-login-field"></input>
                        <p id="p-password-error" className="hidden p-error-message"><i className="i-error fas fa-exclamation-triangle"></i>{this.state.passwordError}</p>
                    </div>
                    <div className="div-login-field">
                        <p className="h3-login-field">Re-Enter Password:</p>
                        <input type="password" name="password2" onChange={this.inputHandler} className="input-login-field"></input>
                    </div>
                    <div className="div-login-field">
                        <p className="h3-login-field">Email:</p>
                        <input name="email" onChange={this.inputHandler} className="input-login-field"></input>
                        <p id="p-email-error" className="hidden p-error-message"><i className="i-error fas fa-exclamation-triangle"></i>{this.state.emailError}</p>
                    </div>

                    <div id="div-menu-0" onClick={this.formSubmit} className="div-menu-items">
                        <p id="p-menu-0" className="p-menu-items">Create Account</p>
                    </div>
                    <div id="div-loading" className="hidden">
                        <img id="loading-icon" alt="loading icon" src="/assets/loading.gif"/>
                        <p id="p-loading">Creating account...</p>
                    </div>
                    <div id="div-error-main" className="hidden"> 
                        <p id="p-error-main">An error occurred. Please try again later.</p>
                    </div>
                </div>
            </motion.div>
        )
    }
}

const mapStateToProps = (state) => {
    return {

    }
}

export default connect(mapStateToProps, {})(CreateAccount);