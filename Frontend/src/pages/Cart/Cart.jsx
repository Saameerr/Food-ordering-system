import React, { useContext } from "react";
import "./Cart.css";
import { StoreContext } from "../../Context/StoreContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItems, food_list, removeFromCart, getTotalCartAmount, getTotalItemsInCart,url } =
    useContext(StoreContext);
  const navigate = useNavigate();

  // Check if cart is empty
  const isCartEmpty = !food_list.some((items) => cartItems[items._id] > 0);

  return (
    <div className="cart-page">
      {/* Show 'Cart is empty' message if no items in cart */}
      {isCartEmpty ? (
        <div className="empty-cart">
          <img src="cartEmpty.png" alt="nophoto" style={{ height: "400px", width: "400px", cursor: "pointer" }} />
          <a href="home"><button>Go to Home</button></a>
        </div>
      ) : (
        <>
          {/* Cart details if items are present */}
          <div className="cart">
            <div className="cart-content"> {/* New flex container */}
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

                {/* Display total items in the cart */}
                <div className="cart-total-items">
                  <h4>Total Items: {getTotalItemsInCart()}</h4>
                </div>
                

                {food_list.map((items, index) => {
                  if (cartItems[items._id] > 0) {
                    return (
                      <div key={index} className="cart-itemstitle cart-itemsitem">
                        <img src={url+"/images/"+items.image} alt="" />
                        <p> {items.name}</p>
                        <p> Rs.{items.price}</p>
                        <p>{cartItems[items._id]}</p>
                        <p> Rs.{items.price * cartItems[items._id]}</p>   {/* Total amount of items */}
                        <p
                          onClick={() => removeFromCart(items._id)}
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
                  <p style={{marginLeft:"5rem"}}> Rs.{getTotalCartAmount()}</p> <hr />
                </div>
                <div className="cart-totaldetail">
                  <p>Delivery Fee</p>
                  <p  style={{marginLeft:"3.3rem"}}> Rs.{getTotalCartAmount() === 0 ? 0 : 85}</p> <hr />
                </div>
                <div className="cart-totaldetail">
                  <b>Total</b>
                  <b style={{marginLeft:"6.3rem"}}>
                    Rs.{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 85}
                  </b>
                </div>
                <button onClick={() => navigate("/order")}>Checkout</button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
