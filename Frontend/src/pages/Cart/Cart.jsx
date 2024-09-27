import React, { useContext } from "react";
import "./Cart.css";
import { StoreContext } from "../../Context/StoreContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItems, food_list, removeFromCart, getTotalCartAmount } =
    useContext(StoreContext);
  const navigate = useNavigate();
  return (
    <div className="cart">
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
        <hr />
        {food_list.map((items, index) => {
          if (cartItems[items._id] > 0) {
            return (
              <div className="cart-itemstitle cart-itemsitem">
                <img src={items.image} alt="" />
                <p> {items.name}</p>
                <p> Rs.{items.price}</p>
                <p>{cartItems[items._id]}</p>
                <p> Rs.{items.price * cartItems[items._id]}</p>
                {/*Total amount of items*/}
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

      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Total</h2>
        </div>
        <div className="cart-totaldetail">
          <p>Subtotal</p>
          <p> Rs.{getTotalCartAmount()}</p> <hr />
        </div>
        <div className="cart-totaldetail">
          <p>Delivery Fee</p>
          <p> Rs.{getTotalCartAmount() === 0 ? 0 : 5}</p> <hr />
        </div>
        <div className="cart-totaldetail">
          <b>Total</b>
          <b>Rs.{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 5}</b>
        </div>
        <button onClick={() => navigate("/order")}>Checkout</button>
      </div>
    </div>
  );
};

export default Cart;
