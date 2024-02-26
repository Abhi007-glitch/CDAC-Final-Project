import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import AddMenuForm from './AddMenuForm';
import EditMenuForm from './EditMenuForm';
import { useSelector } from "react-redux";

let arr = [
  {
    "item_id": 1,
    "cart_id": 2,
    "rest_id": 3,
    "dish_name": "Idli"
  },
  {
    "item_id": 2,
    "cart_id": 3,
    "rest_id": 4,
    "dish_name": "Plain Idli"
  },
  {
    "item_id": 3,
    "cart_id": 4,
    "rest_id": 5,
    "dish_name": "Fry Idli"
  },
  {
    "item_id": 4,
    "cart_id": 5,
    "rest_id": 6,
    "dish_name": "Fry Idli"
  }

]

const Menu = () => {

// const restId = useSelector((store) => store.restaurantView.restId);
  

  const [menuItems, setMenuItems] = useState([]);
  const [menu,setMenu] =useState(arr);
 

  function handleDelete(id) {
    // arr.splice(id,1);
    arr.splice(id,1);
  }

  return (
    <div>
      <Navbar />
      <div className="container mx-auto mt-8">

          <table className="min-w-full border border-gray-300">
            <tr>
              <th className="border border-gray-300 px-4 py-2">
                Item Name
              </th>
              <th className="border border-gray-300 px-4 py-2">
                Cart Id
              </th>
              <th className="border border-gray-300 px-4 py-2">
                Rest ID
              </th>
            </tr>
            {menu.map(item => (
              <tr>
                <td className="border border-gray-300 px-4 py-2">
                {item.dish_name}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                {item.cart_id}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                {item.rest_id}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                <button
            className="bg-red-500 text-white px-2 py-1 rounded"
            onClick={() => {
              setMenu(
                menu.filter(a =>
                  a.item_id !== item.item_id
                )
              );
            }}>
              Delete
            </button>
                </td>
              </tr>
            ))}
          </table>


          {/* <ul>
        {menu.map(item => (
          <li key={item.item_id}>
            {item.dish_name}{' '}{item.cart_id}{' '}{item.rest_id}{' '}
            <button
            className="bg-red-500 text-white px-2 py-1 rounded"
            onClick={() => {
              setMenu(
                menu.filter(a =>
                  a.item_id !== item.item_id
                )
              );
            }}>
              Delete
            </button> <br/> <br/>
          </li>
        ))}
      </ul> */}



      </div>
    </div>
  );
};

export default Menu;
