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
    ) {
        try {
            asyncFunction(this.resolve, this.reject);
        } catch(error) {
            this.reject(error);
        }

        this.resolved = null;
        this.rejected = null;

        this.thenFuncs = [];
        this.catchFunc = null;
    }

    // (arg) => console.log(arg))
    resolve(resolved) {
        this.resolved = resolved;
        try {
            this.thenFuncs.forEach(
                (func) => {
                   const returnValue = func(this.resolved);
                   this.resolved = returnValue;
                } 
            );
        } catch (error) {
            this.reject(error);
        }
    }

    reject(rejected) {
        this.rejected = rejected;
        if (this.catchFunc) {
            this.catchFunc(this.rejected);
        } else {
            throw new Error(this.rejected);
        }
    }

    then(thenFunc) {
        this.thenFuncs.push(thenFunc);
        return this;
    }

    catch(catchFunc) {
        this.catchFunc = catchFunc;
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
        (arg) => {
            console.log(arg); 
            return arg;
        } // responsibility of the thenfunc to provide the next resovled
    ).then((arg) => arg++);




// const PromiseInstance = (asyncFunction){

// }

// const Promise = (asyncFunction) => {
//     return PromiseInstance(asyncFunction);
// }