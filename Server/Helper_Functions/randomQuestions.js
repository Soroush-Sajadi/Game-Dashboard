const randomQuestions = (arr) => {
  const lengthArr = arr.length;
  let questions = [];

  for ( let i = 0; i < 10; i += 1 ) {
    const randomNumber = Math.floor(Math.random() * lengthArr)
    questions.push([arr[randomNumber]])
  }
  return questions;
}

module.exports.randomQuestions = randomQuestions  