import dummyEvents from '../data/dummyEvents';
import { useState } from 'react';
import EventDetails from './EventDetails';

function Events() {
  const [selectedEvent, setSelectedEvent] = useState(null);

  if (selectedEvent) {
    return (
      <EventDetails
        event={selectedEvent}
        onBack={() => setSelectedEvent(null)}
      />
    );
  }

  return (
    <div className="p-4 sm:p-8 space-y-4 sm:space-y-6">
      <div className="flex flex-col justify-between">
        {dummyEvents.map(event => (
          <div
            key={event.id}
            className="bg-[#f6f5f5] p-4 sm:p-6 mb-4 rounded-lg shadow-md cursor-pointer hover:bg-[#EEEEEE] transition flex flex-col sm:flex-row gap-4 sm:gap-8"
            onClick={() => setSelectedEvent(event)}
          >
            <img
              src={event.image}
              alt={event.title}
              className="w-full sm:w-[40%] h-48 object-cover rounded-lg"
            />
            <div className="flex flex-col justify-between w-full sm:w-[60%]">
              <h2 className="text-lg sm:text-2xl font-semibold">
                {event.title}
              </h2>
              <h3 className="text-gray-600 text-sm sm:text-base">
                {event.location}
              </h3>
              <p className="text-gray-600 self-end text-sm sm:text-base">
                {event.date}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Events;
