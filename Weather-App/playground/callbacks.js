var getUser = (id, callback) => {
    var user = {
        id: id,
        name: "Vikram"
    };

    setTimeout(()=>{
        callback(user,3);
    },3000);
    //callback(user);
}

getUser(31,(userObject,number) => {
    console.log(JSON.stringify(userObject)+number);
});