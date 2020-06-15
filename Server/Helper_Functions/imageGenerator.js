const shuffle = (arr) => {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
} 

const addId = (arr) => {
  for (let i = 0; i < arr.length; i += 1) {
    arr[i][0].id = i + 1;
  } 
  return arr;
}

const generatorImage = (arr) => {
  let images = []
  for ( let i = 0; i < 16 ; i += 1 ) {
    images.push( arr[i] );
    images.push( arr[i] );
  }

  return addId( shuffle (images)) 
}

module.exports.generatorImage = generatorImage;