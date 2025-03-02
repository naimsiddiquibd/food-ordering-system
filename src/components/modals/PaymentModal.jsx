import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import MoneyIcon from "../../../src/assets/money.svg";
import CreditCard from "../../../src/assets/credit-card.svg";
import { CreditCardIcon } from '@heroicons/react/24/solid'

const PaymentModal = ({ isOpen, onClose, totalPrice }) => {
  // Close the modal when clicking outside (on the backdrop)
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
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
              {/* Payment Options */}
              <div className=" p-1 m-3">
                <div className="flex items-center mx-4 gap-3 mt-5">
                  <img src={CreditCard} alt="Credit Card" />
                  <p className="text-[18px] font-bold text-black">Payment Method</p>
                </div>

                {/* Cash Option */}
                <div
                  onClick={onClose} // Close modal when Cash is selected
                  className="bg-white border-2 border-[#FDB92A] rounded-lg max-w-md p-4 m-3 flex justify-between items-center cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <img src={MoneyIcon} alt="Cash" />
                    <p className="text-[16px] text-[#5A5A5A]">Cash</p>
                  </div>
                  <div>
                    <p className="text-[#5A5A5A] text-[16px] font-semibold">{totalPrice} TK</p>
                  </div>
                </div>

                {/* Pay Online Option */}
                <div
                  onClick={onClose} // Close modal when Pay Online is selected
                  className="bg-[#FF007A] rounded-lg max-w-md p-4 m-3 flex items-center cursor-pointer"
                >
                  <div className="flex-shrink-0">
                  <CreditCardIcon className="size-9 text-orange-300 bg-white rounded-full p-1" />
                  </div>
                  <div className="flex-grow text-center mx-2">
                    <p className="text-white text-[16px] font-semibold">Pay Online</p>
                  </div>
                  <div className="flex-shrink-0 w-10"></div>
                </div>

                {/* Cancel Option */}
                <div
                  onClick={onClose} // Close modal when Cancel is selected
                  className="bg-gray-300 rounded-lg max-w-md p-4 m-3 flex justify-center items-center h-[65px] cursor-pointer"
                >
                  <p className="text-gray-500 text-[16px] font-semibold">Cancel</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default PaymentModal;