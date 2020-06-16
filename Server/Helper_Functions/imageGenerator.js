const { uuidv4 } = require ('./idGenerator')
const fs = require('fs');



const addImage = (arr) => {
  console.log('generate')
  let images = []
  for ( let i = 0; i < 16 ; i += 1 ) {
    images.push( arr[i] );
    images.push( arr[i] );
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