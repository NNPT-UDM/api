module.exports.selectFields = (data, allowFields) => {
  try {
    const newObj = {};
    if (!allowFields) return data;
    Object.keys(data).forEach((el) => {
      if (allowFields.split(",").includes(el)) newObj[el] = data[el];
    });
    return newObj;
  } catch (error) {
    console.log(error);
    return data;
  }
};
