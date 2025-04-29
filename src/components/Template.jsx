import logo from "../assets/reg-logo.svg";
import dot from "../assets/dot.svg";

function Template({ title = "Sign up", children, onSubmit, footer }) {
  return (
    <div className="flex min-h-screen w-full items-center justify-center px-4">
      <form
        onSubmit={onSubmit}
        className="w-full h-auto max-w-lg sm:max-w-md md:max-w-lg flex flex-col justify-between border rounded-2xl p-6 sm:p-8 md:p-18 bg-white shadow-lg md:min-h-[60vh]"
      >
        <div>
          <div className="flex gap-4">
            <img src={dot} alt="dot" />
            <img src={logo} alt="logo" className="max-w-[220px]" />
          </div>
          <h3 className="text-gray-300 font-medium text-xl mt-3">{title}</h3>
        </div>
        <div className="flex flex-col gap-6 mt-6">
          {children}
        </div>
 
        {footer && <div className="mt-4 self-end">{footer}</div>}
      
        
      </form>
    </div>
  );
}

export default Template;
