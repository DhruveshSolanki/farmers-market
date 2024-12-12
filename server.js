const express = require("express");
const path = require("path");
const app = express();
const assetsRouter = require("./server/assets-router");
const config = require('./config/config.js');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const compress = require('compression');
const cors = require('cors');
const helmet = require('helmet');

// Middleware setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compress());
app.use(helmet());

// CORS configuration
const allowedOrigins = [
    'https://farmers-market-e2bc2.web.app',
    'http://localhost:5173',
];

// Use CORS middleware
app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true, // Allow cookies and credentials
    methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'PATCH', 'DELETE'], // Allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Headers allowed in requests
}));

// Preflight request handling
app.options('*', cors());

// Connect to MongoDB
mongoose.Promise = global.Promise;

mongoose.connect(config.mongoUri, {
    useUnifiedTopology: true,
}).then(() => {
    console.log("Connected to the database!");
}).catch(err => {
    console.error(`Unable to connect to database: ${err}`);
});

// Middleware to serve static files
const CURRENT_WORKING_DIR = process.cwd();
app.use('/src', assetsRouter);
app.use("/", express.static(path.join(__dirname, "public")));
app.use('/dist', express.static(path.join(CURRENT_WORKING_DIR, 'dist')));

// Routes
app.use('/api/v1/products', require('./server/routes/products.routes.js'));
app.use('/', require('./server/routes/user.routes.js'));
app.use('/', require('./server/routes/auth.routes.js'));

// Example API endpoint
app.get("/api/v1", (req, res) => {
    res.json({
        project: "Farmer's Market",
        from: "ExpressCrew",
    });
});

// Start the server
app.listen(config.port, () => {
    console.log(`App running on port ${config.port}`);
    console.log(`> Local: \x1b[36mhttp://localhost:\x1b[1m${config.port}/\x1b[0m`);
});
