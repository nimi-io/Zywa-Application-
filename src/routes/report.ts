import { Router } from "express";
import { reportController } from "../controllers/report";

const reportRouter = Router();

reportRouter.post("/genratePdf", reportController);

export default reportRouter;
