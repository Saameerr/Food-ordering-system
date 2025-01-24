import React, { useContext, useEffect, useState } from "react";
import "./MyOrders.css";
import { StoreContext } from "../../Context/StoreContext";
import axios from "axios";
import { assets } from "../../assets/assets";

const statuses = ["Processing", "Out for Delivery", "Delivered"]; // Define statuses

const MyOrders = () => {
  const { url, token } = useContext(StoreContext);
  const [data, setData] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await axios.post(
        `${url}/api/order/userorders`,
        {},
        { headers: { token } }
      );
      setData(response.data.data); // Fetch and set data
      console.log(response.data.data); // Logs sorted orders
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  return (
    <div className="my-orders">
      <h2>My Orders</h2>
      <div className="container">
        {data.map((order, index) => (
          <div key={index} className="my-orders-order">
            <img src={assets.parcel_icon} alt="" />
            <p>
              {order.items.map((item, index) => {
                if (index === order.items.length - 1) {
                  return item.name + " x " + item.quantity;
                } else {
                  return item.name + " x " + item.quantity + ", ";
                }
              })}
            </p>
            <p>Rs {order.amount}.00</p>
            <p>Items: {order.items.length}</p>
            {/* <p>
              <span>&#x25cf;</span>
              <b> {order.status}</b>
            </p> */}
            {/* Progress Bar */}
            <div className="progress-container">
  {statuses.map((status, i) => (
    <div
      key={i}
      className={`progress-dot ${
        i === 0 || statuses.indexOf(order.status) >= i ? "active" : ""
      }`}
    >
      <span>{status}</span>
    </div>
  ))}
</div>

            <button onClick={fetchOrders}>Track Order</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrders;
