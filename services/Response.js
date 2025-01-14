class Response{
    static conflict(res, msg, error){
        return res.status(409).json({
            status: "error",
            msg: msg,
            error: error,
          });
    }

    static success(res, msg, data){
        return res.status(201).json({
            status: "success",
            msg: msg,
            data: data,
          });
    }
}