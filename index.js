import { Hono } from 'hono';
import { cors } from 'hono/cors';
import routes from './routes/index.js';

const app = new Hono();

app.use('*', cors({ origin: '*' }));
app.route('/', routes);
app.all('*', (c) => c.json({ status: 'error', msg: '404 Not Found' }, 404));

export default app;
