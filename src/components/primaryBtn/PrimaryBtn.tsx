const PrimaryBtn = ({ children, ...props }: any) => {
  return (
    <button
      type="submit"
      {...props}
      className="w-full px-8 py-3 text-base font-bold text-white transition ease-in-out bg-black rounded-3xl duration-600 hover:bg-primary-dark ">
      {children}
    </button>
  );
};

export default PrimaryBtn;
