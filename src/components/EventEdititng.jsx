import { useState } from 'react';

const initialEvents = [
  {
    id: 1,
    title: 'ISF2025 Spring',
    subtitle: 'The 5th International Student Job & Startup Fair',
    date: '11.02.2025',
    image: '/event-banner.png', // replace with actual image path
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
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-100 border-r p-4">
        <ul className="space-y-2">
          <li className="font-semibold text-black flex items-center">
            <span className="h-2 w-2 bg-black rounded-full mr-2"></span> Events
            List
          </li>
          <li className="text-gray-400">Users Applicant</li>
          <li className="text-gray-400">Users Company</li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-auto">
        {/* Create Event Form */}
        <div className="mb-6 space-y-2">
          <h2 className="text-xl font-bold">Create New Event</h2>
          <input
            className="border p-2 rounded w-full"
            placeholder="Title"
            value={newEvent.title}
            onChange={e => setNewEvent({ ...newEvent, title: e.target.value })}
          />
          <input
            className="border p-2 rounded w-full"
            placeholder="Subtitle"
            value={newEvent.subtitle}
            onChange={e =>
              setNewEvent({ ...newEvent, subtitle: e.target.value })
            }
          />
          <input
            className="border p-2 rounded w-full"
            placeholder="Date (e.g. 11.02.2025)"
            value={newEvent.date}
            onChange={e => setNewEvent({ ...newEvent, date: e.target.value })}
          />
          <input
            className="border p-2 rounded w-full"
            placeholder="Image URL"
            value={newEvent.image}
            onChange={e => setNewEvent({ ...newEvent, image: e.target.value })}
          />
          <button
            onClick={handleCreateEvent}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Add Event
          </button>
        </div>

        {/* Events List */}
        <div className="space-y-4">
          {events.map(event => (
            <div
              key={event.id}
              className="flex bg-gray-100 p-4 rounded shadow cursor-pointer hover:bg-gray-200"
              onClick={() => handleEdit(event)}
            >
              <img
                src={event.image}
                alt="event"
                className="w-48 h-24 object-cover border border-blue-400"
              />
              <div className="ml-4 flex-1">
                <h3 className="font-bold text-lg">{event.title}</h3>
                <p>{event.subtitle}</p>
              </div>
              <div className="text-sm text-gray-600 self-end">{event.date}</div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
