import { createServer } from 'http';
import { envs } from './config';
import { MongoDatabase } from './data';
import { AppRoutes } from './presentation/routes';
import { Server } from './presentation/server';

(async () => {
  main();
})();

async function main() {
  const dbConnected = await MongoDatabase.connect({
    dbName: envs.MONGO_DB_NAME,
    mongoUrl: envs.MONGO_URL,
  });

  if (!dbConnected) {
    console.error('Failed to connect to the database. Exiting...');
    process.exit(1);
  }

  const server = new Server({
    port: envs.PORT,
  });

  const httpServer = createServer(server.app);

  server.setRoutes(AppRoutes.routes);

  httpServer.listen(envs.PORT, () => {
    console.log(`Server running on port: ${envs.PORT}`);
  });
}
