import React, { useContext, useState, useEffect } from "react";
import { StoreContext } from "../../Context/StoreContext";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import L from "leaflet"; // Import Leaflet
import "leaflet/dist/leaflet.css";
import "./PlaceOrder.css";

const PlaceOrder = () => {
  const { cartItems, food_list, getTotalCartAmount, getTotalItemsInCart, url } =
    useContext(StoreContext);
  const [deliveryType, setDeliveryType] = useState("homeDelivery");
  const [paymentOption, setPaymentOption] = useState("");
  const [isMapVisible, setIsMapVisible] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [locationName, setLocationName] = useState("");
  const navigate = useNavigate();

  const defaultLocation = { latitude: 27.7172, longitude: 85.324 }; // Set default coordinates (Kathmandu, Nepal)

  useEffect(() => {
    // Set default location on component mount
    setUserLocation(defaultLocation);
  }, []);

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

  const handleDeliveryTypeChange = (e) => {
    setDeliveryType(e.target.value);
  };

  const handlePaymentOptionChange = (e) => {
    setPaymentOption(e.target.value);
  };

  const handleProceedPayment = () => {
    if (paymentOption === "digitalPayment") {
      navigate("/PaymentForm", { state: { totalAmount } });
    } else if (paymentOption === "cashOnDelivery") {
      toast.success(
        "You have selected Cash on Delivery. Your order will be placed."
      );
    } else {
      toast.error("Please select a payment method before proceeding.");
    }
  };

  const deliveryFee = deliveryType === "takeaway" ? 0 : 85;
  const totalAmount = getTotalCartAmount() + deliveryFee;

  const reverseGeocode = async (latitude, longitude) => {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
    );
    const data = await response.json();
    return data.display_name;
  };

  const handleMapClick = async (e) => {
    const { lat, lng } = e.latlng;
    setUserLocation({ latitude: lat, longitude: lng });

    // Reverse geocode the coordinates to get the place name
    const place = await reverseGeocode(lat, lng);
    setLocationName(place);

    // Close the map after selecting the location
    setIsMapVisible(false);

    toast.success(`Location selected: ${place}`);
  };

  useEffect(() => {
    if (isMapVisible && userLocation) {
      const map = L.map("map").setView(
        [userLocation.latitude, userLocation.longitude],
        13
      );

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
      }).addTo(map);

      const marker = L.marker([
        userLocation.latitude,
        userLocation.longitude,
      ]).addTo(map);
      marker.bindPopup("Your location").openPopup();

      map.on("click", handleMapClick); // Handle map click

      return () => {
        map.remove();
      };
    }
  }, [isMapVisible, userLocation]);

  const handleCloseMap = () => {
    // If the map is closed without selecting a location, set the location to the default one
    setUserLocation(defaultLocation);
    setIsMapVisible(false);
    toast.info("Map closed. Default location set.");
  };

  return (
    <div className="place-order-container">
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
                  checked={deliveryType === "homeDelivery"}
                  onChange={handleDeliveryTypeChange}
                />
                Home Delivery
              </label>
              <label>
                <input
                  type="radio"
                  name="deliveryType"
                  value="takeaway"
                  checked={deliveryType === "takeaway"}
                  onChange={handleDeliveryTypeChange}
                />
                Takeaway
              </label>
            </div>
          </div>

          {deliveryType === "homeDelivery" && (
            <div className="delivery-details">
              <h4>Deliver To</h4>
              <hr />
              <p className="location-button" onClick={openMap}>
                + Add Your Location
              </p>
              {locationName && <p>Selected Location: {locationName}</p>}
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
                  <option
                    key={i}
                    value={`${i.toString().padStart(2, "0")}:00`}
                  >{`${i.toString().padStart(2, "0")}:00`}</option>
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
                  checked={paymentOption === "cashOnDelivery"}
                  onChange={handlePaymentOptionChange}
                />
                Cash On Delivery
              </label>
              <label>
                <input
                  type="radio"
                  name="paymentOption"
                  value="digitalPayment"
                  checked={paymentOption === "digitalPayment"}
                  onChange={handlePaymentOptionChange}
                />
                E-sewa
              </label>
            </div>
          </div>
        </div>

        <div className="action-buttons">
          <button onClick={() => navigate("/Cart")} className="back-button">
            Back
          </button>
          <button onClick={handleProceedPayment} className="proceed-button">
            Proceed for Payment
          </button>
        </div>
      </div>

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
                    <img
                      src={`${url}/images/${item.image}`}
                      alt={item.name}
                      className="item-image"
                    />
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

      {isMapVisible && (
        <div className="map-modal">
          <div id="map" style={{ height: "400px", width: "100%" }}></div>
          <button
            onClick={handleCloseMap} // Close and set to default location
            className="close-map-button"
          >
            Close Map
          </button>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default PlaceOrder;
