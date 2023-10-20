import {Component} from "react";
import '../App.css';

export default class Phone extends Component {


    state = {
        phones: [],
        phoneName: '',
        phoneNumber: ''
    }

    setPhoneName = (name) => {
        this.setState({phoneName: name})
    }

    setPhoneNumber = (number) => {
        this.setState({phoneNumber: number})
    }

    setPhones = (phones) => {
        this.setState({phones: phones})
    }

    getPhones = () => {
        const {contactId} = this.props
        fetch(`http://localhost:5000/api/contacts/${contactId}/phones`,{
            method: 'GET',
        }).then(response => response.json())
            .then(data => {
                this.setPhones(data)
                console.log(data)
            })
    }

    componentDidMount() {
        this.getPhones()
    }


    addPhone = (contactId) => {
        fetch(`http://localhost:5000/api/contacts/${contactId}/phones`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: this.state.phoneName, number: this.state.phoneNumber })
        })
            .then(response => response.json())
            .then(data => {
                this.state.phones.push(data);
                this.setPhoneName('');
                this.setPhoneNumber('');
            });
    };

    deletePhone = (contactId,phoneId) => {
        fetch(`http://localhost:5000/api/contacts/${contactId}/phones/${phoneId}`, {
            method: 'DELETE'
        })
            .then(() => {
                const updatedPhones = this.state.phones.filter(phone => phone.id !== phoneId);
                this.setPhones(updatedPhones);
            });
    };



    render() {
        const {contactId} = this.props
        return (
            <div>
                <div className="contact-block">
                    <input type="text" placeholder={"Name"} value={this.state.phoneName}
                           onChange={e => this.setPhoneName(e.target.value)}/>

                    <input type="text" placeholder={"Phone Number"} value={this.state.phoneNumber }
                           onChange={e => this.setPhoneNumber(e.target.value)}/>
                    <button onClick={() => this.addPhone(contactId)}>Add Phone</button>
                </div>
                <table className={"table"}>
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Number</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.phones.map(phone => (
                        <tr key={phone.id}>
                            <td>{phone.name}</td>
                            <td>{phone.number}</td>
                            <td>
                                <button onClick={() => this.deletePhone(contactId,phone.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

    )
    }
}