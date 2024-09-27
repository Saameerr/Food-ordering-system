import React, { useContext } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../Context/StoreContext";

const PlaceOrder = () => {
  const { getTotalCartAmount } = useContext(StoreContext);
  return (
    <form className="place-order">
      <div className="place-orderleft">
        <p className="title">
          <h2>Delivery Information</h2>
        </p>
        <div className="multi-fields">
          <input type="text" placeholder="First Name" />
          <input type="text" placeholder="Last Name" />
        </div>
        <input type="number" placeholder="Phone" />
        <input type="email" placeholder="E-mail address" />
        <div className="multi-fields">
          <input type="text" placeholder="City" />
          <input type="text" placeholder="Country" />
        </div>
      </div>
      <div className="place-orderright">
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
        <button> Proceed to Payment.</button>
      </div>
    </form>
  );
};

export default PlaceOrder;
