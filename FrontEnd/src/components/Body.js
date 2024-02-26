import RestaurantCard from "./RestaurantCard"; // default import
import { restaurantList } from "./config"; // named import
import { useState, useEffect, useContext, useCallback, memo } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import {
  swiggy_api_URL,
  swiggy_api_URL_Infinite_Scroll,
  api_key,
  location_api,
} from "../../const";
import useGetLatitude from "../utils/useGetLatitude";
import LocationContext from "../ContextAPi/Location";
import { extractAndFormateData } from "../utils/extractAndFormateData";
import useGetDataByDishName from "../utils/useGetDataByDishName";
import useGetDataByCuisineName from "../utils/useGetDataByCuisine";
import axios from "../utils/axios";
const url = "/restaurant/all";
const Body = () => {
  const [searchText, setSearchText] = useState("");
  const [restaurantFilterdData, setRestaurantFilterdData] = useState([]);
  const [restaurantData, setRestaurantData] = useState(undefined);

  const [foodNameText, setFoodNameText] = useState("");
  const [CuisineNameText, setCuisineNameText] = useState("");
  const {
    latitude,
    longitude,
    location_name,
    setLocation,
    setLatitude,
    setLongitude,
    page,
    setPage,
  } = useContext(LocationContext); // using Location context;

  // intersection observer

  // this below code show that toggle is a state variable that is returned by useState()

  const toggle = useState("false"); // state variable
  const [toggleValue, setToggleValue] = toggle; // [react variable , function to change value of react variable]

  const FilterData = (searchText, restaurantData) => {
    if (searchText.trim() == "") {
      return restaurantData;
    }

    const filterData = restaurantFilterdData.filter((restaurant) => {
      return restaurant?.info?.name
        ?.toLowerCase()
        .includes(searchText.toLowerCase());
    });

    return filterData;
  };

  //created a custom hook for is Online/Offline feature.
  const isOnline = useOnlineStatus();

  if (!isOnline) {
    return (
      <h1>
        Opps!! you seems to be offline, please check your internet connection{" "}
      </h1>
    );
  }
 

  // ---------------------------------------->>>>>>>>>>>>>>>>>>>>>>>>> get ALL rest data 
  const getData = async () => {
    let URL = "/restaurant/all";
    let json;
    try{
      json = await axios.get(
       URL
      );
       console.log(json.data);
     
      setRestaurantData(json.data);
     setRestaurantFilterdData(json.data);

     localStorage.setItem(restaurantData, JSON.stringify(restaurantData));

    }
    catch(err)
    {
      console.log(err);
    }

   //const data = await fetch(URL);
    // const json = await data.json();

    // console.log("JSON received at Body ", json);

    // const listDetails = json.data.cards;

    // const temp = extractAndFormateData(listDetails);
    // console.log("Formated Data : " + temp);

    // // json?.data?.cards[2]?.data?.data?.cards
   
  };

  // const getInfiniteData = async () => {
  //   let URL =
  //     swiggy_api_URL_Infinite_Scroll +
  //     `?latitude=${latitude}&longitude=${longitude}&page=${page}`;
  //   const Data = await fetch(URL);
  //   const json = await Data.json();
  //   const listDetails = json?.data?.cards;

  //   const temp = extractAndFormateData(listDetails);

  //   let prev = restaurantData;
  //   let data;

  //   if (prev) data = [...prev, ...temp];
  //   else data = [...temp];

  //   setRestaurantData(data);

  //   prev = restaurantFilterdData;
  //   if (prev) data = [...prev, ...temp];
  //   else data = [...temp];
  //   setRestaurantFilterdData(data);
  // };

  // const handleInfiniteScroll = async () => {
  //   try {
  //     if (
  //       window.innerHeight + document.documentElement.scrollTop >=
  //       document.documentElement.scrollHeight
  //     ) {
  //       setPage((prev) => prev + 1);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // // Normal useEffect to make call for Regular data
  // useEffect(() => {
  //   if (page != 1) {
  //     getInfiniteData();
  //   }
  //   console.log("Regular useEffect called ");
  //   console.log(page);
  // }, [page]);

  //For New Location clearing older data and fetchig new one. -- when we fetch data for a new location
  useEffect(() => {
    setRestaurantData(undefined);
    setRestaurantFilterdData([]);
    setPage(1);
    console.log("Location Useffect called");
    const Async = async () => {
      await getData();
    };
    Async();
  }, []);

  // useEffect for InfiniteScroll
  // useEffect(() => {
  //   document.addEventListener("scroll", handleInfiniteScroll);

  //   return () => {
  //     document.removeEventListener("scroll", handleInfiniteScroll);
  //   };
  // }, []);
  console.log("render");

  const getLocation = useCallback(
    async (location_name) => {
      try {
        let URL =
          location_api + `?api_key=${api_key}&location_name=${location_name}`;
        const data = await fetch(URL);
        const details = await data.json();
        console.log("older location - > ", latitude, longitude);
        setLatitude(details.data[0].latitude);
        setLongitude(details.data[0].longitude);
        console.log("New Location - > ", latitude, longitude);
      } catch (error) {
        console.log("Error Message ", error.message);
      }
    },
    [location_name]
  );

  // condtional rendering - does not cause re-render (remeber this)
  //conditional rendering is done inside a render();

  //debouncing  -> for filtering data based on the restaurant name
  // useEffect(() => {
  //   const Filter = setTimeout(() => {
  //     let data = FilterData(searchText, restaurantData);
  //     setRestaurantFilterdData(data);
  //   }, 1000);
  //   return () => {
  //     clearTimeout(Filter);
  //   };
  // }, [searchText]);

  // avoiding rending component (Early return)
  if (restaurantFilterdData === undefined) {
    return null;
  }

  return restaurantData === undefined ? (
    <Shimmer />
  ) : (
    <div className="mt-[10%]">
      {/* <div className="lg:p-5 md:p-5  py-2 px-0 bg-pink-50 lg:my-6 md:my-6 flex pl-2">
           <input value={location_name} type="text" className="search-name w-1/3 lg:w-2/8 md:w-2/8 sm:w-3/8 " placeholder="location" onChange={(e)=>{setLocation( e.target.value)
             }} />
           <button className="lg:px-4 lg:mx-4 md:px-4 md:mx-4 sm:px-4 sm:mx-4 mx-2 px-1 text-sm lg:text-xl md:text-lg sm:text-base  bg-purple-900 hover:bg-gray-500 text-white rounded-md"  type="submit" 
           onClick={()=>{getLocation(location_name)}
            } >Search City Name</button>
        </div>
         */}

      {/* "searchByRestaurnt" */}
      {/* <div className="lg:p-5 md:p-5  py-2 px-0 pl-2 bg-pink-50 lg:my-6 md:my-6 flex">
           <input value={searchText} type="text" className="search-name w-1/3 lg:w-2/8 md:w-2/8 sm:w-3/8 " placeholder="Food/Hotel Name" onChange={(e)=>{setSearchText( e.target.value)
             }} />
           <button className="lg:px-4 lg:mx-4 md:px-4 md:mx-4 sm:px-4 sm:mx-4 mx-2 px-1 text-sm lg:text-xl md:text-lg sm:text-base  bg-purple-900 hover:bg-gray-500 text-white rounded-md"  type="submit" onClick={()=>{let data = FilterData(searchText,restaurantData);
            setRestaurantFilterdData(data);}
            } >Search</button>
        </div>
         */}

      {/* "searchbyfoodName" */}
      <div className="lg:p-5 md:p-5  py-2 px-0 pl-2 bg-pink-50 lg:my-6 md:my-6 flex">
        <input
          value={foodNameText}
          type="text"
          className="search-name w-1/3 lg:w-2/8 md:w-2/8 sm:w-3/8 "
          placeholder="Dish Name"
          onChange={(e) => {
            setFoodNameText(e.target.value);
          }}
        />
        <button
          className="lg:px-4 lg:mx-4 md:px-4 md:mx-4 sm:px-4 sm:mx-4 mx-2 px-1 text-sm lg:text-xl md:text-lg sm:text-base  bg-purple-900 hover:bg-gray-500 text-white rounded-md"
          type="submit"
          onClick={
            () => {
              let data = useGetDataByDishName(foodNameText); // making call to the backend to search restaurant by item/dish
              setRestaurantData(data);
            } //
          }
        >
          Search By Dish Name
        </button>
      </div>

      {/* "searchbyCuisineName" */}
      <div className="lg:p-5 md:p-5  py-2 px-0 pl-2 bg-pink-50 lg:my-6 md:my-6 flex">
        <input
          value={CuisineNameText}
          type="text"
          className="search-name w-1/3 lg:w-2/8 md:w-2/8 sm:w-3/8 "
          placeholder="Cuisine Name"
          onChange={(e) => {
            setCuisineNameText(e.target.value);
          }}
        />
        <button
          className="lg:px-4 lg:mx-4 md:px-4 md:mx-4 sm:px-4 sm:mx-4 mx-2 px-1 text-sm lg:text-xl md:text-lg sm:text-base  bg-purple-900 hover:bg-gray-500 text-white rounded-md"
          type="submit"
          onClick={
            () => {
              let data = useGetDataByCuisineName(CuisineNameText); // making call to the backend to search restaurant by item/dish
              setRestaurantData(data);
            } //
          }
        >
          Search By Cuisine
        </button>
      </div>

      {/* restaurantCardList */}
      <div className="flex flex-wrap justify-center">
        {restaurantFilterdData.length == 0 ? (
          <h1>No Restaurant Matching Your Filter Found!!</h1>
        ) : (
          restaurantFilterdData.map((restaurant) => {
            console.log(restaurant);
            return (
              <Link
                to={"/restaurant/" + restaurant.restId}
                key={restaurant.restId}
              >
                <RestaurantCard {...restaurant} />
              </Link>
            );
          })
        )}
        {/* value passed from here above are combined together inside a object called as props which our Restaurant component recives actually   */}
        {/* don't use (data = {...restaurant.data}) */}
      </div>
    </div>
  );
};

export default Body;
