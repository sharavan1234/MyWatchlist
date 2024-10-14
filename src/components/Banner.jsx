import React from "react";

const Banner = () => {
  return (
    <div
      className="h-[40vh] sm:h-[50vh] md:h-[60vh] lg:h-[70vh] bg-cover bg-center rounded-lg sm:rounded-xl md:rounded-2xl bg-full flex items-end"
      style={{
        backgroundImage: `url(https://wallpapers.com/images/hd/thor-hollywood-movie-cds1dwi0pfs58szg.jpg)`,
      }}
    >
      <p className="text-lg sm:text-xl md:text-2xl w-full text-white text-center p-2 sm:p-3 bg-black bg-opacity-50">MovieName</p>
    </div>
  );
};

export default Banner;
