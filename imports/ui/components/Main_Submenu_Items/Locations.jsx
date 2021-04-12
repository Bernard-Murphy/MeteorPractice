import React from 'react';
import { motion } from 'framer-motion';
import addHoverEffects from '../../methods/addHoverEffects';

class Locations extends React.Component {
    constructor(props){
        super(props)
    }

    componentDidMount(){
        addHoverEffects();
    }


    render(){

        /* Information on motion.div can be found in the App.jsx file.
        
        This the list of categories as it stands to where scanners can be transferred. Will be updated as I learn more about the company. */
        return (
            <motion.div exit={{ opacity: 0 }} animate={{ opacity: 100 }} initial={{ opacity: 0 }}>
                <motion.div exit={{ opacity: 0 }} animate={{ opacity: 0.8 }} initial={{ opacity: 0 }} id="div-main-menu">
                    <div onClick={() => { this.props.history.push('/vehicles')}} name="scan" id="div-menu-0" className="div-menu-items">
                        <p id="p-menu-0" className="p-menu-items">Vehicles</p>
                    </div>
                    <div onClick={() => { this.props.history.push('/machines')}} id="div-menu-1" className="div-menu-items">
                        <p id="p-menu-1" className="p-menu-items">Facility Machines</p>
                    </div>
                    <div onClick={() => { this.props.history.push('/offices')}} id="div-menu-2" className="div-menu-items">
                        <p id="p-menu-2" className="p-menu-items">Offices</p>
                    </div>
                </motion.div>
            </motion.div>
        )
    }
}

export default Locations;