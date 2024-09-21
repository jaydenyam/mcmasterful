import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import cors from '@koa/cors';
import assignment1Routes from './adapter/assignment-1';

const app = new Koa();

// Middleware
app.use(cors());
app.use(bodyParser());

// Routes
app.use(assignment1Routes.routes()).use(assignment1Routes.allowedMethods());

// Error logging
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx);
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});