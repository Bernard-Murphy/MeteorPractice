import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Messages } from '../api/messages';

class Read extends React.Component{
    constructor(){
        super()
        this.state = {
            id: ''
        }
    }

    readOne = () => {
        const data = Messages.findOne({
            _id: this.state.id
        })
        document.querySelector('#input-read-id').value = '';
        this.setState({
            ...this.state,
            id: ''
        })
        const div = document.querySelector('#div-info');
        div.innerHTML = '';
        let parent = document.createElement('div')
        parent.classList.add('div-info-piece');
        let id = document.createElement('h4');
        id.classList.add('text-center');
        id.textContent = `Id: ${data._id}`;
        let name = document.createElement('p');
        name.classList.add('text-center');
        name.textContent = `Name: ${data.name}`;
        let message = document.createElement('p');
        message.classList.add('text-center')
        message.textContent = `Message: ${data.message}`;
        parent.appendChild(id);
        parent.appendChild(name);
        parent.appendChild(message);
        div.appendChild(parent);
    }

    readAll = () => {
        const data = Messages.find();
        const div = document.querySelector('#div-info');
        div.innerHTML = '';
        data.map((entry) => {
            let parent = document.createElement('div')
            parent.classList.add('div-info-piece');
            let id = document.createElement('h4');
            id.classList.add('text-center');
            id.textContent = `Id: ${entry._id}`;
            let name = document.createElement('p');
            name.classList.add('text-center');
            name.textContent = `Name: ${entry.name}`;
            let message = document.createElement('p');
            message.classList.add('text-center')
            message.textContent = `Message: ${entry.message}`;
            parent.appendChild(id);
            parent.appendChild(name);
            parent.appendChild(message);
            div.appendChild(parent);

        })
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
                <div id="div-read-container" class="div-crud-container">
                    <h2 class="h2-crud-op">Read</h2>
                    <label class="label-crud">Id: </label>
                    <input onChange={this.inputHandler} name="id" id="input-read-id" class="input-crud" type="text"></input>
                    <br/>
                    <button onClick={this.readOne} class="button-crud" id="button-read-one">Read One</button>
                    <br></br>
                    <button onClick={this.readAll} class="button-crud" id="button-read">Read All</button>
                </div>
            </>
        )
    }
}

export default Read;