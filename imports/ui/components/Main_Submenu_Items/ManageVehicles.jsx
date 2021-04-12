import React from 'react';
import { motion } from 'framer-motion';
import addHoverEffects from '../../methods/addHoverEffects';
import { Vehicles } from '../../../api/Vehicles';
import { connect } from 'react-redux';

class VehicleList extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            vehicles: '',
            scannerLocation: this.props.scannerLocation
        }
    }

    componentDidUpdate(){
        if (this.props.scannerLocation !== this.state.scannerLocation){
            this.props.history.push('/changed')
        }
        addHoverEffects();
    }

    componentDidMount(){
        // Grabs a list of users from the Mongo database and renders them onto the screen.
        this.setVehicles();
    }

    setVehicles = async () => {
        /* Finds all of the vehicles in the Mongo db, then adds a new menu item for each one and updates the component state 
        with the HTML for these menu items. The component then renders these items. */

        const vehicles = await Vehicles.find();
        let index = 0;
        this.setState({
            ...this.state,
            vehicles: vehicles.map((vehicle) => {
                let newVehicle = (
                    <div onClick={this.manageVehicle} info={`${vehicle._id}--${vehicle.name}`} key={vehicle._id} id={`div-menu-${index}`} className="div-menu-items">
                        <p info={`${vehicle._id}--${vehicle.name}`} id={`p-menu-${index}`} className="p-menu-items">{vehicle.name}</p>
                    </div>
                )
                index += 1;
                return newVehicle;
            })
        })
    }

    manageVehicle = (e) => {
        // When a vehicle is selected, the user will be sent to that vehicle's unique page.
        e.persist();
        const info = e.target.getAttribute('info').split('--');
        this.props.history.push(`/vehicles/${info[0]}`);
    }

    render(){
        // Information on motion.div can be found in the App.jsx file.
        
        return (
            <motion.div exit={{ opacity: 0 }} animate={{ opacity: 1 }} initial={{ opacity: 0 }}>
                <motion.div exit={{ opacity: 0 }} animate={{ opacity: 0.8 }} initial={{ opacity: 0 }} id="div-main-menu">
                    <h1 id="h1-vehicles">Vehicles</h1>
                    {this.state.vehicles}
                </motion.div>
            </motion.div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
    }
}

export default connect(mapStateToProps, {})(VehicleList)