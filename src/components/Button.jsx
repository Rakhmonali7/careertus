function Button({ name, onClick, border, theme }) {
  if (theme === 'red') {
    return (
      <button
        onClick={onClick}
        className="border h-8 flex items-center justify-center  px-4 py-2 rounded-full transition duration-300 hover:bg-[#D65656] hover:text-white cursor-pointer"
      >
        {name}
      </button>
    );
  }

  return (
    <button
      onClick={onClick}
      className="border h-8 flex items-center justify-center border-gray-900 text-gray-900 px-4 py-2 rounded-full transition duration-300 hover:bg-gray-900 hover:text-white cursor-pointer"
    >
      {name}
    </button>
  );
}

export default Button;
