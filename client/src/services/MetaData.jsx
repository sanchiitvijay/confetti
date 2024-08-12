import React from 'react';
import { Helmet } from 'react-helmet';

const MetaData = () => {
  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>Confetti</title>
      <meta name="description" content="Post your anonymous college confessions, like, comment, share, and get notified about your confessions on Confetti." />
      <meta name="keywords" content="college confessions, anonymous confessions, share confessions, comment on confessions, like confessions, notification of confessions" />
      <meta name="author" content="Confetti Team" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content="College Confessions - Share and Discover Confessions" />
      <meta property="og:description" content="Post your anonymous college confessions, like, comment, share, and get notified about your confessions on College Confessions." />
      <meta property="og:image" content="https://www.yoursite.com/path_to_image.jpg" />
      <meta property="og:url" content="https://www.collegeconfessions.com" />
      <meta property="og:site_name" content="College Confessions" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="College Confessions - Share and Discover Confessions" />
      <meta name="twitter:description" content="Post your anonymous college confessions, like, comment, share, and get notified about your confessions on College Confessions." />
      <meta name="twitter:image" content="https://www.yoursite.com/path_to_image.jpg" />
      <meta name="twitter:site" content="@your_twitter_handle" />
      <meta name="twitter:creator" content="@your_twitter_handle" />

      {/* Additional Meta Tags */}
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      <meta name="rating" content="general" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
    </Helmet>
  );
};

export default MetaData;
