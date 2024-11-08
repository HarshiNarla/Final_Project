const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const url = require('url');
const connectDB = require('./config/db');

require('dotenv').config();

const app = express();

// Connect to MongoDB
connectDB();

const signupRoute = require('./routes/signupRoute');
const userRoute = require('./routes/user');
const searchFlightRoute = require('./routes/searchFlight');
const guidesRoute = require('./routes/guidesRoute');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.set('views', './views');
app.get('/favicon.ico', (req, res) => res.status(204));

// Home page
app.get('/', (req, res) => {
  res.render('index');
});

//Default route
app.get("/", (req,res)=>{
  res.json("Welcome to alpha tourist assistance")
});

app.post('/signup', signupRoute);
app.use('/login', userRoute);
app.use('/user', userRoute);
app.use('/flights', searchFlightRoute);
app.use('/guides', guidesRoute);

// General Middleware
app.use((req, res, next) => {
    try {
        res.render(url.parse(req.url, true).pathname.substring(1));
    } catch (error) {
        const err = new Error('Error rendering the page');
        err.status = 500;
        return next(err);
    }
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('error', { error: err });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
