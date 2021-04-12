import React from 'react';
import { motion } from 'framer-motion';
import addHoverEffects from '../../methods/addHoverEffects';

class ManageMenu extends React.Component {
    constructor(props){
        super(props)
    }

    componentDidMount(){
        addHoverEffects();
    }


    render(){
        return (
            /* Information on motion.div can be found in the App.jsx file.
            
            Gives the user the option of managing users, vehicles, or scanners. Only available for users with administrator 
            privileges. */

            <motion.div exit={{ opacity: 0 }} animate={{ opacity: 100 }} initial={{ opacity: 0 }}>
                <motion.div exit={{ opacity: 0 }} animate={{ opacity: 0.8 }} initial={{ opacity: 0 }} id="div-main-menu">
                    <div onClick={() => { this.props.history.push('/manageusers')}} name="scan" id="div-menu-0" className="div-menu-items">
                        <p id="p-menu-0" className="p-menu-items">Manage Users</p>
                    </div>
                    <div onClick={() => { this.props.history.push('/managevehicles')}} id="div-menu-1" className="div-menu-items">
                        <p id="p-menu-1" className="p-menu-items">Manage Vehicles</p>
                    </div>
                    <div onClick={() => { this.props.history.push('/offices')}} id="div-menu-2" className="div-menu-items">
                        <p id="p-menu-2" className="p-menu-items">Manage Scanners</p>
                    </div>
                </motion.div>
            </motion.div>
        )
    }
}

export default ManageMenu;