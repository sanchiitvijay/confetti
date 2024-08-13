require("dotenv").config()

const serviceAccount={
    "type": process.env.FIREBASE_APP_TYPE,
    "project_id": process.env.FIREBASE_APP_PROJECT_ID,
    "private_key_id": process.env.FIREBASE_APP_PRIVATE_KEY_ID,
    "private_key": process.env.FIREBASE_APP_PRIVATE_KEY,
    "client_email": process.env.FIREBASE_APP_CLIENT_EMAIL,
    "client_id": process.env.FIREBASE_APP_CLIENT_ID,
    "auth_uri": process.env.FIREBASE_APP_AUTH_URI,
    "token_uri": process.env.FIREBASE_APP_TOKEN_URI,
    "auth_provider_x509_cert_url": process.env.FIREBASE_APP_AUTH_PROVIDER_X509_CERT_URL,
    "client_x509_cert_url": process.env.FIREBASE_APP_CLIENT_X509_CERT_URL,   
  
    "universe_domain": process.env.FIREBASE_APP_UNIVERSE_DOMAIN
  }


module.exports=serviceAccount