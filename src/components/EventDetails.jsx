import globeIcon from '../assets/globe.svg';

function EventDetails({ event, onBack }) {
  return (
    <div className="p-4 sm:p-8 space-y-4 bg-white rounded-lg shadow-md">
      <button
        onClick={onBack}
        className="text-blue-600 hover:underline text-sm mb-4"
      >
        ← Back to Events
      </button>

      <div className="flex flex-col sm:flex-row justify-between gap-2 sm:items-center">
        <div className="flex items-center gap-2">
          <img
            src={globeIcon}
            alt="Location"
            className="w-3.5 h-3.5 sm:w-4 sm:h-4"
          />
          <span className="text-sm sm:text-base text-gray-700 font-semibold">
            {event.location}
          </span>
        </div>
        <span className="text-sm sm:text-base text-gray-500">{event.date}</span>
      </div>

      <h2 className="text-lg sm:text-2xl font-bold">{event.title}</h2>

      <div className="py-4 sm:py-8">
        <img
          src={event.image}
          alt="Event"
          className="w-full rounded-lg max-h-[300px] object-cover"
        />
        <p className="text-sm sm:text-base text-gray-800 p-2 sm:p-4 leading-relaxed">
          {event.description}
        </p>
      </div>

      <button className="w-full sm:w-auto mt-6 px-4 py-2 bg-gray-950 text-white rounded hover:bg-gray-600 transition text-sm sm:text-base">
        Apply
      </button>
    </div>
  );
}

export default EventDetails;
