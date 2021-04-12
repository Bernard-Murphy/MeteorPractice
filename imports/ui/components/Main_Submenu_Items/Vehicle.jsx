import React from 'react';
import addHoverEffects from '../../methods/addHoverEffects';
import { motion } from 'framer-motion';
import { Vehicles } from '../../../api/Vehicles';

class Vehicle extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            vehicleData: ''
        }
    }

    componentDidUpdate(){
        addHoverEffects();
    }

    componentDidMount(){
        this.fetchVehicle();
    }

    fetchVehicle = () => {
        /* Finds the vehicle in the Mongo db from their unique ID (which is in the url). Then, renders that vehicle's name and 
        picture, along with some menu items. */

        const vehicleId = this.props.location.pathname.split('/')[2];
        const vehicle = Vehicles.findOne({
            _id: vehicleId
        })
        this.setState({
            ...this.state,
            vehicleData: (
                <>
                    <h1 id="h1-user">{vehicle.name}</h1>
                    <div name="scan" id="div-menu-0" className="div-menu-items">
                        <p id="p-menu-0" className="p-menu-items">Locate</p>
                    </div>
                    <div name="scan" id="div-menu-1" className="div-menu-items">
                        <p id="p-menu-1" className="p-menu-items">Reassign</p>
                    </div>
                    <div id="div-menu-2" className="div-menu-items">
                        <p id="p-menu-2" className="p-menu-items">Remove Vehicle</p>
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
                    {this.state.vehicleData}
                </motion.div>
            </motion.div>
        )
    }
}

export default Vehicle;