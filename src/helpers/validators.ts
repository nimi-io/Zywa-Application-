import Joi from "joi";
import { Ireport } from "../types/reports";
import JoiDate from "@joi/date";

const JoiExtended = Joi.extend(JoiDate);

export const genratePdfValidator = Joi.object<Ireport>({
  email: Joi.string().email().required(),
  startDate: Joi.date().iso().required(),
  endDate: Joi.date().iso().required().min(Joi.ref("startDate")),
});
