import { Router } from "express";
import { addEmail } from "../controllers/email";

const emailRouter = Router();

emailRouter.route("/").post(addEmail);

export default emailRouter;
