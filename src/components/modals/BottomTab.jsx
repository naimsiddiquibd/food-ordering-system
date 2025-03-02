import React from "react";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/solid";

const BottomTab = ({ totalPrice, onAddToCart, onIncrement, onDecrement, quantity }) => {
  return (
    <div className="sticky bottom-0 left-0 right-0 bg-white h-24 z-[9000] px-4 shadow-lg">
      <div className="flex justify-between items-center h-full">
        <div>
          <div className="flex justify-between items-center gap-3">
            <div>
              <button
                className="p-3 bg-[#D9D9D9] items-center flex justify-center rounded-full"
                onClick={(e) => {
                  e.stopPropagation(); // Stop event propagation
                  onDecrement();
                }}
              >
                <MinusIcon className="h-5 w-5 text-gray-900" />
              </button>
            </div>
            <div>
              <p className="text-black text-[33px]">{quantity}</p>
            </div>
            <div>
              <button
                className="p-3 bg-[#FDB92A] items-center flex justify-center rounded-full"
                onClick={(e) => {
                  e.stopPropagation(); // Stop event propagation
                  onIncrement();
                }}
              >
                <PlusIcon className="h-5 w-5 text-white" />
              </button>
            </div>
          </div>
        </div>
        <div>
          <button
            className="bg-[#3F170A] text-white px-7 py-2 rounded-3xl"
            onClick={(e) => {
              e.stopPropagation(); // Stop event propagation
              onAddToCart();
            }}
          >
            Add to cart - {totalPrice} TK
          </button>
        </div>
      </div>
    </div>
  );
};

export default BottomTab;