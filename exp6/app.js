const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const sqlite3 = require("sqlite3").verbose();
const bcrypt = require("bcrypt");

const app = express();
const port = 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  session({
    secret: "secretKey",
    resave: false,
    saveUninitialized: true,
  })
);

// SQLite Database Setup
const db = new sqlite3.Database(':memory:', (err) => {
    if (err) return console.error(err.message);
    console.log('Connected to SQLite in-memory database');
});

// Ensure table is created before running any queries
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        name TEXT UNIQUE, 
        password TEXT
    )`, (err) => {
        if (err) console.error('Table creation error:', err.message);
    });

    // Insert a default user (if not exists)
    const hashedPassword = bcrypt.hashSync('password', 10);
    db.run("INSERT INTO users (name, password) VALUES ('admin', ?)", [hashedPassword], (err) => {
        if (err) console.error('User insertion error (may already exist):', err.message);
    });
});

// (1) Greeting with Session
app.get("/login", (req, res) => {
  res.send(
    '<form method="POST" action="/hello"><input name="name" required><button type="submit">Submit</button></form>'
  );
});

app.post("/hello", (req, res) => {
  req.session.name = req.body.name;
  req.session.startTime = Date.now();
  res.send(
    `Hello ${
      req.session.name
    }! <a href='/logout'>Logout</a> <br> Start Time: ${new Date(
      req.session.startTime
    ).toLocaleTimeString()}`
  );
});

app.get("/logout", (req, res) => {
  const duration = ((Date.now() - req.session.startTime) / 1000).toFixed(2);
  res.send(
    `Thank You ${req.session.name}. You used this site for ${duration} seconds.`
  );
  req.session.destroy();
});

// (2) Current Date & Time
app.get("/datetime", (req, res) => {
  res.send(`Current Date & Time: ${new Date().toLocaleString()}`);
});

// (3) Age Verification
app.get("/age-check", (req, res) => {
  res.send(
    '<form method="POST" action="/verify"><input name="name" required> <input name="age" type="number" required><button type="submit">Submit</button></form>'
  );
});

app.post("/verify", (req, res) => {
  const { name, age } = req.body;
  if (parseInt(age) < 18) {
    res.send(`Hello ${name}, you are not authorized to visit the site.`);
  } else {
    res.send(`Welcome ${name} to this site.`);
  }
});

// (4) List Cookies
app.get("/cookies", (req, res) => {
  res.cookie("user", "ExpressUser");
  res.send(
    `Cookies: ${JSON.stringify(
      req.cookies
    )} <br> <a href='/cookies'>Refresh</a>`
  );
});

// (5) User Validation with SQLite
app.get("/login-form", (req, res) => {
  res.send(
    '<form method="POST" action="/auth"><input name="name" required> <input type="password" name="password" required><button type="submit">Login</button></form>'
  );
});

app.post("/auth", (req, res) => {
  const { name, password } = req.body;
  db.get("SELECT * FROM users WHERE name = ?", [name], (err, user) => {
    if (err) return res.send("Error occurred");
    if (user && bcrypt.compareSync(password, user.password)) {
      res.send(`Welcome, ${name}! Login successful.`);
    } else {
      res.send("Login failed. Invalid credentials.");
    }
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
