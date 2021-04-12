import React from 'react';
import addHoverEffects from '../../methods/addHoverEffects';
import { motion } from 'framer-motion';

class Locate extends React.Component {
    constructor(props){
        super(props)
    }

    componentDidMount(){
        addHoverEffects();
    }


    render(){
        /* Information on motion.div can be found in the App.jsx file.
        
        This will be the search page. Users will be able to enter a garment's ID, description, company, or name and there will 
        be a function to perform a search of the Mongo db and return results. */
        return (
            <motion.div exit={{ opacity: 0 }} animate={{ opacity: 100 }} initial={{ opacity: 0 }}>
                <motion.div exit={{ opacity: 0 }} animate={{ opacity: 0.8 }} initial={{ opacity: 0 }} id="div-main-menu">
                    <h1 id="h1-search">Search for an Item</h1>
                    <input placeholder="Enter an ID, Description, Company, Location, or Name" id="input-search-bar" className="input-login-field"></input>
                    <div id="div-menu-0" className="div-menu-items">
                        <p id="p-menu-0" className="p-menu-items">Search</p>
                    </div>
                </motion.div>
            </motion.div>
        )
    }
}

export default Locate;