import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Messages } from '../api/messages';

class Delete extends React.Component{
    constructor(){
        super()
        this.state = {
            id: ''
        }
    }

    deleteOne = () => {
        const div = document.querySelector('#div-info');
        div.innerHTML = '';
        Messages.remove({
            _id: this.state.id
        })
        const message = document.createElement('h3');
        message.classList.add('text-center');
        message.textContent = "Deleted successfully";
        div.appendChild(message);
        document.querySelector('#input-delete-id').value = '';
        this.setState({
            ...this.state,
            id: ''
        })
    }

    deleteAll = () => {
        const div = document.querySelector('#div-info');
        div.innerHTML = '';
        Messages.remove({})
        const message = document.createElement('h3');
        message.classList.add('text-center');
        message.textContent = "Meteor doesn't allow you to delete all entries (you would probably never need to do this in practice anyway)";
        div.appendChild(message);
    }

    inputHandler = e => {
        this.setState({
            ...this.state,
            id: e.target.value
        })
    }

    render(){
        return (
            <>
                <div id="div-delete-container" class="div-crud-container">
                    <h2 class="h2-crud-op">Delete</h2>
                    <label class="label-crud">Id: </label>
                    <input onChange={this.inputHandler} name="name" id="input-delete-id" class="input-crud" type="text"></input>
                    <br/>
                    <button onClick={this.deleteOne} class="button-crud" id="button-delete-one">Delete One</button>
                    <br></br>
                    <button onClick={this.deleteAll} class="button-crud" id="button-delete">Delete All</button>
                </div>
            </>
        )
    }
}

export default Delete;