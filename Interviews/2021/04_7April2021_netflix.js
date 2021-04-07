/*
1 algorithm
2 find the bug / algorithm
3 break down a webpage
4 find the bug / async promises
5 optimize web page
*/

// #4
const startTime = Date.now();

function loadImage(url) {
    console.log(`Starting to load ${url}`);

    return new Promise(resolve => {
        setTimeout(() => {
            resolve(
                console.log(
                    `Finished loading url: ${url} at ${Date.now() - startTime}`
                )
            )
        }, 2000);
    });
}

// Loads resources one at a time in the order they were requested
class SerialLoader {
    loadQueue = [];

    loading = false;

    loadNextResource() {
        if (!this.loadQueue.length) return;
        this.loading = true;

        console.log(this.loadQueue);

        const resource = this.loadQueue.shift();

        loadImage(resource).then(res => {

            this.loading = false;

            if (this.loadQueue.length) {
                this.loadNextResource()
            }
        });

        console.log(this.loadQueue);
    }

    addRequest(url) {
        this.loadQueue.push(url);
        if (!this.loading) {
            this.loadNextResource();
        }
    }
}

const myLoader = new SerialLoader();

myLoader.addRequest('http://www.netflix.com/resource1');
myLoader.addRequest('http://www.netflix.com/resource2');
myLoader.addRequest('http://www.netflix.com/resource3');
/*
Kevin ran 55 lines of JavaScript (finished in 808ms):

[ 'http://www.netflix.com/resource1' ]
Starting to load http://www.netflix.com/resource1
[]
>  Finished loading url: http://www.netflix.com/resource1 at 2010
[
  'http://www.netflix.com/resource2',
  'http://www.netflix.com/resource3'
]
Starting to load http://www.netflix.com/resource2
[ 'http://www.netflix.com/resource3' ]
Finished loading url: http://www.netflix.com/resource2 at 4013
[ 'http://www.netflix.com/resource3' ]
Starting to load http://www.netflix.com/resource3
[]
Finished loading url: http://www.netflix.com/resource3 at 6016
*/