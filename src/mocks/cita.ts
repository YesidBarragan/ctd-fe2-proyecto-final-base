/* istanbul ignore file */
import { rest } from "msw";

const generateHandlers = () => {
  const data = {
    quote: "Hi, Super Nintendo Chalmers!",
    character: "Ralph Wiggum",
    image: "https://cdn.glitch.com/3c3ffadc-3406-4440-bb95-d40ec8fcde72%2FRalphWiggum.png?1497567511523",
    characterDirection: "Left"
  };
  const handlers = [
    rest.get("https://thesimpsonsquoteapi.glitch.me/quotes", (req, res, ctx) => {
      if (req.url.searchParams.get("error")) {
        return res(ctx.status(400));
      }

      return res(
        ctx.status(200),
        ctx.json({
          results: data,
        })
      );
    }),
  ];

  return { handlers, data };
}

export default generateHandlers;
