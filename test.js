// const ad = (param) => {
//   try {
//     if (param) {
//       return param;
//     } else {
//       throw new Error("param is false");
//     }
//   } catch (error) {
//     return "error is catch";
//   }
// };
// const ad2 = (param2) => {
//   try {
//     console.log(ad(param2)) ;
//   } catch (error) {
//     console.log(error);
//   }
// };

// ad2(false);
// {
//   "_id": {
//     "$oid": "64ef9043095b8323722a11da"
//   },
//   "selected": false,
//   "name": "зображення_viber_2023-08-01_17-13-35-961.png",
//   "type": "png",
//   "size": 299517,
//   "path": "/зображення_viber_2023-08-01_17-13-35-961.png",
//   "date": {
//     "$date": "2023-08-30T18:53:48.131Z"
//   },
//   "user": {
//     "$oid": "64e5ef6ef12d4eb3b60066e0"
//   },
//   "parent": {
//     "$oid": "64e5ef6ef12d4eb3b60066e0"
//   }
// }


const req = {
  search : 'doasdaosdkao'
}

console.log(!req?.search)
console.log(!req?.name)








