# Learnify

Welcome to **Learnify**, an online learning platform inspired by ALX. This platform enables instructors to create and manage courses while providing students with the ability to enroll, learn, and grow. Built using Node.js, MongoDB, and Express for the backend and HTML/CSS/JavaScript for the frontend, Learnify delivers an intuitive and efficient experience for all users.

---

## **Table of Contents**

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Setup and Installation](#setup-and-installation)
- [Usage Guide](#usage-guide)
  - [Instructor Workflow](#instructor-workflow)
  - [Student Workflow](#student-workflow)
- [Contributors](#contributors)
- [Future Enhancements](#future-enhancements)
- [License](#license)

---

## **Features**

- **Instructor Features**:
  - Create, update, and delete courses.
  - Upload course-related files (PDFs, videos, images).
  - View enrolled students for each course.

- **Student Features**:
  - View available courses and enroll.
  - Access course files and materials.
  - Track enrolled courses.

- **General Features**:
  - Secure authentication for instructors and students using JWT.
  - Responsive design for seamless use across devices.
  - Well-organized RESTful API.

---

## **Technologies Used**

- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Frontend**: HTML5, CSS3, JavaScript
- **Authentication**: JSON Web Tokens (JWT)
- **File Uploads**: Multer
- **Styling**: Responsive CSS for modern and clean design
- **Deployment**: (Specify deployment details if applicable)

---

## **Project Structure**

Learnify/ ├── frontend/ │ ├── index.html │ ├── student.html │ ├── instructor.html │ ├── styles.css │ ├── script.js │ └── logo/ │ └── learnify-logo.jpeg ├── routes/ │ ├── api/ │ ├── instructor.js │ └── student.js ├── controllers/ │ ├── instructorController.js │ └── studentController.js ├── middlewares/ │ ├── auth.js │ ├── roleMiddleware.js │ └── upload.js ├── db/ │ └── index.js ├── app.js ├── README.md └── package.json

yaml
Copy
Edit

---

## **Setup and Installation**

Follow these steps to set up Learnify on your local machine:

### Prerequisites

1. Ensure you have **Node.js** (v14+) and **MongoDB** installed.
2. Install a package manager like **npm** or **yarn**.

### Installation Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/learnify.git
   cd learnify
Install dependencies:

bash
Copy
Edit
npm install
Set up the database:

Ensure MongoDB is running.
Create a database named Learnify or update the connection string in /db/index.js if needed.
Configure environment variables:

Create a .env file in the root directory:
env
Copy
Edit
JWT_SECRET=your_secret_key
MONGO_URI=mongodb://localhost:27017/Learnify
Start the server:

bash
Copy
Edit
node app.js
Open your browser and navigate to:

arduino
Copy
Edit
http://localhost:3000
Usage Guide
Instructor Workflow
Sign Up:

Navigate to the Learnify homepage and select "Join as Instructor."
Create an account using your email and password.
Log In:

Log in to your instructor dashboard.
Create a Course:

Click on "Create a New Course."
Provide the course title, description, duration, and optional file uploads.
View Enrolled Students:

Select a course to view the list of enrolled students.
Update or Delete Courses:

Use the dashboard options to update course details or delete a course.
Student Workflow
Sign Up:

Navigate to the Learnify homepage and select "Join as Student."
Create an account using your email and password.
Log In:

Log in to your student dashboard.
Enroll in a Course:

Browse the list of available courses.
Click "Enroll" to join a course.
Access Course Materials:

View the course materials and download any files provided by the instructor.

Contributors: 

Satson Johnson : [Backend]
Email: satsunjohnson@gmail.com

Tobenna Okeke : [Frontend]
Email: tobeoke@gmail.com

 ## Poject video link : 
 - https://youtu.be/Lq1vUQbiN14?si=2MM2YXxZ-wvmhFJO

## Future Enhancements :
Implement course ratings and reviews.
Add progress tracking and certificates for students.
Integrate a payment gateway for paid courses.
Provide analytics for instructors on course performance.
License
This project is licensed under the MIT License. See the LICENSE file for details.

Feel free to contribute, raise issues, or suggest enhancements. Let's make Learnify the go-to platform for learning and teaching!

markdown
Copy
Edit

---

### **Key Features of the README**
1. **Professional and Structured**: Easy to navigate with a clear table of contents.
2. **Step-by-Step Guide**: Covers everything from setup to execution for both instructors and students.
3. **Contributor Credits**: Gives proper attribution to contributors.
4. **Scalability**: Outlines future enhancements for project growth.

Let me know if you need any changes or additional details!







