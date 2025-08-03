import createHttpError from "http-errors";
import { getEnvVar } from "../utils/getEnvVar.js";
import {
  getAllContacts,
  getContactById,
  createContact,
  deleteContact,
  updateContact,
} from "../services/contacts.js";
import { parsePaginationParams } from "../utils/parsePaginationParams.js";
import { parseSortParams } from "../utils/parseSortParams.js";
import { parseFilterParams } from "../utils/parseFilterParams.js";
import { saveFileToUploadDir } from "../utils/saveFileToUploadDir.js";
import { saveFileToCloudinary } from "../utils/saveFileToCloudinary.js";

export const getAllContactsController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const filter = parseFilterParams(req.query);

  const contacts = await getAllContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
    userId: req.user._id,
  });

  res.status(200).json({
    status: 200,
    message: "Successfully found contacts!",
    data: contacts,
  });
};

export const getContactByIdController = async (req, res) => {
  const contact = await getContactById(req.params.contactId, req.user._id);

  if (!contact) {
    throw createHttpError(404, "Contact not found");
  }

  // if (contact.userId.toString() !== req.user._id.toString()) {
  //     throw createHttpError(404, "Contact not found");
  // };

  res.status(200).json({
    status: 200,
    message: `Successfully found contact with id ${req.params.contactId}!`,
    data: contact,
  });
};

export const createContactController = async (req, res) => {
  const photo = req.file;

  let photoUrl;

  if (photo) {
    if (getEnvVar("ENABLE_CLOUDINARY") === "true") {
      photoUrl = await saveFileToCloudinary(photo);
    } else {
      photoUrl = await saveFileToUploadDir(photo);
    }
  }

  const contact = await createContact({
    ...req.body,
    userId: req.user._id,
    photo: photoUrl,
  });

  res.status(201).json({
    status: 201,
    message: "Successfully created a contact!",
    data: contact,
  });
};

export const deleteContactController = async (req, res, next) => {
  const contact = await deleteContact(req.params.contactId, req.user._id);

  if (!contact) {
    next(createHttpError(404, "Contact not found"));
    return;
  }
  res.status(204).send();
};

export const upsertContactController = async (req, res, next) => {
  const result = await updateContact(
    req.params.contactId,
    req.user._id,
    req.body,
    {
      upsert: true,
    },
  );

  if (!result) {
    next(createHttpError(404, "Contact not found"));
    return;
  }

  const status = result.isNew ? 201 : 200;

  res.status(status).json({
    status,
    message: "Successfully upserted a contact!",
    data: result.contact,
  });
};

export const patchContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const photo = req.file;

  let photoUrl;

  if (photo) {
    if (getEnvVar("ENABLE_CLOUDINARY") === "true") {
      photoUrl = await saveFileToCloudinary(photo);
    } else {
      photoUrl = await saveFileToUploadDir(photo);
    }
  }

  const result = await updateContact(contactId, req.user._id, {
    ...req.body,
    photo: photoUrl,
  });

  if (!result) {
    next(createHttpError(404, "Contact not found"));
    return;
  }

  res.json({
    status: 200,
    message: "Successfully patched a contact!",
    data: result.contact,
  });
};
