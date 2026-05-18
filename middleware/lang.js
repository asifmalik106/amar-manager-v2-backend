async function langToken(c, next) {
    let lang = c.req.header('lang');
    if (lang !== "bn") {
        return c.json({ status: "error", msg: "Unauthorized" }, 401);
    }
    await next();
}

module.exports = langToken;
