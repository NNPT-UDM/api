const sleep = (time) => {
  // time: number seconds
  return new Promise(function (resolve) {
    setTimeout(resolve, Number(time * 1000));
  });
};

module.exports = sleep;
