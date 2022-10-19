import { app } from "./app";
import { createDBConnection } from "./db";

const PORT = process.env.PORT || "4000";

(async () => {
  await createDBConnection();
  app.listen(PORT, () => {
    console.log(`Application running on ${PORT}`);
  });
})();
