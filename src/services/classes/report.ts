import crypto from "crypto";
import { ResultFunction } from "../../helpers/utils";
import { ReturnStatus } from "../../types/generic";
import { Ireport, ItransactionParse } from "../../types/reports";
import { genratePdfValidator } from "../../helpers/validators";
import enums from "../../types/lib/index";
import puppeteer from "puppeteer";
import { AbstractRepository } from "./Abstract/database";
import { transactionReport } from "../../template/transactionReport";
import fs from "fs";
import { generatePdfTemplate } from "../../template/generatepdfEmail";
import Pdf from "./Abstract/pdf";
import EmailSender from "./Abstract/email";
import { EmailFactory, databaseFactory } from "../factories";

class Report {
  db: AbstractRepository;
  EmailSender: EmailSender;
  PDF: Pdf;

  constructor() {
    this.db = databaseFactory(); //new AbstractRepository();
    this.EmailSender = EmailFactory();
    this.PDF = new Pdf();
  }

  public async genratePdf(input: Ireport) {
    try {
      const { value, error } = genratePdfValidator.validate(input);
      if (error) {
        console.error(
          enums.CURRENT_DATE,
          enums.HTTP_UNPROCESSABLE_ENTITY,
          error.message,
          enums.GENERATE_PDF_REPORT_CONTROLLER
        );
        return ResultFunction(
          false,
          error.message,
          enums.HTTP_UNPROCESSABLE_ENTITY,
          enums.NOT_OK,
          null
        );
      }
      const transaction: any = await this.db.getUserTranactionWithRange(value);

      if (!transaction) {
        return ResultFunction(
          false,
          enums.SOMETHING_WENT_WRONG,
          enums.HTTP_INTERNAL_SERVER_ERROR,
          enums.NOT_OK,
          null
        );
      }
      const htmlString = await transactionReport(
        value.email,
        transaction[value.email]
      );

      const file = await this.PDF.generatePdf(value.email, htmlString);

      const attachment = {
        filename: file.filename,
        content: fs.readFileSync(file.filePath),
        contentType: "application/pdf",
      };

      this.EmailSender.sendEmail(
        attachment,
        value.email,
        "TRANSACTION PDF REPORT",
        generatePdfTemplate()
      );

      return ResultFunction(
        true,
        enums.SUCCESS,
        enums.HTTP_ACCEPTED,
        enums.OK,
        { msg: "Pdf sent to email" }
      );
    } catch (error) {
      console.error(
        enums.CURRENT_DATE,
        enums.HTTP_INTERNAL_SERVER_ERROR,
        error,
        enums.GENERATE_PDF_REPORT_CONTROLLER
      );

      return ResultFunction(
        false,
        enums.SOMETHING_WENT_WRONG,
        enums.HTTP_INTERNAL_SERVER_ERROR,
        enums.NOT_OK,
        null
      );
    }
  }
  public async addTransactionRecord(input: Ireport) {}
}

export default Report;
