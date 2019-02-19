const {get} = require('lodash')

const restaurants = require('./restaurants.json')
// parse auto en utilisant require
console.log(JSON.stringify(restaurants.slice(0, 3), null, 2));
console.log(
    restaurants
        .map(restaurant => ({
            name: restaurant.name,
            description: restaurant.description,
            timeoutWebpageUrl: restaurant.to_website,
            annotation: restaurant.annotation,
            imageUrl: restaurant.image.url,
            // primaryCategory:
            //     restaurant.categorisation && restaurant.categorisation.primary.name,
            primaryCategory: get(restaurant, 'categorisation.primary.name', ''),
            secondaryCategory: get(restaurant, 'categorisation.secondary.name', ''),
            aera: get(restaurant, 'aera.name', ''),
            streetAddress: restaurant.address1,
            arrondissement: get(restaurant, 'address2', ''),
            latitude: restaurant.latitude,
            longitude: restaurant.longitude,
            rating: restaurant.editorial_rating,
            priceDescription: restaurant.price,
            priceLevel: restaurant.price_level
        }))
        .filter(restaurant => (restaurant.description || restaurant.annotation) && restaurant.streetAddress)
)