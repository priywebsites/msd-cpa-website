import nodemailer from 'nodemailer';
import { z } from 'zod';

// Contact form validation schema
const contactFormSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone number is required"),
  message: z.string().min(1, "Message is required")
});

// Email configuration
const createTransporter = () => {
  return nodemailer.createTransporter({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: parseInt(process.env.SMTP_PORT || "587"),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
};

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Validate request body
    const validatedData = contactFormSchema.parse(req.body);
    
    // Send email notification
    try {
      const transporter = createTransporter();
      
      const clientEmail = process.env.CLIENT_EMAIL || "mail.websols@gmail.com";
      
      // Email to client
      await transporter.sendMail({
        from: process.env.SMTP_USER,
        to: clientEmail,
        subject: `New Contact Form Submission - ${validatedData.firstName} ${validatedData.lastName}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${validatedData.firstName} ${validatedData.lastName}</p>
          <p><strong>Email:</strong> ${validatedData.email}</p>
          <p><strong>Phone:</strong> ${validatedData.phone}</p>
          <p><strong>Message:</strong></p>
          <p>${validatedData.message.replace(/\n/g, '<br>')}</p>
          <hr>
          <p><em>This message was sent from the MSD CPA website contact form.</em></p>
        `,
      });

      // Confirmation email to user
      await transporter.sendMail({
        from: process.env.SMTP_USER,
        to: validatedData.email,
        subject: "Thank you for contacting MSD CPA",
        html: `
          <h2>Thank you for your message, ${validatedData.firstName}!</h2>
          <p>We have received your inquiry and will get back to you within 24 hours.</p>
          <p>If you need immediate assistance, please call us at (204) 800-8851.</p>
          <br>
          <p>Best regards,</p>
          <p><strong>MSD Chartered Professional Accountant Inc</strong></p>
          <p>575 St Mary's Rd #200, Winnipeg, MB R2M 3L6</p>
          <p>Phone: (204) 800-8851</p>
        `,
      });
    } catch (emailError) {
      console.error("Email sending failed:", emailError);
      // Don't fail the request if email fails, just log it
    }
    
    res.json({ 
      success: true, 
      message: "Thank you for your message! We will get back to you within 24 hours."
    });
  } catch (error) {
    console.error("Contact form error:", error);
    
    if (error instanceof z.ZodError) {
      res.status(400).json({ 
        success: false, 
        message: "Please check your form data and try again.",
        errors: error.errors 
      });
    } else {
      res.status(500).json({ 
        success: false, 
        message: "Something went wrong. Please try again later." 
      });
    }
  }
}