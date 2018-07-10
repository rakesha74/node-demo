var asyncAdd = (a,b) => {
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            if(typeof a === "number" && typeof b === "number"){
                resolve(a+b);
            }else{
                reject("Arguments must be numbers");
            }
        },2500);
    });
};

// asyncAdd(5,7).then((res)=>{
//     console.log("Result: "+res);
//     return asyncAdd(res,33);
// },(errorMessage)=>{
//     console.log(errorMessage);
// }).then((res)=>{
//     console.log("Should be 45", res);
// },(errorMessage)=>{
//     console.log(errorMessage);
// });

//In the above method if the upper promise fails then second will be executed but idf we use catch then if any one of the promise fails then another one will not be executed.

asyncAdd(5,"7").then((res)=>{
    console.log("Result: "+res);
    return asyncAdd(res,33);
}).then((res)=>{
    console.log("Should be 45", res);
}).catch((errorMessage)=>{
    console.log(errorMessage);
});



// var somePromise = new Promise((resolve,reject)=>{
//     setTimeout(()=>{
//         //resolve("Hey! It worked");
//         reject("Unable to Fulfill Promise");
//     },2500)
// });
//
// somePromise.then((message)=>{
//     console.log("Success: "+message);
// },(errorMessage)=>{
//     console.log("Error: "+errorMessage);
// });



//resolve and reject will be called only once. two resolve statements leads to the execution of first one.