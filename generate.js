const { writeFileSync } = require('fs')
const faker = require('faker')
const CliProgress = require('cli-progress')

const bar = new CliProgress.Bar({}, CliProgress.Presets.shades_classic)

const count = 4000

bar.start(count, 0)

const items = []
for (let i = 0; i < count; i++) {
  const posts = []
  for (let p = 0; p < 10; p++) {
    posts.push(faker.lorem.paragraphs())
  }
  items.push(Object.assign(
    {},
    faker.helpers.createCard(),
    {
      avatar: faker.image.avatar(),
      posts,
    },
  ))
  bar.update(i + 1)
}

writeFileSync('./src/items.json', JSON.stringify(items, null, 2), {
  encoding: 'utf8',
})

bar.stop()
