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
    description: {
      title: 'Description',
      text: 'Manage and oversee projects from initiation to completion. Coordinate between different departments and ensure timely delivery.',
    },
    requirements: {
      title: 'Requirements',
      text: '3+ years of project management experience. Excellent communication and leadership skills.',
    },
    offer: {
      title: 'What we Offer',
      text: 'Competitive salary, performance bonuses, and remote work flexibility.',
    },
    message:
      'If you are interested, please send your CV to the email address below.',
  },
  {
    id: 2,
    location: 'South Korea/Seoul',
    salary: '20',
    date: formattedDate,
    name: 'VD School',
    position: 'Part-time English Teacher',
    description: {
      title: 'Description',
      text: 'Teach English to students aged 8–14. Prepare lesson materials and monitor student progress.',
    },
    requirements: {
      title: 'Requirements',
      text: 'Native-level English proficiency. Teaching experience preferred.',
    },
    offer: {
      title: 'What we Offer',
      text: 'Flexible schedule and a fun, international working environment.',
    },
    message:
      'Send your resume and a short video introduction to the contact email below.',
  },
  {
    id: 3,
    location: 'Australia/Sydney',
    salary: '60',
    date: formattedDate,
    name: 'Star Labs',
    position: 'Web Developer',
    description: {
      title: 'Description',
      text: 'Develop and maintain modern web applications using React and Node.js.',
    },
    requirements: {
      title: 'Requirements',
      text: '2+ years experience in web development. Strong knowledge of JavaScript, HTML, and CSS.',
    },
    offer: {
      title: 'What we Offer',
      text: 'Tech-focused environment, visa sponsorship, and opportunities for growth.',
    },
    message: 'Interested applicants should apply through our career portal.',
  },
];

export default dummyData;
