// GLOBAL IMPORTS
const express = require("express");
const {
  doc,
  updateDoc,
  addDoc,
  getDoc,
  deleteDoc,
  collection,
  getDocs,
  Timestamp,
} = require("firebase/firestore");

// LOCAL IMPORTS
const { db } = require("../config/firebase");

// CONFIG
const router = express.Router();

// ROUTES
// GET ALL APPOINTMENTS
router.get("/", async (req, res) => {
  const querySnapshot = await getDocs(collection(db, "appointments"));
  const data = [];
  querySnapshot.forEach((doc) => {
    data.push(doc.data());
  });
  res.status(200).json(data);
});

// CREATE AN APPOINTMENT
router.post("/", async (req, res) => {
  const { name, package } = req.body;
  const date = new Date();

  const docRef = await addDoc(collection(db, "appointments"), {
    name: name,
    package: Number(package),
    date: Timestamp.fromDate(date),
  });
  res.status(200).json({
    status: "success",
    message: "Appointment created!",
    data: {
      id: docRef.id,
      name: name,
      package: Number(package),
      date: Timestamp.fromDate(date),
    },
  });
});

// GET AN APPOINTMENT
router.get("/:id", async (req, res) => {
  const docRef = doc(db, "appointments", req.params.id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    res.status(200).json(docSnap.data());
  } else {
    res.status(404).json({
      status: "error",
      message: "Appointment not found!",
    });
  }
});

// UPDATE AN APPOINTMENT
router.patch("/:id", async (req, res) => {
  const docRef = doc(db, "appointments", req.params.id);

  await updateDoc(docRef, {
    name: req.body.name,
    package: Number(req.body.package),
  });

  res.status(200).json({
    status: "success",
    message: "Appointment updated!",
  });
});

// DELETE AN APPOINTMENT
router.delete("/:id", async (req, res) => {
  await deleteDoc(doc(db, "appointments", req.params.id));
  res.status(200).json({
    status: "success",
    message: "Appointment deleted!",
  });
});

module.exports = router;
