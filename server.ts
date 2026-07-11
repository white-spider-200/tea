import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import {
  getTransporter,
  sendDualEmail,
  logSimulatedDualEmail,
  getAdminRecipient,
  buildOrderAdminEmail,
  buildOrderCustomerEmail,
  buildContactAdminEmail,
  buildContactCustomerEmail,
} from "./server/email";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

app.post("/api/send-order", async (req, res) => {
  try {
    const {
      customerName,
      customerEmail,
      customerPhone,
      customerAddress,
      cartItems,
      cartTotal,
      isAr,
    } = req.body;

    if (
      !customerName ||
      !customerEmail ||
      !customerPhone ||
      !customerAddress ||
      !cartItems ||
      cartTotal === undefined
    ) {
      return res.status(400).json({ error: "Missing required checkout fields" });
    }

    const orderInput = {
      customerName,
      customerEmail,
      customerPhone,
      customerAddress,
      cartItems,
      cartTotal,
      isAr: Boolean(isAr),
    };

    const adminEmail = buildOrderAdminEmail(orderInput);
    const customerEmailContent = buildOrderCustomerEmail(orderInput);
    const transporter = getTransporter();
    const recipient = getAdminRecipient();

    if (!transporter) {
      logSimulatedDualEmail(
        "ORDER",
        adminEmail.subject,
        adminEmail.text,
        customerEmail,
        customerEmailContent.subject,
        customerEmailContent.text
      );

      return res.json({
        success: true,
        simulated: true,
        message: isAr
          ? "تم استلام طلبك! SMTP غير مُعدّ حالياً — تم تسجيل الطلب في وحدة التحكم."
          : "Order received! SMTP is not configured — order was logged to the console.",
        recipient,
        order: { customerName, customerEmail, cartTotal },
      });
    }

    await sendDualEmail(transporter, {
      adminSubject: adminEmail.subject,
      adminHtml: adminEmail.html,
      adminText: adminEmail.text,
      customerTo: customerEmail,
      customerSubject: customerEmailContent.subject,
      customerHtml: customerEmailContent.html,
      customerText: customerEmailContent.text,
      replyTo: customerEmail,
    });

    res.json({
      success: true,
      simulated: false,
      message: isAr
        ? "تم إرسال طلبك بنجاح! ستصلك رسالة تأكيد على بريدك الإلكتروني."
        : "Order placed successfully! A confirmation email has been sent to your inbox.",
      recipient,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to send order email.";
    console.error("Error sending order email:", err);
    res.status(500).json({ error: message });
  }
});

app.post("/api/send-contact", async (req, res) => {
  try {
    const { name, email, phone, location, message, isAr } = req.body;

    if (!name || !email || !phone || !location || !message) {
      return res.status(400).json({ error: "Missing required contact fields" });
    }

    const contactInput = {
      name,
      email,
      phone,
      location,
      message,
      isAr: Boolean(isAr),
    };

    const adminEmail = buildContactAdminEmail(contactInput);
    const customerEmailContent = buildContactCustomerEmail(contactInput);
    const transporter = getTransporter();
    const recipient = getAdminRecipient();

    if (!transporter) {
      logSimulatedDualEmail(
        "CONTACT",
        adminEmail.subject,
        adminEmail.text,
        email,
        customerEmailContent.subject,
        customerEmailContent.text
      );

      return res.json({
        success: true,
        simulated: true,
        message: isAr
          ? "تم استلام رسالتك! SMTP غير مُعدّ حالياً — تم تسجيل الرسالة في وحدة التحكم."
          : "Message received! SMTP is not configured — message was logged to the console.",
        recipient,
      });
    }

    await sendDualEmail(transporter, {
      adminSubject: adminEmail.subject,
      adminHtml: adminEmail.html,
      adminText: adminEmail.text,
      customerTo: email,
      customerSubject: customerEmailContent.subject,
      customerHtml: customerEmailContent.html,
      customerText: customerEmailContent.text,
      replyTo: email,
    });

    res.json({
      success: true,
      simulated: false,
      message: isAr
        ? "تم إرسال رسالتك بنجاح! ستصلك رسالة تأكيد على بريدك الإلكتروني."
        : "Message sent successfully! A confirmation email has been sent to your inbox.",
      recipient,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to send contact email.";
    console.error("Error sending contact email:", err);
    res.status(500).json({ error: message });
  }
});

const start = async () => {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Full-stack server running on http://localhost:${PORT}`);
  });
};

start();
