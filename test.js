import mongoose from "mongoose";
import User from "./models/users.js";
import Course from "./models/courses.js";
import Contents from "./models/contents.js";
import Enrollments from "./models/enrollments.js";
import Progress from './models/progress.js'
import Grade from "./models/grad.js";
import Quiz from "./models/quizzes.js";
import progress from "./models/progress.js";

// MongoDB connection
const DB_URL = "mongodb+srv://course:mps58O9UZKVCAyNs@cluster0.wu5e4.mongodb.net/Learnify?retryWrites=true&w=majority&appName=Cluster0";
mongoose
  .connect(DB_URL)
  .then(() => console.log("Database connected"))
  .catch((error) => console.error("Connection error:", error));

// Test function
async function testSchemas() {
  try {
    // // Create a user
    // const user = await User.create({
    //   email: "teacher@example.com",
    //   name: "John Doe",
    //   password: "securepassword",
    //   role: "instructor",
    // });
    // console.log("User created:", user);

    // // Create a course
    // const course = await Course.create({
    //   title: "Introduction to JavaScript",
    //   description: "Learn the basics of JavaScript",
    //   category: "Programming",
    //   difficulty: "Beginner",
    //   instructorId: user._id,
    // });
    // console.log("Course created:", course);

    // // Create course contents
    // const content = await Contents.create({
    //   courseId: course._id,
    //   path: "/path/to/video.mp4",
    //   type: 1, // Assume 1 = video
    // });
    // console.log("Content created:", content);

    // // Enroll a student
    // const enrollment = await Enrollments.create({
    //   studentId: user._id, // Use the same user for simplicity
    //   courseId: course._id,
    //   progress: 0,
    // });
    // console.log("Enrollment created:", enrollment);

    // Create a quiz
  const quiz = await Quiz.create({
    courseId: '6772aea52ef9db90a73a0914',
    title: "JavaScript Basics Quiz",
    questions: [
      {
        questionId: "133",   
        questionText: "What is python?", 
        correctAnswer: "A", 
      },
      {
        questionId: "313",
        questionText: "What is khartoum?",
        correctAnswer: "B", 
      },
      {
        questionId: "133",
        questionText: "What is my name?",
        correctAnswer: "B",
      }
    ]
  });

console.log("Quiz created:", quiz);

    // // Progress of a student
    // const prog = await progress.create({
    //   studentId: user._id,
    //   courseId: course._id,
    //   totalQuizes: 10,
    //   completedQuizes: 0,
    //   progress: 0,
    // });
    // console.log('Progress created:', prog);

    // Grade a student
    // const grade = await Grade.create({
    //   studentId: user._id,
    //   courseId: course._id,
    //   quizId: quiz._id,
    //   score: 90,
    // });
    // console.log("Grade created:", grade);

    // Fetch and populate course
    const fetchedCourse = await Course.findById(course._id).populate("instructorId");
    console.log("Fetched Course with instructor:", fetchedCourse);

    // Fetch and populate enrollment
    const fetchedEnrollment = await Enrollments.findOne({ courseId: course._id }).populate(
      "studentId"
    );
    console.log("Fetched Enrollment with student:", fetchedEnrollment);
  } catch (error) {
    console.error("Test error:", error);
  } finally {
    mongoose.disconnect();
  }
}

testSchemas();
