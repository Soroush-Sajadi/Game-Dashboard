const addId = (arr) => {
    arr.map((n,j) => {
      n['id'] = j;
    })
   return arr
  }

module.exports.addId = addId;