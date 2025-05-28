const app = require('./app');
const connectDB = require('./config/db');
const PORT = process.env.PORT || 5000;
// Connect to the database
connectDB().then(() => {
    // Start the server
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}
).catch((error) => {
    console.error('Failed to connect to the database:', error.message);
    process.exit(1); // Exit the process with failure
}
);