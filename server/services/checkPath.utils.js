
function checkPath(path1, path2) {
    let arr1 = path1.split("/").slice(1);
    let arr2 = path2.split("/").slice(1);
  
    let filtred = arr1.filter((value, index) => {
      if (value === arr2[index]) {
        return arr2[index];
      }
    });
  
    if (arr1.length === filtred.length) {
      return true;
    }
  
    return false;
  }

module.exports = checkPath