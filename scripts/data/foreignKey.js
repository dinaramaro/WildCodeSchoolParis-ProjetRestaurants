const restaurants = require('./restaurants-cleaned.json')
const areas = require('./newAreaCleaned.json')

const addIdArea = (restaurants, areas) => {
    const restaurantsIdArea = []
    restaurants.map(e => {
        areas.map(a => {
            if (e.area === a.name) {
                restaurantsIdArea.push({
                  name: e.name,
                  annotation: e.annotation,
                  timeoutWebpageUrl: e.timeoutWebpageUrl,
                  imageUrl: e.imageUrl,
                  primaryCategory: e.primaryCategory,
                  secondaryCategory: e.secondaryCategory,
                  id_area: a.id,
                  streetAdress: e.streetAdress,
                  arrondissement: e.arrondissement,
                  city: e.city,
                  latitude: e.latitude,
                  longitude: e.longitude,
                  editorialRating: e.editorialRating,
                  priceDescription: e.priceDescription,
                  priceLevel: e.priceLevel
                })
            }
        })
    })
    return restaurantsIdArea;
}
const newRestaurants = addIdArea(restaurants, areas)
console.log(JSON.stringify(newRestaurants, null, 2))

