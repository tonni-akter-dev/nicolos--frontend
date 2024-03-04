const PrimaryBtn = ({ children, ...props }: any) => {
  return (
    <button
      type="submit"
      {...props}
      className="w-full px-8 py-3 text-base text-white transition ease-in-out bg-black border font-bbg-trold hover: rounded-3xl duration-600 hover:bg-transparent hover:text-black ">
      {children}
    </button>
  );
};

export default PrimaryBtn;
