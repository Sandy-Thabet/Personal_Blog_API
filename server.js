const dotenv = require('dotenv');
dotenv.config();

const app = require('./app');
const { connectMongoDB } = require('./database/repositories/db');

connectMongoDB().then(() => {
  console.log('DB connected 🚀');
});

const port = process.env.PORT || 5000;

// Add a route for the root URL
app.get('/', (req, res) => {
  res.send('Welcome to the Personal Blog API');
});

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
