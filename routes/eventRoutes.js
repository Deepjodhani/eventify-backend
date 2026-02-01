const express = require("express");
const {
  createEvent,
  getEvents,
  getEvent,
  registerEvent,
  updateEvent,
  deregisterEvent,
  deleteEvent,
} = require("../controllers/eventController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

// GET ALL EVENTS
router.get("/", getEvents);

// CREATE EVENT
router.post("/", protect, createEvent);

// GET SINGLE EVENT
router.get("/:id", getEvent);

// UPDATE EVENT
router.put("/:id", protect, updateEvent);

// DELETE EVENT
router.delete("/:id", protect, deleteEvent);

// REGISTER FOR EVENT
router.post("/:id/register", protect, registerEvent);

// DEREGISTER FROM EVENT
router.post("/:id/deregister", protect, deregisterEvent);



module.exports = router;
