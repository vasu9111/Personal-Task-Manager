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
  INVALID_CREDENTIALS: {
    httpStatusCode: 404,
    body: {
      code: "incalid_credetials",
      message: "Invalid credentials",
    },
  },
  INVALID_PASSWORD: {
    httpStatusCode: 404,
    body: {
      code: "incalid_password",
      message: "INVALID_PASSWORD",
    },
  },
  USER_NOT_FOUND: {
    httpStatusCode: 404,
    body: {
      code: "user_not_found",
      message: "Email ID is wrong please try again",
    },
  },
  SAME_PASSWORD: {
    httpStatusCode: 400,
    body: {
      code: "same_password",
      message: "New password cannot be the same as the current password",
    },
  },
  SAME_PASSWORD: {
    httpStatusCode: 400,
    body: {
      code: "same_password",
      message: "New password cannot be the same as the current password",
    },
  },
};

export default errorCodes;
