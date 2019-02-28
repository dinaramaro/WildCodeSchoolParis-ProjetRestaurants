import React, { Component } from 'react';
import { Card, Button } from 'reactstrap';
import './RestaurantItem.scss';
import axios from 'axios';

const imgRestaurant = require('../images/restaurant.png');
const imgBar = require('../images/wine.png');
const imgBarBeer = require('../images/beer.png')
const imgRecommended = require('../images/recommended.png');

let background_star = 'background_star_empty'

class RestaurantItem extends Component {

  classPrimaryCategory = (firstCategory, secondCategory) => {
    if(firstCategory === 'Restaurants')
      return imgRestaurant
    if(firstCategory === 'Bars') {
      if(secondCategory === 'Bars à bières')
      return imgBarBeer
    }
    return imgBar
  }
  handleClickFavorite = (id_restaurant, id_user, isFavorite) => {
    let newArrayChild = []
    if (isFavorite) {
      axios.delete(`http://localhost:3001/api/users/favorites/${id_user}/${id_restaurant}`)
      .then(result => {
        console.log(result)
        newArrayChild = this.props.filteredRestaurants.map(rest => {
          if (rest.id === id_restaurant) {
            return ({ ...rest, isFavorite: false})
          }
          return rest
        })
      })
      .then(newArray => {
        console.log(newArrayChild)
        this.props.newArrayParent(newArrayChild)
      })
      .catch(error => {
        console.log(error)
      })
    }
    else {
      const data = { id_restaurant, id_user}
      axios.post('http://localhost:3001/api/users/favorites', data)
        .then(result => {
          console.log(result)
          newArrayChild = this.props.filteredRestaurants.map(rest => {
            if (rest.id === id_restaurant) {
              return ({ ...rest, isFavorite: true})
            }
            return rest
          })
        })
        .then(newArray => {
          console.log(newArrayChild)
          this.props.newArrayParent(newArrayChild)
        })
        .catch(error => {
          console.log(error)
          
        })
    }
      
  }
  

  render() {
    const {filteredRestaurants} = this.props;
  return (
    <div className="RestaurantItem">
    {filteredRestaurants.map(restaurant => (
      <div key={restaurant.id}>
        <Card className="card">
          <div className='bloc_img' style={{backgroundImage:`url(${restaurant.imageUrl})`}}>
          </div>
          <div className="bloc_infos">
            <div className="info_item_parent">
              <h3>{restaurant.name}</h3>
              {restaurant.editorialRating ? 
                (<div className="info_item" >
                  <img className="img_front rating" src={imgRecommended} alt="rating"/>
                  <span>{restaurant.editorialRating}/5</span>
                </div>)
                :
                (<div className="info_item" >
                  <img className="img_front rating" src={imgRecommended} alt="rating"/>
                  <span>pas de note</span>
                </div>)
              }         
            </div>
            <div className="bloc_text">
              <p>{restaurant.annotation.split(/\s/).slice(0, 50).join(' ')} ...</p>
            </div>
            <div className="info_item_parent">
              <div className="info_item">
                <div>
                  <img className="primary_category img_front" src={this.classPrimaryCategory(restaurant.primaryCategory, restaurant.secondaryCategory)} alt={restaurant.primaryCategory}/>
                </div>
                <span className="secondary_category">{restaurant.secondaryCategory}</span>
              </div>
              <div className="info_item">
                {restaurant.isFavorite ?
                  (<div onClick={() => this.handleClickFavorite(restaurant.id, 1, restaurant.isFavorite)} className="background_star" ></div>)
                  :
                  (<div onClick={() => this.handleClickFavorite(restaurant.id, 1, restaurant.isFavorite)} className="background_star_empty" ></div>)
                }
                <Button>Voir plus</Button>
              </div> 
            </div>
          </div>
        </Card>
      </div>))}
      </div>
    )
  }
}

export default RestaurantItem;