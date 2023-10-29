const alumniRepository = require("./alumni.repository");
const nodemailer = require("nodemailer");
const { Client, LocalAuth } = require("whatsapp-web.js");
const qrCode = require("qrcode-terminal");
const fs = require("fs");

//broadcast WA
const client = new Client({
  authStrategy: new LocalAuth(),
});

client.on("qr", (qr) => {
  qrCode.generate(qr, { small: true });
});

client.on("ready", () => {
  console.log("WhatsApp Client Is Ready");
});

client.initialize();

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
    html: `Kepada Jerico Katong,
    
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

//send whatsapp
// const sendBroadcastWA = async () => {
//   const phoneNumbers = await alumniRepository.getPhoneNo();

//   try {
//     client.sendMessage(phoneNumbers, message);
//     console.log(`Message sent to ${phoneNumbers}`);
//   } catch (error) {
//     console.error(`Error sending message to ${phoneNumbers}: ${error}`);
//   }

//   client.on("qr", (qrCode) => {
//     console.log("Scan the QR code: ");
//     console.log(qrCode);
//   });

//   client.on("ready", async () => {
//     console.log("Client is ready");

//     for (const phoneNumber of phoneNumbers) {
//       await sendBroadcastWA(phoneNumbers);
//     }

//     client.destroy();
//   });
//   client.initialize();
// };

// const sendBroadcastWA = async (phoneNo, pesan) => {
//   try {
//     if (phoneNo.startsWith("0")) {
//       phoneNo = "62" + phoneNo.slice(1) + "@c.us";
//     } else if (phoneNo.startsWith("62")) {
//       phoneNo = phoneNo + "@c.us";
//     } else {
//       phoneNo = "62" + phoneNo + "@c.us";
//     }

//     const user = await client.isRegisteredUser(phoneNo);
//     if (user) {
//       await client.sendMessage(phoneNo, pesan);
//       return { status: "success", pesan: "Pesan Terkirim!" };
//     } else {
//       return { status: "GAGAL", pesan: "nomor WA tidak terdaftar" };
//     }
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// };

const sendBroadcastWA = async (pesan) => {
  try {
    const phoneNumbers = await alumniRepository.phoneNumbers();

    const results = await Promise.all(
      phoneNumbers.map(async (phoneNo) => {
        // Proses pengiriman pesan ke setiap nomor telepon
        // Anda dapat menggunakan kode yang sebelumnya telah Anda buat
        // dalam loop ini.
        if (phoneNo.startsWith("0")) {
          phoneNo = "62" + phoneNo.slice(1) + "@c.us";
        } else if (phoneNo.startsWith("62")) {
          phoneNo = phoneNo + "@c.us";
        } else {
          phoneNo = "62" + phoneNo + "@c.us";
        }

        const user = await client.isRegisteredUser(phoneNo);
        if (user) {
          await client.sendMessage(phoneNo, pesan);
          return { status: "success", pesan: `Pesan Terkirim ke ${phoneNo} !` };
        } else {
          return {
            status: "GAGAL",
            pesan: `nomor ${phoneNo} tidak terdaftar di WhatsApp`,
          };
        }
      })
    );

    return results;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = {
  getAlumniList,
  filterAlumni,
  alumniTS,
  sendEmail,
  sendBroadcastWA,
};
