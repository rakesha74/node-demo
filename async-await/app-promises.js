const users = [{
  id:1,
  name:"Andrew",
  schoolId:101
},{
    id:2,
    name:"Jessica",
    schoolId:999
}
];

const grades = [{
    id:1,
    schoolId:101,
    grade:86,
},
    {
        id:2,
        schoolId:999,
        grade:100,
    },
    {
        id:3,
        schoolId:101,
        grade:80,
    }];


const getUser = (id)=>{
    return new Promise((resolve,reject)=>{
       const user = users.find((user)=>user.id === id);

       if(user){
           resolve(user);
       }else
       {
           reject("Unable to find userwith id of::"+id);
       }
    });
};

const getGrades = (schoolId)=>{
  return new Promise((resolve,reject)=>{
     resolve(grades.filter((grade)=>grade.schoolId===schoolId));
  });
};

const getStatus = (userId)=>{
  let user;
  return getUser(userId).then((tempUser)=>{
     user = tempUser;
     return getGrades(user.schoolId);
  }).then((grades)=>{
      let average = 0;

      if(grades.length>0){
          average = grades.map((grade)=>grade.grade).reduce((a,b)=>a+b)/grades.length;
      }

      return `${user.name} has a ${average}% in the class.`;
  });
};
getUser(1).then((user)=>{
    console.log(user);
}).catch((e)=>{
   console.log(e);
});

getGrades(101).then((grades)=>{
    console.log(grades);
}).catch((e)=>{
    console.log(e);
});

getStatus(2).then((status)=>{
    console.log(status);
}).catch((e)=>{
    console.log(e);
});


//async await

// ()=>{
//     return new Promise((resolve,reject)=>{
//         resolve("Mike");
  //          reject("this is an error");
//     })
// }
//above and below code is same.
// const getStatusAlt = async (userId)=>{
//    throw new Error("This is an error");
//   return "Mike";
// };


// getStatusAlt().then((name)=>{
//     console.log(name);
// }).catch((e)=>{
//    console.log(e);
// });


const getStatusAlt = async (userId)=>{
    const user = await getUser(userId); //if promise got resolved then it will directly assign value to the user
                                        // if promise got rejected then it will throw an error.
    const grades = await getGrades(user.schoolId);

    let average = 0;

    if(grades.length>0){
        average = grades.map((grade)=>grade.grade).reduce((a,b)=>a+b)/grades.length;
    }

    return `${user.name} has a ${average}% in the class.`;

};

getStatusAlt(1).then((status)=>{
    console.log(status);
}).catch((e)=>{
    console.log(e);
});

//await will always be used by async. Await can't be used alone but reverse is not true.
//let is alternative of var in ES6

//async function return promise