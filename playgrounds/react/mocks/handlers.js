import { graphql } from 'msw'

export const handlers = [
  graphql.mutation('createThing', (req, res, ctx) => {
    return res(
      ctx.data({
        createThing: {
          thing: {
            id: 1
          }
        },
      }),
    )
  }),
]