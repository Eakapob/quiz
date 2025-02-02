import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Cart() {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);

  //โหลด cart จาก localStorage
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const handleRemoveItem = (productId) => {
    const updatedCart = cart.filter((item) => item.id !== productId);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  //คำนวนลดราคา
  const calculateDiscount = (cart) => {
    // นับจำนวนหนังสือที่ไม่ซ้ำกัน
    const uniqueBooks = new Set(cart.map((item) => item.name)).size;

    // คำนวณส่วนลดตามจำนวนหนังสือที่ไม่ซ้ำกัน
    let discountPercentage = 0;
    if (uniqueBooks >= 2 && uniqueBooks <= 6) {
      discountPercentage = (uniqueBooks - 1) * 10; // 2 เล่ม = 10%, 3 เล่ม = 20%, ..., 6 เล่ม = 50%
    } else if (uniqueBooks > 6) {
      discountPercentage = 60; // ส่วนลดสูงสุด 60%
    }

    return discountPercentage;
  };

  const calculateTotalPrice = (cart) => {
    // คำนวณราคารวมก่อนหักส่วนลด
    const totalPriceBeforeDiscount = cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    // คำนวณส่วนลดเฉพาะเล่มแรกของหนังสือแต่ละชื่อ
    const uniqueBooks = new Set();
    let totalDiscountAmount = 0;
    cart.forEach((item) => {
      if (!uniqueBooks.has(item.name)) {
        uniqueBooks.add(item.name);
        totalDiscountAmount += (item.price * calculateDiscount(cart)) / 100;
      }
    });

    // คำนวณราคารวมหลังหักส่วนลด
    const totalPriceAfterDiscount =
      totalPriceBeforeDiscount - totalDiscountAmount;

    return {
      totalPriceBeforeDiscount,
      discountPercentage: calculateDiscount(cart),
      discountAmount: totalDiscountAmount,
      totalPriceAfterDiscount,
    };
  };

  // คำนวณราคารวมและส่วนลด
  const {
    totalPriceBeforeDiscount,
    discountPercentage,
    discountAmount,
    totalPriceAfterDiscount,
  } = calculateTotalPrice(cart);

  const handleIncreaseQuantity = (productId) => {
    const updatedCart = cart.map((item) =>
      item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };
  
  const handleDecreaseQuantity = (productId) => {
    const updatedCart = cart
      .map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
      )
      .filter((item) => item.quantity > 0); // ลบสินค้าที่มี quantity เป็น 0 ออกจาก cart
  
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  return (
    <div className="cart bg-sky-50 min-h-screen p-8">
      <header>
        <nav className="bg-sky-100 border-gray-200 mb-6">
          <div className="flex justify-between item-center p-4">
            <h1 className="text-xl font-bold">Shopping Cart</h1>
            <button
              onClick={() => navigate("/")}
              className="bg-orange-500 text-white px-4 py-2 rounded-lg"
            >
              Continue Shopping
            </button>
          </div>
        </nav>
      </header>
      <main className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
        {cart.length > 0 ? (
          <div>
            <div className="grid grid-cols-1 gap-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center border p-4 rounded-lg"
                >
                  <img
                    src={`/images/${item.image_data || "default-image.jpg"}`}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div className="ml-4 flex-grow">
                    <h3 className="text-lg font-bold">{item.name}</h3>
                    <p className="text-sm text-gray-500">
                      Price: ฿{item.price}
                    </p>
                    <p className="text-sm text-gray-500">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                  <div className="flex gap-2 items-center">
                  {item.quantity > 1 ? (
                    <button
                      onClick={() => handleDecreaseQuantity(item.id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg"
                    >
                      -
                    </button>
                  ) : (
                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg"
                    >
                      Remove
                    </button>
                  )}
                    <p className="">{item.quantity}</p>
                    <button
                      onClick={() => handleIncreaseQuantity(item.id)}
                      className="bg-green-500 text-white px-4 py-2 rounded-lg"
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 text-right">
              <div>
                <p>ราคารวมก่อนหักส่วนลด: ฿{totalPriceBeforeDiscount}</p>
                <p>
                  ส่วนลด ({discountPercentage}%): ฿{discountAmount}
                </p>
                <p>ราคารวมหลังหักส่วนลด: ฿{totalPriceAfterDiscount}</p>
              </div>
              {/* <button
                onClick={handleCheckout}
                className="mt-4 bg-green-500 text-white px-6 py-3 rounded-lg"
              >
                Checkout
              </button> */}
            </div>
          </div>
        ) : (
          <p className="text-gray-500">Your cart is empty.</p>
        )}
      </main>
    </div>
  );
}

export default Cart;
