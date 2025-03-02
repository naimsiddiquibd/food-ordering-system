import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, removeFromCart, updateQuantity } from "../../store/slices/cartSlice";
import { MinusIcon, PlusIcon, XMarkIcon } from '@heroicons/react/24/solid';
import PaymentModal from "./PaymentModal";


const CartModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.cart);
  const { resInfo, loading, error } = useSelector((state) => state.restaurant);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false); // State for PaymentModal

  if (loading) return <p className="text-center mt-5">Loading...</p>;
  if (error) return <p className="text-center mt-5 text-red-500">{error}</p>;

  // Calculate total price of all items in the cart
  const totalPrice = items.reduce((total, item) => total + item.totalPrice, 0);

  // Handle quantity increment
  const handleIncrement = (itemId) => {
    const item = items.find((item) => item.id === itemId);
    if (item) {
      dispatch(updateQuantity({ id: itemId, quantity: item.quantity + 1 }));
    }
  };

  // Handle quantity decrement
  const handleDecrement = (itemId) => {
    const item = items.find((item) => item.id === itemId);
    if (item && item.quantity > 1) {
      dispatch(updateQuantity({ id: itemId, quantity: item.quantity - 1 }));
    }
  };

  // Handle item removal
  const handleRemoveItem = (itemId) => {
    dispatch(removeFromCart(itemId));
  };

  // Handle clearing the cart
  const handleClearCart = () => {
    dispatch(clearCart());
  };

  // Close the modal when clicking outside (on the backdrop)
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Open the PaymentModal
  const openPaymentModal = () => {
    setIsPaymentModalOpen(true);
  };

  // Close the PaymentModal
  const closePaymentModal = () => {
    setIsPaymentModalOpen(false);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/20"
          onClick={handleBackdropClick} // Close modal when clicking outside
        >
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="w-full max-w-md bg-gray-200 rounded-t-3xl shadow-lg overflow-hidden flex flex-col"
            style={{ maxHeight: "90vh" }}
          >
            {/* Scrollable Content */}
            <div className="overflow-y-auto flex-1" style={{ maxHeight: "calc(90vh - 6rem)" }}>
              {/* Cart Header */}
              <div className="flex items-center justify-center p-2">
                <div onClick={onClose} className="bg-gray-400 h-[6px] w-[146px] rounded"></div>
              </div>
              <div className="px-6 py-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-2xl font-bold">Your Cart</h2>
                    <p className="text-base font-semibold text-[#FDB92A]">{resInfo?.restaurant_name}</p>
                  </div>
                  <div>
                    <img
                      className="h-16 w-16 bg-white rounded-full p-2"
                      src={resInfo?.restaurant_photo}
                      alt={resInfo?.restaurant_name}
                    />
                  </div>
                </div>
              </div>

              {/* Cart Items */}
              <div className="px-6">
                {items.length === 0 ? (
                  <p className="text-center text-gray-500">Your cart is empty.</p>
                ) : (
                  items.map((item) => (
                    <div key={item.id} className="bg-white p-4 rounded-lg mb-2"> {/* Unique key */}
                      <div className="border-2 border-gray-300 p-4 rounded-lg">
                        <div className="flex justify-between items-center mb-4">
                          <div className="flex items-center gap-2">
                            {/* Product Image */}
                            <img
                              src={item.product_picture}
                              alt={item.name}
                              className="h-12 w-12 object-cover rounded-lg"
                            />
                            <div>
                              <h3 className="text-md font-semibold">{item.name}</h3>
                              <p className="text-md font-semibold text-orange-300">{item.totalPrice} TK</p>
                            </div>
                          </div>
                          <button
                            onClick={() => handleRemoveItem(item.id)}
                            className="text-gray-500 hover:text-red-500"
                          >
                            <XMarkIcon className="h-5 w-5" />
                          </button>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => handleDecrement(item.id)}
                              className="p-2 bg-[#D9D9D9] flex justify-center rounded-full"
                            >
                              <MinusIcon className="h-4 w-4 text-gray-900" />
                            </button>
                            <p className="text-black text-lg">{item.quantity}</p>
                            <button
                              onClick={() => handleIncrement(item.id)}
                              className="p-2 bg-[#FDB92A] flex justify-center rounded-full"
                            >
                              <PlusIcon className="h-4 w-4 text-white" />
                            </button>
                          </div>
                        </div>

                        {/* Extras */}
                        {item.extras.vanilla && (
                          <p className="text-sm text-gray-600 mt-2">+ Vanilla Flavour</p>
                        )}
                        {item.extras.chocolate && (
                          <p className="text-sm text-gray-600 mt-2">+ Chocolate Flavour</p>
                        )}

                        {/* Special Instructions */}
                        {item.specialInstructions && (
                          <p className="text-sm text-gray-600 mt-2 flex items-center justify-start gap-1 border-2 border-gray-300 p-2 rounded-lg">
                            {item.specialInstructions}
                          </p>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Fixed Bottom Tab */}
            <div className="sticky btm-nav flex justify-between bg-white h-28 z-[9000] px-4">
              <div className="w-full pb-5 pt-3">
                <div className="flex justify-between items-center pt-2 w-full">
                  <div>
                    <p className="text-[18px] font-semibold text-black">
                      Total<span className="text-[12px] text-[#808080] ml-1">(Incl. VAT)</span>
                    </p>
                  </div>
                  <div>
                    <p className="text-[20px] text-[#FDB92A] font-semibold">{totalPrice} TK</p>
                  </div>
                </div>
                <div
                  onClick={openPaymentModal} // Open PaymentModal when clicked
                  className="bg-[#3F170A] w-full rounded-lg my-0 flex justify-center items-center px-3 py-3 mx-auto z-[8000] cursor-pointer"
                >
                  <div className="text-white">Proceed to Pay</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Render the PaymentModal */}
      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={closePaymentModal}
        totalPrice={totalPrice}
      />
    </AnimatePresence>
  );
};

export default CartModal;