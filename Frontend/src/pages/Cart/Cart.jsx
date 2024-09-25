import React, { useContext } from "react";
import "./Cart.css";
import { StoreContext } from "../../Context/StoreContext";

const Cart = () => {
  const { cartItems, food_list, removeFromCart, getTotalCartAmount } =
    useContext(StoreContext);
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
          <p> Rs.{2}</p> <hr />
        </div>
        <div className="cart-totaldetail">
          <b>Total</b>
          <b> Rs.{getTotalCartAmount() + 2}</b> <hr />
        </div>
        <button>Checkout</button>
      </div>
      <div className="cart-promocode">
        <div>
          <p>If you have a promo code, enter it here</p>
          <div className="cart-promocodeinput">
            <input type="text" placeholder="promocode" />
            <button>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
