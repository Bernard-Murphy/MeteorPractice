import React from 'react';
import { motion } from 'framer-motion';

class Scan extends React.Component {
    constructor(){
        super()
    }


    render(){
        /* Information on motion.div can be found in the App.jsx file.
        
        This will be the main scanner page. Once an item is scanned, it will post information about that item, the scanner, 
        and the person who scanned it to the Mongo db*/ 

        return (
            <motion.div exit={{ opacity: 0 }} animate={{ opacity: 1 }} initial={{ opacity: 0 }}>
                <motion.div exit={{ opacity: 0 }} animate={{ opacity: 0.8 }} initial={{ opacity: 0 }} id="div-main-menu">
                    <h1 id="h1-scanner">Scan an Item to Continue</h1> 
                    <img id="img-scan-icon" alt="scanner icon" src="/assets/scangraphic.jpg"/>
                </motion.div>
            </motion.div>
        )
    }
}

export default Scan;