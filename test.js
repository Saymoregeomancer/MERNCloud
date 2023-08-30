const ad = (param) => {
  try {
    if (param) {
      return param;
    } else {
      throw new Error("param is false");
    }
  } catch (error) {
    return "error is catch";
  }
};
const ad2 = (param2) => {
  try {
    console.log(ad(param2)) ;
  } catch (error) {
    console.log(error);
  }
};

ad2(false);
