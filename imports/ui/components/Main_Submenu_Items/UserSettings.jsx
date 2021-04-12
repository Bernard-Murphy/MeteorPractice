import React from 'react';
import addHoverEffects from '../../methods/addHoverEffects';
import op from '../../methods/opacity';
import { motion } from 'framer-motion';
import { connect } from 'react-redux';

class UserSettings extends React.Component {
    constructor(props){
        super(props)
    }

    componentDidMount(){
        addHoverEffects();

        /* Similar to what is contained in addHoverEffects. Adds the same opacity effects but to different items. */

        const menuItemsHalf = document.getElementsByClassName('div-menu-items-half');
        for (let i = 0; i < menuItemsHalf.length; i++){
            menuItemsHalf[i].addEventListener('mouseenter', () => {
                op.removeOpacity([`div-menu-half-${[i]}`, `p-menu-half-${[i]}`]);
            })
            menuItemsHalf[i].addEventListener('mouseleave', () => {
                op.returnOpacity([`div-menu-half-${[i]}`, `p-menu-half-${[i]}`])
            })
        }
    }


    render(){
        /* Information on motion.div can be found in the App.jsx file.
        
        From this menu, the user will be able to change their picture, and possibly clock in and out or go on break.*/
        
        return (
            <motion.div exit={{ opacity: 0 }} animate={{ opacity: 1 }} initial={{ opacity: 0 }}>
                <motion.div exit={{ opacity: 0 }} animate={{ opacity: 0.8 }} initial={{ opacity: 0 }} id="div-main-menu">
                    <h1 id="h1-settings">{this.props.user}</h1>
                    <div id="div-settings-container">
                        <div id="div-settings-picture-container">
                            <img src="/assets/mugshot.jpg" alt="user profile picture" id="img-user-settings"/>
                            <div name="scan" id="div-menu-half-0" className="div-menu-items-half">
                                <p id="p-menu-half-0" className="p-menu-items-half">Change Picture</p>
                            </div>
                        </div>
                        <div id="div-settings-options-container">
                            <div id="div-menu-0" className="div-menu-items">
                                <p id="p-menu-0" className="p-menu-items">Clock In</p>
                            </div>
                            <div id="div-menu-1" className="div-menu-items">
                                <p id="p-menu-1" className="p-menu-items">Clock Out</p>
                            </div>
                            <div id="div-menu-2" className="div-menu-items">
                                <p id="p-menu-2" className="p-menu-items">Go on Break</p>
                            </div>
                        </div>
                    </div>
                    
                </motion.div>
            </motion.div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, {})(UserSettings)