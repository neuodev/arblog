import { Router } from "express";
import { addEmail, confirmEmail } from "../controllers/email";

const emailRouter = Router();

emailRouter.route("/").post(addEmail);
emailRouter.route("/confirm").get(confirmEmail);

export default emailRouter;
