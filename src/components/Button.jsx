function Button(props) {
  return (
    <button
      className="middle none center rounded-full border border-black-500 py-1 px-3 font-sans text-xs transition-all hover:bg-gray-800 hover:text-amber-50 focus:ring focus:ring-grey-200 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
      data-ripple-dark="true"
    >
      {props.name}
    </button>
  );
}

export default Button;
