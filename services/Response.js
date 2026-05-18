export default class Response {
    static success(c, msg, data) {
        return c.json({ status: 'success', msg, data }, 201);
    }

    static OK(c, msg, data) {
        return c.json({ status: 'success', msg, data }, 200);
    }

    static OK_NoContent(c, msg) {
        return c.json({ status: 'success', msg }, 204);
    }

    static badRequest(c, msg, error) {
        return c.json({ status: 'error', msg, error }, 400);
    }

    static unauthorized(c, msg) {
        return c.json({ status: 'error', msg }, 401);
    }

    static forbidden(c, msg) {
        return c.json({ status: 'error', msg }, 403);
    }

    static notFound(c, msg) {
        return c.json({ status: 'error', msg }, 404);
    }

    static conflict(c, msg, error) {
        return c.json({ status: 'error', msg, error }, 409);
    }

    static unprocessableEntity(c, msg, error) {
        return c.json({ status: 'error', msg, error }, 422);
    }

    static serverError(c, msg, error) {
        return c.json({ status: 'error', msg, error }, 500);
    }
}
