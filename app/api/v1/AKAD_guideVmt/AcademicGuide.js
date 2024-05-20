import React from "react";
import { Typography, Accordion, styled } from "@mui/material";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(26, 56, 96, 0.1)",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {},
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

const AcademicGuide = () => {
  return (
    <div>
      <Typography
        sx={{
          fontSize: "24px",
          fontWeight: 500,
          paddingBottom: "24px",
        }}
      >
        Academic Guide
      </Typography>
      <div sx={{ flex: 1 }}>
        <Accordion defaultExpanded>
          <AccordionSummary
            sx={{ paddingLeft: "24px" }}
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography sx={{ fontWeight: 500 }}>
              A. TERMINOLOGI DALAM PEMBIMBINGAN AKADEMIK
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography
              sx={{
                paddingLeft: "25px",
                paddingRight: "25px",
                textAlign: "justify",
                "@media (max-width: 390px)": {
                  fontSize: "12px",
                  paddingLeft: "5px",
                  paddingRight: "5px",
                },
              }}
            >
              <ol sx={{ listStylePosition: "inside" }}>
                <li>
                  Pembimbingan Akademik (PA) adalah suatu kegiatan bimbingan
                  atau konseling bagi mahasiswa selama menempuh pendidikan di
                  Program Studi Teknik Informatika, Fakultas Ilmu Komputer,
                  Universitas Klabat.
                </li>
                <li>
                  Dosen Pembimbing Akademik adalah Dosen di Program Studi Teknik
                  Informatika, Fakultas Ilmu Komputer, Universitas Klabat yang
                  melaksanakan fungsi Tri Dharma Perguruan Tinggi, bertugas
                  sebagai Pembimbing Akademik Mahasiswa yang ditunjuk dengan
                  Surat Keputusan Dekan dengan memperhatikan persyaratan yang
                  ditetapkan. Syarat untuk diangkat sebagai Dosen Pembimbing
                  Akademik adalah Dosen tetap dan aktif.
                </li>
                <li>
                  Mahasiswa adalah mahasiswa aktif yang terdaftar di Program
                  Studi Teknik Informatika, Fakultas Ilmu Komputer, Universitas
                  Klabat.
                </li>
                <li>
                  Sistem Kredit Semester (SKS) adalah sistem penyelenggaraan
                  pendidikan dimana beban studi mahasiswa, beban kerja tenaga
                  akademik dan lembaga penyelenggara pendidikan dinyatakan dalam
                  beban kredit.
                </li>
                <li>
                  Indeks Prestasi Kumulatif (IPK) adalah penghitungan indeks
                  prestasi dengan menghubungkan semua mata kuliah yang telah
                  ditempuh sampai semester tertentu.
                </li>
                <li>
                  Mata Kuliah prasyarat (Prerequisite) adalah mata kuliah yang
                  merupakan persyaratan untuk mata kuliah yang diprasyaratkan.
                </li>
              </ol>
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion defaultExpanded>
          <AccordionSummary
            sx={{ paddingLeft: "24px" }}
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography sx={{ fontWeight: 500 }}>
              B. KEWAJIBAN DOSEN PEMBIMBING AKADEMIK
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography
              sx={{
                paddingLeft: "25px",
                paddingRight: "25px",
                textAlign: "justify",
                "@media (max-width: 390px)": {
                  fontSize: "12px",
                  paddingLeft: "5px",
                  paddingRight: "5px",
                },
              }}
            >
              <ol sx={{ listStylePosition: "inside" }}>
                <li>
                  Menyelenggarakan pertemuan dengan mahasiswa sekurang-kurangnya
                  2 (dua) kali dalam setiap semester, dengan bukti daftar hadir
                  dan tanggal pertemuan.
                </li>
                <li>
                  Mensosialisasikan peraturan-peraturan yang berhubungan dengan
                  pembimbingan akademik dan proses belajar mengajar.
                </li>
                <li>
                  Memonitor kemajuan studi mahasiswa dengan mengikuti,
                  mengamati, dan mengarahkan perkembangan studi mahasiswa yang
                  dibimbingnya secara berkala.
                </li>
                <li>
                  Mengarahkan, membantu, dan memberikan pertimbangan kepada
                  mahasiswa untuk memilih mata kuliah yang akan diambil pada
                  semester tersebut berdasarkan hasil studi pada semester
                  sebelumnya.
                </li>
                <li>
                  Memberikan konsultasi kepada mahasiswa apabila mereka
                  mengalami kesulitan dalam menyelesaikan studinya.
                </li>
                <li>
                  Membantu mahasiswa mengembangkan sikap belajar yang tepat
                  dalam menjalankan kegiatan akademiknya serta memecahkan
                  masalah yang dihadapinya.
                </li>
                <li>
                  Menjelaskan tentang pengambilan jumlah SKS maksimal dari Mata
                  Kuliah yang diambil dan pengambilan Mata Kuliah yang
                  bersyarat.
                </li>
                <li>
                  Meneruskan permasalahan mahasiswa yang bukan wewenangnya
                  kepada pihak terkait yang memiliki wewenang untuk menangani
                  masalah tersebut.
                </li>
              </ol>
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion defaultExpanded>
          <AccordionSummary
            sx={{ paddingLeft: "24px" }}
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3a-content"
            id="panel3a-header"
          >
            <Typography sx={{ fontWeight: 500 }}>
              C. KEWAJIBAN MAHASISWA
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography
              sx={{
                paddingLeft: "25px",
                paddingRight: "25px",
                textAlign: "justify",
                "@media (max-width: 390px)": {
                  fontSize: "12px",
                  paddingLeft: "5px",
                  paddingRight: "5px",
                },
              }}
            >
              <ol sx={{ listStylePosition: "inside" }}>
                <li>
                  Selama menjalani studi, setiap mahasiswa di Program Studi
                  Teknik Informatika, Fakultas Ilmu Komputer, Universitas Klabat
                  dibimbing oleh seorang Dosen Pembimbing Akademik.
                </li>
                <li>
                  Mengikuti pembimbingan akademik menurut jadwal yang telah
                  ditentukan, sesuai dengan kalender akademik.
                </li>
                <li>
                  Mengisi daftar hadir bimbingan akademik sesuai dengan yang
                  telah disediakan oleh Prodi Sistem Informasi.
                </li>
                <li>
                  Mengisi Lembar Konsultasi Akademik sesuai dengan arahan Dosen
                  Pembimbing Akademik berdasarkan aturan yang berlaku.
                </li>
                <li>
                  Pembimbingan Akademik tidak boleh diwakilkan kecuali
                  berhalangan karena alasan berikut:
                  <br />
                  <div sx={{ padding: "16px" }}>
                    a. Sakit (lampirkan surat keterangan sakit dari Rumah Sakit
                    atau Dokter)
                    <br />
                    b. Kedukaan
                    <br />
                    c. Kerja Praktek
                    <br />
                    d. Tugas Akhir/Skripsi
                  </div>
                </li>
                <li>
                  Program Studi dan Dosen Pembimbing Akademik tidak akan
                  melayani bimbingan akademik di luar jadwal Kalender Akademik.
                </li>
              </ol>
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion defaultExpanded>
          <AccordionSummary
            sx={{ paddingLeft: "24px" }}
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography sx={{ fontWeight: 500 }}>
              D. WAKTU PEMBIMBINGAN AKADEMIK
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography
              sx={{
                paddingLeft: "25px",
                paddingRight: "25px",
                textAlign: "justify",
                "@media (max-width: 390px)": {
                  fontSize: "12px",
                  paddingLeft: "5px",
                  paddingRight: "5px",
                },
              }}
            >
              <ol sx={{ listStylePosition: "inside" }}>
                <li>
                  Pembimbingan Akademik dilakukan minimal 2 (dua) kali, yaitu
                  diawal semester berjalan, pertengahan semester berjalan, atau
                  menjelang akhir semester berjalan.
                </li>
                <li>
                  Waktu pembimbingan akademik mengikuti Kalender Akademik
                  Universitas Klabat.
                </li>
                <li>
                  Pelaksanaan pembagian waktu pembimbingan akademik untuk setiap
                  Dosen Pembimbing Akademik ditetapkan oleh Program Studi
                  berdasarkan usulan Dosen Pembimbing Akademik.
                </li>
                <li>
                  Jika Dosen Pembimbing Akademik meninggalkan tugas selama 6
                  bulan, tugasnya sebagai pembimbing akademik digantikan Dosen
                  lain dengan surat keputusan Dekan.
                </li>
                <li>
                  Jika Dosen Pembimbing Akademik tidak berada di kampus untuk
                  sementara waktu, sedangkan saat itu mahasiswa memerlukan
                  bimbingan, maka tugasnya akan digantikan oleh Ketua Program
                  Studi, Pembantu Dekan, atau Dekan.
                </li>
              </ol>
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion defaultExpanded>
          <AccordionSummary
            sx={{ paddingLeft: "24px" }}
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography sx={{ fontWeight: 500 }}>
              E. TUJUAN BIMBINGAN AKADEMIK
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography
              sx={{
                paddingLeft: "25px",
                paddingRight: "25px",
                textAlign: "justify",
                "@media (max-width: 390px)": {
                  fontSize: "12px",
                  paddingLeft: "5px",
                  paddingRight: "5px",
                },
              }}
            >
              <ol sx={{ listStylePosition: "inside" }}>
                <li>
                  Memberikan informasi tentang pemanfaatan sarana dan prasarana
                  penunjang bagi kegiatan akademik dan non-akademik.
                </li>
                <li>
                  Membantu mahasiswa dalam memecahkan permasalahan yang dihadapi
                  selama kuliah.
                </li>
                <li>
                  Memotivasi proses belajar dan memberikan penilaian sikap
                  mental terhadap mahasiswa.
                </li>
                <li>
                  Membantu mahasiswa dalam menyusun rencana studi dan program
                  studinya secara optimal.
                </li>
                <li>
                  Membantu mahasiswa mengembangkan wawasan belajar keilmuan
                  secara mandiri sepanjang hayat.
                </li>
                <li>
                  Memberi rekomendasi tentang tingkat keberhasilan belajar
                  mahasiswa untuk keperluan tertentu.
                </li>
              </ol>
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion defaultExpanded>
          <AccordionSummary
            sx={{ paddingLeft: "24px" }}
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3a-content"
            id="panel3a-header"
          >
            <Typography sx={{ fontWeight: 500 }}>
              F. MANFAAT BIMBINGAN AKADEMIK
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography
              sx={{
                paddingLeft: "25px",
                paddingRight: "25px",
                textAlign: "justify",
                "@media (max-width: 390px)": {
                  fontSize: "12px",
                  paddingLeft: "5px",
                  paddingRight: "5px",
                },
              }}
            >
              <ol sx={{ listStylePosition: "inside" }}>
                <li>
                  Mahasiswa dapat memperoleh bimbingan dari dosen wali untuk
                  melakukan cara belajar yang baik.
                </li>
                <li>
                  Menjalin komunikasi yang baik dengan Dosen, sehingga apabila
                  ada permasalahan yang menyangkut perkuliahan dapat segera
                  memperoleh pengarahan.
                </li>
              </ol>
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion defaultExpanded>
          <AccordionSummary
            sx={{ paddingLeft: "24px" }}
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3a-content"
            id="panel3a-header"
          >
            <Typography sx={{ fontWeight: 500 }}>
              G. HAL-HAL YANG PERLU DIPERHATIKAN
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography
              sx={{
                paddingLeft: "25px",
                paddingRight: "25px",
                textAlign: "justify",
                "@media (max-width: 390px)": {
                  fontSize: "12px",
                  paddingLeft: "5px",
                  paddingRight: "5px",
                },
              }}
            >
              <ol sx={{ listStylePosition: "inside" }}>
                <li>
                  Buku Bimbingan Akademik harus dibawa setiap kali melakukan
                  konsultasi dengan Dosen Pembimbing Akademik.
                </li>
                <li>
                  Setiap semester, nilai mahasiswa akan divalidasi apabila
                  mahasiswa telah berkonsultasi secara tatap muka dengan Dosen
                  Pembimbing Akademik.
                </li>
                <li>
                  Buku Bimbingan Akademik dan Lembar Konsultasi Skripsi
                  merupakan salah satu syarat untuk mengikuti ujian
                  Skripsi/Tamat.
                </li>
              </ol>
            </Typography>
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
};

export default AcademicGuide;
