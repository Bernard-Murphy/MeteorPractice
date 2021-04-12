import React from 'react';
import { motion } from 'framer-motion';
import addHoverEffects from '../../methods/addHoverEffects';
import { Machines } from '../../../api/Machines';
import { connect } from 'react-redux';
import { change_location } from '../../../redux/actions';

class MachineList extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            machines: '',
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
        // Once the component mounts, it requests a list of machines from the Mongo db.
        this.setMachines();
    }

    setMachines = async () => {
        /* Finds all of the machines in the Mongo db, then adds a new menu item for each one and updates the component state 
        with the HTML for these menu items. The component then renders these items. */

        const machines = await Machines.find();
        let index = 0;
        this.setState({
            ...this.state,
            machines: machines.map((machine) => {
                let newMachine = (
                    <div info={`${machine._id}_${machine.name}`} onClick={this.changeMachine} key={machine._id} id={`div-menu-${index}`} className="div-menu-items">
                        <p info={`${machine._id}_${machine.name}`} id={`p-menu-${index}`} className="p-menu-items">{machine.name}</p>
                    </div>
                )
                index += 1;
                return newMachine;
            })
        })
    }

    changeMachine = (e) => {
        /* Each menu item has a "name" attribute which is the machine's id and the machine's name separated by underscores. 
        this function grabs this information and fires the change_location action to change the location of the scanner. */

        e.persist();
        const info = e.target.getAttribute('info').split('_');
        this.props.change_location(this.props.user, info[0], info[1]);
    }


    render(){
        return (
            // Information on motion.div can be found in the App.jsx file.
            
            <motion.div exit={{ opacity: 0 }} animate={{ opacity: 100 }} initial={{ opacity: 0 }}>
                <motion.div exit={{ opacity: 0 }} animate={{ opacity: 0.8 }} initial={{ opacity: 0 }} id="div-main-menu">
                    <h1 id="h1-vehicles">Machines</h1>
                    {this.state.machines}
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

export default connect(mapStateToProps, {change_location})(MachineList)