exports.createCourse = async (req, res) => {
  try {
    const { title, description, duration } = req.body;

    // You can perform additional validation or checks here

    // For example, check if the user is allowed to create courses
    const instructorId = req.user.id; // The authenticated instructor

    // Here, you'd typically save the course to the database
    const newCourse = {
      instructorId,
      title,
      description,
      duration,
    };

    // Simulate saving to the database
    console.log('Course Created:', newCourse);

    return res.status(201).json({
      success: true,
      message: 'Course created successfully!',
      course: newCourse,  // Return the created course details
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Error creating course.', error: error.message });
  }
};
