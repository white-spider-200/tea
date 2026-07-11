import nodemailer from "nodemailer";
import type { Transporter } from "nodemailer";

const DEFAULT_ADMIN_EMAIL = "mhindi@trusttechlimited.com";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function getTransporter(): Transporter | null {
  const host = process.env.SMTP_HOST;
  const port = parseInt(process.env.SMTP_PORT || "465", 10);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    return null;
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });
}

export function getSender(): string {
  return (
    process.env.SMTP_FROM ||
    `"Royal Regime" <${process.env.SMTP_USER || DEFAULT_ADMIN_EMAIL}>`
  );
}

export function getAdminRecipient(): string {
  return process.env.SMTP_TO || DEFAULT_ADMIN_EMAIL;
}

export function getSupportEmail(): string {
  return process.env.SMTP_USER || DEFAULT_ADMIN_EMAIL;
}

interface EmailLayoutOptions {
  title: string;
  bodyHtml: string;
  isAr: boolean;
  footerNote?: string;
}

export function buildEmailLayout({
  title,
  bodyHtml,
  isAr,
  footerNote,
}: EmailLayoutOptions): string {
  const supportEmail = escapeHtml(getSupportEmail());
  const defaultFooter = isAr
    ? "سنتواصل معك خلال 24–48 ساعة."
    : "We will contact you within 24–48 hours.";
  const footer = footerNote ?? defaultFooter;

  return `
    <div style="font-family: Georgia, 'Times New Roman', serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e8e0d4; border-radius: 8px; background-color: #ffffff;">
      <div style="border-bottom: 2px solid #8e7046; padding-bottom: 12px; margin-bottom: 20px;">
        <h1 style="color: #8e7046; font-size: 22px; margin: 0; font-weight: normal; letter-spacing: 0.5px;">Royal Regime</h1>
        <p style="color: #555; font-family: Arial, sans-serif; font-size: 14px; margin: 8px 0 0;">${escapeHtml(title)}</p>
      </div>
      ${bodyHtml}
      <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #e8e0d4; font-family: Arial, sans-serif; font-size: 12px; color: #888;">
        <p style="margin: 0 0 4px;">${footer}</p>
        <p style="margin: 0;"><a href="mailto:${supportEmail}" style="color: #8e7046;">${supportEmail}</a></p>
      </div>
    </div>
  `;
}

function buildDetailsCard(
  items: { label: string; value: string }[],
  heading: string
): string {
  const rows = items
    .map(
      (item) =>
        `<li style="margin-bottom: 6px;"><strong>${escapeHtml(item.label)}:</strong> ${escapeHtml(item.value)}</li>`
    )
    .join("");

  return `
    <div style="background-color: #fdfaf6; padding: 16px; border-radius: 6px; border-left: 4px solid #8e7046; margin-top: 16px;">
      <h3 style="margin: 0 0 10px; color: #8e7046; font-size: 15px; font-family: Arial, sans-serif;">${escapeHtml(heading)}</h3>
      <ul style="list-style: none; padding: 0; margin: 0; color: #444; line-height: 1.6; font-family: Arial, sans-serif; font-size: 14px;">
        ${rows}
      </ul>
    </div>
  `;
}

interface CartItem {
  product: { name: string; nameAr: string; price: number };
  quantity: number;
}

interface OrderEmailInput {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerAddress: string;
  cartItems: CartItem[];
  cartTotal: number;
  isAr: boolean;
}

