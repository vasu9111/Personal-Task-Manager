import { CronJob } from "cron";
import nodemailer from "nodemailer";
import Task from "../models/task.js";
import config from "../config/index.js";
const { MAIL_HOST, MAIL_PORT, SENDER_EMAIL_ID, SENDER_EMAIL_PASSWORD } =
  config.mail;
// Email configuration
const transporter = nodemailer.createTransport({
  host: MAIL_HOST,
  port: MAIL_PORT,
  auth: {
    user: SENDER_EMAIL_ID,
    pass: SENDER_EMAIL_PASSWORD,
  },
});

// Function to send daily digest
const dailyDigestJob = new CronJob("*/1 */7 * * * ", async () => {
  console.log("cron job start");

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(23, 59, 59, 999);

  try {
    const tasks = await Task.find({
      dueDate: { $gte: today, $lte: tomorrow },
    });

    const taskSummary = tasks
      .map(
        (task) =>
          `- ${task.title} (task statue:${
            task.status
          })(Due: ${task.dueDate.toLocaleString()})`
      )
      .join("\n");

    const digestEmail = {
      from: SENDER_EMAIL_ID,
      to: "vasu@getnada.com",
      subject: "Daily Task Digest",
      text: tasks.length
        ? `Here are your tasks for tomorrow:\n\n${taskSummary}`
        : "No tasks scheduled for tomorrow.",
    };

    transporter.sendMail(digestEmail, (err, info) => {
      if (err) {
        console.error("Error sending daily digest:", err);
      } else {
        console.log("Daily digest sent:", info.response);
      }
    });
  } catch (error) {
    console.error("Error generating daily digest:", error);
  }
  console.log("Cron Job Completed");
});

export { dailyDigestJob };
