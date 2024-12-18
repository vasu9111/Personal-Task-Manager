const errorCodes = {
  TASK_NOT_FOUND: {
    httpStatusCode: 404,
    body: {
      code: "Task_not_found",
      message: "Task not found",
    },
  },
  USER_ALREADY_EXIST: {
    httpStatusCode: 404,
    body: {
      code: "user_already_exist",
      message: "user already exist",
    },
  },
};
export default errorCodes;
