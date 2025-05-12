function Button({ name, onClick, theme }) {
  const baseClasses =
    'border h-8 flex items-center justify-center px-4 py-2 rounded-full transition duration-300 cursor-pointer';

  if (theme === 'red') {
    return (
      <button
        onClick={onClick}
        className={`${baseClasses} bg-[#D65656] text-white border-[#D65656] hover:bg-[#c14444]`}
      >
        {name}
      </button>
    );
  }

  // Default gray style
  return (
    <button
      onClick={onClick}
      className={`${baseClasses} border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white`}
    >
      {name}
    </button>
  );
}

export default Button;
