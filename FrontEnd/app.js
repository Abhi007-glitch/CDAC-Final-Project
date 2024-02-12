import React from "react"
import  ReactDOM  from "react-dom/client"
import { restaurantList } from "./Const";

//logo
//home
//offer
//contact
//cart 
const LogoComponent = ()=>{
    return (
        <a href="/">
    <img alt="logo" className="logo" src="http://lh3.googleusercontent.com/Em7AHf7XBH_RtGfCBVXz9RH8SM_pHkj3xPP-yd3cRguY1_Jc8fmqgx6WxnvGVyPV5xs5gL3HCD0FCuv6Xo4CwoY6ak4"/>
    </a>)};

const header = <div><h1>header</h1></div>
const HeaderComponet = ()=>{
    return (<div className="header">
           <LogoComponent/>
           <div className="nav-items">
           <ul >
            <li>home</li>
            <li>offer</li>
            <li>contact</li>
            <li>Cart</li>
           </ul>
           </div>
         
    </div>)
}



// just a template of layout of body
//const BodyComponent = () => {
//   return(
//     /**
//      * 
//       restaurantCardList
//          restaurantCard
//             image 
//             Name 
//             rating stars
//             location
//               cusines
//      * 
//      * 
//      * 
//      * 
//      */
//   )
// }





const RestaurantCard = ({name,cuisines,lastMileTravelString,cloudinaryImageId})=>{
  
    return ( <div className="card">
        <img  src= {"https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/" + cloudinaryImageId }/>
         <h3> {name}</h3>
         <h3> {cuisines.join(", ")}</h3>
         <h3> {lastMileTravelString} </h3>
         
    </div>)
}



const Body =  ()=>{
    return ( <div className="restaurantCardList">
    {restaurantList.map((restaurant)=>{   
              return (<RestaurantCard {...restaurant.data} key ={restaurant.data.id}/>)})} 
       </div>
       )
}



const LayoutComponent = ()=>(
    <>
       {HeaderComponet()}
       <Body/>
       <div><h1>footer</h1></div>
    </> 
);

const root = ReactDOM.createRoot(document.querySelector("#root"));

root.render(<LayoutComponent/>)