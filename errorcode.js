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
      message: "user not found",
    },
  },
  SAME_PASSWORD: {
    httpStatusCode: 409,
    body: {
      code: "same_password",
      message: "New password cannot be the same as the current password",
    },
  },
  INVALID_CURRENT_PASSWORD: {
    httpStatusCode: 401,
    body: {
      code: "invalid_current_password",
      message: "invalid current password please try again",
    },
  },
  PASSWORDS_DO_NOT_MATCH: {
    httpStatusCode: 401,
    body: {
      code: "password_do_not_match",
      message:
        "new password and confirm Password do not match please try again",
    },
  },
  NEW_PASSWORD_SAME_AS_CURRENT: {
    httpStatusCode: 401,
    body: {
      code: "new_password_same_as_current",
      message: "new password same as current password",
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
  TODAY_SUMMARY_NOT_FOUND: {
    httpStatusCode: 404,
    body: {
      code: "today_summary_not_found",
      message: "today summary not found ",
    },
  },
  THIS_IS_NOT_A_CATEGORY: {
    httpStatusCode: 404,
    body: {
      code: "this_is_not_a_catagory",
      message: "this is not a catagory ",
    },
  },
  NOT_TASK_ID: {
    httpStatusCode: 404,
    body: {
      code: "NOT_A_TASK_ID",
      message: "not a task id  ",
    },
  },
};
export default errorCodes;
