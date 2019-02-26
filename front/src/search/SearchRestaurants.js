import React, {Component} from 'react';
import { Form, Input, Button } from 'reactstrap';
import axios from 'axios';
import RestaurantItem from './RestaurantItem';

class SearchRestaurants extends Component {
    state = {
        areas: [],
        areaId: "",
        restaurants: [],
        filteredRestaurants: []
    }

    componentDidMount() {
        axios.get('http://localhost:3001/api/areas')
        .then(data => this.setState({ areas: data.data}))

        axios.get('http://localhost:3001/api/restaurants')
        .then(data => this.setState({ restaurants : data.data}))
    }

    onSubmit = (e) => {
        e.preventDefault()
        axios.get(`http://localhost:3001/api/restaurants/area/${this.state.areaId}`)
        .then(data => this.setState({ filteredRestaurants: data.data}))
    }

    handleChange = (e) => {
      const id = e.target.value;
        this.setState({
            areaId: id,
        })
    }

    render() {
        const { areas, restaurants, filteredRestaurants } = this.state;

        return(
            <div>
                <p>Search Bar</p>
                <Form onSubmit={this.onSubmit}>
                    <Input type="select" onChange={this.handleChange}>
                        {areas.map(area => (
                            <option key={area.id} value={area.id}>{area.name}</option>
                        ))}
                    </Input>
                    <Input type="select">
                          {Array.from(new Set(restaurants)).map(restaurant => (
                            <option key={restaurant.primaryCategory}>{restaurant.primaryCategory}</option>
                          ))}
                    </Input>
                <Button type="submit">ok</Button>
                </Form>
                <RestaurantItem filteredRestaurants={filteredRestaurants} />
            </div>
        )
    }
}
export default SearchRestaurants;