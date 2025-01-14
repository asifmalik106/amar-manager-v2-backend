class Response {
    // 201 Created
    static success(res, msg, data) {
      return res.status(201).json({
        status: "success",
        msg: msg,
        data: data,
      });
    }
  
    // 200 OK
    static OK(res, msg, data) {
      return res.status(200).json({
        status: "success",
        msg: msg,
        data: data,
      });
    }
  
    // 204 No Content
    static OK_NoContent(res, msg) {
      return res.status(204).json({
        status: "success",
        msg: msg,
      });
    }
  
    // 400 Bad Request
    static badRequest(res, msg, error) {
      return res.status(400).json({
        status: "error",
        msg: msg,
        error: error,
      });
    }
  
    // 401 Unauthorized
    static unauthorized(res, msg) {
      return res.status(401).json({
        status: "error",
        msg: msg,
      });
    }
  
    // 403 Forbidden
    static forbidden(res, msg) {
      return res.status(403).json({
        status: "error",
        msg: msg,
      });
    }
  
    // 404 Not Found
    static notFound(res, msg) {
      return res.status(404).json({
        status: "error",
        msg: msg,
      });
    }
  
    // 409 Conflict
    static conflict(res, msg, error) {
      return res.status(409).json({
        status: "error",
        msg: msg,
        error: error,
      });
    }
  
    // 422 Unprocessable Entity
    static unprocessableEntity(res, msg, error) {
      return res.status(422).json({
        status: "error",
        msg: msg,
        error: error,
      });
    }
  
    // 500 Internal Server Error
    static serverError(res, msg, error) {
      return res.status(500).json({
        status: "error",
        msg: msg,
        error: error,
      });
    }
  }
  
  module.exports = Response;  