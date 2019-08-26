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

export function getAllCast(urls, callback) {

// map every url to the promise of the fetch
    console.log(urls)
    let requests = urls.map(url => { return fetch(url)});

// Promise.all waits until all jobs are resolved
    Promise.all(requests)
        .then(responses => Promise.all(responses.map(r => r.json()))
        ).then(response =>
        callback(true, response))
        .catch(err =>{
                callback(false, err)
            });
}