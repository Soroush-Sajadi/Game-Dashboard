const logIn = ( arr, obj1, obj2 ) => {
    for (let i = 0; i < arr.length; i += 1) {
      if  (arr[i].user_name === obj1 && arr[i].email === obj2 ) {
        return arr[i].score;
      }
    }
    return 
  }
  
  module.exports.logIn = logIn