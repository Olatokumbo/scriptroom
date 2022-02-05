const Footer = () => {
  return (
    <div className="bg-slate-100 p-11 flex justify-center items-center">
      <div className="flex flex-col items-center">
        <img
          src="/logo-sm.png"
          className="h-10 w-auto hover:cursor-pointer"
          alt="headerImages"
        />
        <h1 className="text-neutral-500 text-xs mt-3">© {new Date().getFullYear()} | All Right Reserved</h1>
      </div>
    </div>
  );
};

export default Footer;
