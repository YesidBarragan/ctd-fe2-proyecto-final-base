/* istanbul ignore file */
import { rest } from 'msw';
import { API_URL } from '../app/constants';

export const handlers = [
  rest.get(API_URL, (req, res, ctx) => {

    const homerQuote = [
      {
        quote: "All I'm gonna use this bed for is sleeping, eating and maybe building a little fort.",
        character: "Homer Simpson",
        image:
          "https://cdn.glitch.com/3c3ffadc-3406-4440-bb95-d40ec8fcde72%2FHomerSimpson.png?1497567511939",
        characterDirection: "Right",
      }
    ];

    const randomQuote = [
      {
        quote: "Nothing you say can upset us. We're the MTV generation.",
        character: "Bart Simpson",
        image:
          "https://cdn.glitch.com/3c3ffadc-3406-4440-bb95-d40ec8fcde72%2FBartSimpson.png?1497567511638",
        characterDirection: "Right",
      }
    ];

    if (req.url.searchParams.get('character')) {
      return res(
        ctx.status(200),
        ctx.json(homerQuote)
      );
    }

    return res(
      ctx.status(200),
      ctx.json(randomQuote)
    );

  })
];