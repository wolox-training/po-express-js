module.exports.calculateUserScore = (newScore, currentScore) => {
  if (currentScore != 0)
    return newScore === currentScore ? newScore * -1 : newScore * 2;
  return newScore;
}
