import globeIcon from '../assets/globe.svg';
import dollarIcon from '../assets/dollar-sign.svg';
import Button from './Button';

function EventDetails({ event, onBack }) {
  return (
    <div className="p-8 space-y-4 bg-white rounded-lg shadow-md">
      <button
        onClick={onBack}
        className="text-blue-600 hover:underline text-sm mb-4"
      >
        ← Back to Jobs
      </button>

      <div className="flex justify-between">
        <div className="flex items-center gap-2 mt-4">
          <img src={globeIcon} alt="Location" className="w-4 h-4" />
          <span className="text-[14px] text-gray-700 font-semibold">
            {event.location}
          </span>
        </div>
        <span className="text-gray-500">{event.date}</span>
      </div>

      <h2 className="text-2xl font-bold">{event.title}</h2>
      <div className="px-18 py-8">
        <img src={event.image} alt="Event Image" className="w-full" />
        <p className="text-gray-800 p-4">{event.description}</p>
      </div>

      <button className="mt-6 px-4 py-2 bg-gray-950 text-white rounded hover:bg-gray-600 transition">
        Apply
      </button>
    </div>
  );
}

export default EventDetails;
