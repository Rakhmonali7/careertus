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
    <>
      <div className="p-8 space-y-6">
        <div className="flex flex-col justify-between">
          {dummyEvents.map(event => (
            <div
              key={event.id}
              className="bg-[#f6f5f5] p-6 mb-4.5 rounded-lg shadow-md cursor-pointer hover:bg-[#EEEEEE] transition flex gap-8"
              onClick={() => setSelectedEvent(event)}
            >
              <img
                src={event.image}
                alt={event.title}
                className="w-[40%] h-48 object-cover rounded-lg"
              />
              <div className="w-[60%] flex flex-col justify-between">
                <h2 className="text-2xl font-semibold">{event.title}</h2>
                <h3 className="text-gray-600">{event.location}</h3>
                <p className="text-gray-600 self-end">{event.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Events;
