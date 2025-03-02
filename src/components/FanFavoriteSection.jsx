import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchFanFav } from "../store/slices/fanFavSlice";
import { setFoodDetails } from "../store/slices/foodDetailsSlice"; // Import the action
import FireIcon from "../../src/assets/fire.svg";
import FoodDetailsModal from "./modals/FoodDetailsModal";


const FanFavoriteSection = () => {
  const { restaurantName } = useParams();
  const dispatch = useDispatch();
  const { menuData, loading, error } = useSelector((state) => state.fanFav);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch fan favorites when the component mounts or restaurantName changes
  useEffect(() => {
    if (restaurantName) {
      dispatch(fetchFanFav(restaurantName));
    }
  }, [dispatch, restaurantName]);

  // Handle click on a menu item
  const handleMenuItemClick = (menuItem) => {
    dispatch(setFoodDetails(menuItem)); // Set the selected item's details in Redux
    setIsModalOpen(true); // Open the modal
  };

  // Close the modal
  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  // Display loading or error messages
  if (loading) return <p className="text-center mt-5">Loading...</p>;
  if (error) return <p className="text-center mt-5 text-red-500">{error}</p>;

  return (
    <div className="z-40 -mt-16 lg:-mt-20 bg-[#F5F5F5] flex items-center justify-center">
      <div className="flex gap-4">
        {menuData.map((menuItem, index) => (
          <div
            key={index}
            className="max-w-md lg:max-w-3xl w-32 lg:w-80 mx-auto bg-white border-gradient border-orange-300 border-2 p-2 rounded-lg relative h-40 lg:h-96 cursor-pointer"
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${menuItem.product_picture})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            onClick={() => handleMenuItemClick(menuItem)} // Open modal on click
          >
            <div dir="rtl">
              <div className="absolute h-14 w-14 -top-4 -start-4 z-20">
                <p className="bg-gradient-to-b from-[#F14C3B] to-[#FDB92A] text-white px-2 py-2 h-10 w-10 sm:h-11 sm:w-11 md:h-16 md:w-16 lg:h-16 lg:w-16 rounded-full text-xs items-center flex justify-center">
                  <img src={FireIcon} alt="Profile" className="rounded-lg text-white" />
                </p>
              </div>
            </div>
            <div className="flex items-center">
              <div>
                <p className="max-w-[50px] font-bold text-white text-[14px] sm:text-[18px] md:text-[28px] lg:text-[32px] tracking-[0] leading-[normal]">
                  {menuItem.product_name}
                </p>
                <p className="font-normal text-[#fdb92a] text-[10px] sm:text-[12px] md:text-[18px] lg:text-[22px] tracking-[0] leading-[normal] whitespace-nowrap mt-1">
                  Fan Favourite
                </p>
              </div>
            </div>
            <div className="flex justify-end items-end h-20 lg:h-60 lg:mr-5">
              <p className="bg-[#F14C3B] text-white px-6 py-2 rounded-full text-xs sm:text-[16px] md:text-[18px] lg:text-[22px] items-center flex justify-center shadow-md">
                {menuItem.product_price} TK
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Render the FoodDetailsModal */}
      <FoodDetailsModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default FanFavoriteSection;