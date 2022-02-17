const Banner = () => {
  return (
    <div className="flex my-6 mx-6 h-36 w-[50rem] shadow-2xl rounded-xl overflow-hidden">
      <div className="flex-1 bg-[#36395A] text-white p-5 md:rounded-r-none">
        <h1 className="font-semibold text-lg  sm:text-xl mb-2">
          The Beginning of a New Thing
        </h1>
        <p className="text-sm font-light leading-tight max-w-md">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam
        </p>
      </div>
      <div className="flex-1 hidden md:block">
        <img
          src="/images/typewriter.jpg"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default Banner;
