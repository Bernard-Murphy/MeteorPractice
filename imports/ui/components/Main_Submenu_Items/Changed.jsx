import React from 'react';
import { motion } from 'framer-motion';
import addHoverEffects from '../../methods/addHoverEffects';
import { connect } from 'react-redux';

class Changed extends React.Component {
    constructor(props){
        super(props)
    }

    componentDidMount(){
        addHoverEffects();
    }

  

    render(){

        /* Information on the motion.div can be found in the App.jsx file. 
        
        This is the screen that the user sees after changing the scanner location. It is connected to the Redux store and will 
        display the updated Scanner location */
        return (
            <motion.div exit={{ opacity: 0 }} animate={{ opacity: 100 }} initial={{ opacity: 0 }}>
                <motion.div exit={{ opacity: 0 }} animate={{ opacity: 0.8 }} initial={{ opacity: 0 }} id="div-main-menu">
                    <h1 id="h1-vehicles">Scanner location changed to {this.props.scannerLocation}</h1>
                    <div onClick={() => { this.props.history.push('/') }} name="scan" id="div-menu-0" className="div-menu-items">
                        <p id="p-menu-0" className="p-menu-items">Return to Main Menu</p>
                    </div>
                </motion.div>
            </motion.div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        scannerLocation: state.scannerLocation,
    }
}

export default connect(mapStateToProps, {})(Changed)