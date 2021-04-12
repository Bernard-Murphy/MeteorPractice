import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Messages } from '../api/messages';

class Create extends React.Component{
    constructor(){
        super()
        this.state = {
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
        Messages.insert({
            name: this.state.name,
            message: this.state.message
        })
        document.querySelector('#input-create-name').value = '';
        document.querySelector('#input-create-message').value = '';
        this.setState({
            ...this.state,
            name: '',
            message: ''
        })
        const div = document.querySelector('#div-info');
        div.innerHTML = '';
        const message = document.createElement('h3');
        message.classList.add('text-center');
        message.textContent = "Added successfully";
        div.appendChild(message);
    }


    render(){
        return (
            <>
                <div id="div-create-container" class="div-crud-container">
                    <h2 class="h2-crud-op">Create</h2>
                    <label class="label-crud">Name: </label>
                    <input onChange={this.inputHandler} name="name" id="input-create-name" class="input-crud" type="text"></input>
                    <br/>
                    <label class="label-crud">Message: </label>
                    <input onChange={this.inputHandler} name="message" id="input-create-message" class="input-crud" type="text"></input>
                    <br></br>
                    <button onClick={this.submit} class="button-crud" id="button-create">Submit</button>
                </div>
            </>
        )
    }
}

export default Create;