import React from "react";

const Banner = () => {


 
  return (
    <div
      className=" h-[70vh] bg-cover bg-center rounded-2xl bg-full flex items-end  "
      style={{
        backgroundImage: `url(https://wallpapers.com/images/hd/thor-hollywood-movie-cds1dwi0pfs58szg.jpg)`,
      }}
    >
      <p className="text-2xl w-full text-white text-center p-3">MovieName</p>
    </div>
  );
};

export default Banner;
