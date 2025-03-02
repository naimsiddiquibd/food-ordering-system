import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchRestaurantInfo } from "../store/slices/restaurantSlice";
import { Link, useParams } from "react-router-dom";
import { ArrowLongRightIcon } from '@heroicons/react/24/solid'

const Header = () => {
  const { restaurantName } = useParams();
  console.log("first restaurant:", restaurantName);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const { resInfo, loading, error } = useSelector((state) => state.restaurant);

  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    if (restaurantName) {
      dispatch(fetchRestaurantInfo(restaurantName));
    }
  }, [dispatch, restaurantName]);

  if (loading) return <p className="text-center mt-5">Loading...</p>;
  if (error) return <p className="text-center mt-5 text-red-500">{error}</p>;

  return (
    <header className="w-full bg-white shadow-md rounded-b-2xl">
      <section className="relative h-56 sm:h-64 md:h-72 lg:h-80 xl:h-96 bg-cover bg-center flex items-center p-0 z-0 bg-[#F5F5F5] rounded-b-2xl">
        {/* Background Image */}
        <img
          className="absolute inset-0 w-full h-full object-cover rounded-b-2xl"
          src={resInfo.bg_photo}
          alt="Background"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-[#3D231A] to-[#3D231A]/90 rounded-b-2xl"></div>

        {/* Content Container */}
        <div className="relative z-10 w-full  mx-auto flex flex-row justify-center items-center gap-4 sm:gap-6 md:gap-8 lg:gap-10 sm:px-6 md:px-8 lg:px-12">
          {/* Restaurant Logo */}
          <div className="flex flex-row items-center justify-center lg:justify-between gap-4 sm:gap-6 md:gap-8 lg:gap-10">
            <div className="flex-shrink-0">
              <img
                className="h-28 w-28 sm:h-32 sm:w-32 md:h-40 md:w-40 lg:h-48 lg:w-48 rounded-full bg-white p-2"
                src={resInfo?.restaurant_photo}
                alt="Logo"
              />
            </div>

            {/* Restaurant Info */}
            <div className="flex-grow text-left">
              <h1 className="font-bold text-white text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
                {resInfo?.restaurant_name}
              </h1>
              <p className="font-semibold text-[#BBBBB1] text-sm sm:text-lg md:text-xl lg:text-2xl ">
                {resInfo?.slogan}
              </p>

              {/* Visit Shop Button */}
              <button className="mt-2 px-5 py-2.5 rounded-full bg-[#EBBCAD] text-xs  lg:text-xl font-semibold text-[#3F170A] hover:bg-[#DAA99B] transition-colors duration-200 flex items-center justify-between gap-1">
                VISIT SHOP<ArrowLongRightIcon className="h-4 w-4 text-#3F170A]" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </header>
  );
};

export default Header;