import React, { useContext, useState, useEffect, useRef } from "react";
import { StoreContext } from "../../Context/StoreContext";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import L from "leaflet"; // Import Leaflet
import "leaflet/dist/leaflet.css";
import "./PlaceOrder.css";
import axios from "axios";

const PlaceOrder = () => {
  const {
    token,
    cartItems,
    food_list,
    getTotalCartAmount,
    getTotalItemsInCart,
    url,
    clearCart,
  } = useContext(StoreContext);

  const [formState, setFormState] = useState({
    deliveryType: "homeDelivery",
    locationName: "",
    deliveryDate: "today", // Default is today
    deliveryTime: "",
    phoneNumber: "",
    paymentOption: "",
  });

  const [isMapVisible, setIsMapVisible] = useState(false);
  const [userLocation, setUserLocation] = useState({
    latitude: 27.7172,
    longitude: 85.324,
  }); // Default location: Kathmandu, Nepal
  const mapRef = useRef(null); // Persist map instance across renders
  const navigate = useNavigate();

  const deliveryFee = formState.deliveryType === "takeaway" ? 0 : 85;
  const totalAmount = getTotalCartAmount() + deliveryFee;

  const placeOrder = async (event) => {
    event.preventDefault();
    
    // Prepare the order items
    let orderItems = [];
    food_list.forEach((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    });
  
    // Prepare order data
    let orderData = {
      address: formState,
      items: orderItems,
      amount: getTotalCartAmount() + deliveryFee, // Added delivery fee
    };
  
    try {
      // Place the order via API
      const response = await axios.post(url + "/api/order/place", orderData, {
        headers: { token },
      });
  
      if (response.data.success) {
        const { session_url } = response.data;
        
  
        // Redirect to payment or order confirmation page
        window.location.replace(session_url);
      } else {
        toast.error("Error placing the order. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred while placing your order.");
      console.error("Error placing order:", error);
    }
  };
  

  useEffect(() => {
    if (isMapVisible && userLocation) {
      if (!mapRef.current) {
        mapRef.current = L.map("map").setView(
          [userLocation.latitude, userLocation.longitude],
          13
        );

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          maxZoom: 19,
        }).addTo(mapRef.current);

        mapRef.current.on("click", async (e) => {
          const { lat, lng } = e.latlng;
          setUserLocation({ latitude: lat, longitude: lng });
          const locationName = await reverseGeocode(lat, lng);
          setFormState((prev) => ({ ...prev, locationName }));
          setIsMapVisible(false);
          toast.success(`Location selected: ${locationName}`);
        });
      } else {
        mapRef.current.setView(
          [userLocation.latitude, userLocation.longitude],
          13
        );
      }
    }

    return () => {
      if (mapRef.current) mapRef.current.remove();
      mapRef.current = null;
    };
  }, [isMapVisible, userLocation]);

  const reverseGeocode = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
      );
      if (!response.ok) throw new Error("Failed to fetch location data");
      const data = await response.json();
      return data.display_name;
    } catch (error) {
      console.error("Reverse Geocode Error:", error);
      toast.error("Unable to fetch location name");
      return "Unknown Location";
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleProceedPayment = () => {
    const {
      deliveryType,
      locationName,
      deliveryDate,
      deliveryTime,
      phoneNumber,
      paymentOption,
    } = formState;
  

    if (deliveryType === "homeDelivery" && !locationName) {
      toast.error("Please select a location before proceeding.");
      return;
    }

    if (!deliveryDate) {
      toast.error("Please select a delivery date before proceeding.");
      return;
    }

    if (!deliveryTime) {
      toast.error("Please select a delivery time before proceeding.");
      return;
    }

    if (!phoneNumber) {
      toast.error("Please enter a valid phone number before proceeding.");
      return;
    }

    if (
      !phoneNumber ||
      phoneNumber.length !== 10 ||
      !/^[0-9]+$/.test(phoneNumber) ||
      !/^(97|98)/.test(phoneNumber)
    ) {
      toast.error("Please enter a valid 10-digit phone number");
      return;
    }
    if (paymentOption === "digitalPayment") {
      navigate("/PaymentForm", { state: { totalAmount } });
    } else if (paymentOption === "cashOnDelivery") {
      clearCart(); // Cart clear garne
      setTimeout(() => {
        navigate("/codMsg");
      }, 100); // 2 sec paxi navigate garne
    } else {
      toast.error("Please select a payment method before proceeding.");
    }
  };
    

  const openMap = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ latitude, longitude });
        setIsMapVisible(true);
        toast.info("Map opened! Click to select a location.");
      },
      () => {
        toast.error(
          "Unable to fetch your location. Please enable location services."
        );
      }
    );
  };

  const closeMap = () => {
    setIsMapVisible(false);
    toast.info("Map closed. Location not set.");
  };

  const formatTimeTo12Hour = (hour, minute) => {
    const isPM = hour >= 12;
    const formattedHour = hour % 12 || 12;
    const formattedMinute = minute === 0 ? "00" : "30";
    const ampm = isPM ? "PM" : "AM";
    return `${formattedHour}:${formattedMinute} ${ampm}`;
  };

  const timeOptions = [];
  for (let i = 0; i < 24; i++) {
    timeOptions.push(formatTimeTo12Hour(i, 0));
    timeOptions.push(formatTimeTo12Hour(i, 30));
  }

  return (
    <form onSubmit={placeOrder}>
      <div className="place-order-container">
        <div className="place-order-left">
          <h1 className="heading">Checkout</h1>

          {/* Delivery Type */}
          <div className="delivery-details">
            <h5>Delivery Type</h5>
            <hr />
            <div className="delivery-type">
              <label style={{ marginRight: "20px" }}>
                <input
                  type="radio"
                  name="deliveryType"
                  value="homeDelivery"
                  checked={formState.deliveryType === "homeDelivery"}
                  onChange={handleInputChange}
                />
                Home Delivery
              </label>
              <label>
                <input
                  type="radio"
                  name="deliveryType"
                  value="takeaway"
                  checked={formState.deliveryType === "takeaway"}
                  onChange={handleInputChange}
                />
                Takeaway
              </label>
            </div>
          </div>

          {formState.deliveryType === "homeDelivery" && (
            <div className="delivery-details">
              <h5>Deliver To</h5>
              <hr />
              <p
                className="location-button"
                name="locationName"
                onClick={openMap}
              >
                + Add Your Location
              </p>
              {formState.locationName && (
                <p>Selected Location: {formState.locationName}</p>
              )}
            </div>
          )}

          {/* Delivery Date */}
          <div className="delivery-details">
            <h5>Delivery Date</h5>
            <hr />
            <select
              name="deliveryDate"
              value={formState.deliveryDate}
              onChange={handleInputChange}
            >
              <option value="today">Today</option>
              <option value="tomorrow">Tomorrow</option>
            </select>
          </div>

          {/* Delivery Time */}
          <div className="delivery-details">
            <h5>Delivery Time</h5>
            <hr />
            <select
              name="deliveryTime"
              value={formState.deliveryTime}
              onChange={handleInputChange}
            >
              <option value="">Select Time</option>
              {timeOptions.map((time, index) => (
                <option key={index} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </div>

          {/* Phone Number */}
          <div className="delivery-details">
            <h5>Phone Number</h5>
            <hr />
            <input
              className="phonenumber"
              type="text"
              name="phoneNumber"
              maxLength="10"
              placeholder="Phone Number"
              value={formState.phoneNumber}
              onChange={handleInputChange}
            />
          </div>

          {/* Payment Method */}
          <div className="delivery-details">
            <h5>Choose Payment Method</h5>
            <hr />
            <div className="payment-type">
              <label style={{ marginRight: "20px" }}>
                <input
                  type="radio"
                  name="paymentOption"
                  value="cashOnDelivery"
                  checked={formState.paymentOption === "cashOnDelivery"}
                  onChange={handleInputChange}
                />
                Cash On Delivery
              </label>
              <label>
                <input
                  type="radio"
                  name="paymentOption"
                  value="digitalPayment"
                  checked={formState.paymentOption === "digitalPayment"}
                  onChange={handleInputChange}
                />
                E-sewa
              </label>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="action-buttons">
            <button onClick={() => navigate("/Cart")} className="back-button">
              Back
            </button>
            <button
              type="submit"
              onClick={handleProceedPayment}
              className="proceed-button"
            >
              Proceed for Payment
            </button>
          </div>
        </div>

        <div className="place-order-right ">
          <div className="cart-header">
            <h2>My Cart ({getTotalItemsInCart()} items)</h2> <hr />
            {food_list.map(
              (item) =>
                cartItems[item._id] > 0 && (
                  <div key={item._id} className="cart-item">
                    <img src={`${url}/images/${item.image}`} alt={item.name} />
                    <div className="item-details">
                      <div className="sub-item">
                        <h4>{item.name}</h4>
                        <p style={{marginButton:"2rem",gap:"2rem"}}>
                          <i>Price: Rs. {item.price}</i>
                        </p>
                        <p style={{marginTop:"-1rem"}}>
                        {" "}
                        <i>Quantity: {cartItems[item._id]}</i>
                      </p>{" "}<hr className="hr" />
                      </div>
                    </div>
                  </div>
                )
            )}
          </div>
          <div className="cart-summary">
            <p>
              Subtotal: <i className="cart-amt">Rs. {getTotalCartAmount()}</i>
            </p>
            <p>
              Delivery Fee: <i className="cart-amtt"> Rs. {deliveryFee}</i>
            </p>{" "}
            <hr />
            <p>
              Total: <i className="cart-amttt">Rs. {totalAmount}</i>
            </p>
          </div>
        </div>

        {isMapVisible && (
          <div className="map-modal">
            <div id="map" style={{ height: "500px", width: "70%" }}></div>
            <button className="close-map-button" onClick={closeMap}>
              Close Map
            </button>
          </div>
        )}

        <ToastContainer />
      </div>
    </form>
  );
};

export default PlaceOrder;
