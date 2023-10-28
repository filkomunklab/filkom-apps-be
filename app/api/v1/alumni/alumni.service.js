const alumniRepository = require("./alumni.repository");
const nodemailer = require("nodemailer");

//daftar alumni
const getAlumniList = async () => {
  return alumniRepository.getAlumniList();
};

//opertor get alumni
const alumniTS = async () => {
  return alumniRepository.alumniTS();
};

//fillter by
const filterAlumni = async (filter) => {
  return await alumniRepository.filterAlumni(filter);
};

//send email
const sendEmail = async () => {
  const alumniList = await alumniRepository.getAlumniList();

  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "angeltriany@gmail.com",
      pass: " jaobmqibvozkuohm",
    },
  });

  const mailOptions = {
    from: "<no-reply>", // sender address
    bcc: alumniList.map((student) => student.personalEmail).join(", "),
    subject: "Undangan Seminar Teknologi Terbaru #3", // Subject line
    html: `Kepada Darell Mona,
    
    Salam Hormat,
    
    Saya harap Anda dalam keadaan sehat dan sejahtera. Saya ingin mengundang Anda untuk menghadiri seminar teknologi terbaru yang akan diselenggarakan oleh Teknologi Maju, Inc. pada tanggal 15 November 2023 pukul 09:00 pagi di Hotel Teknologi Megah, Jalan Inovasi No. 123, Kota Inovasi.
    
    Seminar ini akan mencakup berbagai topik terkait teknologi terbaru, termasuk kecerdasan buatan, pemrosesan data besar, dan inovasi teknologi lainnya. Para pemimpin industri akan berbicara tentang tren terkini dan peluang di bidang teknologi.
    
    Agenda seminar:
    
    Pemrosesan Data Besar: Peluang dan Tantangan
    Kecerdasan Buatan dalam Bisnis Modern
    Masa Depan Teknologi: Prediksi dan Tren
    Studi Kasus: Inovasi dalam Perusahaan Teknologi Maju
    Peserta seminar akan mendapatkan wawasan berharga dan kesempatan untuk terlibat dalam diskusi yang bermanfaat. Kami sangat menghargai kontribusi dan pandangan Anda.
    
    Silakan konfirmasikan kehadiran Anda dengan membalas email ini. Jika Anda memiliki pertanyaan atau butuh informasi lebih lanjut, jangan ragu untuk menghubungi saya di michael.johnson@email.com atau +123-456-7890.
    
    Terima kasih atas perhatian Anda, dan kami berharap dapat bertemu dengan Anda di seminar tersebut.
    
    Salam Hormat,
    John Smith
    Direktur Pemasaran
    Teknologi Maju, Inc.
    +987-654-3210
    john.smith@email.com'`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Broadcast email sent:", info.response);
  } catch (error) {
    console.error("Error sending broadcast email: ", error);
    throw error;
  }
};

// =================================================================================== JERICO
const getAlumniHasTracerStudyByOperator = async (search_query, page, limit, filterBy, filterValue) => {
  const offset = limit * page;

  if (filterBy === "none") {
    const totalRows = await alumniRepository.countTotalRowsAlumniHasTracerStudyBySearch(search_query);
    const totalPage = Math.ceil(totalRows / limit);

    const alumni = await alumniRepository.findAlumniHasTracerStudyListPagination(search_query, page, limit, offset);

    return { alumni, totalRows, totalPage };
  } else if (filterBy === "graduate_year") {
    const totalRows = await alumniRepository.countTotalRowsAlumniHasTracerStudyBySearchWithFilterByGraduateYear(search_query, filterValue);
    const totalPage = Math.ceil(totalRows / limit);

    const alumni = await alumniRepository.findAlumniHasTracerStudyListPaginationFilterByGraduateYear(search_query, page, limit, offset, filterValue);
    console.log("hai");

    return { alumni, totalRows, totalPage };
  } else if (filterBy === "major") {
    const totalRows = await alumniRepository.countTotalRowsAlumniHasTracerStudyBySearchWithFilterByMajor(search_query, filterValue);
    const totalPage = Math.ceil(totalRows / limit);

    const alumni = await alumniRepository.findAlumniHasTracerStudyListPaginationFilterByMajor(search_query, page, limit, offset, filterValue);
    return { alumni, totalRows, totalPage };
  }
};

const getAllAlumni = async (search_query, page, limit, filterBy, filterValue) => {
  const offset = limit * page;

  if (filterBy === "none") {
    const totalRows = await alumniRepository.countTotalRowsAlumniBySearch(search_query);
    const totalPage = Math.ceil(totalRows / limit);
    const alumni = await alumniRepository.findAlumniListPagination(search_query, page, limit, offset);

    return { alumni, totalRows, totalPage };
  } else if (filterBy === "graduate_year") {
    const totalRows = await alumniRepository.countTotalRowsAlumniBySearchWithFilterByGraduateYear(search_query, filterValue);
    const totalPage = Math.ceil(totalRows / limit);
    const alumni = await alumniRepository.findAlumniListPaginationFilterByGraduateYear(search_query, page, limit, offset, filterValue);

    return { alumni, totalRows, totalPage };
  } else if (filterBy === "major") {
    const totalRows = await alumniRepository.countTotalRowsAlumniBySearchWithFilterByMajor(search_query, filterValue);
    const totalPage = Math.ceil(totalRows / limit);
    const alumni = await alumniRepository.findAlumniListPaginationFilterByMajor(search_query, page, limit, offset, filterValue);

    return { alumni, totalRows, totalPage };
  }
};

module.exports = {
  getAlumniList,
  filterAlumni,
  alumniTS,
  sendEmail,
  getAlumniHasTracerStudyByOperator,
  getAllAlumni,
};
