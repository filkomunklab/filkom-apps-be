import React from "react";
import { Typography, styled, Accordion } from "@mui/material";
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

const VisionMissionGoals = () => {
  return (
    <div>
      <Typography
        sx={{ fontSize: "24px", fontWeight: 500, paddingBottom: "24px" }}
      >
        Vision, Mission, and Goals
      </Typography>
      <div sx={{ flex: 1 }}>
        <Accordion defaultExpanded>
          <AccordionSummary
            sx={{ paddingLeft: "24px" }}
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography sx={{ fontWeight: 500 }}>Universitas</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography pl={2} mb={1.5} fontWeight={500}>
              Vision
            </Typography>
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
              Menjadi universitas swasta Kristen Masehi Advent Hari Ketujuh yang
              memperoleh pengakuan secara nasional, dan internasional melalui
              pendidikan dan pengajaran, penelitian, dan pengabdian kepada
              masyarakat yang bermutu dengan dilandasi pada suatu proses
              pengembangan yang serasi yakni spiritual, intelektual, fisik dan
              sosial.
            </Typography>

            <Typography pl={2} pt={2} mb={1.5} fontWeight={500}>
              Mission
            </Typography>
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
              Universitas Klabat bertekad mencapai keunggulan mutu dalam
              pendidikan Kristen Masehi Advent Hari Ketujuh dengan menciptakan
              lingkungan yang kondusif untuk pengembangan karakter Kristiani
              yang mulia dan untuk pembekalan ketrampilan dan ilmu pengetahuan
              kepada mahasiswa agar bisa menjadi warga negara yang mampu hidup
              mandiri dan bekerja untuk melayani sesama manusia tanpa
              mementingkan diri sendiri.
            </Typography>

            <Typography pl={2} pt={2} mb={1.5} fontWeight={500}>
              Goals
            </Typography>
            <Typography
              sx={{
                paddingLeft: "25px",
                "@media (max-width: 390px)": {
                  fontSize: "13px",
                  paddingLeft: "5px",
                  paddingRight: "5px",
                },
              }}
            >
              Berdasarkan pernyataan Visi dan Misi, Universitas Klabat berupaya
              mencapai tujuan-tujuan berikut:
            </Typography>
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
                  Menuntun mahasiswa dalam pembentukan karakter Kristiani yang
                  ditandai dengan kerajinan, kejujuran, penghematan,
                  pengendalian-diri, dan kekudusan.
                </li>
                <li>
                  Memanfaatkan hasil penelitian dan teknologi semaksimal mungkin
                  untuk memastikan pembelajaran yang bersifat student-centered
                  and student-oriented.
                </li>
                <li>
                  Membekali mahasiswa dengan ketrampilan dan penerapan ilmu
                  pengetahuan dan teknologi yang ditekuninya.
                </li>
                <li>
                  Meningkatkan penelitian dosen dengan melibatkan mahasiswa.
                </li>
                <li>
                  Menerapkan ilmu pengetahuan dan teknologi semaksimal mungkin
                  dalam bentuk pengabdian kepada masyarakat dengan melibatkan
                  dosen, staf, dan mahasiswa.
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
            <Typography sx={{ fontWeight: 500 }}>Fakultas</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography pl={2} mb={1.5} fontWeight={500}>
              Vision
            </Typography>
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
              Menjadi fakultas ilmu komputer yang unggul dan terkemuka di
              Indonesia Timur dalam penyelenggaraan Pendidikan, Penelitian dan
              Pengabdian Masyarakat dalam bidang penguasaan teknologi informasi,
              sistem informasi, dan informatika yang berlandaskan keimanan yang
              kuat kepada Tuhan sehingga menciptakan tenaga kerja yang cerdas,
              kreatif, jujur, disiplin, bertanggungjawab dan takut akan Tuhan.
            </Typography>

            <Typography pl={2} pt={2} mb={1.5} fontWeight={500}>
              Mission
            </Typography>
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
              Mengembangkan dan meningkatkan kualitas dosen, mahasiswa maupun
              lulusannya dalam penelitian dasar dan aplikasinya yang mendukung
              pengembangan teknologi informasi dan sistem informasi dalam
              meningkatkan kesejahteraan umat manusia, dengan cara melaksanakan
              tri dharma perguruan tinggi.
            </Typography>

            <Typography pl={2} pt={2} mb={1.5} fontWeight={500}>
              Goals
            </Typography>
            <Typography
              sx={{
                paddingLeft: "25px",
                "@media (max-width: 390px)": {
                  fontSize: "13px",
                  paddingLeft: "5px",
                  paddingRight: "5px",
                },
              }}
            >
              Agar lulusan Fakultas Ilmu Komputer:
            </Typography>
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
                <li>Mempunyai jiwa melayani.</li>
                <li>
                  Memiliki pengetahuan dan ketrampilan dalam bidang teknologi
                  komputer.
                </li>
                <li>Mampu bekerjasama dengan dalam sebuah tim kerja.</li>
                <li>
                  Meningkatkan penelitian dosen dengan melibatkan mahasiswa.
                </li>
                <li>Mempunyai jiwa wirausaha dan bekerja mandiri.</li>
                <li>
                  Dapat menyesuaikan diri dengan perkembangan teknologi
                  komputer.
                </li>
                <li>
                  Mempunyai perilaku disiplin, jujur, bertanggungjawab dan
                  integritas iman yang kuat.
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
            <Typography sx={{ fontWeight: 500 }}>Program Studi</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography pl={2} mb={1.5} fontWeight={500}>
              Informatika
            </Typography>
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
              Vision
            </Typography>
            <Typography
              sx={{
                paddingLeft: "25px",
                paddingRight: "25px",
                paddingTop: "10px",
                textAlign: "justify",
                "@media (max-width: 390px)": {
                  fontSize: "12px",
                  paddingLeft: "5px",
                  paddingRight: "5px",
                },
              }}
            >
              Visi dari Program Studi Informatika adalah menjadi Program Studi
              Informatika yang terkemuka dan unggul di Indonesia Timur dalam
              penyelenggaraan Pendidikan, Penelitian, Pengabdian Masyarakat
              dalam bidang Teknik Informatika khususnya di bidang jaringan dan
              pengembangan aplikasi berbasis mobile.
            </Typography>

            <Typography
              sx={{
                paddingTop: "10px",
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
              Mission
            </Typography>
            <Typography
              sx={{
                paddingLeft: "25px",
                paddingRight: "25px",
                paddingTop: "10px",
                textAlign: "justify",
                "@media (max-width: 390px)": {
                  fontSize: "12px",
                  paddingLeft: "5px",
                  paddingRight: "5px",
                },
              }}
            >
              Misi Program Studi Informatika dirumuskan dengan memperhatikan
              aspek-aspek Tri dharma perguruan tinggi (pendidikan, penelitian,
              dan pelayanan/pengabdian kepada masyarakat) sehingga
              keterlaksanaan misi yang diartikulasikan diharapkan akan mampu
              mewujudkan visi program studi:
            </Typography>
            <Typography
              sx={{
                paddingLeft: "25px",
                paddingRight: "25px",
                "@media (max-width: 390px)": {
                  fontSize: "12px",
                  paddingLeft: "5px",
                  paddingRight: "5px",
                },
              }}
            >
              <ul>
                <li style={{ textAlign: "justify" }}>
                  Mencapai keunggulan dalam pendidikan dengan memiliki akhlak
                  yang terbaik dibidang teknik informatika bagi mahasiswa didik.
                </li>
                <li style={{ textAlign: "justify" }}>
                  Menyiapkan sarana dan prasarana yang kondusif sehingga dapat
                  menghasilkan lulusan yang bermutu dan mampu menerapkan
                  pengetahuannya serta mampu beradaptasi terhadap perkembangan
                  pengetahuan dan teknologi.
                </li>
                <li style={{ textAlign: "justify" }}>
                  Melaksanakan pendidikan yang berkualitas, berdisiplin dan
                  professional.
                </li>
                <li style={{ textAlign: "justify" }}>
                  Menciptakan lingkungan pendidikan yang aman dan nyaman serta
                  mendukung dalam pengembangan tabiat yang mulia.
                </li>
                <li style={{ textAlign: "justify" }}>
                  Menyiapkan kurikulum yang berbasis kompetensi, dan selalu
                  ditinjau setiap empat tahun sekali secara berkala, dan
                  menyediakan mata kuliah pilihan dalam kurikulum.
                </li>
                <li style={{ textAlign: "justify" }}>
                  Mengembangkan dan meningkatkan kualitas dosen dan mahasiswa
                  maupun lulusannya dalam penelitian dan aplikasinya yang
                  mendukung pengembangan dibidang teknik informatika.
                </li>
                <li style={{ textAlign: "justify" }}>
                  Mendapatkan pengakuan nasional dan internasional dalam bidang
                  penelitian dengan menghasilkan karya-karya ilmiah dibidang
                  teknik informatika. Mengupayakan bagi setiap Dosen PS untuk
                  mendapatkan hak Paten dalam skala nasional.
                </li>
                <li style={{ textAlign: "justify" }}>
                  Meningkatkan kualitas penelitan secara berkelanjutan.
                </li>
                <li style={{ textAlign: "justify" }}>
                  Memberikan pendidikan dalam bentuk pengetahuan dan
                  keterampilan kekinian yang diperlukan untuk digunakan dan
                  diterapkan dalam masyarakat, serta mampu dalam melakukan
                  pengembangan, inovasi berbasis penelitian yang berguna bagi
                  pemangku kepentingan saat ini dan akan datang.
                </li>
                <li style={{ textAlign: "justify" }}>
                  Secara aktif dan berkelanjutan melaksanakan pengabdian kepada
                  masyarakat secara professional dengan menggunakan dan
                  menerapkan kompetensi yang dimiliki oleh Program Studi Teknik
                  Informatika melalui Dosen dosen PS.
                </li>
                <li style={{ textAlign: "justify" }}>
                  Mampu bekerja sama dan berkolaborasi dengan sesama bidang
                  teknik informatika maupun bidang ilmu lainnya agar terciptanya
                  hubungan yang baik dengan lingkungan dan masyarakat.
                </li>
                <li style={{ textAlign: "justify" }}>
                  Melaksanakan dan terus meningkatkan kualitas pelayanan bagi
                  Dosen, tenaga kependidikan, mahasiswa, pengguna lulusan.
                </li>
                <li style={{ textAlign: "justify" }}>
                  Melakukan monitor, kontrol dan evaluasi terhadap kualitas
                  layanan Program studi Teknik Informatika agar dapat
                  dilaksanakan secara benar, baik dan professional.
                </li>
                <li style={{ textAlign: "justify" }}>
                  Membina kerjasama dengan berbagai pihak untuk selalu
                  memelihara kemutakhiran ilmu yang diajarkan kepada mahasiswa.
                </li>
                <li style={{ textAlign: "justify" }}>
                  Menciptakan lingkungan pendidikan yang aman dan nyaman serta
                  mendukung dalam pengembangan tabiat yang mulia.
                </li>
              </ul>
            </Typography>

            <Typography pl={2} pt={2} mb={1.5} fontWeight={500}>
              Sistem Informasi
            </Typography>
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
              Vision
            </Typography>
            <Typography
              sx={{
                paddingLeft: "25px",
                paddingRight: "25px",
                paddingTop: "10px",
                textAlign: "justify",
                "@media (max-width: 390px)": {
                  fontSize: "12px",
                  paddingLeft: "5px",
                  paddingRight: "5px",
                },
              }}
            >
              Visi dari Program Studi SI adalah menjadi Program Studi Sistem
              Informasi pilihan dalam bidang pengembangan dan penerapan Sistem
              Informasi khususnya di bidang basisdata dan jaringan di Indonesia
              Timur dan diterima sebagai panutan dengan menyeimbangkan
              pengembangan fisik, mental, sosial, dan spiritualnya.
            </Typography>

            <Typography
              sx={{
                paddingTop: "10px",
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
              Mission
            </Typography>
            <Typography
              sx={{
                paddingLeft: "25px",
                paddingRight: "25px",
                "@media (max-width: 390px)": {
                  fontSize: "12px",
                  paddingLeft: "5px",
                  paddingRight: "5px",
                },
              }}
            >
              <ul>
                <li style={{ textAlign: "justify" }}>
                  Menyelengarakan program studi yang mendukung pengembangan dan
                  penerapan Sistem Informasi dengan penekanan pada bidang
                  pengembangan sistem informasi dan implementasinya.
                </li>
                <li style={{ textAlign: "justify" }}>
                  Menyiapkan sarana dan prasarana yang kondusif sehingga dapat
                  menghasilkan lulusan yang bermutu dan mampu menerapkan
                  pengetahuannya serta mampu beradaptasi terhadap perkembangan
                  pengetahuan dan teknologi.
                </li>
                <li style={{ textAlign: "justify" }}>
                  Membina kerjasama dengan berbagai pihak untuk selalu
                  memelihara kemutakhiran ilmu yang diajarkan kepada mahasiswa.
                </li>
                <li style={{ textAlign: "justify" }}>
                  Menyiapkan kurikulum yang berbasis kompentensi, dan selalu
                  ditinjau setiap empat tahun sekali secara berkala, dan
                  menyediakan mata kuliah pilihan dalam kurikulum.
                </li>
                <li style={{ textAlign: "justify" }}>
                  Menghasilkan lulusan yang memiliki kompetensi dibidang Sistem
                  Informasi.
                </li>
                <li style={{ textAlign: "justify" }}>
                  Meningkatkan jumlah penelitian.
                </li>
                <li style={{ textAlign: "justify" }}>
                  Meningkatkan jumlah kegiatan pengabdian kepada masyarakat.
                </li>
              </ul>
            </Typography>

            <Typography pl={2} pt={2} mb={1.5} fontWeight={500}>
              Teknologi Informasi
            </Typography>
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
              Vision
            </Typography>
            <Typography
              sx={{
                paddingLeft: "25px",
                paddingRight: "25px",
                paddingTop: "10px",
                textAlign: "justify",
                "@media (max-width: 390px)": {
                  fontSize: "12px",
                  paddingLeft: "5px",
                  paddingRight: "5px",
                },
              }}
            >
              Menjadi Program Studi Teknologi Informasi yang unggul dan pertama
              di Indonesia Timur, dalam pengembangan bidang keilmuan Teknologi
              Komputer Grafis yang berbasis teknologi informasi dan desain
              komunikasi visual untuk nenghasilkan tenaga madya desain grafis
              yang memiliki keunggulan dalam penguasaan bidang komputer grafis
              dan kesenian. Yang dilandasi dengan keimanan yang menurut dan
              mengandalkan hanya kepada Tuhan Yang Maha Esa.
            </Typography>

            <Typography
              sx={{
                paddingTop: "10px",
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
              Mission
            </Typography>
            <Typography
              sx={{
                paddingLeft: "25px",
                paddingRight: "25px",
                "@media (max-width: 390px)": {
                  fontSize: "12px",
                  paddingLeft: "5px",
                  paddingRight: "5px",
                },
              }}
            >
              <ul>
                <li style={{ textAlign: "justify" }}>
                  Menyelenggarakan pendidikan Desain Komunikasi Visual yang
                  memiliki wawasan global dengan berbasis teknologi informasi
                  dan mendorong tumbuhnya kreativitas, dan profesional.
                </li>
                <li style={{ textAlign: "justify" }}>
                  Mengembangkan pengelolaan program studi yang bertata kelola
                  baik, dengan cara melaksanakan Tri Dharma perguruan tinggi.
                </li>
                <li style={{ textAlign: "justify" }}>
                  Menciptakan hubungan baik dengan Pemerintah, dunia usaha dan
                  masyarakat dalam menciptakan peluang kerja secara mandiri
                  serta mengisi tenaga profesional di bidang Teknologi Informasi
                  yang ada di Indonesia.
                </li>
              </ul>
            </Typography>
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
};

export default VisionMissionGoals;
