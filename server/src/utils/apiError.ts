class ApiError extends Error {
  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
  }

  statusCode: number;
  status: string = '';
  message: string;
}

export default ApiError;
