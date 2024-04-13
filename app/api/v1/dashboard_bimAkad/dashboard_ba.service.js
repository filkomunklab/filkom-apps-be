const { guidanceClass } = require("../../../database");
const dashboardRepository = require("./dashboard_ba.repository");
//======================Dosen Pembimbing Statistic===================//

//Total All Dosen Student Guidance (total Active & Inactive)
const viewStudentGuidanceTotal = async () => {
  try {
    let statistic = await dashboardRepository.findAllStudentGuidanceTotal();

    statistic = statistic.map((teacher) => {
      const studentCount = teacher.GuidanceClass.reduce(
        (total, guidanceClass) =>
          total + guidanceClass.GuidanceClassMember.length,
        0
      );

      return {
        teacher: teacher,
        studentCount: studentCount,
      };
    });

    statistic = statistic.map((teacherData) => {
      const { teacher, studentCount } = teacherData;
      const formattedTeacher = {
        firstName: teacher.firstName,
        lastName: teacher.lastName,
        nik: teacher.nik,
      };

      return {
        teacher: formattedTeacher,
        studentCount: studentCount,
      };
    });

    statistic = statistic.filter((teacherData) => {
      return teacherData.studentCount !== 0;
    });

    return statistic;
  } catch (error) {
    throw error;
  }
};

//total Active Student Guidance
const viewActiveStudentGuidanceTotal = async () => {
  try {
    let statistic =
      await dashboardRepository.findAllActiveStudentGuidanceTotal();

    statistic = statistic.map((teacher) => {
      const studentCount = teacher.GuidanceClass.reduce(
        (total, guidanceClass) =>
          total + guidanceClass.GuidanceClassMember.length,
        0
      );

      return {
        teacher: teacher,
        studentCount: studentCount,
      };
    });

    statistic = statistic.map((teacherData) => {
      const { teacher, studentCount } = teacherData;
      const formattedTeacher = {
        firstName: teacher.firstName,
        lastName: teacher.lastName,
        nik: teacher.nik,
      };

      return {
        teacher: formattedTeacher,
        studentCount: studentCount,
      };
    });

    statistic = statistic.filter((teacherData) => {
      return teacherData.studentCount !== 0;
    });

    return statistic;
  } catch (error) {
    throw error;
  }
};

//total InActive Student Guidance
const viewInActiveStudentGuidanceTotal = async () => {
  try {
    let statistic =
      await dashboardRepository.findAllInActiveStudentGuidanceTotal();

    statistic = statistic.map((teacher) => {
      const studentCount = teacher.GuidanceClass.reduce(
        (total, guidanceClass) =>
          total + guidanceClass.GuidanceClassMember.length,
        0
      );

      return {
        teacher: teacher,
        studentCount: studentCount,
      };
    });

    statistic = statistic.map((teacherData) => {
      const { teacher, studentCount } = teacherData;
      const formattedTeacher = {
        firstName: teacher.firstName,
        lastName: teacher.lastName,
        nik: teacher.nik,
      };

      return {
        teacher: formattedTeacher,
        studentCount: studentCount,
      };
    });

    statistic = statistic.filter((teacherData) => {
      return teacherData.studentCount !== 0;
    });

    return statistic;
  } catch (error) {
    throw error;
  }
};

//========================Kaprodi Statistic==========================//

//total All Major Student
const viewAllMajorStudent = async () => {
  try {
    let result = await dashboardRepository.findAllMajorStudent();
    result = result.reduce((acc, item) => {
      const major = item.major;
      const count = item._count.major;

      // Check if the major is already in the accumulator
      const majorEntry = acc.find((entry) => entry.major === major);

      if (majorEntry) {
        // Increment the total count for the major
        majorEntry.count += count;
      } else {
        // Add a new entry for the major
        acc.push({ major, count });
      }

      return acc;
    }, []);
    return result;
  } catch (error) {
    throw error;
  }
};

