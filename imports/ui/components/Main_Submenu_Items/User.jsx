import React from 'react';
import addHoverEffects from '../../methods/addHoverEffects';
import { motion } from 'framer-motion';
import { Users } from '../../../api/Users';

class User extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            userData: ''
        }
    }

    componentDidUpdate(){
        addHoverEffects();
    }

    componentDidMount(){
        this.fetchUser();
    }

    fetchUser = () => {
        /* Finds the user in the Mongo db from their unique ID (which is in the url). Then, renders that user's name and 
        picture, along with some menu items. */

        const userId = this.props.location.pathname.split('/')[2];
        const user = Users.findOne({
            _id: userId
        })
        this.setState({
            ...this.state,
            userData: (
                <>
                    <img id="img-mugshot-user-page" src="/assets/mugshot.jpg" alt="user profile picture" />
                    <h1 id="h1-user">{user.username}</h1>
                    <div name="scan" id="div-menu-0" className="div-menu-items">
                        <p id="p-menu-0" className="p-menu-items">Manage Privileges</p>
                    </div>
                    <div id="div-menu-1" className="div-menu-items">
                        <p id="p-menu-1" className="p-menu-items">Remove User</p>
                    </div>
                </>
            )
        })
    }


    render(){
        // Information on motion.div can be found in the App.jsx file.
        
        return (
            <motion.div exit={{ opacity: 0 }} animate={{ opacity: 1 }} initial={{ opacity: 0 }}>
                <motion.div exit={{ opacity: 0 }} animate={{ opacity: 0.8 }} initial={{ opacity: 0 }} id="div-main-menu">
                    {this.state.userData}
                </motion.div>
            </motion.div>
        )
    }
}

export default User;