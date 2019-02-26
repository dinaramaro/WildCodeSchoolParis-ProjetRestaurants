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
        rating: undefined,
        firstCategory: 'Bars',
        secondCategory: undefined
    }

    componentDidMount() {
        axios.get('http://localhost:3001/api/areas')
        .then(data => this.setState({ areas: data.data}))
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
        axios.get(`http://localhost:3001/api/restaurants/?result=all${areaUrl}${firstCategoryUrl}${secondCategoryUrl}${ratingUrl}`)
        .then(data => {
            this.setState({ 
                restaurants: data.data,
                message: data.data.message,
            })
        })
    }

    handleChange = (e) => {
      const id = e.target.value;
        this.setState({
            areaId: id,
        })
    }

    render() {
        const { areas, restaurants, message } = this.state;
        console.log(message)
        console.log(restaurants.length)
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
                {restaurants.length ? (<RestaurantItem filteredRestaurants={restaurants}/>)
                : (<p>{message}</p>)}
            </div>
        )
    }
}
export default SearchRestaurants;