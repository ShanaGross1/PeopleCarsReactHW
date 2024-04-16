import react from 'react';
import { produce } from 'immer';
import withRouter from './WithRouter';
import axios from 'axios';

class AddPerson extends react.Component {
    state = {
        person: {
            firstName: '',
            lastName: '',
            age: ''
        }
    }

    onTextChange = e => {
        const nextState = produce(this.state, draftState => {
            draftState.person[e.target.name] = e.target.value;
        });
        this.setState(nextState);
    }

    onSubmitClick = async () => {
        await axios.post('/api/people/addperson', { ...this.state.person});
        this.props.navigate('/');
    }

    render() {
        const { firstName, lastName, age } = this.state.person;
        return (
            <div className="row">
                <div className="col-md-6 offset-md-3 card bg-light p-4" style={{ marginTop: 200 }}>
                    <h1>Add a New Person</h1>
                    <input type="text" value={firstName} name='firstName' onChange={this.onTextChange} className="form-control" placeholder="First Name" />
                    <br />
                    <input type="text" value={lastName} name='lastName' onChange={this.onTextChange} className="form-control" placeholder="Last Name" />
                    <br />
                    <input type="text" value={age} name='age' onChange={this.onTextChange} className="form-control" placeholder="Age" />
                    <br />
                    <button onClick={this.onSubmitClick} className="btn btn-primary btn-block">Submit</button>
                </div>
            </div>
        )
    }
}

export default withRouter(AddPerson); 

