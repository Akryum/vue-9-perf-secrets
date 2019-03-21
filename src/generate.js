import faker from 'faker'

export function generate (count) {
  const items = []
  for (let i = 0; i < count; i++) {
    // const posts = []
    // for (let p = 0; p < 10; p++) {
    //   posts.push(faker.lorem.paragraphs())
    // }
    items.push(Object.assign(
      {},
      faker.helpers.createCard(),
      {
        avatar: faker.image.avatar(),
        // posts,
      },
    ))
  }
  return items
}
