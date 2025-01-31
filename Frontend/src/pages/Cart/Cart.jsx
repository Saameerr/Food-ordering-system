import React, { useContext } from "react";
import "./Cart.css";
import { StoreContext } from "../../Context/StoreContext";
import { useNavigate } from "react-router-dom";

const Cart = ({ setShowLogin }) => {
  // Accept setShowLogin as a prop
  const {
    cartItems,
    food_list,
    removeAllFromCart,
    getTotalCartAmount,
    updateCartItemQuantity,
    token,
    url,
  } = useContext(StoreContext);
  const navigate = useNavigate();

  // Check if cart is empty
  const isCartEmpty = !food_list.some((items) => cartItems[items._id] > 0);

  const handleCheckout = () => {
    if (!token) {
      // If no token, show login modal
      setShowLogin(true); // This will trigger the login modal in App.jsx
    } else {
      // If token exists, proceed to checkout page
      navigate("/order");
    }
  };
  // Increment function
  const incrementQuantity = (itemId) => {
    updateCartItemQuantity(itemId, cartItems[itemId] + 1); // Update the item quantity in cart
  };

  // Decrement function
  const decrementQuantity = (itemId) => {
    if (cartItems[itemId] > 1) {
      updateCartItemQuantity(itemId, cartItems[itemId] - 1); // Update the item quantity in cart
    }
  };

  return (
    <div className="cart-page">
      {/* Show 'Cart is empty' message if no items in cart */}
      {isCartEmpty ? (
        <div className="empty-cart">
          <img
            src="cartEmpty.png"
            alt="nophoto"
            style={{ height: "400px", width: "400px", cursor: "pointer" }}
          />
          <a href="home">
            <button>Go to Home</button>
          </a>
        </div>
      ) : (
        <>
          {/* Cart details if items are present */}
          <div className="cart">
            <div className="cart-content">
              <div className="cart-items">
                <div className="cart-itemstitle">
                  <p>Items</p>
                  <p>Title</p>
                  <p>Price</p>
                  <p>Quantity</p>
                  <p>Total</p>
                  <p>Remove</p>
                </div>
                <br />

                {food_list.map((items, index) => {
                  if (cartItems[items._id] > 0) {
                    return (
                      <div
                        key={index}
                        className="cart-itemstitle cart-itemsitem"
                      >
                        <img src={url + "/images/" + items.image} alt="" />
                        <p>{items.name}</p>
                        <p> Rs.{items.price}</p>
                        <div className="quantity_btn">
                          <button onClick={() => incrementQuantity(items._id)}>
                            +
                          </button>
                          <p>{cartItems[items._id]}</p>
                          <button onClick={() => decrementQuantity(items._id)} style={{backgroundColor:"tomato"}}>
                            -
                          </button>
                        </div>
                        <p> Rs.{items.price * cartItems[items._id]}</p>{" "}
                        {/* Total amount of items */}
                        <p
                          onClick={() => removeAllFromCart(items._id)}
                          className="removecart"
                        >
                          x
                        </p>
                      </div>
                    );
                  }
                })}
              </div>

              {/* Cart total section moved here for side-by-side layout */}
              <div className="cart-bottom">
                <div className="cart-total">
                  <h2>Cart Total</h2>
                </div>
                <div className="cart-totaldetail">
                  <p>Subtotal</p>
                  <p style={{ marginLeft: "5rem" }}>
                    {" "}
                    Rs.{getTotalCartAmount()}
                  </p>{" "}
                  <hr />
                </div>
                <div className="cart-totaldetail">
                  <p>Delivery Fee</p>
                  <p style={{ marginLeft: "3.3rem" }}>
                    {" "}
                    Rs.{getTotalCartAmount() === 0 ? 0 : 85}
                  </p>{" "}
                  <hr />
                </div>
                <div className="cart-totaldetail">
                  <b>Total</b>
                  <b style={{ marginLeft: "6.3rem" }}>
                    Rs.
                    {getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 85}
                  </b>
                </div>
                <button onClick={handleCheckout}>Checkout</button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
