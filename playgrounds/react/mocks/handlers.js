import { graphql } from "msw";
import { rest } from "msw";

export const handlers = [
  graphql.mutation("createThing", (req, res, ctx) => {
    return res(
      ctx.data({
        createThing: {
          thing: {
            id: 1,
          },
        },
      })
    );
  }),
  graphql.query("thingById", (req, res, ctx) => {
    return res(
      ctx.data({
        things: {
          edges: [
            {
              node: {
                id: 1,
              },
            },
          ],
        },
      })
    );
  }),
  rest.post("http://localhost:4050/api/file/upload", (req, res, ctx) => {
    return res(
      ctx.status(401),
      ctx.json({
        errorMessage: `Unauthorized`,
      })
    );
  }),
];
