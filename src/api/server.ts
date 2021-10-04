import { createServer, Model, Factory, belongsTo, RestSerializer } from "miragejs"
import * as faker from "faker"

export function makeServer({ environment = "test" }) {
  let server = createServer({
    environment,

    models: {
      user: Model,
      post: Model.extend({
        author: belongsTo("user"),
      })
    },

    serializers: {
      application: RestSerializer.extend({
        include: ["author"],
      }),
    },

    factories: {
      user: Factory.extend({
        displayName: () => `${faker.name.firstName()} ${faker.name.lastName()}`,
        userName: () => `${faker.name.lastName().toLocaleLowerCase()}`
      }),
      post: Factory.extend({
        content: () => faker.lorem.sentences(Math.floor(Math.random() * 4) + 1),
      })
    },

    seeds(server) {
      const users = server.createList("user", 10)
      users.forEach(user => {
        server.createList("post", Math.floor(Math.random() * 10), {
          author: user,
        })
      })
    },

    routes() {
      this.passthrough("/_next/**")

      this.urlPrefix = "/api"

      // @ts-ignore
      this.resource("post")

      this.passthrough()
    }
  })

  return server
}