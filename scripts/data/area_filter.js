const restaurants = require('./restaurants-cleaned.json')

const findArea = (array) => {
    let areaClean = []
    for (let i=0 ; i<array.length ; i++) {
        if (areaClean.length === 0) {
            areaClean.push(array[i].area)
        }
        else {
            let count = 0
            for (let j=0 ; j<areaClean.length ; j++) {
               if (array[i].area === areaClean[j]) {
                    count = count + 1
              }
            }
            if ( count === 0) {
              areaClean.push(array[i].area)
            }
        
    }
  }
  return areaClean.sort()
}


const areaCleaned = findArea(restaurants)

const newAreaCleaned = areaCleaned.map((e, index) => ({
    id: index + 1,
    name: e
}))

console.log(JSON.stringify(newAreaCleaned, null, 2))