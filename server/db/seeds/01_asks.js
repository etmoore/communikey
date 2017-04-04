const asks = [
  {
    title: 'Moving Furniture',
    description: 'We need help moving furniture.',
    start: new Date('Sat Apr 08 2017 10:00:00 MDT'),
    end: new Date('Sat Apr 08 2017 16:00:00 MDT'),
    location: 'Loveland, CO',
  },
  {
    title: 'Charity Raffle',
    description: 'Seeking 3 volunteers to help sell tickets',
    start: new Date('Sat Apr 05 2017 17:00:00 MDT'),
    end: new Date('Sat Apr 08 2017 19:00:00 MDT'),
    location: 'Fort Collins, CO',
  },
  {
    title: 'Router Installation',
    description: 'Purchased a new router and need help setting it up',
    start: new Date('Sat Apr 15 2017 13:00:00 MDT'),
    end: new Date('Sat Apr 15 2017 18:00:00 MDT'),
    location: 'Denver, CO',
  },
];

exports.seed = knex => (
  knex('asks').del()
    .then(() => knex('asks').insert(asks))
);
