import React, { useContext, useEffect, useState } from "react";
import "./MyOrders.css";
import { StoreContext } from "../../Context/StoreContext";
import axios from "axios";
import { assets } from "../../assets/assets";

const statuses = ["Processing", "Out for Delivery", "Delivered"]; // Define statuses

const MyOrders = () => {
  const { url, token } = useContext(StoreContext);
  const [data, setData] = useState([]);
  const [visibleCount, setVisibleCount] = useState(10); // Show 10 orders initially

  const fetchOrders = async () => {
    try {
      const response = await axios.post(
        `${url}/api/order/userorders`,
        {},
        { headers: { token } }
      );
      setData(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  // Load More: Increases the number of visible orders by 10
  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 10, data.length));
  };

  // Load Less: Decreases the number of visible orders by 12, but not below 10
  const handleLoadLess = () => {
    setVisibleCount((prev) => Math.max(prev - 12, 10));
  };

  return (
    <div className="my-orders">
      <h2>My Orders</h2>
      <div className="container">
        {data.slice(0, visibleCount).map((order, index) => (
          <div key={index} className="my-orders-order">
            <img src={assets.parcel_icon} alt="" />
            <p>
              {order.items.map((item, index) =>
                index === order.items.length - 1
                  ? item.name + " x " + item.quantity
                  : item.name + " x " + item.quantity + ", "
              )}
            </p>
            <p>Rs {order.amount}.00</p>
            <p>Items: {order.items.length}</p>

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

      {/* Load More / Load Less Buttons */}
      <div className="load-buttons">
        {visibleCount < data.length && <button onClick={handleLoadMore}>Load More</button>}
        {visibleCount > 10 && <button onClick={handleLoadLess}>Load Less</button>}
      </div>
    </div>
  );
};

export default MyOrders;
