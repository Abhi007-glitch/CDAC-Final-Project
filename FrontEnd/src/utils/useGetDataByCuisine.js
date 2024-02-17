import { useEffect, useState } from "react";

const useGetDataByCuisineName = (cuisineText) => {
  const [dataByCuisineName, setDataByCuisineName] = useState(null);

  //     const params = { cuisineName: this.state.cluster_id };
  // const options = {
  //   method: 'GET',
  //   headers: {
  //     'Accept': 'application/json',
  //     'Content-Type': 'application/json;charset=UTF-8',
  //     'Authorization': 'Token ' + localStorage.getItem('token')
  //   }
  // };
  // const url = `http://localhost:8000/v1/tasks?${new URLSearchParams(params)}`
  // //const response = await fetch(url, options)

  const getData = async () => {
    let URL = "";
    const data = await fetch(URL);
    const json = await data.json();
    setDataByCuisineName(json.data);
  };

  useEffect(() => {
    getData();
  }, []);

  return dataByCuisineName;
};

export default useGetDataByCuisineName;
