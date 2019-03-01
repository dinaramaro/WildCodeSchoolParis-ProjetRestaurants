import React, {Component} from 'react';
import { Form, Input, Button, Container, Col, Row } from 'reactstrap';
import axios from 'axios';
import RestaurantItem from './RestaurantItem';
import './SearchRestaurants.scss';


const findCategory = (array, column) => {
  let unique = []
  if (array.length !== 0) {
    for (let i=0; i<array.length; i++) {
      if (unique.length === 0) {
        unique.push(array[i][column])
      } else {
        let count = 0;
        for (let j=0; j<unique.length; j++) {
          if (unique[j] === array[i][column]) {
            count = count + 1
          }
        } if (count === 0 && array[i][column] !== null) {
          unique.push(array[i][column])
        }
      } 
    } return unique;
  } 
}

class SearchRestaurants extends Component {
    state = {
        areas: [],
        restaurants: [],
        message: "",
        primaryCategory : [],
        secondaryCategory : [],
        rating : [],
        targetAreaId: undefined,
        targetRating: undefined,
        targetPrimaryCategory: undefined,
        targetSecondCategory: undefined,
        favoritesUser: []
    }

    componentDidMount() {
        axios.get('http://localhost:3001/api/areas')
        .then(data => this.setState({ areas: data.data}))

        axios.get('http://localhost:3001/api/restaurants')
        .then(data => {
          this.setState({ 
            restaurants : data.data,
            primaryCategory : findCategory(data.data, "primaryCategory"),
            secondaryCategory : findCategory(data.data, "secondaryCategory"),
            rating : findCategory(data.data, "editorialRating")
          })
        })
        .then(result => { 
          axios.get('http://localhost:3001/api/users/1')
          .then(favorites => {
            this.setState({
              favoritesUser: favorites.data 
            })
          })
          .then(result => {
            if (this.state.restaurants !== 0) {
            this.allRestaurantsAndFavorites(this.state.favoritesUser, this.state.restaurants)
            }
          })
        })
    }
    
    allRestaurantsAndFavorites = (favorites, restaurantsTab) => {
      console.log('favorites', favorites)
      console.log('restaurantsTab', restaurantsTab)
      let restaurantByUser = []
      favorites.map(favorite => {
        restaurantByUser = this.state.restaurants.map(rest => {
          if (rest.id === favorite.restaurant_id) {
            return ({ ...rest, isFavorite: true})
          }
          return rest
        })
        this.setState({
          restaurants: restaurantByUser
        })
      })

    }

    newArrayWithFavorites = (array) => {
      this.setState({
        restaurants: array
      })
    }

    onSubmit = (e) => {
        const {targetRating, targetAreaId, targetPrimaryCategory, targetSecondCategory} = this.state

        let ratingUrl = ``
        let areaUrl = ``
        let firstCategoryUrl = ``
        let secondCategoryUrl = ``

        if (targetRating) {
          if (targetRating === "undefined") {
            ratingUrl = ``
          } else {
            ratingUrl = `&rating=${targetRating}`
          }
           
        }

        if(targetAreaId) {
          if (targetAreaId === "undefined") {
            areaUrl = ``
          } else {
            areaUrl = `&id_area=${targetAreaId}`
          }
            
        }
        if(targetPrimaryCategory) {
          if (targetPrimaryCategory === "undefined") {
            firstCategoryUrl = ``
          } else {
            firstCategoryUrl = `&first_category=${targetPrimaryCategory}`
          }
        }

        if(targetSecondCategory) {
          if (targetSecondCategory === "undefined") {
            secondCategoryUrl = ``
          } else {
            secondCategoryUrl = `&second_category=${targetSecondCategory}`
          }
        }

        e.preventDefault()

        axios.get('http://localhost:3001/api/users/1')
        .then(favorites => {
          this.setState({
            favoritesUser: favorites.data 
          })
        })


        axios.get(`http://localhost:3001/api/restaurants/?result=all${areaUrl}${firstCategoryUrl}${secondCategoryUrl}${ratingUrl}`)
        .then(data => {
          this.setState({ 
              restaurants: data.data,
              message: data.data.message,
          })
        })
        .then(data => {
          if(this.state.restaurants !== 0) {
            this.allRestaurantsAndFavorites(this.state.favoritesUser, this.state.restaurants)
           }
        })   
    }

    handleChangeArea = (e) => {
      const id = e.target.value;
        this.setState({
            targetAreaId: id,
        })
    }

    handleChangePrimaryCategory = (e) => {
      const primaryCategory = e.target.value;
      this.setState({
        targetPrimaryCategory : primaryCategory,
      })
    }

    handleChangeSecondaryCategory = (e) => {
      const secondaryCategory = e.target.value;
      this.setState({
        targetSecondCategory : secondaryCategory,
      })
    }

    handleChangeRating = (e) => {
      const rating = e.target.value;
      this.setState({
        targetRating : rating,
      })
    }

    handleClickAllFavorites = () => {
      axios.get('http://localhost:3001/api/users/1')
        .then(favorites => {
          this.setState({
            restaurants: favorites.data.map(restaurant => {
              return ({ ...restaurant, isFavorite: true})
            })
          })
          console.log(favorites.data)
        })
        

    }

    render() {
        const { areas, restaurants, message, primaryCategory, secondaryCategory, rating } = this.state;
        return(
            <Container className="SearchRestaurants">
                <p>Search Bar</p>
                
                <Form onSubmit={this.onSubmit}>
                <Row className="searchbar">
                <Col lg="3" md="1">
                    <Input type="select" onChange={this.handleChangeArea}>
                      <option value="undefined">Sélectionnez un quartier</option>
                        {areas.map(area => (
                            <option key={area.id} value={area.id}>{area.name}</option>
                        ))}
                    </Input>
                    </Col>
                    <Col lg="3" md="1">
                    <Input type="select" onChange={this.handleChangePrimaryCategory}>
                      <option value="undefined">Sélectionnez une catégorie</option>
                          {primaryCategory.map(restaurant => (
                            <option key={restaurant} value={restaurant}>{restaurant}</option>
                          ))}
                    </Input>
                    </Col>
                    <Col lg="3" md="1">
                    <Input type="select" onChange={this.handleChangeSecondaryCategory}>
                      <option value="undefined">Sélectionnez une catégorie</option>
                          {secondaryCategory.map(restaurant => (
                            <option key={restaurant} value={restaurant}>{restaurant}</option>
                          ))}
                    </Input>
                    </Col>
                    <Col lg="3" md="1">
                    <Input type="select" onChange={this.handleChangeRating}>
                      <option value="undefined">Sélectionnez une note</option>
                          {rating.map(restaurant => (
                            <option key={restaurant} value={restaurant}>{restaurant}</option>
                          ))}
                    </Input>
                    </Col>
                    </Row>
                <Button type="submit" className="button">ok</Button>
                </Form>
                <Button onClick={this.handleClickAllFavorites}>Voir mes favoris</Button>
                
                {restaurants.length ? (<RestaurantItem filteredRestaurants={restaurants} newArrayParent={this.newArrayWithFavorites}/>)
                : (<p>{message}</p>)}
            </Container>
        )
    }
}
export default SearchRestaurants;