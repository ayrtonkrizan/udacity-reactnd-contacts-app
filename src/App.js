import React, { Component } from 'react';
import ListContact from './ListContact';
import CreateContact from './CreateContact';
import * as ContactAPI from './utils/ContactsAPI';
import { Route } from 'react-router-dom';

class App extends Component {
  state = {
    contacts: [
     ]
  }

  componentDidMount(){
    ContactAPI.getAll()
      .then(contacts=> {
        this.setState(()=>({contacts}))
      })
  }
  
  removeContact = contact =>{
    this.setState(currentState => ({
      contacts: currentState.contacts.filter(c=> c.id !== contact.id)
    }))
    ContactAPI.remove(contact);
  }

  createContact = (contact) => {
    ContactAPI.create(contact)
      .then((contact) => {
        this.setState((currentState) => ({
          contacts: currentState.contacts.concat([contact])
        }))
      })
  }

  render() {
    return (
      <div>
        <Route exact path="/" render={() => (
          <ListContact 
            contacts={this.state.contacts}
            onDeleteContact = {this.removeContact}
            />
        )} />
        <Route path='/create' render={({history}) => (
          <CreateContact 
            onCreateContact={contact=>{
              this.createContact(contact);
              history.push('/');
            }}
          />
        )} />
      </div>
    );
  }
}

export default App;
