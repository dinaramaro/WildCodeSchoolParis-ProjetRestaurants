import React from 'react';
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button } from 'reactstrap';
  import './RestaurantItem.scss';

const RestaurantItem = (props) => {
  const {filteredRestaurants} = props;
  console.log(filteredRestaurants)
  return (
    <div className="RestaurantItem">
    {filteredRestaurants.map(restaurant => (
      <div key={restaurant.id}>
      <Card className="card">
        <div className='bloc_img'>
          <img className="cardimg" src={restaurant.imageUrl} alt="Card cap" />
        </div>
        <div className="bloc_text">
          <h3>{restaurant.name}</h3>
          <p>{restaurant.annotation}</p>
        </div>
      </Card>
      </div>))}
      </div>
  )
}

export default RestaurantItem;