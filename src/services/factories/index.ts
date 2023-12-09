import { AbstractRepository } from "../classes/Abstract/database";
import EmailSender from "../classes/Abstract/email";
import Report from "../classes/report";

export const reportFactory = () => {
  return new Report();
};

export const databaseFactory = () => {
  return new AbstractRepository();
};
export const EmailFactory = () => {
  return new EmailSender();
};
