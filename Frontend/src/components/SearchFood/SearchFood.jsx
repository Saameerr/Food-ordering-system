import React, { useState } from "react";
import { food_list } from "../../assets/assets";

const SearchFood = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredFood, setFilteredFood] = useState([]); // start with empty array that is not showing dataset//

  // Handle the search input change
  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);

    if (term === "") {
      setFilteredFood([]); // Reset to full list if search is empty
    } else {
      const filtered = food_list.filter((food) =>
        food.name.toLowerCase().includes(term)
      );
      setFilteredFood(filtered);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      {/* Search Bar */}
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Search for food..."
        style={{
          width: "100%",
          padding: "10px",
          fontSize: "16px",
          border: "1px solid #ccc",
          borderRadius: "5px",
          marginBottom: "10px",
        }}
      />

      {/* Food List */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "20px",
        }}
      >
        {filteredFood.length > 0 ? (
          filteredFood.map((food) => (
            <div
              key={food._id}
              style={{
                border: "1px solid #ddd",
                borderRadius: "10px",
                padding: "10px",
                textAlign: "center",
              }}
            >
              <img
                src={food.image}
                alt={food.name}
                style={{
                  width: "100%",
                  height: "150px",
                  objectFit: "cover",
                  borderRadius: "10px",
                }}
              />
              <h3 style={{ margin: "10px 0" }}>{food.name}</h3>
              <p>{food.description}</p>
              <p style={{ fontWeight: "bold" }}>Price: ₹{food.price}</p>
              <p style={{ fontStyle: "italic", color: "#555" }}>
                Category: {food.category}
              </p>
            </div>
          ))
        ) : (
          <p style={{ textAlign: "center", color: "#555" }}>
            No food items found.
          </p>
        )}
      </div>
    </div>
  );
};

export default SearchFood;
