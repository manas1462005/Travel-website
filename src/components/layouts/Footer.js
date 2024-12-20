import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <>
     
      <footer className="relative bg-black pt-8 pb-6 text-white">
        <div className="mx-auto px-4">
          <div className="flex flex-wrap text-left lg:text-left">
            <div className="w-full lg:w-6/12 px-4">
              <h4 className="text-3xl font-semibold">World Traveling</h4>
              <h5 className="text-lg mt-0 mb-2">
                Traveling with loved ones, friends, or even fellow adventurers fosters a bond through shared experiences
              </h5>
              <div className="mt-6 lg:mb-0 mb-6">
                <button className="bg-white text-lightBlue-400 shadow-lg font-normal h-10 w-10 items-center justify-center rounded-full outline-none focus:outline-none mr-2" type="button">
                  <i className="fab fa-twitter"></i>
                </button>
                <button className="bg-white text-lightBlue-600 shadow-lg font-normal h-10 w-10 items-center justify-center rounded-full outline-none focus:outline-none mr-2" type="button">
                  <i className="fab fa-facebook-square"></i>
                </button>
                <button className="bg-white text-pink-400 shadow-lg font-normal h-10 w-10 items-center justify-center rounded-full outline-none focus:outline-none mr-2" type="button">
                  <i className="fab fa-dribbble"></i>
                </button>
                <button className="bg-white text-blueGray-800 shadow-lg font-normal h-10 w-10 items-center justify-center rounded-full outline-none focus:outline-none mr-2" type="button">
                  <i className="fab fa-github"></i>
                </button>
              </div>
            </div>
            <div className="w-full lg:w-6/12 px-4">
              <div className="flex flex-wrap items-top mb-6">
                <div className="w-full lg:w-4/12 px-4 ml-auto">
                  <span className="block uppercase text-gray-300 text-3x1 font-semibold mb-3">Useful Links:</span>
                  <ul className="list-unstyled">
                    <li>
                      <Link className="text-gray-400 hover:text-gray-200 font-semibold block pb-2 text-sm" to={'/about'}>
                        About Us
                      </Link>
                    </li>
                    <li>
                      <Link className="text-gray-400 hover:text-gray-200 font-semibold block pb-2 text-sm" to={'/tour'}>
                        Tour
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
