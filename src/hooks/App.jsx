import React, { useState, useEffect} from 'react'
import Form from './form/Form'
import ContactList from './new_contact/ContactList'
import Filter from './filter/Filter'
import { nanoid } from 'nanoid'

const CONTACTS_KEY = 'contacts_key';

const App = () => {
  const [contacts, setContacts] = useState(() => { 
    return JSON.parse(window.localStorage.getItem(CONTACTS_KEY)) ?? [];
  }
);
  const [filter, setFilter] = useState('');

    
  useEffect(() => {
    localStorage.setItem(CONTACTS_KEY, JSON.stringify(contacts))
  }, [contacts]);
  

  const formSubmitHandle = data => {
    data.id = nanoid();
    if (
      contacts.find(
        contact => contact.name.toLowerCase() === data.name.toLowerCase())
    ) {
      alert(`${data.name} is already in Contacts.`);
      return;
    }
    setContacts([data, ...contacts])
  };
  
 
  const handleFilterInputChange = (event) => {
   setFilter(event.target.value);
  }
  

  const renderContacts = () => {
    const normalizedFilter = filter.toLowerCase();
      return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const onDeleteButton = id => {
    setContacts(contacts.filter(contact => contact.id !== id))
  };

    return(
      <>
        <h2>Phonebook</h2>
        <Form onSubmit={formSubmitHandle} />
        
          <h2>Contacts</h2>
          <Filter value={filter} onChange={handleFilterInputChange} />
          
          {contacts.length ? (
            <ContactList contacts={renderContacts()} onDeleteButton={onDeleteButton } />) : (
            <p>Contact not found</p>
          )}
    </>
  );
};

export default App;