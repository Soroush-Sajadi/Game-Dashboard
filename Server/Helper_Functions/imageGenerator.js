const fs = require('fs');

const generateRan = (arr) => {
  const max = arr.length;
  let random = [];
  for(let i = 0; i < max; i += 1 ){
      let temp = Math.floor( Math.random() * max );
      if( random.indexOf(temp) === -1){
          random.push(temp);
      }
      else
       i--;
  }
  return random;
}

const addImage = (arr) => {
  const randomNumbers = generateRan(arr)
  let images = []
  for ( let i = 0; i < 8 ; i += 1 ) {
    images.push( arr[randomNumbers[i]] );
    images.push( arr[randomNumbers[i]] );
  }
  return images
}

const shuffle = (arr) => {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
} 

const generatorImage = async(arr) => {
  const res = shuffle(addImage(arr))
  fs.writeFile(`${__dirname}/../DB/readyImages.json`,JSON.stringify(res), (err, result) => {
    if(err) console.log('error', err);
  });
  
}

module.exports.generatorImage = generatorImage;