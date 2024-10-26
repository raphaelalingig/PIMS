import React from "react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-8">
      <div className="relative aspect-square h-[300px]">
        <img
          src="https://img.freepik.com/free-vector/404-error-concept-illustration_335657-5553.jpg?t=st=1729961705~exp=1729965305~hmac=c766f61ebb2d7d23924ad5acea575b729f0aa9b6f82771ca06a89f419c29825d&w=740"
          alt="comingsoon"
          fill
          className="object-cover"
        />
      </div>

      <div className="flex flex-col gap-4 text-center">
        <h1 className="lg:text-5xl md:text-4xl text-3xl font-bold">
          Page Not Found
        </h1>
        <span className="lg:text-3xl text-xl md:text-2xl font-semibold">
          Oops! The page you're looking for doesn't exist.
        </span>
      </div>

      {/* <Link to="/">
        <button className="bg-[#62CB31] font-bold rounded-md p-2 text-white">
          Back to home
        </button>
      </Link> */}
    </div>
  );
}
