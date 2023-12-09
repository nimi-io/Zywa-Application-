import {
  IgroupedTransactions,
  Ireport,
  Itransaction,
} from "../../../types/reports";
import path from "path";
import fs from "fs";
import csv from "csv-parser";
const csvWriter = require("csv-writer").createObjectCsvWriter;
const csvFilePath = `${process.cwd()}/transactions.csv`;
export class AbstractRepository {
  constructor() {}

  public async getAllTransaction() {
    return await this.getDb();
  }
  public async createTransaction(transaction: Itransaction) {
    const fileExists = fs.existsSync(csvFilePath);
    if (!fileExists) {
      const csvWriterInstance = csvWriter({
        path: csvFilePath,
        header: [
          { id: "user_email", title: "user_email" },
          { id: "date_of_transaction", title: "date_of_transaction" },
          { id: "amount", title: "amount" },
        ],
      });

      await csvWriterInstance.writeRecords([]);
    }
    const csvWriterInstance = csvWriter({
      path: csvFilePath,
      header: false,
    });
    const writer = csvWriterInstance.writeRecords(transaction);

    return writer;
  }
  public async getAllUserTransactions(
    email: string
  ): Promise<IgroupedTransactions | null> {
    try {
      const db: IgroupedTransactions | null = await this.getDb();
      if (!db) {
        return null;
      }

      const userTransactions = db[email];
      if (!userTransactions) {
        return null;
      }
      return { [email]: userTransactions };
    } catch (error) {
      console.error("Error fetching user transactions:", error);
      return null;
    }
  }

  public async getUserTranactionWithRange(
    input: Ireport
  ): Promise<IgroupedTransactions | null> {
    try {
      console.log(csvFilePath);
      const db: IgroupedTransactions | null = await this.getDb();

      if (!db) {
        return null;
      }

      const { email, startDate, endDate } = input;
      const userTransactions = db[email];
      if (!userTransactions) {
        return null;
      }
      const filteredTransactions = [];
      for (const transaction of userTransactions) {
        if (
          new Date(transaction.date_of_transaction) >= startDate &&
          new Date(transaction.date_of_transaction) <= endDate
        ) {
          filteredTransactions.push(transaction);
        }
      }

      return { [email]: filteredTransactions };
    } catch (error) {
      console.error("Error fetching user transactions:", error);
      return null;
    }
  }
  private async getDb(): Promise<IgroupedTransactions | null> {
    try {
      const groupedTransactions: IgroupedTransactions = {};
      const stream = fs.createReadStream(csvFilePath);

      await new Promise<void>((resolve, reject) => {
        stream
          .pipe(csv())
          .on(
            "data",
            (row: {
              user_email: string;
              date_of_transaction: Date;
              amount: number;
            }) => {
              const userEmail = row.user_email;

              if (!groupedTransactions[userEmail]) {
                groupedTransactions[userEmail] = [];
              }

              groupedTransactions[userEmail].push({
                date_of_transaction: row.date_of_transaction,
                amount: row.amount,
              });
            }
          )
          .on("end", () => {
            resolve();
          })
          .on("error", (error: any) => {
            console.error("Error reading CSV file:", error.message);
            reject(error);
          });
      });

      return groupedTransactions;
    } catch (error) {
      console.error("An error occurred:", error);
      return null;
    }
  }
}
