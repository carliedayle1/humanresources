import asyncHandler from "express-async-handler";
import Document from "../models/documentModel.js";
import express from "express";
import fs from "fs";
import path from "path";

// @desc    Upload a document
// @route   POST /api/documents
// @access  Private
const createDocument = asyncHandler(async (req, res) => {
  const { name, type, url, userId } = req.body;

  const document = await Document.create({
    name,
    type,
    url,
    user: userId,
  });

  if (document) {
    res.json({
      _id: document._id,
      name: document.name,
      url: document.url,
      type: document.type,
      user: document.user,
    });
  } else {
    res.status(401);
    throw new Error("Invalid document data");
  }
});

// @desc    Get list of documents
// @route   GET /api/documents
// @access  Private
const listDocuments = asyncHandler(async (req, res) => {
  const documents = await Document.find({ user: req.user._id }).populate(
    "user",
    "idNumber"
  );
  res.json(documents);
});

// @desc    Delete documents
// @route   DELETE /api/documents/:id
// @access  Private
const deleteDocument = asyncHandler(async (req, res) => {
  const document = await Document.findById(req.params.id);

  if (document) {
    await document.remove();
    res.json("Document deleted");
  } else {
    res.status(404);
    throw new Error("Document not found");
  }
});

// @desc    Download documents
// @route   GET /api/documents/download/:id
// @access  Private
// const downloadDocument = asyncHandler(async (req, res) => {
//   const document = await Document.findById(req.params.id);

//   const __dirname = path.resolve();

//   if (document) {
//     const filepath = path.join(__dirname, document.url);

//     res.download(filepath, `${document.name}`);
//   } else {
//     res.status(404);
//     throw new Error("Document not found");
//   }
// });

// @desc    Download documents
// @route   GET /api/documents/:id
// @access  Private
const listEmployeeDocuments = asyncHandler(async (req, res) => {
  const documents = await Document.find({ user: req.params.id }).sort(
    "-createdAt"
  );

  if (documents) {
    res.json(documents);
  } else {
    res.status(404);
    throw new Error("Invalid document data");
  }
});

export {
  createDocument,
  listDocuments,
  deleteDocument,
  // downloadDocument,
  listEmployeeDocuments,
};
