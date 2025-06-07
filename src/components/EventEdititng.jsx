import { useState } from 'react';

const initialEvents = [
  {
    id: 1,
    title: 'ISF2025 Spring',
    subtitle: 'The 5th International Student Job & Startup Fair',
    date: '11.02.2025',
    image: '/event-banner.png',
  },
  {
    id: 2,
    title: 'ISF2025 Spring',
    subtitle: 'The 5th International Student Job & Startup Fair',
    date: '11.02.2025',
    image: '/event-banner.png',
  },
];

export default function EventsList() {
  const [events, setEvents] = useState(initialEvents);
  const [newEvent, setNewEvent] = useState({
    title: '',
    subtitle: '',
    date: '',
    image: '',
  });

  const handleCreateEvent = () => {
    const id = Date.now();
    const event = { id, ...newEvent };
    setEvents([event, ...events]);
    setNewEvent({ title: '', subtitle: '', date: '', image: '' });
  };

  const handleEdit = event => {
    alert(`Edit Event: ${event.title}`);
  };

  return (
    <div className="flex flex-col sm:flex-row min-h-screen">
      {/* Sidebar */}
      <aside className="w-full sm:w-64 bg-gray-100 border-r p-4">
        <ul className="space-y-3">
          <li className="font-semibold text-black flex items-center">
            <span className="h-2 w-2 bg-black rounded-full mr-2"></span> Events
            List
          </li>
          <li className="text-gray-400">Users Applicant</li>
          <li className="text-gray-400">Users Company</li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 sm:p-6 overflow-auto">
        {/* Create Event Form */}
        <div className="mb-6 space-y-3">
          <h2 className="text-lg sm:text-xl font-bold">Create New Event</h2>

          <div className="space-y-2">
            {['Title', 'Subtitle', 'Date (e.g. 11.02.2025)', 'Image URL'].map(
              (label, i) => (
                <input
                  key={i}
                  className="border px-3 py-2 rounded w-full text-sm sm:text-base"
                  placeholder={label}
                  value={newEvent[['title', 'subtitle', 'date', 'image'][i]]}
                  onChange={e =>
                    setNewEvent({
                      ...newEvent,
                      [['title', 'subtitle', 'date', 'image'][i]]:
                        e.target.value,
                    })
                  }
                />
              )
            )}
            <button
              onClick={handleCreateEvent}
              className="w-full sm:w-auto bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm sm:text-base"
            >
              Add Event
            </button>
          </div>
        </div>

        {/* Events List */}
        <div className="space-y-4">
          {events.map(event => (
            <div
              key={event.id}
              className="flex flex-col sm:flex-row bg-gray-100 p-4 rounded shadow cursor-pointer hover:bg-gray-200 gap-3"
              onClick={() => handleEdit(event)}
            >
              <img
                src={event.image}
                alt="event"
                className="w-full sm:w-48 h-40 object-cover border border-blue-400 rounded"
              />
              <div className="flex flex-col justify-between w-full">
                <div>
                  <h3 className="font-bold text-base sm:text-lg">
                    {event.title}
                  </h3>
                  <p className="text-sm sm:text-base">{event.subtitle}</p>
                </div>
                <div className="text-sm text-gray-600 mt-2 sm:mt-0 self-end">
                  {event.date}
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
