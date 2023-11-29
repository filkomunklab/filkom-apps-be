const alumniRepository = require("./alumni.repository");
const nodemailer = require("nodemailer");
const { Client, LocalAuth } = require("whatsapp-web.js");
const qrCode = require("qrcode-terminal");
const fs = require("fs");

//broadcast WA
// const client = new Client({
//   authStrategy: new LocalAuth(),
// });

// client.on("qr", (qr) => {
//   qrCode.generate(qr, { small: true });
// });

// client.on("ready", () => {
//   console.log("WhatsApp Client Is Ready");
// });

// client.initialize();

//daftar alumni
const getAlumniList = async () => {
  return alumniRepository.getAlumniList();
};

//opertor get alumni
const alumniTS = async (search_query) => {
  return alumniRepository.alumniTS(search_query);
};

//fillter by
const filterAlumni = async (filter) => {
  return await alumniRepository.filterAlumni(filter);
};

//send email
const sendEmail = async (recipientEmails) => {
  // const alumniList = await alumniRepository.getAlumniList();
  const personalEmails = recipientEmails;
  // const personalEmails = [
  //   "deilpremium883@gmail.com",
  //   "s2200049@student.unklab.ac.id",
  // ];
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "angeltriany@gmail.com",
      pass: " jaobmqibvozkuohm",
    },
  });

  const mailOptions = {
    from: "TIM TRACER STUDY UNKLAB", // sender address
    to: personalEmails.join(", "),
    subject: "Pengisian Tracer Study Alumni Angkatan 89", // Subject line
    html: `Halo Alumnus UNKLAB!.
    Perkenalkan, Kami dari Surveyor Universitas Klabat (UNKLAB), ingin mengirimkan kuesioner untuk pelaksanaan Tracer Study Tahun 2023, dalam hal pemeringkatan kampus kami.
    Jika berkenan dan kalau ada waktu kosong, kiranya dapat membantu kami untuk mengisi kuesioner yang akan kami kirimkan, paling lambat sebelum tanggal 14 September 2023. 
    
    Untuk pengisian kuesioner dapat mengakses link website Unklab dibawah ini:
    https://www.unklab.ac.id/tracer-study/
    
    Salam hangat,😊🙏
    Tim Tracer Study
    Alumni Universitas Klabat
    Tahun 2023`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Broadcast email sent:", info.response);
  } catch (error) {
    console.error("Error sending broadcast email: ", error);
    throw error;
  }
};

const sendBroadcastWA = async (pesan, phoneNums) => {
  try {
    // const phoneNumbers = await alumniRepository.phoneNumbers();
    // UNCOMENT THIS TO USE WA BROADCAST
    // console.log(phoneNums)
    // const phoneNoTest = ["+6289612288774"];
    // const results = await Promise.all(
    //   phoneNums.map(async (phoneNo) => {
    //     if (phoneNo.startsWith("+62")) {
    //       phoneNo = "62" + phoneNo.slice(3) + "@c.us";
    //     } else if (phoneNo.startsWith("0")) {
    //       phoneNo = "62" + phoneNo.slice(1) + "@c.us";
    //     } else if (phoneNo.startsWith("62")) {
    //       phoneNo = phoneNo + "@c.us";
    //     } else {
    //       phoneNo = "62" + phoneNo + "@c.us";
    //     }
    //     const user = await client.isRegisteredUser(phoneNo);
    //     if (user) {
    //       await client.sendMessage(phoneNo, pesan);
    //       return {
    //         status: "success",
    //         pesan: `Pesan Terkirim ke ${phoneNo} !`,
    //       };
    //     } else {
    //       return {
    //         status: "GAGAL",
    //         pesan: `nomor ${phoneNo} tidak terdaftar di WhatsApp`,
    //       };
    //     }
    //   })
    // );
    // return results;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getAlumniHasTracerStudyByOperator = async (
  search_query,
  page,
  limit,
  filterBy,
  filterValue
) => {
  const offset = limit * page;

  if (filterBy === "none") {
    const totalRows =
      await alumniRepository.countTotalRowsAlumniHasTracerStudyBySearch(
        search_query
      );
    const totalPage = Math.ceil(totalRows / limit);

    const alumni =
      await alumniRepository.findAlumniHasTracerStudyListPagination(
        search_query,
        page,
        limit,
        offset
      );

    return { alumni, totalRows, totalPage };
  } else if (filterBy === "graduate_year") {
    const totalRows =
      await alumniRepository.countTotalRowsAlumniHasTracerStudyBySearchWithFilterByGraduateYear(
        search_query,
        filterValue
      );
    const totalPage = Math.ceil(totalRows / limit);

    const alumni =
      await alumniRepository.findAlumniHasTracerStudyListPaginationFilterByGraduateYear(
        search_query,
        page,
        limit,
        offset,
        filterValue
      );
    console.log("hai");

    return { alumni, totalRows, totalPage };
  } else if (filterBy === "major") {
    const totalRows =
      await alumniRepository.countTotalRowsAlumniHasTracerStudyBySearchWithFilterByMajor(
        search_query,
        filterValue
      );
    const totalPage = Math.ceil(totalRows / limit);

    const alumni =
      await alumniRepository.findAlumniHasTracerStudyListPaginationFilterByMajor(
        search_query,
        page,
        limit,
        offset,
        filterValue
      );
    return { alumni, totalRows, totalPage };
  }
};

const getAllAlumni = async (
  search_query
  // page,
  // limit,
  // filterBy,
  // filterValue
) => {
  // const offset = limit * page;

  // if (filterBy === "none") {
  // const totalRows = await alumniRepository.countTotalRowsAlumniBySearch(
  //   search_query
  // );
  // const totalPage = Math.ceil(totalRows / limit);
  const alumni = await alumniRepository.findAlumniListPagination(
    search_query
    // page,
    // limit,
    // offset
  );

  // return { alumni, totalRows, totalPage };
  return { alumni };
  // } else if (filterBy === "graduate_year") {
  //   const totalRows =
  //     await alumniRepository.countTotalRowsAlumniBySearchWithFilterByGraduateYear(
  //       search_query,
  //       filterValue
  //     );
  //   const totalPage = Math.ceil(totalRows / limit);
  //   const alumni =
  //     await alumniRepository.findAlumniListPaginationFilterByGraduateYear(
  //       search_query,
  //       page,
  //       limit,
  //       offset,
  //       filterValue
  //     );

  //   return { alumni, totalRows, totalPage };
  // } else if (filterBy === "major") {
  //   const totalRows =
  //     await alumniRepository.countTotalRowsAlumniBySearchWithFilterByMajor(
  //       search_query,
  //       filterValue
  //     );
  //   const totalPage = Math.ceil(totalRows / limit);
  //   const alumni = await alumniRepository.findAlumniListPaginationFilterByMajor(
  //     search_query,
  //     page,
  //     limit,
  //     offset,
  //     filterValue
  //   );

  //   return { alumni, totalRows, totalPage };
  // }
};

module.exports = {
  getAlumniList,
  filterAlumni,
  alumniTS,
  sendEmail,
  sendBroadcastWA,
  getAlumniHasTracerStudyByOperator,
  getAllAlumni,
};
