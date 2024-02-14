export const extractAndFormateData = (json) => {
  let data = [];
  let count = 1;
  json.forEach((category) => {
    if (count === 1) {
      count++;
      return null;
    }

    let list = category?.card?.card?.gridElements?.infoWithStyle?.restaurants;
    if (list != undefined) {
      data = [...data, ...list];
    }
  });

  return data;
};
