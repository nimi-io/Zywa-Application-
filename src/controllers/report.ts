import { NextFunction, Request, Response } from "express";
import { reportFactory } from "../services/factories/index";
import { Ireport } from "../types/reports";

export const reportController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const input: Ireport = {
    email: req.body.email,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
  };

  const response = await reportFactory().genratePdf(input);
  return res.status(response.code).json(response);
};
