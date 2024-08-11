const dotenv=require('dotenv')
const {createClient}=require('redis')

dotenv.config();

const client = createClient({
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT
    }
});

// Error handling
client.on('error', (err) => console.error('Redis Client Error', err));

// Connect to Redis Cloud
client.connect();


module.exports=client;