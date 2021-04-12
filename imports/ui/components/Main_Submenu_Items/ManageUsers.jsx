import React from 'react';
import { motion } from 'framer-motion';
import addHoverEffects from '../../methods/addHoverEffects';
import { Users } from '../../../api/Users';
import { connect } from 'react-redux';
import { change_location } from '../../../redux/actions';

class UserList extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            users: '',
            scannerLocation: this.props.scannerLocation
        }
    }

    componentDidUpdate(){
        addHoverEffects();
    }

    componentDidMount(){
        // Grabs a list of users from the Mongo database and renders them onto the screen.

        this.setUsers();
    }

    setUsers = async () => {
        /* Finds all of the users in the Mongo db, then adds a new menu item for each one and updates the component state 
        with the HTML for these menu items. The component then renders these items. */

        const users = await Users.find();
        let index = 0;
        this.setState({
            ...this.state,
            users: users.map((user) => {
                let newUser = (
                    <div onClick={this.manageUser} info={`${user._id}--${user.username}`} key={user._id} id={`div-menu-${index}`} className="div-menu-items">
                        <p info={`${user._id}--${user.username}`} id={`p-menu-${index}`} className="p-menu-items">{user.username}</p>
                    </div>
                )
                index += 1;
                return newUser;
            })
        })
    }

    manageUser = (e) => {
        // When a menu item is selected, the user will be sent to that item's unique user page.
        e.persist();
        const info = e.target.getAttribute('info').split('--');
        this.props.history.push(`/users/${info[0]}`);
    }

    render(){
        // Information on motion.div can be found in the App.jsx file.
        
        return (
            <motion.div exit={{ opacity: 0 }} animate={{ opacity: 1 }} initial={{ opacity: 0 }}>
                <motion.div exit={{ opacity: 0 }} animate={{ opacity: 0.8 }} initial={{ opacity: 0 }} id="div-main-menu">
                    <h1 id="h1-vehicles">Users</h1>
                    {this.state.users}
                </motion.div>
            </motion.div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        scannerLocation: state.scannerLocation
    }
}

export default connect(mapStateToProps, {change_location})(UserList)