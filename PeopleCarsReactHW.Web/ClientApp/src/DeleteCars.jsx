import react from 'react';
import withRouter from './WithRouter';
import axios from 'axios';
import CarRow from './CarRow';

class DeleteCars extends react.Component {
    state = {
        cars: []
    }

    componentDidMount = async () => {
        const { data } = await axios.get(`/api/cars/getcars?id=${this.props.params.id}`);
        this.setState({ cars: data })
    }

    onConfirmDeleteClick = async () => {
        await axios.post('/api/cars/deletecars', { id: this.props.params.id });
        this.props.navigate('/');
    }

    onCancelClick = () => {
        this.props.navigate('/');
    }

    render() {
        return (
            <>
                <table className="table table-hover table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>Make</th>
                            <th>Model</th>
                            <th>Year</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.cars.map(c => <CarRow car={c} key={c.id} />)}
                    </tbody>
                </table>

                <h1>Are you sure you want to delete all of these cars?</h1>
                <button class="btn btn-primary btn-lg w-100" onClick={this.onCancelClick}>No</button>
                <button class="btn btn-danger btn-lg w-100" onClick={this.onConfirmDeleteClick}>yes</button>
            </>
        );
    }
}

export default withRouter(DeleteCars); 