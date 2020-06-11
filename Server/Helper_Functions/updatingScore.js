const fs = require('fs');

const updateScore = (arr, username, score) => {
  for ( let i = 0; i < arr.length; i += 1 ) {
    if( arr[i].user_name === username ) {
      prevScore = Number(arr[i].score);
      newScore = Number(score);
      totalScore = prevScore + newScore
      arr[i].score = totalScore
    }
  }
  fs.writeFile(`${__dirname}/../DB/accounts.json`,JSON.stringify(arr), (err, result) => {
    if(err) console.log('error', err);
  });
}

module.exports.updateScore = updateScore;
