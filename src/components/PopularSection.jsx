import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPopularItems } from '../store/slices/popularSlice';
import { useParams } from 'react-router-dom';

const PopularSection = () => {
  const { restaurantName } = useParams();
  const dispatch = useDispatch();
  const { menuData, loading, error } = useSelector(state => state.popular);

  useEffect(() => {
    if (restaurantName) {
      dispatch(fetchPopularItems(restaurantName));
    }
  }, [dispatch, restaurantName]);

  if (loading) return <p>Loading popular items...</p>;
  if (error) return <p>Error fetching popular items: {error}</p>;

  return (
    <div className='bg-[#F5F5F5] flex items-center justify-center'>
      <div className='grid grid-cols-2 gap-4 mt-4 bg-[#F5F5F5]'>
        {menuData.map((menuItem, index) => (
          <div
            key={index}
            className='relative max-w-md lg:max-w-3xl w-32 lg:w-80 h-28 lg:h-72 rounded-lg overflow-hidden'
          >
            <div className="h-full bg-cover bg-center" style={{ backgroundImage: `url(${menuItem.product_picture})` }}>
              {/* Gradient Overlay */}
              <div
                className="absolute inset-0 h-full w-full z-10"
                style={{
                  background: 'linear-gradient(to bottom right, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.2))'
                }}
              ></div>
              <div className="flex items-center">
                <div className='p-2 z-40'>
                  <p className="max-w-[85px] md:max-w-[200px] font-extrabold text-white text-[14px] sm:text-[18px] md:text-[28px] lg:text-[32px]">
                    {menuItem.product_name}
                  </p>
                  <p className="font-normal text-white text-[10px] sm:text-[12px] md:text-[18px] lg:text-[22px] mt-[2px]">
                    Popular
                  </p>
                </div>
              </div>
              <div className="absolute right-0 bottom-0 mb-2 mr-2 z-40">
                <p className='bg-[#F14C3B] text-white px-6 py-2 rounded-full text-xs sm:text-[16px] md:text-[18px] lg:text-[22px] items-center flex justify-center shadow-md'>
                  {menuItem.product_price} TK
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularSection;