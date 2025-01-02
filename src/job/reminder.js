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

// Function to send email notifications
function sendEmailNotification(task) {
  const mailOptions = {
    from: SENDER_EMAIL_ID,
    to: "vasu@getnada.com",
    subject: `Reminder for Task: ${task.title}`,
    text: `This is a reminder for your task: ${task.title}. It is due soon.`,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error("Error sending email:", err);
    } else {
      console.log("Email sent:", info.response);
    }
  });
}

// Cron job to check and send reminders
const reminder = new CronJob("*/1 * * * *", async () => {
  console.log("Cron Job Started");

  try {
    const currentTime = new Date();
    const currentHour = currentTime.getUTCHours();
    const currentMinute = currentTime.getUTCMinutes();

    const tasks = await Task.find({
      "reminder.isSet": true,
      $expr: {
        $and: [
          { $eq: [{ $hour: "$reminder.remindAt" }, currentHour] },
          { $eq: [{ $minute: "$reminder.remindAt" }, currentMinute] },
        ],
      },
    });
    // Send notifications for the filtered tasks
    for (const task of tasks) {
      sendEmailNotification(task);
    }

    console.log(`${tasks.length} reminders processed.`);
  } catch (error) {
    console.error("Error in Cron Job:", error);
  }

  console.log("Cron Job Completed");
});

export default reminder;
