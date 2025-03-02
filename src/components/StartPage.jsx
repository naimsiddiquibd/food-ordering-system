import React from 'react';
import { QrCodeIcon } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';

const StartPage = () => {
  return (
    <div className="h-screen flex justify-center items-center bg-gray-900">
      <div className=" border-gray-700 w-96 rounded-lg m-4">
        <div className=" bg-gray-800 flex flex-col justify-center items-center p-6 text-center">
          {/* QR Code Icon */}
          <QrCodeIcon className="h-20 w-20 text-pink-500 mb-6" />

          {/* Main Message */}
          <p className="text-lg font-semibold text-gray-100 mb-4">
            You have to scan a QR code first to proceed!
          </p>

          {/* Additional Content */}
          <p className="text-sm text-gray-400 mb-4">
            Since our app is still in development mode, you won’t be able to find any actual restaurants yet. However, if you'd like to test the app, you can click below to take a tour.
          </p>

          {/* Tour Button */}
          <Link to="/cha&chill" className="bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 mb-4">
            Take a Tour
          </Link>

          {/* Device Recommendation */}
          <p className="text-xs text-gray-500 mb-2">
            This app is primarily designed for mobile devices, so for the best experience, please open it on your mobile.
          </p>

          {/* Footer */}
          <p className="text-xs text-gray-600">
            Design and development by <span className="text-pink-500"><Link to="https://fatmonk.studio/">Fatmonk Studio</Link></span>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default StartPage;