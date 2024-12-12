const express = require("express");
const path = require("path");
const app = express();
const assetsRouter = require("./server/assets-router");
const config = require('./config/config.js');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const compress = require('compression')
const cors = require('cors')
const helmet = require('helmet')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(compress())
app.use(helmet())
app.use(cors({
    origin: true, 
    credentials: true,
    allowedHeaders
},))

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', ['https://farmers-market-e2bc2.web.app','http://localhost:5173']);

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

// Connect to MongoDB
mongoose.Promise = global.Promise

mongoose.connect(config.mongoUri, {
    // useNewUrlParser: true,
    //useCreateIndex: true, 
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to the database!"); }
)

mongoose.connection.on('error', () =>{
    throw new Error(`unable to connect to database: ${config.mongoUri}`);
})

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to parse URL-encoded bodies (for form data)
app.use(express.urlencoded({ extended: true }));

app.use("/src", assetsRouter);
app.use("/", express.static(path.join(__dirname, "public")));

// Routes
const CURRENT_WORKING_DIR = process.cwd()
//devBundle.compile(app)

app.use('/api/v1/products', require('./server/routes/products.routes.js'));

app.get("/api/v1", (req, res) => {
    res.json({
        project: "Farmer's Market",
        from: "ExpressCrew",
    });
});

app.use('/dist', express.static(path.join(CURRENT_WORKING_DIR, 'dist')))
app.use('/', require('./server/routes/user.routes.js'))
app.use('/', require('./server/routes/auth.routes.js'))

app.listen(config.port, () => {
    console.log();
    console.log(`App running in port ${config.port}`);
    console.log();
    console.log(`> Local: \x1b[36mhttp://localhost:\x1b[1m${config.port}/\x1b[0m`);
});

// app.get("/*", (_req, res) => {
//     res.sendFile(path.join(__dirname, "public", "index.html"));
// })