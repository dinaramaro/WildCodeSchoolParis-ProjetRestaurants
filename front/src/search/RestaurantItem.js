import React from 'react';
import { Card, Button } from 'reactstrap';
import './RestaurantItem.scss';
const imgRestaurant = require('../images/restaurant.png');
const imgBar = require('../images/wine.png');
const imgBarBeer = require('../images/beer.png')
const imgRecommended = require('../images/recommended.png');

const classPrimaryCategory = (firstCategory, secondCategory) => {
  if(firstCategory === 'Restaurants')
    return imgRestaurant
  if(firstCategory === 'Bars') {
    if(secondCategory === 'Bars à bières')
    return imgBarBeer
  }
  return imgBar
}

const RestaurantItem = (props) => {
  const {filteredRestaurants} = props;
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
                  <img className="primary_category img_front" src={classPrimaryCategory(restaurant.primaryCategory, restaurant.secondaryCategory)} alt={restaurant.primaryCategory}/>
                </div>
                <span className="secondary_category">{restaurant.secondaryCategory}</span>
              </div>
              <div className="info_item">
                <div className="background_star"></div>
                <Button>Voir plus</Button>
              </div>
            </div>
          </div>
        </Card>
      </div>))}
      </div>
  )
}

export default RestaurantItem;