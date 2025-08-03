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
import {
  createContactSchema,
  updateContactSchema,
} from "../validation/contacts.js";
import { authenticate } from "../middlewares/authenticate.js";
import { upload } from "../middlewares/multer.js";

const router = Router();

router.use(authenticate);

router.get("/", ctrlWrapper(getAllContactsController));

router.get("/:contactId", isValidId, ctrlWrapper(getContactByIdController));

router.post(
  "/",
  upload.single("photo"),
  validateBody(createContactSchema),
  ctrlWrapper(createContactController),
);

router.delete("/:contactId", isValidId, ctrlWrapper(deleteContactController));

router.put(
  "/:contactId",
  upload.single("photo"),
  isValidId,
  validateBody(updateContactSchema),
  ctrlWrapper(upsertContactController),
);

router.patch(
  "/:contactId",
  upload.single("photo"),
  isValidId,
  validateBody(updateContactSchema),
  ctrlWrapper(patchContactController),
);

export default router;