function buildOrderTable(cartItems: CartItem[], cartTotal: number, isAr: boolean): string {
  const rows = cartItems
    .map((item) => {
      const pName = isAr ? item.product.nameAr : item.product.name;
      return `
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #ddd; font-family: Arial, sans-serif; font-size: 13px;">${escapeHtml(pName)}</td>
          <td style="padding: 8px; border-bottom: 1px solid #ddd; text-align: center; font-family: Arial, sans-serif; font-size: 13px;">${item.quantity}</td>
          <td style="padding: 8px; border-bottom: 1px solid #ddd; text-align: right; font-family: Arial, sans-serif; font-size: 13px;">$${item.product.price}.00</td>
          <td style="padding: 8px; border-bottom: 1px solid #ddd; text-align: right; font-family: Arial, sans-serif; font-size: 13px;">$${item.product.price * item.quantity}.00</td>
        </tr>
      `;
    })
    .join("");

  return `
    <table style="width: 100%; border-collapse: collapse; margin: 16px 0;">
      <thead>
        <tr style="background-color: #f9f9f9;">
          <th style="padding: 8px; text-align: left; border-bottom: 2px solid #ddd; font-family: Arial, sans-serif; font-size: 12px;">${isAr ? "المنتج" : "Product"}</th>
          <th style="padding: 8px; text-align: center; border-bottom: 2px solid #ddd; font-family: Arial, sans-serif; font-size: 12px;">${isAr ? "الكمية" : "Qty"}</th>
          <th style="padding: 8px; text-align: right; border-bottom: 2px solid #ddd; font-family: Arial, sans-serif; font-size: 12px;">${isAr ? "السعر" : "Price"}</th>
          <th style="padding: 8px; text-align: right; border-bottom: 2px solid #ddd; font-family: Arial, sans-serif; font-size: 12px;">${isAr ? "المجموع" : "Total"}</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
      <tfoot>
        <tr style="font-weight: bold;">
          <td colspan="3" style="padding: 8px; text-align: right; border-top: 2px solid #ddd; font-family: Arial, sans-serif; font-size: 13px;">${isAr ? "المجموع الكلي" : "Grand Total"}:</td>
          <td style="padding: 8px; text-align: right; border-top: 2px solid #ddd; color: #8e7046; font-family: Arial, sans-serif; font-size: 13px;">$${cartTotal}.00</td>
        </tr>
      </tfoot>
    </table>
  `;
}

function buildOrderDetailsText(cartItems: CartItem[], cartTotal: number, isAr: boolean): string {
  return cartItems
    .map((item) => {
      const pName = isAr ? item.product.nameAr : item.product.name;
      return `- ${pName} x ${item.quantity} ($${item.product.price}.00 each)`;
    })
    .join("\n")
    .concat(`\n\n${isAr ? "المجموع الكلي" : "Grand Total"}: $${cartTotal}.00`);
}

export function buildOrderAdminEmail(input: OrderEmailInput): { subject: string; text: string; html: string } {
  const { customerName, customerEmail, customerPhone, customerAddress, cartItems, cartTotal, isAr } = input;
  const orderDetailsText = buildOrderDetailsText(cartItems, cartTotal, isAr);
  const subject = isAr
    ? `طلب شراء جديد من ${customerName}`
    : `New Royal Regime Order from ${customerName}`;

  const text = isAr
    ? `طلب شراء جديد:\n\n${orderDetailsText}\n\nتفاصيل المشتري:\n- الاسم: ${customerName}\n- البريد: ${customerEmail}\n- الهاتف: ${customerPhone}\n- العنوان: ${customerAddress}`
    : `New order received:\n\n${orderDetailsText}\n\nBuyer Details:\n- Name: ${customerName}\n- Email: ${customerEmail}\n- Phone: ${customerPhone}\n- Address: ${customerAddress}`;

  const bodyHtml = `
    <p style="color: #555; font-family: Arial, sans-serif; font-size: 14px; margin: 0 0 8px;">
      ${isAr ? "تم استلام طلب شراء جديد بالتفاصيل التالية:" : "A new order has been placed with the following details:"}
    </p>
    ${buildOrderTable(cartItems, cartTotal, isAr)}
    ${buildDetailsCard(
      [
        { label: isAr ? "الاسم" : "Name", value: customerName },
        { label: isAr ? "البريد الإلكتروني" : "Email", value: customerEmail },
        { label: isAr ? "الهاتف" : "Phone", value: customerPhone },
        { label: isAr ? "العنوان" : "Address", value: customerAddress },
      ],
      isAr ? "تفاصيل المشتري" : "Buyer Details"
    )}
  `;

  const html = buildEmailLayout({
    title: isAr ? "طلب شراء جديد" : "New Order Received",
    bodyHtml,
    isAr,
    footerNote: isAr ? "رد مباشرة على هذا البريد للتواصل مع العميل." : "Reply directly to this email to reach the customer.",
  });

  return { subject, text, html };
}

