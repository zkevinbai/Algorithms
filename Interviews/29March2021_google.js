/*

part 1
function to handle async calls to server

have a list of urls from most to least reliable

async / await syntax

what if you want the best data

input = [ url1, url2, url3 ];
*/

const getBestData = async (urls) => {

    for (let i = 0; i < urls.length; i++) {
        const url = urls[i];

        const data = await get(url);

        if (data.status !== '404') {
            return data;
        }
    }

    // assume at least one will return
}

/*

part 2

what if you want the fastest data
*/

const getFastestData = async (urls) => {
    const promises = [];

    urls.forEach(url => promises.push(new Promise(get(url))));

    Promise.race(promises)
        .then((result) => result)
        .catch((error) => error)
}