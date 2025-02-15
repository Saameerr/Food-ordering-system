import React, { useContext, useEffect, useState } from "react";
import "./MyOrders.css";
import { StoreContext } from "../../Context/StoreContext";
import axios from "axios";
import { assets } from "../../assets/assets";

const statuses = ["Processing", "Out for Delivery", "Delivered"];

const MyOrders = () => {
  const { url, token } = useContext(StoreContext);
  const [data, setData] = useState([]);
  const [visibleCount, setVisibleCount] = useState(10);
  const [loading, setLoading] = useState(false); // Loading state

  const fetchOrders = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const response = await axios.post(
        `${url}/api/order/userorders`,
        {},
        { headers: { token } }
      );
      setData(response.data.data || []); // Ensure data is always an array
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [token]);

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 10, data.length));
  };

  const handleLoadLess = () => {
    setVisibleCount((prev) => Math.max(prev - 12, 10));
  };

  return (
    <div className="my-orders">
      <h2>My Orders</h2>

      {loading ? (
        <p>Loading orders...</p>
      ) : data.length === 0 ? (
        <div className="no-orders">
    <h3>🍽️ Feeling hungry?</h3>
    <p>Your plate is empty! Order something delicious now.</p>
    <a href="home">
            <button>Go to Home</button>
          </a>
  </div>
      ) : (
        <div className="container">
          {data.slice(0, visibleCount).map((order, index) => (
            <div key={index} className="my-orders-order">
              <img src={assets.parcel_icon} alt="Parcel Icon" />
              <p>
                {order.items.map((item, idx) =>
                  idx === order.items.length - 1
                    ? `${item.name} x ${item.quantity}`
                    : `${item.name} x ${item.quantity}, `
                )}
              </p>
              <p>Rs {order.amount}.00</p>
              <p>Items: {order.items.length}</p>

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
      )}

      {data.length > 0 && (
        <div className="load-buttons">
          {visibleCount < data.length && <button onClick={handleLoadMore}>Load More</button>}
          {visibleCount > 10 && <button onClick={handleLoadLess}>Load Less</button>}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
