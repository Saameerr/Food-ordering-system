import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const url = "http://localhost:4000";
  const [token,setToken] =  useState("")
  const [food_list, setFoodList] = useState([]);

  const addToCart = async (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
    if (token) {
      await axios.post(url+"/api/cart/add",{itemId},{headers:{token}})
      
    }
  };

  const removeFromCart = async (itemId) => {
    // Update the cart state to remove the item completely
    setCartItems((prev) => {
      const updatedCart = { ...prev };
      delete updatedCart[itemId]; // Remove the item by its ID
      return updatedCart;
    });
  
    // If the user is logged in, send an API request to remove the item from the backend
    if (token) {
      try {
        await axios.post(url + "/api/cart/remove", { itemId }, { headers: { token } });
      } catch (error) {
        console.error("Error removing item from cart:", error);
      }
    }
  };
  

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);
        totalAmount += itemInfo.price * cartItems[item];
      }
    }
    return totalAmount;
  };

  const fetchFoodList = async () => {
    const response = await axios.get(url + "/api/food/list");
    setFoodList(response.data.data);
  };

  const loadCartData = async (token) =>{
    const response = await axios.post(url+"/api/cart/get",{},{headers:{token}})
    setCartItems(response.data.cartData);
  }

  useEffect(() => {
    async function loadData() {
      await fetchFoodList();
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
        await loadCartData(localStorage.getItem("token"));
      }
    }
    loadData();
  }, []);

  const getTotalItemsInCart = () => {
    let totalItems = 0;
    for (const itemId in cartItems) {
      // Check if the quantity of the item is greater than 0
      if (cartItems[itemId] > 0) {
        // Accumulate the total quantity
        totalItems += 1;
      }
    }

    return totalItems;
  }

   // Function to update the quantity of a specific cart item
   const updateCartItemQuantity = (itemId, newQuantity) => {
    setCartItems((prevCartItems) => {
      if (newQuantity > 0) {
        // Update the quantity if newQuantity > 0
        return {
          ...prevCartItems,
          [itemId]: newQuantity,
        };
      } else {
        // Remove the item if newQuantity is 0
        const updatedCart = { ...prevCartItems };
        delete updatedCart[itemId];
        return updatedCart;
      }
    });
  };


  // Clear cart function
  const clearCart = async () => {
    if (!token) {
      console.error("Token is missing. Cannot clear the cart.");
      return; // Exit early if token is not present
    }
  
    try {
      // Post request to backend to clear the cart
      const response = await axios.post(`${url}/api/cart/clear`, {}, { headers: { token } });
  
      if (response.status === 200) {
        // Reset the cart state on frontend only if backend call succeeds
        setCartItems({});
        console.log("Cart cleared successfully!");
        // Optionally: Show a success notification
        // toast.success("Your cart has been cleared!");
      } else {
        console.error("Failed to clear the cart:", response.data.message);
        // Optionally: Show an error notification
        // toast.error("Failed to clear the cart.");
      }
    } catch (error) {
      console.error("Error resetting cart items:", error.message);
      // Optionally: Show an error notification
      // toast.error("An error occurred while clearing the cart.");
    }
  };
  
  

 

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    getTotalItemsInCart,
    updateCartItemQuantity,
    url,
    token,
    setToken,
    clearCart
  };
  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
