exports.seed = knex => {
  return knex('asks').del()
  .then(() => knex('users').select())
  .then((users) => {
    const user = users[0]
    const userID = user.id
    const asks = [
      {
        title: 'Moving Furniture',
        description: 'We need help moving furniture.',
        start: new Date('Sat Apr 08 2017 10:00:00 MDT'),
        end: new Date('Sat Apr 08 2017 16:00:00 MDT'),
        location: 'Loveland, CO',
        user_id: userID
      },
      {
        title: 'Charity Raffle',
        description: 'Seeking 3 volunteers to help sell tickets',
        start: new Date('Sat Apr 05 2017 17:00:00 MDT'),
        end: new Date('Sat Apr 08 2017 19:00:00 MDT'),
        location: 'Fort Collins, CO',
        user_id: userID
      },
      {
        title: 'Router Installation',
        description: 'Purchased a new router and need help setting it up',
        start: new Date('Sat Apr 15 2017 13:00:00 MDT'),
        end: new Date('Sat Apr 15 2017 18:00:00 MDT'),
        location: 'Denver, CO',
        user_id: userID
      }
    ]
    return knex('asks').insert(asks)
  })
    .catch(err => console.log(err))
}
