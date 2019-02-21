import React, {Component} from 'react';
import { Form, Input, Button } from 'reactstrap';
import axios from 'axios';

class SearchBar extends Component {
    state = {
        areas: [],
        area: "",
        restaurants: []
    }

    componentDidMount() {
        axios.get('http://localhost:3001/api/areas')
        .then(data => this.setState({ areas: data.data}))
    }
    onSubmit = (e) => {
        e.preventDefault()
        axios.get(`http://localhost:3001/api/restaurants/area/${this.state.area}`)
        .then(data => this.setState({ restaurants: data.data}))
    }

    handleChange = (e) => {
        this.setState({
            area: e.target.value
        })
    }

    render() {
        const { areas } = this.state;

        return(
            <div>
                <p>Search Bar</p>
                <Form onSubmit={this.onSubmit}>
                    <Input type="select" onChange={this.handleChange}>
                        {areas.map(area => (
                            <option key={area.id}>{area.name}</option>
                        ))}
                    </Input>
                <button type="submit">ok</button>
                </Form>
            </div>
        )
    }
}
export default SearchBar;