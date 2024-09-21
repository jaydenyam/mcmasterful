import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import cors from '@koa/cors';
import bookRoutes from './routes/bookRoutes';

const app = new Koa();

// Middleware
app.use(cors());
app.use(bodyParser());

// Register the routes
app.use(bookRoutes.routes()).use(bookRoutes.allowedMethods());

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});