export function buildOrderCustomerEmail(input: OrderEmailInput): { subject: string; text: string; html: string } {
  const { customerName, customerEmail, customerPhone, customerAddress, cartItems, cartTotal, isAr } = input;
  const orderDetailsText = buildOrderDetailsText(cartItems, cartTotal, isAr);
  const subject = isAr
    ? "تم استلام طلبك — Royal Regime"
    : "Order Received — Royal Regime";

  const text = isAr
    ? `مرحباً ${customerName},\n\nشكراً لطلبك من Royal Regime. لقد استلمنا طلبك وسنتواصل معك قريباً.\n\n${orderDetailsText}\n\nتفاصيلك:\n- البريد: ${customerEmail}\n- الهاتف: ${customerPhone}\n- العنوان: ${customerAddress}`
    : `Hello ${customerName},\n\nThank you for your Royal Regime order. We have received your request and will be in touch shortly.\n\n${orderDetailsText}\n\nYour details:\n- Email: ${customerEmail}\n- Phone: ${customerPhone}\n- Address: ${customerAddress}`;

  const bodyHtml = `
    <p style="color: #555; font-family: Arial, sans-serif; font-size: 14px; margin: 0 0 8px;">
      ${isAr
        ? `مرحباً <strong>${escapeHtml(customerName)}</strong>، شكراً لطلبك من Royal Regime. لقد استلمنا طلبك وسنتواصل معك قريباً.`
        : `Hello <strong>${escapeHtml(customerName)}</strong>, thank you for your Royal Regime order. We have received your request and will be in touch shortly.`}
    </p>
    ${buildOrderTable(cartItems, cartTotal, isAr)}
    ${buildDetailsCard(
      [
        { label: isAr ? "البريد الإلكتروني" : "Email", value: customerEmail },
        { label: isAr ? "الهاتف" : "Phone", value: customerPhone },
        { label: isAr ? "العنوان" : "Address", value: customerAddress },
      ],
      isAr ? "تفاصيل الطلب" : "Order Details"
    )}
  `;

  const html = buildEmailLayout({
    title: isAr ? "تأكيد استلام الطلب" : "Order Confirmation",
    bodyHtml,
    isAr,
  });

  return { subject, text, html };
}

interface ContactEmailInput {
  name: string;
  email: string;
  phone: string;
  location: string;
  message: string;
  isAr: boolean;
}

export function buildContactAdminEmail(input: ContactEmailInput): { subject: string; text: string; html: string } {
  const { name, email, phone, location, message, isAr } = input;
  const subject = isAr ? `رسالة جديدة من ${name}` : `New Message from ${name}`;

  const text = isAr
    ? `رسالة جديدة:\n\n- الاسم: ${name}\n- البريد: ${email}\n- الهاتف: ${phone}\n- الموقع: ${location}\n\nالرسالة:\n${message}`
    : `New contact message:\n\n- Name: ${name}\n- Email: ${email}\n- Phone: ${phone}\n- Location: ${location}\n\nMessage:\n${message}`;

  const bodyHtml = `
    <p style="color: #555; font-family: Arial, sans-serif; font-size: 14px; margin: 0 0 8px;">
      ${isAr ? "تم استلام رسالة جديدة بالتفاصيل التالية:" : "A new message has been received with the following details:"}
    </p>
    ${buildDetailsCard(
      [
        { label: isAr ? "الاسم" : "Name", value: name },
        { label: isAr ? "البريد الإلكتروني" : "Email", value: email },
        { label: isAr ? "الهاتف" : "Phone", value: phone },
        { label: isAr ? "الموقع" : "Location", value: location },
      ],
      isAr ? "بيانات المرسل" : "Sender Details"
    )}
    <div style="background-color: #fdfaf6; padding: 16px; border-radius: 6px; border-left: 4px solid #8e7046; margin-top: 16px;">
      <h3 style="margin: 0 0 10px; color: #8e7046; font-size: 15px; font-family: Arial, sans-serif;">${isAr ? "الرسالة" : "Message"}</h3>
      <p style="color: #444; font-family: Arial, sans-serif; font-size: 14px; line-height: 1.6; margin: 0; white-space: pre-wrap;">${escapeHtml(message)}</p>
    </div>
  `;

  const html = buildEmailLayout({
    title: isAr ? "رسالة جديدة" : "New Message",
    bodyHtml,
    isAr,
    footerNote: isAr ? "رد مباشرة على هذا البريد للتواصل مع المرسل." : "Reply directly to this email to reach the sender.",
  });

  return { subject, text, html };
}

