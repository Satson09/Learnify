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

// Sidebar Toggle Logic
document.getElementById("menuToggle").addEventListener("click", () => {
  const sidebar = document.querySelector(".sidebar");
  const content = document.querySelector(".content");

  // Toggle sidebar visibility
  sidebar.classList.toggle("hidden");
  content.classList.toggle("sidebar-hidden");
});


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

      if (!response.ok) {
        // Log the error response for debugging
        const errorData = await response.json();
        console.error('Sign Up Error:', errorData);
        throw new Error(errorData.message || 'Sign Up Failed');
      }

      const data = await response.json();
      alert('Sign Up Successful! Please Login.');
      showLogin();
    } catch (error) {
      console.error('Error during Sign Up:', error);
      alert(error.message || 'Sign Up Failed');
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
    const duration = document.getElementById('courseDuration').value;
    const files = document.getElementById('courseFiles').files; // File input for course files
    const website = document.getElementById('courseWebsite')?.value || null; // External course URL

    if (!title || !description || !duration) {
      alert('Please fill in all required fields.');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('duration', duration);
    formData.append('website', website);

    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i]);
    }

    try {
      const response = await fetch(`${baseUrl}/api/instructor/course`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text(); // Capture detailed error response
        console.error('Error response:', errorText);
        throw new Error('Failed to create course. Please check your input or try again later.');
      }

      const data = await response.json();
      if (data.success) {
        alert('Course created successfully!');
        location.reload();
      } else {
        alert(data.message || 'Failed to create course.');
      }
    } catch (error) {
      console.error('Error during course creation:', error);
      alert(error.message || 'An unexpected error occurred.');
    }
  });

  //fetch instructor course
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
              <ul>
                ${course.files
                  .map(
                    (file) =>
                      `<li>
                        ${
                          file.type === 'application/pdf'
                            ? `<a href="${file.url}" target="_blank">${file.name}</a>`
                            : `<video controls width="300"><source src="${file.url}" type="${file.type}">Your browser does not support the video tag.</video>`
                        }
                      </li>`
                  )
                  .join('')}
              </ul>
              ${
                course.website
                  ? `<p><a href="${course.website}" target="_blank">Visit Course Website</a></p>`
                  : ''
              }
              <button onclick="deleteCourse('${course._id}')">Delete</button>
              <button onclick="updateCourse('${course._id}')">Update</button>
              <button onclick="viewEnrolledStudents('${course._id}')">View Enrolled Students</button>
            </div>`
        )
        .join('');
    })
    .catch((error) => console.error('Error fetching courses:', error));
}


// Enroll in a course (Student)
async function enrollCourse(courseId) {
  try {
    const response = await fetch(`${baseUrl}/api/student/enroll`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ courseId }),
    });

    const data = await response.json();
    if (data.success) {
      alert('Successfully enrolled in course!');
      location.reload();
    } else {
      alert(data.message || 'Failed to enroll.');
    }
  } catch (error) {
    console.error('Error during course enrollment:', error);
  }
}

// Fetch available courses
if (document.getElementById('availableCourses')) {
  fetch(`${baseUrl}/api/student/courses`, {
    headers: { Authorization: `Bearer ${token}` },
  })
    .then((response) => response.json())
    .then((data) => {
      const availableCourses = document.getElementById('availableCourses');
      availableCourses.innerHTML = data.courses
        .map(
          (course) =>
            `<div>
              <h3>${course.title}</h3>
              <p>${course.description}</p>
              <button onclick="enrollCourse('${course._id}')">Enroll</button>
            </div>`
        )
        .join('');
    })
    .catch((error) => console.error('Error fetching available courses:', error));
}

// Fetch and display enrolled courses for students
if (document.getElementById('enrolledCourses')) {
  fetch(`${baseUrl}/api/student/enrolled-courses`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        const enrolledCourses = document.getElementById('enrolledCourses');
        if (data.courses.length === 0) {
          enrolledCourses.innerHTML = '<p>No enrolled courses yet. Enroll in a course to view it here.</p>';
        } else {
          enrolledCourses.innerHTML = data.courses
            .map(
              (course) =>
                `<div class="course-card">
                  <h3>${course.title}</h3>
                  <p>${course.description}</p>
                  ${
                    course.website
                      ? `<p><a href="${course.website}" target="_blank">Visit Course Website</a></p>`
                      : ''
                  }
                  <ul>
                    ${course.files
                      .map(
                        (file) =>
                          `<li>
                            ${
                              file.type === 'application/pdf'
                                ? `<a href="${file.url}" target="_blank">${file.name}</a>`
                                : `<video controls width="300"><source src="${file.url}" type="${file.type}">Your browser does not support the video tag.</video>`
                            }
                          </li>`
                      )
                      .join('')}
                  </ul>
                </div>`
            )
            .join('');
        }
      } else {
        console.error('Failed to fetch enrolled courses:', data.message);
      }
    })
    .catch((error) => console.error('Error fetching enrolled courses:', error));
}

// View enrolled students (Instructor)
async function viewEnrolledStudents(courseId) {
  try {
    const response = await fetch(`${baseUrl}/api/instructor/course/${courseId}/students`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    if (data.success) {
      const studentList = data.students
        .map((student) => `<li>${student.name} (${student.email})</li>`)
        .join('');
      alert(`Enrolled Students:\n${data.students.map((s) => `${s.name} (${s.email})`).join('\n')}`)
      // Optionally, display the list on the page
    } else {
      alert(data.message || 'Failed to fetch enrolled students.');
    }
  } catch (error) {
    console.error('Error fetching enrolled students:', error);
    alert("An error occurred. Please try again.");
  }
}

// Function to close the modal
function closeModal() {
  const modal = document.getElementById('enrolledStudentsModal');
  modal.style.display = 'none';
}


// Update a course (Instructor)
async function updateCourse(courseId) {
  const title = prompt('Enter new title:');
  const description = prompt('Enter new description:');
  const duration = prompt('Enter new duration (in hours):');

  if (!title || !description || !duration) return alert('All fields are required!');

  try {
    const response = await fetch(`${baseUrl}/api/instructor/course`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ courseId, title, description, duration }),
    });

    const data = await response.json();
    if (data.success) {
      alert('Course updated successfully!');
      location.reload();
    } else {
      alert(data.message || 'Failed to update course.');
    }
  } catch (error) {
    console.error('Error during course update:', error);
  }
}

// Delete a course (Instructor)
async function deleteCourse(courseId) {
  if (!confirm('Are you sure you want to delete this course?')) return;

  try {
    const response = await fetch(`${baseUrl}/api/instructor/course/${courseId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await response.json();
    if (data.success) {
      alert('Course deleted successfully!');
      location.reload();
    } else {
      alert(data.message || 'Failed to delete course.');
    }
  } catch (error) {
    console.error('Error during course deletion:', error);
  }
}

