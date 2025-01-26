import React, { useState } from "react";
import axios from "axios";

function Create() {
  const [book, setBook] = useState([]);

  const [name, setName] = useState([]);
  const [price, setPrice] = useState([]);
  const [image, setImage] = useState(null);

  const getBooks = () => {
    axios.get("http://localhost:3001/bookstores").then((response) => {
      setBook(response.data);
    });
  };

  const handleSubmit = () => {

  }

  return (
    <form onSubmit={handleSubmit}>
      <label>Name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter a book name"
      />

      <label>Price</label>
      <input
        type="text"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Enter price"
      />

      <label>Img</label>
      <input type="file" accept="image/*"/>

      {image && <img src={image} alt="Preview" width="100" />}

      <button type="submit">Submit</button>

      <div className="book">
        <button className="" onClick={getBooks}>Show book</button>
        {book.map((val, key) => {
          return(
            <div className="book card">
              <div className="">
                <p className="">Name: {val.name}</p>
                <p className="">Price: {val.price}</p>
                <p className="">img: {val.img}</p>
              </div>
            </div>
          )
        })}
      </div>
    </form>
  );
}

export default Create;
