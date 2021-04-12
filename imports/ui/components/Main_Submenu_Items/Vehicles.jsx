import React from 'react';
import { motion } from 'framer-motion';
import addHoverEffects from '../../methods/addHoverEffects';
import { Vehicles } from '../../../api/Vehicles';
import { connect } from 'react-redux';
import { change_location } from '../../../redux/actions';

class VehicleList extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            vehicles: '',
            scannerLocation: this.props.scannerLocation
        }
    }

    componentDidUpdate(){
        /* Once the user selects a location to transfer the scanner, the Redux store updates the component with this new 
        information and transfers the user to a page indicating that the location has been changed successfully. */  
        
        if (this.props.scannerLocation !== this.state.scannerLocation){
            this.props.history.push('/changed')
        }
        addHoverEffects();
    }

    componentDidMount(){
        // Once the component mounts, it requests a list of vehicles from the Mongo db.
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
                    <div info={`${vehicle._id}-${vehicle.name}`} onClick={this.changeVehicle} key={vehicle._id} id={`div-menu-${index}`} className="div-menu-items">
                        <p info={`${vehicle._id}-${vehicle.name}`} id={`p-menu-${index}`} className="p-menu-items">{vehicle.name}</p>
                    </div>
                )
                index += 1;
                return newVehicle;
            })
        })
    }

    changeVehicle = (e) => {
        /* Each menu item has a "name" attribute which is the vehicle's id and the vehicle's name separated by underscores. 
        this function grabs this information and fires the change_location action to change the location of the scanner. */

        e.persist();
        const info = e.target.getAttribute('info').split('-');
        this.props.change_location(this.props.user, info[0], info[1]);
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
        user: state.user,
        scannerLocation: state.scannerLocation
    }
}

export default connect(mapStateToProps, {change_location})(VehicleList)