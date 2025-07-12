import { Router } from "express";
import { getAllContactsController, getContactByIdController, createContactController } from "../controllers/contacts.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";

const router = Router();

router.get("/contacts", ctrlWrapper(getAllContactsController));

router.get("/contacts/:contactId", ctrlWrapper(getContactByIdController));

router.post("/contacts", ctrlWrapper(createContactController));

export default router;