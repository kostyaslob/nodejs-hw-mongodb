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
import { authenticate } from "../middlewares/authenticate.js";


const router = Router();

router.use(authenticate);

router.get("/", ctrlWrapper(getAllContactsController));

router.get("/:contactId", isValidId, ctrlWrapper(getContactByIdController));

router.post("/", validateBody(createContactSchema), ctrlWrapper(createContactController));

router.delete("/:contactId", isValidId, ctrlWrapper(deleteContactController));

router.put("/:contactId", isValidId, validateBody(updateContactSchema), ctrlWrapper(upsertContactController));

router.patch("/:contactId", isValidId, validateBody(updateContactSchema), ctrlWrapper(patchContactController));

export default router;