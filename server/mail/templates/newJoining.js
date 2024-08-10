const welcomeTemplate = (name) => {
	return `<!DOCTYPE html>
	<html>
	
	<head>
		<meta charset="UTF-8">
		<title>Welcome to Confetti!</title>
		<style>
			body {
				background-color: #fffff0;
				font-family: Arial, sans-serif;
				font-size: 16px;
				line-height: 1.4;
				color: #333333;
				margin: 0;
				padding: 0;
			}
	
			.container {
				max-width: 600px;
				margin: 0 auto;
				padding: 20px;
				text-align: center;
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
			}
	
			.support {
				font-size: 14px;
				color: #999999;
				margin-top: 20px;
			}
	
			.highlight {
				font-weight: bold;
			}
		</style>
	
	</head>
	
	<body>
		<div class="container">
			<a href="https://github.com/sanchiitvijay/confetti"><img class="logo"
					src="https://res.cloudinary.com/dcnhb3jwv/image/upload/v1720419911/chat-app/confetti_dea0wh.png" alt="Confetti Logo"></a>
			<div class="message">Welcome to Confetti!</div>
			<div class="body">
				<p>Dear ${name},</p>
				<p>We're thrilled to welcome you to Confetti! Your account has been successfully created and you're now part of our vibrant community.</p>
				<p>With Confetti, you can:</p>
				<ul style="text-align: left;">
					<li>Connect with friends and make new ones</li>
					<li>Share your thoughts and experiences</li>
					<li>Discover exciting content</li>
					<li>And much more!</li>
				</ul>
				<p>We can't wait to see what you'll bring to our community. Get started by exploring the platform and setting up your profile.</p>
				<a href="https://confetti-app-url.com/login" class="cta">Start Exploring</a>
			</div>
			<div class="support">If you have any questions or need assistance, please don't hesitate to reach out to us at 
					href="mailto:confetti.site.01@gmail.com">confetti.site.01@gmail.com</a>. We're here to help!</div>
		</div>
	</body>
	
	</html>`;
};

module.exports = welcomeTemplate;