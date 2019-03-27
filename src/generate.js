export async function generate (count) {
  const faker = (await import(/* webpackChunkName: 'faker' */ 'faker')).default
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
