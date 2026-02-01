const Event = require("../models/Event");
const User = require("../models/User");
const scheduleEventReminder = require("../utils/scheduleEmail");

/* =========================
   CREATE EVENT
========================= */
const createEvent = async (req, res) => {
  try {
    const { title, description, date, time, location } = req.body;

    const event = await Event.create({
      title,
      description,
      date,
      time,
      location,
      user: req.user.id, // creator
    });

    res.status(201).json(event);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/* =========================
   GET ALL EVENTS
========================= */
const getEvents = async (req, res) => {
  try {
    const events = await Event.find()
      .populate("user", "name")
      .sort({ createdAt: -1 });

    res.status(200).json(events);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/* =========================
   GET SINGLE EVENT
========================= */
const getEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate("user", "name");

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json(event);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/* =========================
   REGISTER FOR EVENT
========================= */
const registerEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    if (event.registrations.includes(req.user.id)) {
      return res.status(400).json({ message: "Already registered" });
    }

    event.registrations.push(req.user.id);
    await event.save();

    const user = await User.findById(req.user.id);

    console.log("📩 Scheduling reminder email for:", user.email);

    // ⏰ Schedule reminder email
    try {
      scheduleEventReminder(event, user.email);
    } catch (err) {
      console.error("❌ Failed to schedule email:", err.message);
    }

    res.status(200).json({ message: "Registered successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/* =========================
   UPDATE EVENT
========================= */
const updateEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    if (event.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json(updatedEvent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/* =========================
   DELETE EVENT
========================= */
const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    if (event.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await event.deleteOne();

    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DEREGISTER FROM EVENT
const deregisterEvent = async (req, res) => {
  const event = await Event.findById(req.params.id);

  if (!event) {
    return res.status(404).json({ message: "Event not found" });
  }

  if (!event.registrations.includes(req.user.id)) {
    return res.status(400).json({ message: "Not registered for this event" });
  }

  event.registrations = event.registrations.filter(
    (userId) => userId.toString() !== req.user.id
  );

  await event.save();

  res.status(200).json({ message: "Deregistered successfully" });
};


module.exports = {
  createEvent,
  getEvents,
  getEvent,
  registerEvent,
  updateEvent,
  deleteEvent,
  deregisterEvent,
};
