import { Router } from "express";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import {
    getAllContactsController,
    getContactByIdController,
    createContactController,
    deleteContactController,
    upsertContactController,
    patchContactController,
} from "../controllers/contacts.js";
import { validateBody } from "../middlewares/validateBody.js";
import { isValidId } from "../middlewares/isValidId.js";
import { createContactSchema, updateContactSchema } from "../validation/contacts.js";


const router = Router();

router.get("/contacts", ctrlWrapper(getAllContactsController));

router.get("/contacts/:contactId", isValidId, ctrlWrapper(getContactByIdController));

router.post("/contacts", validateBody(createContactSchema), ctrlWrapper(createContactController));

router.delete("/contacts/:contactId", isValidId, ctrlWrapper(deleteContactController));

router.put("/contacts/:contactId", isValidId, validateBody(updateContactSchema), ctrlWrapper(upsertContactController));

router.patch("/contacts/:contactId", isValidId, validateBody(updateContactSchema), ctrlWrapper(patchContactController));

export default router;