import React, { useContext, useState } from 'react';
import './PlaceOrder.css';
import { StoreContext } from "../../Context/StoreContext";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';  // Import ToastContainer and toast
import 'react-toastify/dist/ReactToastify.css';  // Import the required CSS

const PlaceOrder = () => {
    const { cartItems, food_list, getTotalCartAmount, getTotalItemsInCart, url } = useContext(StoreContext);
    const [deliveryType, setDeliveryType] = useState('homeDelivery');
    const [paymentOption, setPaymentOption] = useState('');
    const navigate = useNavigate();

    const openMap = () => {
        toast.info('Opening map to select location...');
    };

    const handleDeliveryTypeChange = (e) => {
        setDeliveryType(e.target.value);
    };

    const handlePaymentOptionChange = (e) => {
        setPaymentOption(e.target.value);
    };

    const handleProceedPayment = () => {
        if (paymentOption === 'digitalPayment') {
            // Pass total amount to PaymentForm for eSewa payment
            navigate("/PaymentForm", { state: { totalAmount } });
        } else if (paymentOption === 'cashOnDelivery') {
            toast.success('You have selected Cash on Delivery. Your order will be placed.');
            // Handle Cash on Delivery logic here
        } else {
            toast.error('Please select a payment method before proceeding.');
        }
    };

    // Calculate delivery fee based on delivery type
    const deliveryFee = deliveryType === 'takeaway' ? 0 : 85;
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
                                    <option key={i} value={`${i.toString().padStart(2, '0')}:00`}>{`${i.toString().padStart(2, '0')}:00`}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="payment-method">
                        <h4>Choose Payment Method</h4>
                        <hr />
                        <div className="payment-options">
                            <label>
                                <input 
                                    type="radio" 
                                    name="paymentOption" 
                                    value="cashOnDelivery" 
                                    checked={paymentOption === 'cashOnDelivery'}
                                    onChange={handlePaymentOptionChange}
                                />
                                Cash On Delivery
                            </label>
                            <label>
                                <input 
                                    type="radio" 
                                    name="paymentOption" 
                                    value="digitalPayment" 
                                    checked={paymentOption === 'digitalPayment'}
                                    onChange={handlePaymentOptionChange}
                                />
                                E-sewa
                            </label>
                        </div>
                    </div>
                </div>

                <div className="action-buttons">
                    <button onClick={() => navigate("/Cart")} className="back-button">Back</button>
                    <button onClick={handleProceedPayment} className="proceed-button">Proceed for Payment</button>
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
                                        <img src={`${url}/images/${item.image}`} alt={item.name} className="item-image" />
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
                        <p>Rs. {deliveryFee}</p>
                    </div>
                    <div className="cart-totaldetail">
                        <b>Total</b>
                        <b>Rs. {totalAmount}</b>
                    </div>
                </div>
            </div>

            {/* Toast Container for displaying toasts */}
            <ToastContainer />
        </div>
    );
};

export default PlaceOrder;
