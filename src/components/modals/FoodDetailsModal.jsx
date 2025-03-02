import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { clearFoodDetails } from "../../store/slices/foodDetailsSlice";
import { addToCart } from "../../store/slices/cartSlice"; // Import the addToCart action
import FireIcon from "../../../src/assets/fire.svg";
import { MinusIcon, PlusIcon } from '@heroicons/react/24/solid';

const FoodDetailsModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const { details } = useSelector((state) => state.foodDetails);

  // State for quantity
  const [quantity, setQuantity] = useState(1);

  // State for extras
  const [extras, setExtras] = useState({
    vanilla: false,
    chocolate: false,
  });

  // State for special instructions
  const [specialInstructions, setSpecialInstructions] = useState("");

  // Convert base price to a number
  const basePrice = Number(details?.product_price) || 0;

  // Convert extra prices to numbers
  const vanillaPrice = extras.vanilla ? 60 : 0;
  const chocolatePrice = extras.chocolate ? 60 : 0;

  // Calculate total price
  const totalPrice = (basePrice + vanillaPrice + chocolatePrice) * quantity;

  // Handle quantity increment
  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
  };

  // Handle quantity decrement
  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  // Handle extra selection
  const handleExtraChange = (extra) => {
    setExtras((prev) => ({
      ...prev,
      [extra]: !prev[extra],
    }));
  };

  // Handle special instructions change
  const handleSpecialInstructionsChange = (e) => {
    setSpecialInstructions(e.target.value);
  };

  // Handle "Add to Cart" button click
  const handleAddToCart = () => {
    const cartItem = {
      id: details.id, // Ensure this is unique
      name: details.product_name,
      price: basePrice,
      quantity,
      product_picture: details.product_picture,
      extras: {
        vanilla: extras.vanilla,
        chocolate: extras.chocolate,
      },
      specialInstructions,
      totalPrice,
    };
  
    dispatch(addToCart(cartItem)); // Add the item to the cart
    handleClose(); // Close the modal
  };

  // Handle closing the modal
  const handleClose = () => {
    onClose(); // Close the modal
    dispatch(clearFoodDetails()); // Clear the details from Redux store
  };

  // Close the modal when clicking outside (on the backdrop)
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  if (!isOpen || !details) return null;

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
              {/* Food Image and Header */}
              <div className="relative h-[17rem] bg-cover bg-center"
                style={{ backgroundImage: `url(${details.product_picture})` }}>
                <div className="absolute inset-0 bg-gradient-to-b from-black/90 to-black/20"></div>
                <div className="relative z-10">
                  <div className="flex items-center justify-center p-2">
                    <div onClick={handleClose} className="bg-white h-[6px] w-[146px] rounded"></div>
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex flex-col items-start">
                        <h2 className="text-[1.7rem] font-bold leading-6 text-white">{details.product_name}</h2>
                        <p className="font-semibold whitespace-nowrap text-[#FDB92A]">Best Seller</p>
                      </div>
                      <div>
                        <p className="bg-gradient-to-b from-[#F14C3B] to-[#FDB92A] text-white px-2 py-2 h-12 w-12 rounded-full flex items-center justify-center">
                          <img src={FireIcon} alt="Icon" className="rounded-lg text-white" />
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content Section */}
              <div className="m-6 -mt-10 relative z-20">
                <div className='bg-white p-4 shadow rounded-lg'>
                  <div className='flex justify-between items-center mb-4'>
                    <p className='text-[20px] text-black font-semibold'>Total</p>
                    <p className='text-[20px] text-black font-semibold'>{totalPrice} TK</p>
                  </div>

                  {/* Extras */}
                  <div className='p-3 border-2 rounded-lg'>
                    <div className='flex justify-between items-center mb-3'>
                      <p className="font-bold text-[#fdb92a] text-[16px]">Add Extra</p>
                      <p className="bg-[#f1f1f1] py-[6px] px-[13px] text-[#a4a4a4] text-[11.8px]">Optional</p>
                    </div>

                    <div className='flex justify-between items-center'>
                      <label className="flex items-center gap-1 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={extras.vanilla}
                          onChange={() => handleExtraChange("vanilla")}
                          className="checkbox rounded-sm"
                        />
                        <span className="text-[#5b5b5b] text-base">Vanilla Flavour</span>
                      </label>
                      <p className='text-sm text-black font-semibold'>+ 60 TK</p>
                    </div>

                    <div className='flex justify-between items-center'>
                      <label className="flex items-center gap-1 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={extras.chocolate}
                          onChange={() => handleExtraChange("chocolate")}
                          className="checkbox rounded-sm"
                        />
                        <span className="text-[#5b5b5b] text-base">Chocolate Flavour</span>
                      </label>
                      <p className='text-sm text-black font-semibold'>+ 60 TK</p>
                    </div>
                  </div>

                  {/* Special Instructions */}
                  <div className='mt-5'>
                    <p className='text-[18px] text-black font-semibold mb-2'>Special Instructions:</p>
                    <textarea
                      className="textarea text-base w-full border border-gray-300 text-[#5b5b5b]  rounded-lg resize-none min-h-[90px] px-2 py-1"
                      placeholder=""
                      value={specialInstructions}
                      onChange={handleSpecialInstructionsChange}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Fixed Bottom Tab */}
            <div className="sticky bottom-0 left-0 w-full bg-white shadow-md py-4 px-6 flex justify-between items-center z-50">
              <div className='flex items-center gap-3'>
                <button
                  onClick={handleDecrement}
                  className="p-3 bg-[#D9D9D9] flex justify-center rounded-full"
                >
                  <MinusIcon className="h-5 w-5 text-gray-900" />
                </button>
                <p className='text-black text-[33px]'>{quantity}</p>
                <button
                  onClick={handleIncrement}
                  className="p-3 bg-[#FDB92A] flex justify-center rounded-full"
                >
                  <PlusIcon className="h-5 w-5 text-white" />
                </button>
              </div>
              <button
                onClick={handleAddToCart}
                className='bg-[#3F170A] text-white px-7 py-2 rounded-3xl'
              >
                Add to cart
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default FoodDetailsModal;