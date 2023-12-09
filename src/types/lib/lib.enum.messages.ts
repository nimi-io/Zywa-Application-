export default {
  CURRENT_DATE: new Date().toISOString(),
  OK: "OK",

  CREATED: "CREATED",
  SUCCESS: "SUCCESS",
  INVALID_ROLE: "INVALID_ROLE",
  CHAT_ALREADY_EXISTS: "CHAT_ALREADY_EXISTS",
  COMPANY_EXIST: "COMPANY_ALREADY_EXIST",
  NOT_IMPLEMENTED: "NOT_IMPLEMENTED",
  YOU_HAVE_BEEN_ADDED_AS_A_COFOUNDER: "YOU HAVE BEEN ADDED AS A COFOUNDER",
  USER_NOT_FOUND: "USER_NOT_FOUND",
  USER_ALREADY_EXISTS: "USER_ALREADY_EXISTS",
  EMAIL_SENT: "EMAIL_HAS_BEEN_SENT",
  VERIFY_EMAIL: "KINDLY VERIFY EMAIL",
  ACCOUNT_CREATED: "NEW ACCOUNT CREATED",
  OTP_GENERATED: "GENERATED OTP",
  NOT_OK: "NOT_OK",
  UNAUTHORIZED: "UNAUTHORIZED",
  CANNOT_PROCCESS_ENTITY: "CANNOT_PROCCESS_ENTITY",
  BAD_REQUEST: "BAD_REQUEST",
  FORBIDDEN: "FORBIDDDEN",
  GET_ALL_COMPANIES_CONTROLLER: "GET_ALL_COMPANIES_CONTROLLER",
  INVALID_TOKEN: "INVALID_TOKEN",
  EXPIRED_TOKEN: "EXPIRED_TOKEN",
  ERROR_STATUS: "Error",
  SUCCESS_STATUS: "Success",
  WARNING_STATUS: "Warning",
  INFO_STATUS: "Info",
  DEFAULT_STATUS: "Default",
  LOADING_STATUS: "Loading",
  DISABLED_STATUS: "Disabled",
  ACTIVE_STATUS: "Active",
  SOMETHING_WENT_WRONG: "Something went wrong",
  INVESTOR: "Investor",
  FOUNDER: "Founder",
  INVESTOR_FOUNDER: "Investor/Founder",
  ADMIN: "Admin",
  NO_CALLBACK_REQUESTED: "No CallBack Requested",
  MESSAGE_RECIEVED_SUCCESSFULLY: "Message received successfully!",
  CHAT_READ_SUCCESSFULLY: "Chat read successfully!",
  TRUE: true,
  FALSE: false,
  UPDATE_COMPANY: (company: string): string => {
    return ` ${company} updated successfully`;
  },
  CREATE_COMPANY: (company: string): string => {
    return ` ${company} created successfully`;
  },

  LOGIN: (user: string): string => {
    return `${user} logged is successfully`;
  },
  REGISTER: (user: string): string => {
    return `${user} registered is successfully`;
  },
};
