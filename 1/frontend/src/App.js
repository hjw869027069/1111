import { useState, useEffect } from 'react';  // import useEffect
import './App.css';
import Phone from "./components/Phone";



function App() {
    const [contacts, setContacts] = useState([]);
    const [name, setName] = useState('');

    useEffect(() => {
        fetch('http://localhost:5000/api/contacts/')
            .then(response => response.json())
            .then(data => setContacts(data));
    }, []);




    const createContact = () => {
        fetch('http://localhost:5000/api/contacts/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name })
        })
            .then(response => response.json())
            .then(data => {
                setContacts([...contacts, data]);
                setName('');
            });
    };

    const deleteContact = (contactId) => {
        fetch(`http://localhost:5000/api/contacts/${contactId}`, {
            method: 'DELETE'
        })
            .then(() => {
                const updatedContacts = contacts.filter(contact => contact.id !== contactId);
                setContacts(updatedContacts);
            });
    };




    return (
        <div className="container">
            <h1>Contactor</h1>
            <h2>Contact</h2>
            <input type="text" placeholder={"Name"} value={name} onChange={e => setName(e.target.value)} className="input" />
            <br/>
            <button onClick={createContact} className="button">Create Contact</button>
            <hr />
            {contacts.map(contact => (
                <div key={contact.id} className="block">
                    <div className="contact-block">
                    <span className="contact-name">{contact.name}</span>
                    <button onClick={() => deleteContact(contact.id)} className="contact-delete">Delete</button>
                    </div>
                    <hr />
                    <Phone contactId={contact.id} />
                </div>
            ))}

            <p>Click a contact to view associated phone numbers</p>



        </div>
    );

}

export default App;