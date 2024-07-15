"use client";
import React, { useContext } from "react";
import Link from "next/link";
import { CartContext } from "../../context/CartContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

const Cart: React.FC = () => {
  const cartContext = useContext(CartContext);

  if (!cartContext) {
    return null;
  }

  const {
    cart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    cartTotalPrice,
  } = cartContext;

  return (
    <div className="container mx-auto px-6 py-12">
      <h2 className="text-2xl font-bold mb-6">Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div>
          <ul>
            {cart.map((product) => (
              <li
                key={product._id}
                className="mb-4 flex items-center justify-between"
              >
                <Link
                  href={`/product/${product._id}`}
                  className="flex items-center"
                >
                  <Image
                    src={product.mainImage}
                    alt={product.name}
                    className="w-16 h-16 object-cover mr-4"
                    width={24}
                    height={24}
                  />
                  <div>
                    <h3 className="text-lg font-semibold">{product.name}</h3>
                    <p className="text-gray-600">
                      Unit Price: ${product.price.toFixed(2)}
                    </p>
                    <p className="text-gray-600">
                      Total: ${(product.price * product.quantity).toFixed(2)}
                    </p>
                  </div>
                </Link>
                <div className="flex items-center">
                  <button
                    onClick={() => decreaseQuantity(product._id)}
                    className="text-gray-600 hover:text-gray-800"
                  >
                    <FontAwesomeIcon icon={faMinus} />
                  </button>
                  <span className="mx-2">{product.quantity}</span>
                  <button
                    onClick={() => increaseQuantity(product._id)}
                    className="text-gray-600 hover:text-gray-800"
                  >
                    <FontAwesomeIcon icon={faPlus} />
                  </button>
                  <button
                    onClick={() => removeFromCart(product._id)}
                    className="text-red-600 hover:text-red-800 ml-4"
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-6 text-right">
            <h3 className="text-xl font-bold">
              Total Price: ${cartTotalPrice.toFixed(2)}
            </h3>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
