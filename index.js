if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
// Libraries
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');
const session = require('express-session');
const cookieParser = require('cookie-parser');

const app = express();

// MONGOOSE CONNECTION
const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/mern-skeleton';
mongoose.connect(dbUrl, {
  // Mongoose Settings due to deprecations
  useNewUrlParser: true, 
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Database connected!');
});

const secret = process.env.SECRET || 'thisisasecret';
const store = MongoStore.create({
  mongoUrl: dbUrl,
  touchAfter: 24 * 60 * 60,
  crypto: {
      secret,
  }
});
store.on('error', function(e) {
  console.log('Session Store Error', e);
})
// Session configuration
const sessionConfig = {
  store,
  name: 'userCookie',
  secret,
  resave: false,
  saveUninitialized: true,
  cookie: {
      httpOnly: true,
      // secure: true,
      expires: Date.now() + 1000 * 60 * 60 * 24 * 14,
      maxAge: 1000 * 60 * 60 * 24 * 14,
  }
}
app.use(session(sessionConfig));

// receive data as json
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// Serve the static files from React App
app.use(express.static(path.join(__dirname, 'client/build')));

// Set up Routes
const routes = require('./routes/index.js');
app.use('/api', routes);

// Handles any requests that don't match the ones above
app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/client/public/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log('App is listening on port ' + port);
});