export function buildContactCustomerEmail(input: ContactEmailInput): { subject: string; text: string; html: string } {
  const { name, email, phone, location, message, isAr } = input;
  const subject = isAr
    ? "تم استلام رسالتك — Royal Regime"
    : "Message Received — Royal Regime";

  const text = isAr
    ? `مرحباً ${name},\n\nشكراً لتواصلك مع Royal Regime. لقد استلمنا رسالتك وسنرد عليك قريباً.\n\nنسخة من رسالتك:\n- الهاتف: ${phone}\n- الموقع: ${location}\n\n${message}`
    : `Hello ${name},\n\nThank you for contacting Royal Regime. We have received your message and will respond shortly.\n\nCopy of your message:\n- Phone: ${phone}\n- Location: ${location}\n\n${message}`;

  const bodyHtml = `
    <p style="color: #555; font-family: Arial, sans-serif; font-size: 14px; margin: 0 0 8px;">
      ${isAr
        ? `مرحباً <strong>${escapeHtml(name)}</strong>، شكراً لتواصلك مع Royal Regime. لقد استلمنا رسالتك وسنرد عليك قريباً.`
        : `Hello <strong>${escapeHtml(name)}</strong>, thank you for contacting Royal Regime. We have received your message and will respond shortly.`}
    </p>
    ${buildDetailsCard(
      [
        { label: isAr ? "البريد الإلكتروني" : "Email", value: email },
        { label: isAr ? "الهاتف" : "Phone", value: phone },
        { label: isAr ? "الموقع" : "Location", value: location },
      ],
      isAr ? "تفاصيل رسالتك" : "Your Details"
    )}
    <div style="background-color: #fdfaf6; padding: 16px; border-radius: 6px; border-left: 4px solid #8e7046; margin-top: 16px;">
      <h3 style="margin: 0 0 10px; color: #8e7046; font-size: 15px; font-family: Arial, sans-serif;">${isAr ? "رسالتك" : "Your Message"}</h3>
      <p style="color: #444; font-family: Arial, sans-serif; font-size: 14px; line-height: 1.6; margin: 0; white-space: pre-wrap;">${escapeHtml(message)}</p>
    </div>
  `;

  const html = buildEmailLayout({
    title: isAr ? "تأكيد استلام الرسالة" : "Message Confirmation",
    bodyHtml,
    isAr,
  });

  return { subject, text, html };
}

export interface DualEmailPayload {
  adminSubject: string;
  adminHtml: string;
  adminText: string;
  customerTo: string;
  customerSubject: string;
  customerHtml: string;
  customerText: string;
  replyTo: string;
}

export async function sendDualEmail(
  transporter: Transporter,
  payload: DualEmailPayload
): Promise<void> {
  const sender = getSender();
  const recipient = getAdminRecipient();

  await Promise.all([
    transporter.sendMail({
      from: sender,
      to: recipient,
      replyTo: payload.replyTo,
      subject: payload.adminSubject,
      text: payload.adminText,
      html: payload.adminHtml,
    }),
    transporter.sendMail({
      from: sender,
      to: payload.customerTo,
      subject: payload.customerSubject,
      text: payload.customerText,
      html: payload.customerHtml,
    }),
  ]);
}

export function logSimulatedDualEmail(
  label: string,
  adminSubject: string,
  adminText: string,
  customerTo: string,
  customerSubject: string,
  customerText: string
): void {
  const recipient = getAdminRecipient();
  console.log(`=== [SIMULATED EMAIL — ${label}] ===`);
  console.log(`Admin To: ${recipient}`);
  console.log(`Admin Subject: ${adminSubject}`);
  console.log(`Admin Content:\n${adminText}`);
  console.log(`---`);
  console.log(`Customer To: ${customerTo}`);
  console.log(`Customer Subject: ${customerSubject}`);
  console.log(`Customer Content:\n${customerText}`);
  console.log("========================================");
}
