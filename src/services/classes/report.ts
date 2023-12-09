import crypto from "crypto";
import { ResultFunction } from "../../helpers/utils";
import { ReturnStatus } from "../../types/generic";
import { Ireport, ItransactionParse } from "../../types/reports";
import { genratePdfValidator } from "../../helpers/validators";
import enums from "../../types/lib/index";
import puppeteer from "puppeteer";
import { AbstractRepository } from "./Abstract/database";
import { transactionReport } from "../../template/transactionReport";
import EmailSender from "../../helpers/email";
import fs from "fs";
import { generatePdfTemplate } from "../../template/generatepdfEmail";

class Report {
  db: AbstractRepository;
  EmailSender: EmailSender;

  constructor() {
    this.db = new AbstractRepository();
    this.EmailSender = new EmailSender();
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

      const browser = await puppeteer.launch({ headless: true });

      const page = await browser.newPage();

      await page.setViewport({ width: 1280, height: 800 });

      await page.setContent(htmlString);

      const filename = `${value.email}_${Date.now()}.pdf`;
      const filePath = `./generatedPdf/${filename}`;
      await page.pdf({
        path: filePath,
        format: "A4",
        margin: {
          top: "20px",
          right: "20px",
          bottom: "20px",
          left: "20px",
        },
      });

      console.log("PDF generated successfully!");

      await browser.close();
      const attachment = {
        filename,
        content: fs.readFileSync(filePath),
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
        enums.SUCCESS_STATUS,
        enums.HTTP_ACCEPTED,
        enums.OK,
        { msg: "Pdf sent to email" }
      );
    } catch (error) {
      console.error(
        enums.CURRENT_DATE,
        enums.ERROR_STATUS,
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
