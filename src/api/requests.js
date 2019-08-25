import {getAllFilmsUrl} from './urls'

/*Function to get all movies*/
export function getAllFilms(callback) {
    return fetch(getAllFilmsUrl).then((resp) => {
        return resp.json()
    }).then((response) => {
        callback(true, response)
    }).catch(err =>{
        callback(false, err)
    })

}