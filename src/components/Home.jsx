import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useParams } from "react-router-dom";
import Header from "./Header";
import PopularSection from "./PopularSection";
import FanFavoriteSection from "./FanFavoriteSection";
import { fetchFanFav } from "../store/slices/fanFavSlice"; // Import fanFavSlice action
import { fetchPopularItems } from "../store/slices/popularSlice"; // Import popularSlice action
import CartModal from "./modals/CartModal";
import ShopingBagIcon from "../../src/assets/shopping-bag.svg";

const Home = () => {
  const dispatch = useDispatch();
  const { restaurantName } = useParams(); // Get restaurantName from URL params

  // Fetch fan favorites and popular items when the component mounts
  useEffect(() => {
    if (restaurantName) {
      dispatch(fetchFanFav(restaurantName)); // Fetch fan favorites
      dispatch(fetchPopularItems(restaurantName)); // Fetch popular items
    }
  }, [dispatch, restaurantName]);

  const [isCartOpen, setIsCartOpen] = useState(false); // State to control cart modal visibility
  const { items } = useSelector((state) => state.cart); // Get cart items from Redux store

  // Calculate total number of items in the cart
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);

  // Calculate total price of all items in the cart
  const totalPrice = items.reduce((total, item) => total + item.totalPrice, 0);

  // Open the cart modal
  const openCartModal = () => {
    setIsCartOpen(true);
  };

  return (
    <div className="w-full">
      <Header />
      <div className="container mx-auto px-4 py-8">
        {/* Render FanFavoriteSection and PopularSection */}
        <FanFavoriteSection />
        <PopularSection />
      </div>

      {/* Cart Summary at the Bottom */}
      <div className="mx-3 sticky bottom-0 z-40 lg:max-w-2xl lg:mx-auto">
        {items.length > 0 && (
          <div
            onClick={openCartModal}
            className="bg-[#3F170A] h-[60px] w-full rounded-lg my-0 flex justify-between items-center px-3 mx-auto z-[8000] cursor-pointer"
          >
            <div className="relative inline-flex items-center p-1 rounded-lg">
              <div className="h-6 w-6 rounded-lg">
                <img
                  alt="indicator"
                  src={ShopingBagIcon} />
              </div>
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                {totalItems}
              </span>
            </div>
            <div className="text-white">View Your Cart</div>
            <div className="text-white">{totalPrice} TK</div>
          </div>
        )}
      </div>

      {/* Render the CartModal */}
      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <Outlet />
    </div>
  );
};

export default Home;