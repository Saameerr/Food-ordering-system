import React, { useContext, useState } from 'react';
import './PlaceOrder.css';
import { StoreContext } from "../../Context/StoreContext";
import {Link} from 'react-router-dom'

const PlaceOrder = () => {
    const { cartItems, food_list, getTotalCartAmount, getTotalItemsInCart } = useContext(StoreContext);
    const [deliveryType, setDeliveryType] = useState('homeDelivery');  // State to manage delivery type

    const openMap = () => {
        alert('Opening map to select location...');
    };

    const handleDeliveryTypeChange = (e) => {
        setDeliveryType(e.target.value);  // Update delivery type when user changes option
    };

    // Calculate delivery fee based on delivery type
    const deliveryFee = deliveryType === 'takeaway' ? 0 : 5;
    const totalAmount = getTotalCartAmount() + deliveryFee;

    return (
        <div className="place-order-container">
            {/* Left Side - Checkout Section */}
            <div className="place-order-left">
                <div className="place-order">
                    <h1 className="heading">Checkout</h1>
                    <div className="place-order-heading">
                        <h4>Delivery Type</h4>
                        <hr />
                        <div className="delivery-option">
                            <label>
                                <input 
                                    type="radio" 
                                    name="deliveryType" 
                                    value="homeDelivery" 
                                    checked={deliveryType === 'homeDelivery'}
                                    onChange={handleDeliveryTypeChange} 
                                />
                                Home Delivery
                            </label>
                            <label>
                                <input 
                                    type="radio" 
                                    name="deliveryType" 
                                    value="takeaway"
                                    checked={deliveryType === 'takeaway'} 
                                    onChange={handleDeliveryTypeChange} 
                                />
                                Takeaway
                            </label>
                        </div>
                    </div>
                    
                         {/* Conditionally render "Deliver To" section based on the selected delivery type */}
                    {deliveryType === 'homeDelivery' && (
                        <div className="delivery-details">
                            <h4>Deliver To</h4>
                            <hr />
                            <p className="location-button" onClick={openMap}>+ Add Your Location</p>
                        </div>
                    )}
                    

                    <div className="delivery-time">
                        <h4>Delivery Time</h4>
                        <hr />
                        <div className="date">
                            <select>
                                <option value="today">Today</option>
                                <option value="tomorrow">Tomorrow</option>
                            </select>
                            <select>
                                <option value="">Select Time</option>
                                {Array.from({ length: 24 }, (_, i) => (
                                    <option key={i} value={`${i.toString().padStart(2, '0')}:00`}>
                                        {`${i.toString().padStart(2, '0')}:00`}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="payment-method">
                        <h4>Choose Payment Method</h4>
                        <hr />
                        <div className="payment-options">
                            <label>
                                <input type="radio" name="paymentOption" value="cashOnDelivery" defaultChecked
                                 />
                                Cash On Delivery
                            </label>
                            <label>
                                <input type="radio" name="paymentOption" value="digitalPayment" 
                                />
                                E-sewa
                            </label>
                        </div>
                        
                    </div>
                </div>

                <div className="action-buttons">
                    <button className="back-button">Back</button>
                    <button className="proceed-button">Proceed for Payment</button>
                </div>
            </div>

            {/* Right Side - My Cart Section */}
            <div className="place-order-right">
                <div className="cart-header">
                    <h3>My Cart ({getTotalItemsInCart()} items)</h3>
                </div>
                <div className="cart-items">
                    {Object.keys(cartItems).length > 0 ? (
                        food_list.map((item) => {
                            if (cartItems[item._id] > 0) {
                                return (
                                    <div key={item._id} className="cart-item">
                                        <img src={item.image} alt={item.name} className="item-image" />
                                        <div className="item-details">
                                            <h6>{item.name}</h6>
                                            <p>Price: Rs. {item.price}</p>
                                            <p>Quantity: {cartItems[item._id]}</p>
                                            <hr />
                                        </div>
                                    </div>
                                ); 
                            }
                            return null;
                        })
                        
                    ) : (
                        <p className="empty-cart-message">Your cart is empty</p>
                    )}
                </div>
                <div className="cart-summary">
                    <div className="cart-totaldetail">
                        <p>Subtotal</p>
                        <p>Rs. {getTotalCartAmount()}</p>
                    </div>
                    <div className="cart-totaldetail">
                        <p>Delivery Fee</p>
                        <p>Rs. {deliveryFee}</p> {/* Updated Delivery Fee */}
                    </div>
                    <div className="cart-totaldetail">
                        <b>Total</b>
                        <b>Rs. {totalAmount}</b> {/* Updated Total */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlaceOrder;