// Total All Active Major Student
const viewTotalOfActiveMajorStudent = async () => {
  try {
    let result = await dashboardRepository.findTotalActiveMajorStudent();
    result = result.reduce((acc, item) => {
      const major = item.major;
      const count = item._count.major;

      // Check if the major is already in the accumulator
      const majorEntry = acc.find((entry) => entry.major === major);

      if (majorEntry) {
        // Increment the total count for the major
        majorEntry.count += count;
      } else {
        // Add a new entry for the major
        acc.push({ major, count });
      }

      return acc;
    }, []);
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

//total All Inactive Major Student
const viewTotalOfInActiveMajorStudent = async () => {
  try {
    let result = await dashboardRepository.findTotalInActiveMajorStudent();
    result = result.reduce((acc, item) => {
      const major = item.major;
      const count = item._count.major;

      // Check if the major is already in the accumulator
      const majorEntry = acc.find((entry) => entry.major === major);

      if (majorEntry) {
        // Increment the total count for the major
        majorEntry.count += count;
      } else {
        // Add a new entry for the major
        acc.push({ major, count });
      }

      return acc;
    }, []);
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

//==================================General==========================//

//Total All major student, Diagram data (Active & InActive Only)
const viewTotalOfMajorStudent = async () => {
  try {
    let result = await dashboardRepository.findTotalOfMajorStudent();
    result = result.reduce((acc, item) => {
      const year = item.arrivalYear;
      const major = item.major;
      const count = item._count.major;

      // Check if the year is already in the accumulator
      const yearEntry = acc.find((entry) => entry.year === year);

      if (yearEntry) {
        // Check if the major is already in the year entry
        if (yearEntry[major]) {
          // Increment the total count for the major
          yearEntry[major] += count;
        } else {
          // Add a new property for the major
          yearEntry[major] = count;
        }
      } else {
        // Add a new entry for the year and major
        acc.push({ year, [major]: count });
      }

      return acc;
    }, []);
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

//Total of all category Certificate Student (Approved)
const viewTotalCategoryCertificate = async () => {
  try {
    let result = await dashboardRepository.findTotalAllCategoryCertificate();
    result = result.reduce((acc, item) => {
      const level = item.level;
      const count = item._count.level;

      // Check if the major is already in the accumulator
      const levelEntry = acc.find((entry) => entry.level === level);

      if (levelEntry) {
        // Increment the total count for the major
        levelEntry.count += count;
      } else {
        // Add a new entry for the major
        acc.push({ level, count });
      }

      return acc;
    }, []);
    return result;
  } catch (error) {
    throw error;
  }
};

//==========================Dekan Statistic==========================//

//Total All Active & InActive Faculty Student
const viewTotalAllFacultyStudent = async () => {
  try {
    let result = await dashboardRepository.totalAllStudentFaculty();
    result = result.reduce((acc, item) => {
      const faculty = item.faculty;
      const count = item._count.faculty;

      // Check if the major is already in the accumulator
      const facultyEntry = acc.find((entry) => entry.faculty === faculty);

      if (facultyEntry) {
        // Increment the total count for the major
        categoryEntry.count += count;
      } else {
        // Add a new entry for the major
        acc.push({ faculty, count });
      }

      return acc;
    }, []);
    return result;
  } catch (error) {}
};

//Total Active Faculty Student
const viewTotalAllActiveFacultyStudent = async () => {
  try {
    let result = await dashboardRepository.totalAllActiveStudentFaculty();
    result = result.reduce((acc, item) => {
      const faculty = item.faculty;
      const count = item._count.faculty;

      // Check if the major is already in the accumulator
      const facultyEntry = acc.find((entry) => entry.faculty === faculty);

      if (facultyEntry) {
        // Increment the total count for the major
        categoryEntry.count += count;
      } else {
        // Add a new entry for the major
        acc.push({ faculty, count });
      }

      return acc;
    }, []);
    return result;
  } catch (error) {
    throw error;
  }
};

//Total InActive Faculty Student
const viewTotalAllInActiveFacultyStudent = async () => {
  try {
    let result = await dashboardRepository.totalAllInActiveStudentFaculty();
    result = result.reduce((acc, item) => {
      const faculty = item.faculty;
      const count = item._count.faculty;

      // Check if the major is already in the accumulator
      const facultyEntry = acc.find((entry) => entry.faculty === faculty);

      if (facultyEntry) {
        // Increment the total count for the major
        categoryEntry.count += count;
      } else {
        // Add a new entry for the major
        acc.push({ faculty, count });
      }

      return acc;
    }, []);
    return result;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  //Dospem
  viewStudentGuidanceTotal,
  viewActiveStudentGuidanceTotal,
  viewInActiveStudentGuidanceTotal,
  //Major
  viewAllMajorStudent,
  viewTotalOfActiveMajorStudent,
  viewTotalOfInActiveMajorStudent,
  //General
  viewTotalOfMajorStudent,
  viewTotalCategoryCertificate,
  //Dekan
  viewTotalAllFacultyStudent,
  viewTotalAllActiveFacultyStudent,
  viewTotalAllInActiveFacultyStudent,
};
