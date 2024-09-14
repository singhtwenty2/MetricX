fun emailAsOtpTemplate(otp: String): String {
    return """<html>
<head>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');

        body {
            font-family: 'Poppins', sans-serif;
            background-color: #f2f2f5;
            color: #1a1a1b;
            margin: 0;
            padding: 0;
        }
        .container {
            width: 100%;
            padding: 60px 20px;
            text-align: center;
        }
        .content {
            background-color: #ffffff;
            border-radius: 16px;
            padding: 70px 60px;
            max-width: 600px;
            margin: 0 auto;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
            border: 1px solid #dedede;
        }
        .header {
            font-size: 34px;
            font-weight: 700;
            color: #0070e0;
            margin-bottom: 40px;
            letter-spacing: -0.02em;
            text-transform: capitalize;
        }
        p {
            font-size: 17px;
            line-height: 1.8;
            color: #4a4a4e;
            margin: 0 0 25px;
        }
        .otp {
            font-size: 42px;
            font-weight: 700;
            color: #1b1b1d;
            margin: 50px 0;
            letter-spacing: 6px;
        }
        .notice {
            font-size: 16px;
            color: #3b3b3e;
            margin-top: 40px;
            line-height: 1.6;
        }
        .disclaimer {
            font-size: 15px;
            color: #666671;
            font-style: italic;
            margin-top: 50px;
            line-height: 1.5;
        }
        .footer {
            font-size: 13px;
            color: #7e7e82;
            margin-top: 60px;
            border-top: 1px solid #ececec;
            padding-top: 20px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="content">
            <div class="header">Your OTP for MetricX</div>
            <p>Dear User,</p>
            <p>Please use the following One-Time Password (OTP) to securely log in to your MetricX account:</p>
            <div class="otp">$otp</div>
            <p>This OTP is valid for the next 10 minutes. If you did not request this, please ignore this message.</p>
            <p class="notice">
                For your security, do not share this OTP with anyone. If you suspect any unauthorized access, please contact our support team immediately.
            </p>
            <p class="disclaimer">
                Please note: We will never ask for your OTP via email, phone, or any other communication method.
            </p>
            <div class="footer">
                &copy; 2024 MetricX. All rights reserved.
            </div>
        </div>
    </div>
</body>
</html>
""".trimIndent()
}

fun emailAsGreetingTemplate(name: String): String {
    return """
        <html>
        <head>
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');

                body {
                    font-family: 'Poppins', sans-serif;
                    background-color: #f3f4f6;
                    color: #333;
                    margin: 0;
                    padding: 0;
                }
                .container {
                    width: 100%;
                    padding: 60px 20px;
                    text-align: center;
                }
                .content {
                    background-color: #ffffff;
                    border-radius: 16px;
                    padding: 60px;
                    max-width: 600px;
                    margin: 0 auto;
                    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
                    border: 1px solid #e5e7eb;
                    position: relative;
                    overflow: hidden;
                }

                /* Refined Graph-inspired background */
                .content::before {
                    content: '';
                    position: absolute;
                    top: -100px;
                    left: -100px;
                    width: 200px;
                    height: 200px;
                    background: radial-gradient(circle, rgba(0, 113, 227, 0.1), transparent);
                    z-index: 1;
                    opacity: 0.4;
                    border-radius: 50%;
                }
                .content::after {
                    content: '';
                    position: absolute;
                    bottom: -100px;
                    right: -100px;
                    width: 200px;
                    height: 200px;
                    background: linear-gradient(135deg, rgba(0, 113, 227, 0.1), transparent);
                    z-index: 1;
                    opacity: 0.3;
                    border-radius: 50%;
                }

                .header {
                    font-size: 32px;
                    font-weight: 700;
                    color: #0071e3;
                    margin-bottom: 30px;
                    letter-spacing: -0.02em;
                    position: relative;
                    z-index: 2;
                }
                p {
                    font-size: 16px;
                    line-height: 1.7;
                    color: #555;
                    margin: 0 0 25px;
                    position: relative;
                    z-index: 2;
                }
                .intro {
                    font-size: 18px;
                    font-weight: 600;
                    color: #222;
                    margin-bottom: 25px;
                    position: relative;
                    z-index: 2;
                }
                .highlight {
                    font-size: 18px;
                    font-weight: 600;
                    color: #0071e3;
                    margin: 40px 0;
                    position: relative;
                    z-index: 2;
                }
                .notice {
                    font-size: 15px;
                    color: #6b7280;
                    margin-top: 40px;
                    line-height: 1.6;
                    position: relative;
                    z-index: 2;
                }
                .disclaimer {
                    font-size: 14px;
                    color: #9ca3af;
                    font-style: italic;
                    margin-top: 50px;
                    line-height: 1.5;
                    position: relative;
                    z-index: 2;
                }
                .footer {
                    font-size: 13px;
                    color: #9ca3af;
                    margin-top: 60px;
                    border-top: 1px solid #ececec;
                    padding-top: 20px;
                    position: relative;
                    z-index: 2;
                }

                /* Graph-like dots and lines */
                .graphical-insights {
                    display: flex;
                    justify-content: center;
                    margin-top: 40px;
                    position: relative;
                    z-index: 2;
                }
                .line {
                    position: relative;
                    width: 120px;
                    height: 2px;
                    background-color: #0071e3;
                    margin: 0 20px;
                }
                .dot {
                    width: 16px;
                    height: 16px;
                    background-color: #0071e3;
                    border-radius: 50%;
                    position: relative;
                    top: -8px;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="content">
                    <div class="header">Welcome to MetricX, $name!</div>
                    <p class="intro">Dear $name,</p>
                    <p>
                        Welcome to <strong>MetricX</strong>, the leading platform for <strong>real-time website monitoring</strong>. MetricX provides 
                        you with all the tools you need to monitor the uptime and health of your websites with precision and ease.
                    </p>
                    <p>
                        Through detailed metrics, real-time notifications, and high-end graphical reports, we help ensure your website 
                        stays online and performing at its best. Whether monitoring multiple sites or using our escalation tools, MetricX 
                        has you covered.
                    </p>
                    <p>
                        You can create custom clusters, track performance with real-time notifications via email, SMS, or IVR calls, 
                        and generate detailed health reports. We’ve made it easy for you to stay in control, no matter how many websites 
                        you manage.
                    </p>

                    <!-- Simple graphical insights with CSS dots and lines -->
                    <div class="graphical-insights">
                        <div class="dot"></div>
                        <div class="line"></div>
                        <div class="dot"></div>
                    </div>

                    <p class="highlight">You're all set! Start monitoring your websites and ensure top-tier performance today.</p>
                    <p class="notice">
                        For your safety, please keep your login credentials private. If you encounter any issues, our support team is ready to help.
                    </p>
                    <p class="disclaimer">
                        Please note: MetricX will never ask for your login details via email or phone.
                    </p>
                    <div class="footer">
                        &copy; 2024 MetricX. All rights reserved.
                    </div>
                </div>
            </div>
        </body>
        </html>
    """.trimIndent()
}