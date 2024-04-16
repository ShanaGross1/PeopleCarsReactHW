import React from 'react';
import TableRow from './TableRow';
import axios from 'axios';
import { Link } from 'react-router-dom';
class PeopleTable extends React.Component {

    state = {
        people: [],
        searchedText: '',
        searchedPeople: []
    }

    componentDidMount = async () => {
        this.refreshTable();
    }

    refreshTable = async () => {
        const response = await axios.get('/api/people/getpeople');
        this.setState({ people: response.data });
    }

    onSearchInputChange = (e) => {
        const text = e.target.value;
        this.setState({ searchedText: text, searchedPeople: [...this.state.people.filter(p => p.firstName.includes(text) || p.lastName.includes(text))] });
    }

    onClearSearchClick = () => {
        this.refreshTable();
        this.setState({ searchedText: '' });
    }

    render() {
        const { people, searchedText, searchedPeople } = this.state;

        return (
            <>
                <div className='row mt-3'>
                    <div className='col-md-10'>
                        <input type="text" className="form-control form-control-lg" onChange={this.onSearchInputChange} value={searchedText} placeholder="Search People" />
                    </div>
                    <div className='col-md-2'>
                        <button class="btn btn-dark btn-lg w-100" onClick={this.onClearSearchClick}>Clear</button>
                    </div>
                </div>
                <div className='mt-4'>
                    <Link to='/addperson'>
                        <button class="btn btn-success btn-lg w-100" >Add Person</button>
                    </Link>
                </div>

                <table className="table table-hover table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Age</th>
                            <th>Car Count</th>
                            <th>Add Car</th>
                            <th>Delete Cars</th>
                        </tr>
                    </thead>
                    <tbody>
                        {!searchedText && people.map(p => <TableRow key={p.id} person={p} />)}
                        {searchedText && searchedPeople.map(p => <TableRow key={p.id} person={p} />)}
                    </tbody>
                </table>
            </>
        )
    }
}

export default PeopleTable;