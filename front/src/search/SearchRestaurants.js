import React, {Component} from 'react';
import { Form, Input, Button } from 'reactstrap';
import axios from 'axios';
import RestaurantItem from './RestaurantItem';

class SearchRestaurants extends Component {
    state = {
        areas: [],
        areaId: "",
        restaurants: []
    }

    componentDidMount() {
        axios.get('http://localhost:3001/api/areas')
        .then(data => this.setState({ areas: data.data}))
    }

    onSubmit = (e) => {
        e.preventDefault()
        axios.get(`http://localhost:3001/api/restaurants/area/${this.state.areaId}`)
        .then(data => this.setState({ restaurants: data.data}))
    }

    handleChange = (e) => {
      const id = e.target.value;
        this.setState({
            areaId: id,
        })
    }

    render() {
        const { areas, restaurants } = this.state;
        return(
            <div>
                <p>Search Bar</p>
                <Form onSubmit={this.onSubmit}>
                    <Input type="select" onChange={this.handleChange}>
                        {areas.map(area => (
                            <option key={area.id} value={area.id}>{area.name}</option>
                        ))}
                    </Input>
                <Button type="submit">ok</Button>
                </Form>
                <RestaurantItem filteredRestaurants={restaurants} />
            </div>
        )
    }
}
export default SearchRestaurants;