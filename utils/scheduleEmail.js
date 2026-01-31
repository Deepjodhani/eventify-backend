const Event = require("../models/Event");
const User = require("../models/User");
const cron = require("node-cron");
const sendEmail = require("./sendEmail");

const scheduleEventReminder = async (eventId) => {
  const event = await Event.findById(eventId).populate("registrations");

  if (!event) return;

  const eventDate = new Date(event.date);
  const [h, m] = event.time.split(":");
  eventDate.setHours(h, m, 0);

  const reminderTime = new Date(eventDate.getTime() - 10 * 60 * 1000);

  if (reminderTime < new Date()) return;

  const cronExp = `${reminderTime.getMinutes()} ${reminderTime.getHours()} ${reminderTime.getDate()} ${reminderTime.getMonth() + 1} *`;

  cron.schedule(cronExp, async () => {
    for (const user of event.registrations) {
      await sendEmail({
        to: user.email,
        subject: `⏰ Reminder: ${event.title}`,
        html: `<p>Your event starts in 10 minutes</p>`
      });
    }

    console.log("✅ Reminder sent to all users");
  });
};

module.exports = scheduleEventReminder;
