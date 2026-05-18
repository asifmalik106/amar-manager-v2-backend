class Response {
    // 201 Created
    static success(c, msg, data) {
        return c.json({ status: "success", msg, data }, 201);
    }

    // 200 OK
    static OK(c, msg, data) {
        return c.json({ status: "success", msg, data }, 200);
    }

    // 204 No Content
    static OK_NoContent(c, msg) {
        return c.json({ status: "success", msg }, 204);
    }

    // 400 Bad Request
    static badRequest(c, msg, error) {
        return c.json({ status: "error", msg, error }, 400);
    }

    // 401 Unauthorized
    static unauthorized(c, msg) {
        return c.json({ status: "error", msg }, 401);
    }

    // 403 Forbidden
    static forbidden(c, msg) {
        return c.json({ status: "error", msg }, 403);
    }

    // 404 Not Found
    static notFound(c, msg) {
        return c.json({ status: "error", msg }, 404);
    }

    // 409 Conflict
    static conflict(c, msg, error) {
        return c.json({ status: "error", msg, error }, 409);
    }

    // 422 Unprocessable Entity
    static unprocessableEntity(c, msg, error) {
        return c.json({ status: "error", msg, error }, 422);
    }

    // 500 Internal Server Error
    static serverError(c, msg, error) {
        return c.json({ status: "error", msg, error }, 500);
    }
}

module.exports = Response;
