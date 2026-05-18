const { Hono } = require('hono');
const { cors } = require('hono/cors');
const routes = require("./routes/index");

const app = new Hono();

app.use('*', cors({ origin: '*' }));
app.route('/', routes);
app.all("*", (c) => c.json({ status: "error", msg: "404 Not Found" }, 404));

module.exports = { fetch: app.fetch.bind(app) };
