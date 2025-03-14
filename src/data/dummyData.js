const today = new Date();
const formattedDate = today.toLocaleDateString('ru-RU').replace(/\//g, '.');

const dummyData = [
  {
    id: 1,
    location: 'Uzbekistan/Tashkent',
    salary: '40',
    date: formattedDate,
    name: 'Stvisor',
    position: 'Project Manager',
  },
  {
    id: 2,
    location: 'South Korea/Seoul',
    salary: '20',
    date: formattedDate,
    name: 'VD school',
    position: 'Part time English teacher',
  },
  {
    id: 3,
    location: 'Australia/Sydney',
    salary: '60',
    date: formattedDate,
    name: 'Star Labs',
    position: 'Web Developer',
  },
];

export default dummyData;
