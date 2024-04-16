import react from 'react';
import { produce } from 'immer';
import withRouter from './WithRouter';
import axios from 'axios';

class AddCar extends react.Component {

    state = {
        carOwner: '',
        car: {
            make: '',
            model: '',
            year: ''
        }
    }

    componentDidMount = async () => {
        const { data } = await axios.get(`/api/people/getbyid?id=${this.props.params.id}`);
        this.setState({ carOwner: data.firstName + ' ' + data.lastName })
    }


    onTextChange = e => {
        const nextState = produce(this.state, draftState => {
            draftState.car[e.target.name] = e.target.value;
        });
        this.setState(nextState);
    }

    onSubmitClick = async () => {
        await axios.post('/api/cars/addcar', { ...this.state.car, personId: this.props.params.id });
        this.props.navigate('/');
    }

    render() {
        const { make, model, year } = this.state.car;
        return (
            <div className="row">
                <div className="col-md-6 offset-md-3 card bg-light p-4" style={{ marginTop: 200 }}>
                    <h1>Add a car for {this.state.carOwner}</h1>
                    <input type="text" value={make} name='make' onChange={this.onTextChange} className="form-control" placeholder="Make" />
                    <br />
                    <input type="text" value={model} name='model' onChange={this.onTextChange} className="form-control" placeholder="Model" />
                    <br />
                    <input type="text" value={year} name='year' onChange={this.onTextChange} className="form-control" placeholder="Year" />
                    <br />
                    <button onClick={this.onSubmitClick} className="btn btn-primary btn-block">Submit</button>
                </div>
            </div>
        )
    }
}

export default withRouter(AddCar); 