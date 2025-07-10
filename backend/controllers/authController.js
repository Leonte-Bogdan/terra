const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

let users = [];

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

const authController = {
  signup: async (req, res) => {
    try {
      const { email, password, confirmPassword } = req.body;

      const validationErrors = [];

      if (!email) {
        validationErrors.push({ param: "email", msg: "Email is required" });
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        validationErrors.push({
          param: "email",
          msg: "Please enter a valid email address",
        });
      }

      if (!password) {
        validationErrors.push({
          param: "password",
          msg: "Password is required",
        });
      } else if (password.length < 5) {
        validationErrors.push({
          param: "password",
          msg: "Password must be at least 5 characters long",
        });
      } else if (
        !/^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~]+$/.test(password)
      ) {
        validationErrors.push({
          param: "password",
          msg: "Password cannot contain spaces",
        });
      }

      if (!confirmPassword) {
        validationErrors.push({
          param: "confirmPassword",
          msg: "Please confirm your password",
        });
      } else if (password !== confirmPassword) {
        validationErrors.push({
          param: "confirmPassword",
          msg: "Passwords do not match!",
        });
      }

      if (validationErrors.length > 0) {
        return res.status(422).json({
          message: "Validation failed",
          validationErrors,
        });
      }

      const existingUser = users.find((u) => u.email === email);
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }

      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      const newUser = {
        id: Date.now().toString(),
        email,
        password: hashedPassword,
        createdAt: new Date(),
      };

      users.push(newUser);

      const token = jwt.sign(
        { userId: newUser.id, email: newUser.email },
        JWT_SECRET,
        { expiresIn: "24h" }
      );

      res.status(201).json({
        message: "User created successfully",
        token,
        user: {
          id: newUser.id,
          email: newUser.email,
          createdAt: newUser.createdAt,
        },
      });
    } catch (error) {
      console.error("Signup error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res
          .status(400)
          .json({ message: "Email and password are required" });
      }

      const user = users.find((u) => u.email === email);
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const token = jwt.sign(
        { userId: user.id, email: user.email },
        JWT_SECRET,
        { expiresIn: "24h" }
      );

      res.json({
        message: "Login successful",
        token,
        user: {
          id: user.id,
          email: user.email,
          createdAt: user.createdAt,
        },
      });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  authenticateToken: (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Access token required" });
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({ message: "Invalid or expired token" });
      }
      req.user = user;
      next();
    });
  },

  getProfile: (req, res) => {
    const user = users.find((u) => u.id === req.user.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      user: {
        id: user.id,
        email: user.email,
        createdAt: user.createdAt,
      },
    });
  },
};

module.exports = authController;
