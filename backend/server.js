const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const PORT = 3001;
const dbURI =
  "mongodb+srv://TestUser:testuser@cluster0.kjglsfe.mongodb.net/mydatabase"; // Replace with your actual database URI

// Define the student schema
const studentSchema = new mongoose.Schema({
  name: String,
  college: String,
  course: String,
  rollNumber: Number,
});

// Create the student model
const Student = mongoose.model("Student", studentSchema);

app.use(bodyParser.json());
app.use(cors());

// Route to add fake students
app.post("/api/add-student", async (req, res) => {
  try {
    // 10 dummy student objects with name, college, course, and rollNumber
    const dummyStudents = [
      {
        name: "John Doe",
        college: "Harvard University",
        course: "Computer Science",
        rollNumber: 101,
      },
      {
        name: "Jane Smith",
        college: "Stanford University",
        course: "Mathematics",
        rollNumber: 102,
      },
      {
        name: "Alice Johnson",
        college: "Massachusetts Institute of Technology",
        course: "Physics",
        rollNumber: 103,
      },
      {
        name: "Bob Wilson",
        college: "University of California, Berkeley",
        course: "Chemistry",
        rollNumber: 104,
      },
      {
        name: "Eva Davis",
        college: "University of Cambridge",
        course: "Biology",
        rollNumber: 105,
      },
      {
        name: "Michael Brown",
        college: "Princeton University",
        course: "History",
        rollNumber: 106,
      },
      {
        name: "Olivia White",
        college: "Yale University",
        course: "English",
        rollNumber: 107,
      },
      {
        name: "David Lee",
        college: "University of Chicago",
        course: "Economics",
        rollNumber: 108,
      },
      {
        name: "Sophia Hall",
        college: "Columbia University",
        course: "Psychology",
        rollNumber: 109,
      },
      {
        name: "William Turner",
        college: "University of Oxford",
        course: "Sociology",
        rollNumber: 110,
      },
    ];

    // Insert the dummy students into the database
    const insertedStudents = await Student.insertMany(dummyStudents);
    res.status(201).json({
      message: "Fake students added successfully",
      students: insertedStudents,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to add fake students" });
  }
});

// Route to get student data by roll number and name
app.get("/api/get-student", async (req, res) => {
  const { name, rollNumber } = req.query;

  try {
    // Search for a student in the database by name and roll number
    const student = await Student.findOne({ name, rollNumber });

    if (student) {
      res.status(200).json({ student });
    } else {
      res.status(404).json({ error: "Student not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve student data" });
  }
});

// Connect to the MongoDB database
async function connectToDatabase() {
  try {
    await mongoose.connect(dbURI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB: " + error);
  }
}

// Start the server after connecting to the database
connectToDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
