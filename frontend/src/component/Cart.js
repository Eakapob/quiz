import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Cart() {
  const navigate = useNavigate();
  const location = useLocation();
  const cart = location.state?.cart || [];

  const handleRemoveItem = (productId) => {
    const updatedCart = cart.filter((item) => item.id !== productId);
    navigate("/cart", { state: { cart: updatedCart } });
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleCheckout = () => {
    alert("Checkout complete!");
    navigate("/");
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
                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
            <div className="mt-6 text-right">
              <h3 className="text-xl font-bold">Total: ฿{getTotalPrice()}</h3>
              <button
                onClick={handleCheckout}
                className="mt-4 bg-green-500 text-white px-6 py-3 rounded-lg"
              >
                Checkout
              </button>
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
