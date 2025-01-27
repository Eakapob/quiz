import React, { useState, useEffect } from "react";
import "../App.css";
import silde1 from "../Asset/ห้องแห่งความลับ.jpg";
import silde2 from "../Asset/ศิลาอาถรรพ์.jpg";
import silde3 from "../Asset/นักโทษแห่งอัซคาบัน.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation, Pagination } from "swiper/modules";
import { useNavigate } from "react-router-dom";

function Document() {
  const [cart, setCart] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  const [newBook, setNewBook] = useState({ name: "", price: "", image: "" });
  const [showAddBookModal, setShowAddBookModal] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3001/bookstores")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const handleAddToCart = (product) => {
    setSelectedProduct(product);
    setQuantity(1); // Reset quantity
    setShowModal(true);
  };

  const confirmAddToCart = () => {
    const updatedCart = [...cart];
    const existingProduct = updatedCart.find(
      (item) => item.id === selectedProduct.id
    );
    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      updatedCart.push({ ...selectedProduct, quantity });
    }
    setCart(updatedCart);
    setShowModal(false);
  };

  // เพิ่มหนังสือ
  const handleAddNewBook = async (newBook) => {
    try {
      const formData = new FormData();
      formData.append("name", newBook.name);
      formData.append("price", newBook.price);
  
      if (newBook.image && newBook.image instanceof File) {
        // Append the raw file directly to FormData
        formData.append("image", newBook.image);
      } else {
        console.error("The image is not valid.");
        return;
      }
  
      // Send the formData to the server
      const response = await fetch("http://localhost:3001/bookstores", {
        method: "POST",
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error(`Failed to add book: ${response.statusText}`);
      }
  
      const data = await response.json();
      console.log("Book added successfully:", data);
    } catch (error) {
      console.error("Error adding new book:", error);
    }
  };

  const sendBookData = async (formData) => {
    try {
      const response = await fetch("http://localhost:3001/bookstores", {
        method: "POST",
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error(`Failed to add book: ${response.statusText}`);
      }
  
      const data = await response.json();
      console.log("Book added successfully:", data);
    } catch (error) {
      console.error("Error uploading book:", error);
    }
  };

  const goToCartPage = () => {
    navigate("/cart", { state: { cart } });
  };

  return (
    <div className="Document">
      <header>
        <nav className="bg-sky-100 border-gray-200">
          <div className="flex justify-between items-center p-4">
            <h1 className="text-xl font-bold">Book Store</h1>
            <button
              onClick={goToCartPage}
              className="bg-orange-500 text-white px-4 py-2 rounded-lg"
            >
              View Cart ({cart.length})
            </button>
          </div>
        </nav>
      </header>

      <main className="mt-10 ml-20 mr-20">
        <Swiper
          className="default-carousel"
          loop={true}
          pagination={{ clickable: true }}
          navigation={true}
          modules={[Pagination, Navigation]}
        >
          {products.map((product) => (
            <SwiperSlide key={product.id}>
              <img src={product.image} alt={product.name} />
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="grid grid-cols-3 gap-4 mt-10">
          {products.map((product) => (
            <div className="p-4 border rounded-lg" key={product.id}>
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-40 object-cover"
              />
              <h3 className="text-lg font-bold mt-2">{product.name}</h3>
              <p className="text-sm text-gray-500">฿{product.price}</p>
              <button
                className="mt-2 bg-orange-500 text-white py-1 px-4 rounded-lg"
                onClick={() => handleAddToCart(product)}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>

        {/* ปุ่มเพิ่มหนังสือ */}
        <div className="flex justify-end mb-4">
          <button
            onClick={() => setShowAddBookModal(true)}
            className="bg-green-500 text-white px-4 py-2 rounded-lg"
          >
            Add New Book
          </button>
        </div>
      </main>

      {/* Modal */}
      {showModal && selectedProduct && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-xl font-bold">
              Add {selectedProduct.name} to Cart
            </h2>
            <div className="mt-4">
              <label className="block text-sm font-medium">Quantity</label>
              <input
                type="number"
                className="border rounded w-full mt-1 p-2"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
                min="1"
              />
            </div>
            <div className="mt-6 flex justify-end space-x-4">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded-lg"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="bg-orange-500 text-white px-4 py-2 rounded-lg"
                onClick={confirmAddToCart}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* modal เพิ่มหนังสือ */}
      {showAddBookModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-xl font-bold">Add New Book</h2>
            <div className="mt-4">
              <label className="block text-sm font-medium">Book Name</label>
              <input
                type="text"
                className="border rounded w-full mt-1 p-2"
                value={newBook.name}
                onChange={(e) =>
                  setNewBook({ ...newBook, name: e.target.value })
                }
              />
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium">Price</label>
              <input
                type="number"
                className="border rounded w-full mt-1 p-2"
                value={newBook.price}
                onChange={(e) =>
                  setNewBook({ ...newBook, price: e.target.value })
                }
              />
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium">Image URL</label>
              <input
                type="file"
                className="border rounded w-full mt-1 p-2"
                onChange={(e) => {
                  const file = e.target.files[0]; // Get the selected file
                  if (file) {
                    setNewBook({ ...newBook, image: file });
                  }
                }}
              />
            </div>
            <div className="mt-6 flex justify-end space-x-4">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded-lg"
                onClick={() => setShowAddBookModal(false)}
              >
                Cancel
              </button>
              <button
                className="bg-green-500 text-white px-4 py-2 rounded-lg"
                onClick={() => {
                  handleAddNewBook(newBook);
                  setShowAddBookModal(false); // Close the modal after adding the book
                }}
              >
                Add Book
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Document;
