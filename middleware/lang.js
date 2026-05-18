export default async function langToken(c, next) {
    const lang = c.req.header('lang');
    if (lang !== 'bn') {
        return c.json({ status: 'error', msg: 'Unauthorized' }, 401);
    }
    await next();
}
