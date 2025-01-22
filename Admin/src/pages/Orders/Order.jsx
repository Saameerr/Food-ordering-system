import React, { useEffect, useState } from 'react';
import './Order.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { assets } from '../../assets/assets';

const Order = ({ url }) => {
  const [orders, setOrders] = useState([]);

  // Fetch all orders and sort them by creation date (newest first)
  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(`${url}/api/order/list`);
      if (response.data.success) {
        const sortedOrders = response.data.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setOrders(sortedOrders);
        console.log(sortedOrders);
      } else {
        toast.error("Error fetching orders");
      }
    } catch (error) {
      toast.error("An error occurred while fetching orders");
      console.error(error);
    }
  };

  // Handle status change
  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(`${url}/api/order/status`, {
        orderId,
        status: event.target.value,
      });
      if (response.data.success) {
        await fetchAllOrders();
      } else {
        toast.error("Failed to update order status");
      }
    } catch (error) {
      toast.error("An error occurred while updating order status");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className='order add'>
      <h3
        style={{
          fontSize: '30px',
          fontWeight: 'bold',
          textAlign: 'center',
          marginBottom: '10px',
        }}
      >
        Order Page
      </h3>
      <div className='order-color'> 
        <p>Food Processing <span style={{color:"#cce5ff", fontSize:"30px"}}>&#x25cf;</span> </p><br />
        <p>Out Of Delivery <span style={{color:"#fff3cd", fontSize:"30px"}}>&#x25cf;</span> </p> <br />
        <p>Delivered <span style={{color:"#d4edda", fontSize:"30px"}}>&#x25cf;</span> </p>
       
      </div>
      <div className="order-list">
        {orders.map((order, index) => (
         <div
         key={index}
         className="order-item"
         style={{
           backgroundColor:
             order.status === 'Delivered'
               ? '#d4edda' // Light green
               : order.status === 'Out for Delivery'
               ? '#fff3cd' // Light yellow
               : '#cce5ff', // Light blue
           border: '1px solid #ccc',
           padding: '10px',
           borderRadius: '5px',
         }}
       >
       
            <img src={assets.parcel_icon} alt="" />
            <div>
              <p className="order-item-food">
                <b>Food Items:</b>{' '}
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return item.name + ' x ' + item.quantity;
                  } else {
                    return item.name + ' x ' + item.quantity + ', ';
                  }
                })}
              </p>

              <p className="order-item-deliverytype">
                <b>Delivery Type:</b> {order.address.deliveryType}
              </p>
              <div className="order-item-locationname">
                <p>
                  <b>Address:</b> {order.address.locationName}
                </p>
              </div>
              <p className="order-item-datetime">
                <b>Time:</b> {order.address.deliveryDate + ' - ' + order.address.deliveryTime}
              </p>
              <p className="order-item-phone">
                <b>Phone:</b> {order.address.phoneNumber}
              </p>
              <p className="order-item-payment">
                <b>Payment Method:</b> {order.address.paymentOption}
              </p>
            </div>
            <p>
              <b>Items:</b> {order.items.length}
            </p>
            <p>
              <b>Rs</b> {order.amount}
            </p>
            <select
              onChange={(event) => statusHandler(event, order._id)}
              value={order.status}
            >
              <option value="Food Processing">Food Processing</option>
              <option value="Out for Delivery">Out for Delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Order;
