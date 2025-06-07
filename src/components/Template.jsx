import logo from '../assets/reg-logo.svg';
import dot from '../assets/dot.svg';
import redDot from '../assets/redDot.svg';
import redLogo from '../assets/redLogo.svg';

function Template({ title = 'Sign up', children, onSubmit, footer, theme }) {
  const commonClasses = `
    w-full flex flex-col justify-between 
    border rounded-2xl bg-white shadow-lg 
    min-h-[60vh]
  `;

  const defaultThemeClasses = `
    ${commonClasses} 
    max-w-sm sm:max-w-md md:max-w-lg 
    p-4 sm:p-6 md:p-10
  `;

  const redThemeClasses = `
    ${commonClasses} 
    border-[#ff4d4f] 
    max-w-sm sm:max-w-md md:max-w-lg 
    p-4 sm:p-6 md:p-10
  `;

  return (
    <div className="flex min-h-screen w-full items-center justify-center px-4">
      <form
        onSubmit={onSubmit}
        className={theme === 'red' ? redThemeClasses : defaultThemeClasses}
      >
        <div>
          <div className="flex gap-3 items-center">
            <img
              src={theme === 'red' ? redDot : dot}
              alt="dot"
              className="w-4 sm:w-5"
            />
            <img
              src={theme === 'red' ? redLogo : logo}
              alt="logo"
              className="max-w-[160px] sm:max-w-[220px]"
            />
          </div>
          <h3 className="text-gray-300 font-medium text-lg sm:text-xl mt-3">
            {title}
          </h3>
        </div>

        <div className="flex flex-col gap-4 sm:gap-6 mt-6">{children}</div>

        {footer && (
          <div
            className={`${
              theme === 'red' ? 'flex justify-between' : 'mt-4 self-end'
            }`}
          >
            {footer}
          </div>
        )}
      </form>
    </div>
  );
}

export default Template;
