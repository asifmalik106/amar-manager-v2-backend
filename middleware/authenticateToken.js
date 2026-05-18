export default async function authenticateToken(c, next) {
    await next();
    // const token = c.req.header('authorization-token');
    // Implement token verification here when ready:
    // try {
    //     const decodedToken = await verifyToken(token);
    //     c.set('user', decodedToken);
    //     await next();
    // } catch (error) {
    //     return c.json({ status: 'error', msg: 'User not authenticated. ' + error }, 500);
    // }
}
