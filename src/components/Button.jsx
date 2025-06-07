function Button({ name, onClick, border, theme }) {
  const baseClasses = `
    border 
    flex items-center justify-center 
    rounded-full 
    transition duration-300 
    cursor-pointer 
    px-2 py-1 text-xs
    sm:px-4 sm:py-2 sm:text-base
  `;
  const commonHover = 'hover:text-white';

  let buttonClass = '';

  if (theme === 'red') {
    buttonClass = `${baseClasses} bg-white hover:bg-[#D65656] ${commonHover}`;
  } else {
    buttonClass = `${baseClasses} border-gray-900 text-gray-900 hover:bg-gray-900 ${commonHover}`;
  }

  return (
    <button onClick={onClick} className={buttonClass}>
      {name}
    </button>
  );
}

export default Button;
