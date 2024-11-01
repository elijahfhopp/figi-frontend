# Figi

This is a frontend for [Figi](https://github.com/elijahfhopp/figi), a local-first face search engine. It is build with React + TypeScript + Vite. A Terminator faces demo is (possibly) available here: https://figi.litmuspaper.art/ (see [Demo](#demo)).

## Setup

1. Setup [figi-backend](https://github.com/elijahfhopp/figi-backend).
2. `npm install`
3. Configure paths (see [Path Configuration](#vitefigi-path-configuration)).
4. `npm run dev` or `npm run build && npm exec vite preview`
5. Open the link to your running instance.
6. Profit!

## Vite/Figi Path Configuration

Being able to count on my fingers the number of days I have been working with Vite, it is likely that I have this set up incorrectly. Ignoring that, let me explain. The app gives `ApolloClient` and `fetch` static links, but it uses `<img>` with dynamic links. Vite Proxy works well, however it obviously can't manage those dynamic `src` hrefs when it builds a static site.

There are two config points for the path: the Vite Proxy config and an `.env` file which controls the `/image/` endpoint path. If the `.env` is unset it will call on the Proxy endpoint (the host and port of the running `dev`/`preview` server). If set, it will use the set value set in `VITE_API_HOST` appended with `/image/`. For example:

```yaml
proxy: "/api/*" => localhost:8000/
VITE_API_HOST: unset

in dev:
    image src: localhost:5173/api/image => localhost:8000/image
    graphql: localhost:5173/api/graphql => localhost:8000/graphql
built site:
    image src: localhost:5173/api/image
    graphql: localhost:8000/graphql
```

and

```yaml
proxy: "/api/*" => example.com/figi/api
VITE_API_HOST: example.com/figi/api

in dev:
    image src: example.com/figi/api/images
    graphql: localhost:5173/api/graphql => example.com/figi/api/graphql
built site:
    image src: example.com/figi/api/images
    graphql: example.com/figi/api/graphql
```

This is my understanding of the issue and this was my solution. Obviously it's not ideal, but I really don't know better (PRs welcome, :smile:).

#### Development Configuration

I have used the Vite Proxy with great results. I was using a backend running on localhost. If I it was using a remote backend, I could just set the Proxy config. Note that this would break when I built for prod.

#### Production Configuration

You just have to set both the Vite Proxy config and `VITE_API_HOST`.

## Demo

The online demo uses images from IMDb's list of images from the original Terminator movie's entry. They aren't my and I don't claim to own them. To find images, simply upload an image containing the face of a cast member (Linda, Arnold, or Micheal is your best bet). Select the face and see the results.

litmuspaper.art is the only domain right now (Q4 2024), so that's why it's deployed there. It may not last long. We'll see. 

P.S. `COSINE_SIMILARITY_THRESHOLD` is set to `0.6` in the demo.