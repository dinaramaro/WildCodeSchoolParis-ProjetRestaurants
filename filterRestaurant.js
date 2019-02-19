const fs = require('fs');
fs.readFile('./restaurants.json', (err, data) => {
    if (err)
        console.log(err);
    else {
        filterjson = []
        JSON
        .parse(data)
        .map(e => {
            if (e.name && e.annotation && e.image_url && e.address2 !== undefined) 
                filterjson.push([e.name, e.annotation, e.image_url, e.address2])
        });
        console.log(filterjson)
    }
})