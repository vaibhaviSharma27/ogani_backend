import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "vaibhavisharma.sv2527@gmail.com",
        pass: "ynoi gpzs uqwf mzpn"
    }
});




export async function contactEmail(req, res) {
    try {
        const { name, email, subject, message } = req.body;

const template = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Customer Query Received</title>
</head>
<body style="margin:0; padding:0; background-color:#faf7f7; font-family:Arial, Helvetica, sans-serif;">

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#faf7f7; padding:30px 0;">
    <tr>
        <td align="center">

            <!-- Main Container -->
            <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px; max-width:600px; background-color:#ffffff; border:1px solid #f0d7d7;">

                <!-- Header -->
                <tr>
                    <td style="background-color:#d32f2f; padding:25px 30px;">
                        <h1 style="margin:0; color:#ffffff; font-size:26px; font-weight:bold;">
                            🚨 New Customer Query Received
                        </h1>
                    </td>
                </tr>

                <!-- Alert Banner -->
                <tr>
                    <td style="padding:20px 30px; background-color:#fff5f5; border-bottom:1px solid #f0d7d7;">
                        <p style="margin:0; color:#b71c1c; font-size:16px; font-weight:bold;">
                            Action Required: Please review and respond within 24 hours.
                        </p>
                    </td>
                </tr>

                <!-- Content -->
                <tr>
                    <td style="padding:30px;">

                        <p style="margin-top:0; color:#333333; font-size:15px; line-height:1.6;">
                            A new contact form submission has been received and requires attention from the support team.
                        </p>

                        <!-- Customer Details -->
                        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid #f2dede; background-color:#fcfcfc;">
                            <tr>
                                <td style="padding:20px;">

                                    <p style="margin:0 0 12px; color:#333333;">
                                        <strong>Customer Name:</strong>${name}
                                    </p>

                                    <p style="margin:0 0 12px; color:#333333;">
                                        <strong>Email Address:</strong> ${email}
                                    </p>

                                    <p style="margin:0 0 12px; color:#333333;">
                                        <strong>Subject:</strong> ${subject}
                                    </p>

                                    <p style="margin:0; color:#333333;">
                                        <strong>Message:</strong><br><br>
                                        ${message}
                                    </p>

                                </td>
                            </tr>
                        </table>

                        <!-- SLA Section -->
                        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:25px; background-color:#fff5f5; border-left:4px solid #d32f2f;">
                            <tr>
                                <td style="padding:18px;">
                                    <p style="margin:0; color:#b71c1c; font-size:15px; line-height:1.6;">
                                        <strong>SLA Deadline:</strong> A response and/or solution must be provided to the customer within <strong>24 hours</strong> of receiving this query.
                                    </p>
                                </td>
                            </tr>
                        </table>


                    </td>
                </tr>

                <!-- Footer -->
                <tr>
                    <td style="padding:20px 30px; background-color:#fafafa; border-top:1px solid #eeeeee;">

                        <p style="margin:0; color:#666666; font-size:13px; text-align:center;">
                            This is an automated notification generated from the contact form system.
                        </p>

                    </td>
                </tr>

            </table>

        </td>
    </tr>
</table>

</body>
</html>

`
        const reassurance = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>We've Received Your Inquiry</title>
</head>
<body style="margin:0; padding:0; background-color:#f5faf5; font-family:Arial, Helvetica, sans-serif;">

    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f5faf5; padding:30px 0;">
        <tr>
            <td align="center">
                
                <table width="600" cellpadding="0" cellspacing="0" border="0" style="background-color:#ffffff; border-radius:12px; overflow:hidden; border:1px solid #d8ead8;">
                    
                    <!-- Header -->
                    <tr>
                        <td align="center" style="background-color:#dff3df; padding:30px;">
                            <h1 style="margin:0; color:#2f6b2f; font-size:28px;">
                                Thank You for Contacting Us
                            </h1>
                        </td>
                    </tr>

                    <!-- Body -->
                    <tr>
                        <td style="padding:40px 35px;">
                            
                            <p style="margin:0 0 20px; color:#333333; font-size:16px; line-height:1.6;">
                                Hi <strong>${name}</strong>,
                            </p>

                            <p style="margin:0 0 20px; color:#555555; font-size:16px; line-height:1.6;">
                                We have successfully received your inquiry and our team is currently reviewing the details you submitted.
                            </p>

                            <!-- Submitted Details -->
                            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f8fcf8; border:1px solid #dff0df; border-radius:8px;">
                                <tr>
                                    <td style="padding:20px;">
                                        <p style="margin:0 0 10px; color:#333333;">
                                            <strong>Name:</strong> ${name}
                                        </p>

                                        <p style="margin:0 0 10px; color:#333333;">
                                            <strong>Email:</strong> ${email}
                                        </p>

                                        <p style="margin:0 0 10px; color:#333333;">
                                            <strong>Subject:</strong> ${subject}
                                        </p>

                                        <p style="margin:0; color:#333333;">
                                            <strong>Message:</strong><br>
                                            ${message}
                                        </p>
                                    </td>
                                </tr>
                            </table>

                            <p style="margin:25px 0 15px; color:#555555; font-size:16px; line-height:1.6;">
                                Our support team will carefully review your request and get back to you within <strong>24 hours</strong>.
                            </p>

                            <p style="margin:0 0 20px; color:#555555; font-size:16px; line-height:1.6;">
                                We are committed to providing a solution or the next steps regarding your inquiry within the same <strong>24-hour timeframe</strong>.
                            </p>

                            <p style="margin:0; color:#555555; font-size:16px; line-height:1.6;">
                                Thank you for your patience and for reaching out to us.
                            </p>

                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td align="center" style="background-color:#f7fbf7; padding:25px; border-top:1px solid #e4f0e4;">
                            <p style="margin:0; color:#6b6b6b; font-size:14px;">
                                Best Regards,<br>
                                <strong> Ogani's Support Team </strong>
                            </p>
                        </td>
                    </tr>

                </table>

            </td>
        </tr>
    </table>

</body>
</html>
`

       

        await transporter.sendMail(
            {
                to: "aishabanod.61007@gmail.com",
                from: "vaibhavisharma.sv2527@gmail.com",
                subject: "Query received from customer",
                html: template

            }
        )



        await transporter.sendMail({
            to: `${email}`,
            from: "vaibhavisharma.sv2527@gmail.com",
            subject: "Reassurance Mail",
            html: reassurance

        });

        console.log("Email sent!!")


        res.status(200).json({ message: "Task accomplished!!" });
    } catch (error) {
        console.log(error, "from here");
        res.status(500).json({ message: "Something went wrong..." })
    }
}