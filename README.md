# _Coursera Clone_

##
Zenasni Imane: [Backend]

Okeke Tobenna: [Frontend Development]

Ahmed Hisham [Backend]

Satson Johnson: [Backend]

## _Overview_

This project is a clone of the **Coursera** platform, designed to replicate the user interface and core features of the website. The project focuses on building an interactive and visually course platform similar to Coursera.

##
Table of Contents

Features

Database Schema

Wireframes

Technical Stack

API Endpoints

UI Mockups

Setup Instructions

User Interaction Flow

Contributors

### _Features:_
- Homepage with a layout showcasing featured courses
- Navigation bar with links to different course categories and profile settings
- Course listing page with filters and sorting options
- Course details page with description, instructor info, and user reviews
- Interactive user interface with buttons, modals, and dropdowns
- Fully responsive design that works across desktops, tablets, and mobile devices

---

## _Technologies Used_

- ***HTML5***: Structure of the web pages.
- ***CSS3***: Styling of the pages using Flexbox, Grid, transitions, and animations.
- ***JavaScript***: Basic interactivity such as modals, sliders, and form validations (optional).
- ***Font Awesome***: Icons for social sharing and navigation.

---
Features

Students:

Sign up/login.

Browse courses by category, difficulty, or instructor.

Enroll in courses and track progress.

Access enrolled courses anytime.

Instructors:

Sign up/login.

Create, update, or delete courses.

View enrolled students.

##
Database Schema

1. Users Table

Field

Type

Description

id

INT (PK)

Unique user ID.

name

VARCHAR(100)

Full name of the user.

email

VARCHAR(100)

Email address.

password

VARCHAR(255)

Hashed password.

role

ENUM

Role ("Student"/"Instructor").

2. Courses Table

Field

Type

Description

id

INT (PK)

Unique course ID.

title

VARCHAR(255)

Course title.

description

TEXT

Course description.

syllabus

TEXT

Course syllabus.

difficulty

ENUM

Difficulty level (e.g., Beginner/Intermediate/Advanced).

instructor_id

INT (FK)

ID of the instructor who created the course.

3. Enrollments Table

Field

Type

Description

id

INT (PK)

Unique enrollment ID.

student_id

INT (FK)

ID of the student.

course_id

INT (FK)

ID of the course.

progress

INT

Percentage of course completed.

Wireframes

1. Landing Page

Options: Sign Up or Login.

Components: Welcome message, call-to-action buttons.

2. Student Dashboard

Components: Course browsing area, enrolled courses list.

3. Instructor Dashboard

Components: Create new course, manage existing courses, view enrollments.

4. Course Details Page

Components: Course title, description, syllabus, instructor name, enrollment button (for students).

##
Technical Stack

Frontend:

HTML/CSS: Structure and styling.

JavaScript: Interactivity.

React: Frontend framework for dynamic UI components.

Backend:

Node.js/Express: Server-side logic.

JWT: User authentication.

Database:

MySQL: Relational database for storing users, courses, and enrollments.

API Endpoints


##
1. Authentication

POST /api/signup:

Payload: { "name": "John Doe", "email": "john@example.com", "password": "password123", "role": "Student" }

Response: { "message": "Account created!" }

POST /api/login:

Payload: { "email": "john@example.com", "password": "password123" }

Response: { "token": "JWT_TOKEN" }

##
2. Course Management

GET /api/courses:

Description: Fetch all courses.

POST /api/courses (Instructor Only):

Payload: { "title": "Course Title", "description": "Description", "syllabus": "Syllabus", "difficulty": "Beginner" }

Response: { "message": "Course created!" }

##
3. Enrollments

POST /api/enroll:

Payload: { "student_id": 1, "course_id": 2 }

Response: { "message": "Enrollment successful!" }

GET /api/progress/{student_id}:

Description: Fetch progress for the student.

##
UI Mockups

Landing Page: Welcome message with "Sign Up" and "Login" buttons.

Student Dashboard: List of courses with filter/search functionality.

Instructor Dashboard: Manage courses and view enrolled students.

Course Details Page: Display course information and enrollment button.

Setup Instructions

##
Prerequisites:

Install Node.js.

Install MySQL and set up a database instance.

Install a package manager like npm or yarn.

Steps:

Clone the repository:

git clone <repository-url>
cd course-management-system


##
Install dependencies:

npm install

Configure environment variables:


##
Create a .env file in the root directory.

Add the following:

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=password
DB_NAME=course_management
JWT_SECRET=your_secret_key


##
Run database migrations:

npm run migrate

##
Start the development server:

npm start

##
Access the application:

Open a browser and navigate to http://localhost:3000.


##
User Interaction Flow

##
Sign Up:

User registers with name, email, password, and role.

##
Login:

User logs in using email and password.

##
Dashboard:

Students: Browse and enroll in courses.

Instructors: Create and manage courses.

Course Progress:

Students can track progress and view enrolled courses.

Logout:

End session and log out.


## _Installation_

1. Clone this repository to your local machine:
    ```bash
    git clone https://github.com/yourusername/coursera-clone.git
    ```

2. Navigate to the project folder:
    ```bash
    cd coursera-clone
    ```

3. Open the `index.html` file in your browser to view the project.

---

## _Screenshots_

![Homepage Screenshot](assets/homepage.png)  
*Homepage displaying featured courses and navigation options.*

![Course Details Page](assets/course-details.png)  
*Course details page showing course description, reviews, and instructor information.*

---

## _Contact_

For any questions or suggestions, feel free to reach out
