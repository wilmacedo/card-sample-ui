# Will Pay UI

Simple project to test knowlegds.

- [Next.js](https://nextjs.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [Cypress.js](https://www.cypress.io/)
- [Jest.js](https://jestjs.io/)
- [React Hook Form](https://www.react-hook-form.com/)
- [Zod](https://zod.dev/)

## Setuping the environment

Assuming that you setup our server first, install all dependencies

Recommend to use PNPM instead NPM

```bash
  pnpm install
```

And simple run dev script

```bash
  pnpm dev
```

Or build with

```bash
  pnpm build
```

## Environment Variables

If you have changed default port or using cloud server, change the host url on .env file using this key

`HOST`

## Running Tests

To run tests, run the following command

```bash
  pnpm run test
```

To run E2E tests, run the following command. If you changed your base environment, you need change `baseUrl` inside `cypress.config.ts`.

```ts
  e2e: {
      ...
      baseUrl: "http://localhost:3000",
      ...
  },
  ...
```

And finally, run the command

```bash
  pnpm run test:e2e
```

## References

For the UI, I used this reference landing page to build all system colors, spaces and major design.

[Dribbble](https://dribbble.com/shots/20575176-Landing-UI)
