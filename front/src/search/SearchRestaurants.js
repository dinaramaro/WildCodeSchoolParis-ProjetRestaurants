import React, {Component} from 'react';
import { Form, Input, Button } from 'reactstrap';
import axios from 'axios';
import RestaurantItem from './RestaurantItem';

class SearchRestaurants extends Component {
    state = {
        areas: [],
        restaurants: [],
        message: "",
        areaId: undefined,
        rating: 5,
        firstCategory: 'Restaurants',
        secondCategory: 'Japonais',
        filteredRestaurants: [],
    }

    componentDidMount() {
        axios.get('http://localhost:3001/api/areas')
        .then(data => this.setState({ areas: data.data}))

        axios.get('http://localhost:3001/api/restaurants')
        .then(data => this.setState({ restaurants : data.data}))
    }

    onSubmit = (e) => {
        const {rating, areaId, firstCategory, secondCategory} = this.state

        let ratingUrl = ``
        let areaUrl = ``
        let firstCategoryUrl = ``
        let secondCategoryUrl = ``

        if (rating) {
           ratingUrl = `&rating=${rating}`
        }
        if(areaId) {
            areaUrl = `&id_area=${areaId}`
        }
        if(firstCategory) {
            firstCategoryUrl = `&first_category=${firstCategory}`
        }
        if(secondCategory) {
            secondCategoryUrl = `&second_category=${secondCategory}`
        }

        e.preventDefault()
<<<<<<< HEAD
        axios.get(`http://localhost:3001/api/restaurants/area/${this.state.areaId}`)
        .then(data => this.setState({ filteredRestaurants: data.data}))
=======
        axios.get(`http://localhost:3001/api/restaurants/?result=all${areaUrl}${firstCategoryUrl}${secondCategoryUrl}${ratingUrl}`)
        .then(data => {
            this.setState({ 
                restaurants: data.data,
                message: data.data.message,
            })
        })
>>>>>>> ee2c334ce05594442bb6a741c1f940df3a16a1f5
    }

    handleChange = (e) => {
      const id = e.target.value;
        this.setState({
            areaId: id,
        })
    }

    render() {
<<<<<<< HEAD
        const { areas, restaurants, filteredRestaurants } = this.state;

=======
        const { areas, restaurants, message } = this.state;
        console.log(message)
        console.log(restaurants.length)
>>>>>>> ee2c334ce05594442bb6a741c1f940df3a16a1f5
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
<<<<<<< HEAD
                <RestaurantItem filteredRestaurants={filteredRestaurants} />
=======
                {restaurants.length ? (<RestaurantItem filteredRestaurants={restaurants}/>)
                : (<p>{message}</p>)}
>>>>>>> ee2c334ce05594442bb6a741c1f940df3a16a1f5
            </div>
        )
    }
}
export default SearchRestaurants;