
const baseUrl = 'http://localhost:3000'; // Backend base URL
let selectedRole = ''; // Store selected role (Student/Instructor)

// Redirect to login if not authenticated and accessing a restricted page
const token = localStorage.getItem('token');
if (!token && !document.body.contains(document.getElementById('loginFormElement'))) {
  window.location.href = 'index.html';
}

// Logout functionality
const logoutButton = document.getElementById('logout');
if (logoutButton) {
  logoutButton.addEventListener('click', () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    alert('Logged out successfully!');
    window.location.href = 'index.html';
  });
}

// Handle Role Selection
if (document.getElementById('studentRole') || document.getElementById('instructorRole')) {
  document.getElementById('studentRole').addEventListener('click', () => {
    selectedRole = 'student';
    showSignUp();
  });

  document.getElementById('instructorRole').addEventListener('click', () => {
    selectedRole = 'instructor';
    showSignUp();
  });
}

// Toggle Between Forms
if (document.getElementById('goToLogin')) {
  document.getElementById('goToLogin').addEventListener('click', showLogin);
}
if (document.getElementById('goToSignUp')) {
  document.getElementById('goToSignUp').addEventListener('click', showSignUp);
}

// Show Sign Up Form
function showSignUp() {
  document.getElementById('roleSelection').classList.add('hidden');
  document.getElementById('signUpForm').classList.remove('hidden');
  document.getElementById('loginForm').classList.add('hidden');
}

// Show Login Form
function showLogin() {
  document.getElementById('roleSelection').classList.add('hidden');
  document.getElementById('signUpForm').classList.add('hidden');
  document.getElementById('loginForm').classList.remove('hidden');
}

// Handle Sign Up Form Submission
if (document.getElementById('signupForm')) {
  document.getElementById('signupForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;

    try {
      const response = await fetch(`${baseUrl}/api/user/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, role: selectedRole }),
      });

      const data = await response.json();
      if (data.success) {
        alert('Sign Up Successful! Please Login.');
        showLogin();
      } else {
        alert(data.error || 'Sign Up Failed');
      }
    } catch (error) {
      console.error('Error during Sign Up:', error);
    }
  });
}

// Handle Login Form Submission
if (document.getElementById('loginFormElement')) {
  document.getElementById('loginFormElement').addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    try {
      const response = await fetch(`${baseUrl}/api/user/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success && data.user) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('userId', data.user.id); // Save user ID
        alert('Login Successful!');

        // Redirect based on user role
        if (data.user.role === 'student') {
          window.location.href = 'student.html';
        } else if (data.user.role === 'instructor') {
          window.location.href = 'instructor.html';
        }
      } else {
        alert(data.message || 'Login Failed');
      }
    } catch (error) {
      console.error('Error during Login:', error);
    }
  });
}

// Instructor Dashboard Logic
if (document.body.contains(document.getElementById('createCourseForm'))) {
  document.getElementById('createCourseForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const title = document.getElementById('courseTitle').value;
    const description = document.getElementById('courseDescription').value;

    try {
      const response = await fetch(`${baseUrl}/api/instructor/course`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          description,
          duration: 10,
          instructorId: localStorage.getItem('userId'),
        }),
      });

      const data = await response.json();
      if (data.success) {
        alert('Course created successfully!');
        location.reload();
      } else {
        alert(data.message || 'Failed to create course.');
      }
    } catch (error) {
      console.error('Error during course creation:', error);
    }
  });

  fetch(`${baseUrl}/api/instructor/courses`, {
    headers: { Authorization: `Bearer ${token}` },
  })
    .then((response) => response.json())
    .then((data) => {
      const instructorCourses = document.getElementById('instructorCourses');
      instructorCourses.innerHTML = data.courses
        .map(
          (course) =>
            `<div>
              <h3>${course.title}</h3>
              <p>${course.description}</p>
              <button onclick="deleteCourse('${course._id}')">Delete</button>
            </div>`
        )
        .join('');
    })
    .catch((error) => console.error('Error fetching courses:', error));
}

// Delete a course (Instructor)
function deleteCourse(courseId) {
  fetch(`${baseUrl}/api/instructor/course/${courseId}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        alert('Course deleted successfully!');
        location.reload();
      } else {
        alert(data.message || 'Failed to delete course.');
      }
    })
    .catch((error) => console.error('Error during course deletion:', error));
}

// Fetch courses created by the instructor
if (document.getElementById('instructorCourses')) {
  fetch(`${baseUrl}/api/instructor/courses`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const instructorCourses = document.getElementById('instructorCourses');
      instructorCourses.innerHTML = data.courses
        .map(
          (course) => `
            <div>
              <h3>${course.title}</h3>
              <p>${course.description}</p>
              <button onclick="deleteCourse('${course._id}')">Delete</button>
              <button onclick="updateCourse('${course._id}')">Update</button>
            </div>
          `
        )
        .join('');
    })
    .catch((error) => console.error('Error fetching instructor courses:', error));
}

// Fetch available courses
if (document.getElementById('availableCourses')) {
  fetch(`${baseUrl}/api/student/courses`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const availableCourses = document.getElementById('availableCourses');
      availableCourses.innerHTML = data.courses
        .map(
          (course) => `
            <div>
              <h3>${course.title}</h3>
              <p>${course.description}</p>
              <button onclick="enrollCourse('${course._id}')">Enroll</button>
            </div>
          `
        )
        .join('');
    })
    .catch((error) => console.error('Error fetching available courses:', error));
}


