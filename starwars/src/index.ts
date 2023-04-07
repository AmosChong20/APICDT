import { app } from "./server";

const { PORT = 3030 } = process.env;

async function main() {
  app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
  });
}

main().catch((e) => {
  throw e;
});
