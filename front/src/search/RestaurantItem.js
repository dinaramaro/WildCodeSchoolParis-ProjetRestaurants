import React from 'react';
import { Card } from 'reactstrap';
  import './RestaurantItem.scss';

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
            <div className="info_item">
              <h3>{restaurant.name}</h3>
              <div>Rating</div>          
            </div>
            <div className="bloc_text">
              <p>{restaurant.annotation}</p>
            </div>
            <div className="info_item">
              <div className="info_item">
                <div>
                  <img className="primary_category" src={restaurant.primaryCategory} alt={restaurant.primaryCategory}/>
                </div>
                <span className="secondary_category">{restaurant.secondaryCategory}</span>
              </div>
              <div className="info_item">
                <button>Favoris</button>
                <button>Voir plus</button>
              </div>
            </div>
          </div>
        </Card>
      </div>))}
      </div>
  )
}

export default RestaurantItem;