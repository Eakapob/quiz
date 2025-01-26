import React from "react";
import { useLocation } from "react-router-dom";

function Cart() {
  const location = useLocation();
  const cart = location.state?.cart || [];

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
      {cart.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        <div>
          <ul className="space-y-4">
            {cart.map((item) => (
              <li key={item.id} className="flex justify-between items-center">
                <div>
                  <h2 className="text-lg font-bold">{item.name}</h2>
                  <p>฿{item.price} x {item.quantity}</p>
                </div>
                <p>฿{item.price * item.quantity}</p>
              </li>
            ))}
          </ul>
          <div className="mt-6 text-xl font-bold">Total: ฿{totalPrice}</div>
        </div>
      )}
    </div>
  );
}

export default Cart;
