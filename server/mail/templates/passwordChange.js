exports.passwordChange = (url, name) => {
    return `
        <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset Password - Confetti</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
        }
        .container {
            width: 100%;
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .logo {
            max-width: 200px;
            margin-bottom: 20px;
        }
        .message {
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 20px;
            color: #FFD60A;
            text-align: center;
        }
        .body {
            font-size: 16px;
            margin-bottom: 20px;
        }
        .cta {
            display: inline-block;
            padding: 10px 20px;
            background-color: #FFD60A;
            color: #000000;
            text-decoration: none;
            border-radius: 5px;
            font-size: 16px;
            font-weight: bold;
            margin-top: 20px;
            text-align: center;
        }
        .support {
            font-size: 14px;
            color: #999999;
            margin-top: 20px;
            text-align: center;
        }
        .highlight {
            font-weight: bold;
        }
    </style>
</head>
<body>
    <div class="container">
        <a href="https://github.com/sanchiitvijay/confetti">
            <img class="logo" src="https://res.cloudinary.com/dcnhb3jwv/image/upload/v1720419911/chat-app/confetti_dea0wh.png" alt="Confetti Logo">
        </a>
        <div class="message">Reset Your Password</div>
        <div class="body">
            <p>Dear ${name},</p>
            <p>We received a request to reset your password. If you didn't request this change, you can ignore this email. Otherwise, you can use the button below to reset your password.</p>
            <p>To reset your password, click the button below:</p>
            <a href="${url}" class="cta">Reset Password</a>
            <p>If you have any questions or need further assistance, please feel free to reach out to us.</p>
        </div>
        <div class="support">
            If you have any questions or need assistance, please don't hesitate to reach out to us at 
            <a href="mailto:confetti.site.01@gmail.com">confetti.site.01@gmail.com</a>. We're here to help!
        </div>
    </div>
</body>
</html>

    `;
}