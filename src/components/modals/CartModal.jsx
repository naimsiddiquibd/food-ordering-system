import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, removeFromCart, updateQuantity, updateCartItem } from "../../store/slices/cartSlice";
import { MinusIcon, PlusIcon, XMarkIcon, PencilIcon } from '@heroicons/react/24/solid';
import PaymentModal from "./PaymentModal";

const CartModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.cart);
  const { resInfo, loading, error } = useSelector((state) => state.restaurant);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [editingItemId, setEditingItemId] = useState(null); // Track which item is being edited
  const [editedInstructions, setEditedInstructions] = useState(""); // Store edited instructions

  if (loading) return <p className="text-center mt-5">Loading...</p>;
  if (error) return <p className="text-center mt-5 text-red-500">{error}</p>;

  // Helper function to calculate total price of an item
  const calculateTotalPrice = (item) => {
    const basePrice = item.price;
    const vanillaPrice = item.extras.vanilla ? item.extras.vanilla.quantity * item.extras.vanilla.price : 0;
    const chocolatePrice = item.extras.chocolate ? item.extras.chocolate.quantity * item.extras.chocolate.price : 0;
    return (basePrice + vanillaPrice + chocolatePrice) * item.quantity;
  };

  // Calculate total price of all items in the cart
  const totalPrice = items.reduce((total, item) => total + item.totalPrice, 0);

  // Handle quantity increment
  const handleIncrement = (cartItemId) => {
    const item = items.find((item) => item.cartItemId === cartItemId);
    if (item) {
      const newQuantity = item.quantity + 1;
      const newTotalPrice = calculateTotalPrice({ ...item, quantity: newQuantity });
      dispatch(updateQuantity({ cartItemId, quantity: newQuantity, totalPrice: newTotalPrice }));
    }
  };

  // Handle quantity decrement
  const handleDecrement = (cartItemId) => {
    const item = items.find((item) => item.cartItemId === cartItemId);
    if (item && item.quantity > 1) {
      const newQuantity = item.quantity - 1;
      const newTotalPrice = calculateTotalPrice({ ...item, quantity: newQuantity });
      dispatch(updateQuantity({ cartItemId, quantity: newQuantity, totalPrice: newTotalPrice }));
    }
  };

  // Handle item removal
  const handleRemoveItem = (cartItemId) => {
    dispatch(removeFromCart(cartItemId));
  };

  // Handle clearing the cart
  const handleClearCart = () => {
    dispatch(clearCart());
  };

  // Handle editing special instructions
  const handleEditInstructions = (cartItemId, currentInstructions) => {
    setEditingItemId(cartItemId);
    setEditedInstructions(currentInstructions);
  };

  // Save edited special instructions
  const saveEditedInstructions = (cartItemId) => {
    dispatch(updateCartItem({ cartItemId, specialInstructions: editedInstructions }));
    setEditingItemId(null); // Close the edit mode
  };

  // Handle removing an extra
  const handleRemoveExtra = (cartItemId, extra) => {
    const item = items.find((item) => item.cartItemId === cartItemId);
    if (item) {
      const updatedExtras = { ...item.extras, [extra]: false };
      const newTotalPrice = calculateTotalPrice({ ...item, extras: updatedExtras });
      dispatch(updateCartItem({ cartItemId, extras: updatedExtras, totalPrice: newTotalPrice }));
    }
  };

  // Handle incrementing extra quantity
  const handleIncrementExtra = (cartItemId, extra) => {
    const item = items.find((item) => item.cartItemId === cartItemId);
    if (item) {
      const updatedExtras = { ...item.extras, [extra]: { ...item.extras[extra], quantity: item.extras[extra].quantity + 1 } };
      const newTotalPrice = calculateTotalPrice({ ...item, extras: updatedExtras });
      dispatch(updateCartItem({ cartItemId, extras: updatedExtras, totalPrice: newTotalPrice }));
    }
  };

  // Handle decrementing extra quantity
  const handleDecrementExtra = (cartItemId, extra) => {
    const item = items.find((item) => item.cartItemId === cartItemId);
    if (item && item.extras[extra].quantity > 0) {
      const updatedExtras = { ...item.extras, [extra]: { ...item.extras[extra], quantity: item.extras[extra].quantity - 1 } };
      const newTotalPrice = calculateTotalPrice({ ...item, extras: updatedExtras });
      dispatch(updateCartItem({ cartItemId, extras: updatedExtras, totalPrice: newTotalPrice }));
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/20"
          onClick={(e) => e.target === e.currentTarget && onClose()}
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
                    <div key={item.cartItemId} className="bg-white p-4 rounded-lg mb-2">
                      <div className="border-2 border-gray-300 p-4 rounded-lg">
                        <div className="flex justify-between items-center mb-4">
                          <div className="flex items-center gap-2">
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
                            onClick={() => handleRemoveItem(item.cartItemId)}
                            className="text-gray-500 hover:text-red-500"
                          >
                            <XMarkIcon className="h-5 w-5" />
                          </button>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => handleDecrement(item.cartItemId)}
                              className="p-2 bg-[#D9D9D9] flex justify-center rounded-full"
                            >
                              <MinusIcon className="h-4 w-4 text-gray-900" />
                            </button>
                            <p className="text-black text-lg">{item.quantity}</p>
                            <button
                              onClick={() => handleIncrement(item.cartItemId)}
                              className="p-2 bg-[#FDB92A] flex justify-center rounded-full"
                            >
                              <PlusIcon className="h-4 w-4 text-white" />
                            </button>
                          </div>
                        </div>

                        {/* Extras */}
                        {item.extras.vanilla && (
                          <div className="flex justify-between items-center mt-2">
                            <p className="text-sm text-gray-600">+ Vanilla Flavour</p>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => handleDecrementExtra(item.cartItemId, "vanilla")}
                                className="p-1 bg-[#D9D9D9] flex justify-center rounded-full"
                              >
                                <MinusIcon className="h-3 w-3 text-gray-900" />
                              </button>
                              <p className="text-black text-sm">{item.extras.vanilla.quantity}</p>
                              <button
                                onClick={() => handleIncrementExtra(item.cartItemId, "vanilla")}
                                className="p-1 bg-[#FDB92A] flex justify-center rounded-full"
                              >
                                <PlusIcon className="h-3 w-3 text-white" />
                              </button>
              
                              <button
                                onClick={() => handleRemoveExtra(item.cartItemId, "vanilla")}
                                className="p-1 bg-red-500 flex justify-center rounded-full"
                              >
                                <XMarkIcon className="h-3 w-3 text-white" />
                              </button>
                              
                            </div>
                          </div>
                        )}
                        {item.extras.chocolate && (
                          <div className="flex justify-between items-center mt-2">
                            <p className="text-sm text-gray-600">+ Chocolate Flavour</p>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => handleDecrementExtra(item.cartItemId, "chocolate")}
                                className="p-1 bg-[#D9D9D9] flex justify-center rounded-full"
                              >
                                <MinusIcon className="h-3 w-3 text-gray-900" />
                              </button>
                              <p className="text-black text-sm">{item.extras.chocolate.quantity}</p>
                              <button
                                onClick={() => handleIncrementExtra(item.cartItemId, "chocolate")}
                                className="p-1 bg-[#FDB92A] flex justify-center rounded-full"
                              >
                                <PlusIcon className="h-3 w-3 text-white" />
                              </button>
                              {/* <button
                                onClick={() => handleRemoveExtra(item.cartItemId, "chocolate")}
                                className="text-red-500 hover:text-red-700"
                              >
                                Remove
                              </button> */}

                              <button
                                onClick={() => handleRemoveExtra(item.cartItemId, "chocolate")}
                                className="p-1 bg-red-500 flex justify-center rounded-full"
                              >
                                <XMarkIcon className="h-3 w-3 text-white" />
                              </button>
                            </div>
                          </div>
                        )}

                        {/* Special Instructions */}
                        {item.specialInstructions && (
                          <div className="mt-2">
                            <p className="text-sm text-gray-600 font-semibold">Special Instructions:</p>
                            {editingItemId === item.cartItemId ? (
                              <div className="flex flex-col items-start gap-2">
                                <textarea
                                  className="textarea text-base w-full border border-gray-300 text-[#5b5b5b] rounded-lg resize-none min-h-[60px] px-2 py-1"
                                  value={editedInstructions}
                                  onChange={(e) => setEditedInstructions(e.target.value)}
                                />
                                <button
                                  onClick={() => saveEditedInstructions(item.cartItemId)}
                                  className="bg-[#FDB92A] text-xs text-white px-3 py-1 rounded-md"
                                >
                                  Save
                                </button>
                              </div>
                            ) : (
                              <div className="flex items-center gap-2">
                                <p className="text-sm text-gray-600">{item.specialInstructions}</p>
                                <button
                                  onClick={() => handleEditInstructions(item.cartItemId, item.specialInstructions)}
                                  className="text-blue-500 hover:text-blue-700"
                                >
                                  <PencilIcon className="h-4 w-4" />
                                </button>
                              </div>
                            )}
                          </div>
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
                  onClick={() => setIsPaymentModalOpen(true)}
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
        onClose={() => setIsPaymentModalOpen(false)}
        totalPrice={totalPrice}
      />
    </AnimatePresence>
  );
};

export default CartModal;