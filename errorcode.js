const errorCodes = {
  TASK_NOT_FOUND: {
    httpStatusCode: 404,
    body: {
      code: "Task_not_found",
      message: "Task not found",
    },
  },
  USER_ALREADY_EXIST: {
    httpStatusCode: 409,
    body: {
      code: "user_already_exist",
      message: "user already exist",
    },
  },
  INVALID_CREDENTIALS: {
    httpStatusCode: 401,
    body: {
      code: "incalid_credetials",
      message: "Invalid credentials",
    },
  },
  INVALID_PASSWORD: {
    httpStatusCode: 401,
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
    httpStatusCode: 409,
    body: {
      code: "same_password",
      message: "New password cannot be the same as the current password",
    },
  },
  TODAY_TASK_NOT_FOUND: {
    httpStatusCode: 404,
    body: {
      code: "today_task_not_found",
      message: "today task not found ",
    },
  },
  UPCOMING_TASK_NOT_FOUND: {
    httpStatusCode: 404,
    body: {
      code: "upcoming_task_not_found",
      message: "upcoming task not found ",
    },
  },
  OVERDUE_TASK_NOT_FOUND: {
    httpStatusCode: 404,
    body: {
      code: "overdue_task_not_found",
      message: "overdue task not found ",
    },
  },
  CATEGORY_NOT_FOUND: {
    httpStatusCode: 404,
    body: {
      code: "category_not_found",
      message: "category task not found ",
    },
  },
};

export default errorCodes;
