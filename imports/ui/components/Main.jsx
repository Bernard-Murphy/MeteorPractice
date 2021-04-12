import React from 'react';
import addHoverEffects from '../methods/addHoverEffects';
import { motion } from 'framer-motion';

class Main extends React.Component {
    constructor(props){
        super(props)
    }

    componentDidMount(){
        addHoverEffects();
    }


    render(){
        /* Information on motion.div can be found in the App.jsx file. 
        
            This is the main menu. */
        return (
            <motion.div exit={{ opacity: 0 }} animate={{ opacity: 1 }} initial={{ opacity: 0 }}>
                <motion.div exit={{ opacity: 0 }} animate={{ opacity: 0.8 }} initial={{ opacity: 0 }} id="div-main-menu">
                    <div onClick={() => { this.props.history.push('/scan') }} name="scan" id="div-menu-0" className="div-menu-items">
                        <p id="p-menu-0" className="p-menu-items">Scan Items</p>
                    </div>
                    <div onClick={() => { this.props.history.push('/locations') }} id="div-menu-1" className="div-menu-items">
                        <p id="p-menu-1" className="p-menu-items">Change Location</p>
                    </div>
                    <div onClick={() => { this.props.history.push('/locate') }} id="div-menu-2" className="div-menu-items">
                        <p id="p-menu-2" className="p-menu-items">Search for an Item</p>
                    </div>
                    <div onClick={() => { this.props.history.push('/manage') }} id="div-menu-3" className="div-menu-items">
                        <p id="p-menu-3" className="p-menu-items">Manage Assets</p>
                    </div>
                    <div onClick={() => { this.props.history.push('/usersettings') }} id="div-menu-4" className="div-menu-items">
                        <p id="p-menu-4" className="p-menu-items">User Settings</p>
                    </div>
                </motion.div>
            </motion.div>
        )
    }
}

export default Main;