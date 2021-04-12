import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Messages } from '../api/messages';

class Update extends React.Component{
    constructor(){
        super()
        this.state = {
            id: '',
            name: '',
            message: ''
        }
    }

    inputHandler = e => {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        })
    }

    submit = () => {
        const div = document.querySelector('#div-info');
        div.innerHTML = '';
        Messages.update({
            _id: this.state.id
        },
        {
            $set: {
                name: this.state.name,
                message: this.state.message
            }
        })
        const message = document.createElement('h3');
        message.classList.add('text-center');
        message.textContent = "Updated successfully";
        div.appendChild(message);
        document.querySelector('#input-update-id').value = '';
        document.querySelector('#input-update-name').value = '';
        document.querySelector('#input-update-message').value = '';
        this.setState({
            ...this.state,
            id: '',
            name: '',
            message: ''
        })
    }


    render(){
        return (
            <>
                <div id="div-update-container" class="div-crud-container">
                    <h2 class="h2-crud-op">Update</h2>
                    <label class="label-crud">Id: </label>
                    <input onChange={this.inputHandler} name="id" id="input-update-id" class="input-crud" type="text"></input>
                    <br/>
                    <label class="label-crud">Name: </label>
                    <input onChange={this.inputHandler} name="name" id="input-update-name" class="input-crud" type="text"></input>
                    <br/>
                    <label class="label-crud">Message: </label>
                    <input onChange={this.inputHandler} name="message" id="input-update-message" class="input-crud" type="text"></input>
                    <br></br>
                    <button onClick={this.submit} class="button-crud" id="button-update">Submit</button>
                </div>
            </>
        )
    }
}

export default Update;