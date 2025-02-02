import React, { useState, useEffect } from "react";
import "../App.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation, Pagination } from "swiper/modules";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Document() {
  const [cart, setCart] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  const [newBook, setNewBook] = useState({ name: "", price: "", image: "" });
  const [showAddBookModal, setShowAddBookModal] = useState(false);

  const [editingProduct, setEditingProduct] = useState(null);
  const [updatedData, setUpdatedData] = useState({
    name: "",
    price: "",
    image: null,
  });

  const itemsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(products.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = products.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    axios
      .get("http://localhost:3001/bookstores")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  //check image
  useEffect(() => {
    axios
      .get("http://localhost:3001/bookstores")
      .then((response) => {
        console.log("Products from API:", response.data); // ตรวจสอบค่าที่ได้จาก API
        setProducts(response.data);
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
    localStorage.setItem("cart", JSON.stringify(updatedCart)); // บันทึกลง localStorage ทันที
    setShowModal(false);
  };

  const handleAddNewBook = async (newBook) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/bookstores/upload",
        {
          name: newBook.name,
          price: newBook.price,
          image: newBook.image, // ส่ง URL ของภาพ
        }
      );

      console.log("Book added successfully:", response.data);
    } catch (error) {
      console.error("Error adding new book:", error);
    }
  };

  const handleEditClick = (product) => {
    setEditingProduct(product);
    setUpdatedData({
      name: product.name,
      price: product.price,
      image: product.image_data,
    });
  };

  const handleUpdate = async () => {
    if (!editingProduct) return;

    try {
      const response = await axios.put(
        `http://localhost:3001/bookstores/${editingProduct.id}`,
        {
          name: updatedData.name,
          price: updatedData.price,
          image: updatedData.image,
        }
      );

      alert("Product updated successfully!");
      setEditingProduct(null);

      // รีเฟรชข้อมูลหลังอัปเดต
      const fetchProducts = async () => {
        const response = await axios.get("http://localhost:3001/bookstores");
        setProducts(response.data);
      };
      fetchProducts();
    } catch (error) {
      console.error("Failed to update product:", error);
      alert("Failed to update product.");
    }
  };

  // ดึงข้อมูลตะกร้าจาก localStorage เมื่อโหลดหน้าเว็บ
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart)); // ตรวจสอบว่าพาร์ส JSON ได้
      } catch (error) {
        console.error("Error parsing cart from localStorage:", error);
        setCart([]); // ตั้งค่าเป็น array ว่างถ้าเกิด error
      }
    }
  }, []);

  // บันทึกข้อมูลตะกร้าใน localStorage เมื่อ cart เปลี่ยนแปลง
  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);

  // ฟังก์ชันบันทึกข้อมูลตะกร้าใน localStorage
  // const saveCartToLocalStorage = (cart) => {
  //   localStorage.setItem("cart", JSON.stringify(cart));
  // };

  // ฟังก์ชันดึงข้อมูลตะกร้าจาก localStorage
  // const loadCartFromLocalStorage = () => {
  //   const cart = localStorage.getItem("cart");
  //   return cart ? JSON.parse(cart) : [];
  // };

  // ฟังก์ชันลบสินค้าออกจากตะกร้า
  const handleDeleteProduct = async (productId) => {
    console.log("Deleting product with ID:", productId);

    try {
      await axios.delete(`http://localhost:3001/bookstores/${productId}`);
      setProducts(
        products.filter(
          (product) => parseInt(product.id, 10) !== parseInt(productId, 10)
        )
      );
      alert("Product deleted successfully!");
    } catch (error) {
      console.error("Failed to delete product:", error);
      alert("Failed to delete product.");
    }
  };

  const goToCartPage = () => {
    navigate("/cart", { state: { cart } });
  };

  return (
    <div className="cart bg-sky-50 min-h-screen p-8">
      <header>
        <nav className="bg-sky-100 border-gray-200 mb-6">
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

      <main className="bg-white p-6 rounded-lg shadow-lg">
        {/* <Swiper
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
        </Swiper> */}

        <div className="grid grid-cols-4 gap-4 mt-10">
          {currentProducts.map((product) => (
            <div className="p-4 border rounded-lg" key={product.id}>
              <img
                src={`/images/${product.image_data || "default-image.jpg"}`}
                alt={product.name}
                className="w-full h-[450px] object-contain"
              />
              <h3 className="text-lg font-bold mt-2">{product.name}</h3>
              <p className="text-sm text-gray-500">฿{product.price}</p>
              <button
                className="mt-2 bg-orange-500 text-white py-1 px-4 rounded-lg"
                onClick={() => handleAddToCart(product)}
              >
                Add to Cart
              </button>
              <button
                className="mt-2 bg-blue-500 text-white py-1 px-4 rounded-lg ml-2"
                onClick={() => handleEditClick(product)}
              >
                Update
              </button>
              <button
                className="mt-2 bg-red-500 text-white py-1 px-4 rounded-lg"
                onClick={() => handleDeleteProduct(product.id)}
              >
                Delete
              </button>
            </div>
          ))}
          {editingProduct && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white p-6 rounded-lg">
                <h2 className="text-lg font-bold mb-2">Edit Product</h2>
                <input
                  type="text"
                  value={updatedData.name}
                  onChange={(e) =>
                    setUpdatedData({ ...updatedData, name: e.target.value })
                  }
                  className="border p-2 w-full mb-2"
                  placeholder="Product Name"
                />
                <input
                  type="number"
                  value={updatedData.price}
                  onChange={(e) =>
                    setUpdatedData({ ...updatedData, price: e.target.value })
                  }
                  className="border p-2 w-full mb-2"
                  placeholder="Price"
                />
                <input
                  type="text"
                  value={updatedData.image}
                  onChange={(e) =>
                    setUpdatedData({ ...updatedData, image: e.target.value })
                  }
                  className="border p-2 w-full mb-2"
                  placeholder="Enter image file name"
                />
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded-lg mr-2"
                  onClick={handleUpdate}
                >
                  Save
                </button>
                <button
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg"
                  onClick={() => setEditingProduct(null)}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>

        {/* pagination */}
        <div className="flex justify-center mt-4 space-x-2">
          <button
            className="px-4 py-2 bg-gray-300 rounded-lg disabled:opacity-50"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              className={`px-4 py-2 rounded-lg ${
                currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}

          <button
            className="px-4 py-2 bg-gray-300 rounded-lg disabled:opacity-50"
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            Next
          </button>
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

      {/* Modal เพิ่มในตะกร้า*/}
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
          <div className="bg-white p-6 rounded-lg w-96 max-w-md">
            <h2 className="text-xl font-bold mb-2">Add New Book</h2>
            <div className="space-y-2">
              <input
                type="text"
                className="border p-2 w-full"
                value={newBook.name}
                onChange={(e) =>
                  setNewBook({ ...newBook, name: e.target.value })
                }
                placeholder="Book Name"
              />
              <input
                type="number"
                className="border p-2 w-full"
                value={newBook.price}
                onChange={(e) =>
                  setNewBook({ ...newBook, price: e.target.value })
                }
                placeholder="Price"
              />
              <input
                type="text"
                className="border p-2 w-full"
                value={newBook.image}
                onChange={(e) =>
                  setNewBook({ ...newBook, image: e.target.value })
                }
                placeholder="Enter image file name"
              />
            </div>
            <div className="mt-4 flex justify-end space-x-4">
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
                  setShowAddBookModal(false);
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
