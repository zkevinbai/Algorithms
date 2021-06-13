/*
Goal - write the promise API

- then
    - resolve
    - reject
- catch

// async
    callback that takes resolve reject

    mysteryfunc
    run the thing
    return success / fail

    here
    const myPromise = new Promise(
        (resolve, reject) => {
            setTimeout(() => {
                resolve('foo');
            }, 300);
        }
    );
*/


class myPromise {
    constructor(
        asyncFunction,
        resolved,
        rejected,
    ) {
        try {
            asyncFunction(this.resolve, this.reject);
        } catch(error) {
            this.reject(error);
        }
        this.pending = true;
        this.resolved = resolved || false;
        this.rejected = rejected || false;
    }

    resolve(resolved) {
        this.success = resolved;
    }

    reject(rejected) {
        this.pending = false;
        this.rejected = rejected;
    }

    then(actionFunc) {
        if (resolved) {
            actionFunc(resolved);
        } 
        return this;
    }

    catch(actionFunc) {
        if (rejected) {
            actionFunc(rejected);
        }
        return this;
    }
}

const examplePromise = new 
    myPromise(() => setTimeout(0, console.log('hello')))
    .then((resolve) => console.log(resolve))
    .catch()
;

const mymyPromise = 
    new myPromise(
        (resolve, reject) => {
            const asyncAction = fetch('someURL.io');
            resolve(asyncAction);
        }
    ) // now we have an instance of myPromise, with the asyncAction running in the background
    .then(
        (arg) => console.log(arg))
    ).this;

    // finished running, returning the same instance of myPromise



// const PromiseInstance = (asyncFunction){

// }

// const Promise = (asyncFunction) => {
//     return PromiseInstance(asyncFunction);
// }