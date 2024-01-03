const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  // CREATE MAJOR
  await prisma.majorGlobal.createMany({
    data: [
      { id: "55201", shortName: "IF", name: "Informatika" },
      { id: "57201", shortName: "SI", name: "Sistem Informasi" },
    ],
  });

  let kurikulum_informatika;

  // CREATE CURRICULUM
  const curriculum = await prisma.curriculum.create({
    data: {
      major: "Informatika",
      year: "2020",
      Subjects: {
        createMany: {
          data: [
            {
              code: "MATH000",
              name: "Matematika/ Mathematics",
              credits: 2,
              type: "Pre-requisite",
              prerequisite: "",
              semester: 0,
            },
            {
              code: "COPS000",
              name: "Keterampilan Komputer Dasar/ Basic Computer Skill",
              credits: 3,
              type: "Pre-requisite",
              prerequisite: "",
              semester: 0,
            },
            {
              code: "WEDU001",
              name: "Pendidikan Keterampilan/ Work Education",
              credits: 1,
              type: "Pre-requisite",
              prerequisite: "",
              semester: 0,
            },
            {
              code: "BIU000",
              name: "Bahasa Inggris Pemula/ Basic English",
              credits: 3,
              type: "Pre-requisite",
              prerequisite: "",
              semester: 0,
            },
            {
              code: "LMTR999",
              name: "Mata Kuliah Pembatas/ Limiter Subject",
              credits: 1,
              type: "Pre-requisite",
              prerequisite: "",
              semester: 0,
            },
            {
              code: "FILG181",
              name: "Teladan Kehidupan I/ The Exemplary Living I",
              credits: 2,
              type: "General",
              prerequisite: "",
              semester: 1,
            },
            {
              code: "GEN001",
              name: "Bahasa Inggris Dasar I/ Elementary English I",
              credits: 3,
              type: "General",
              prerequisite:
                "- [LMTR999] Mata Kuliah Pembatas/ Limiter Subject - 1 credit(s)",
              semester: 1,
            },
            {
              code: "IF1111",
              name: "Pengantar Komputer/ Introduction to Computing",
              credits: 3,
              type: "Basic",
              prerequisite: "",
              semester: 1,
            },
            {
              code: "IS1113",
              name: "Pemrograman Komputer/ Computer Programming",
              credits: 6,
              type: "Major",
              prerequisite: "",
              semester: 1,
            },
            {
              code: "IF1112",
              name: "Dasar Aljabar Linear/ Aljabar Linear Fundamental",
              credits: 3,
              type: "Basic",
              prerequisite: "",
              semester: 1,
            },
            {
              code: "BIU101",
              name: "Bahasa Inggris Pra Dasar/ Pre-Elementary English",
              credits: 3,
              type: "General",
              prerequisite:
                "- [BIU000] Bahasa Inggris Pemula/ Basic English - 3 credit(s)",
              semester: 1,
            },
            {
              code: "FILG182",
              name: "Teladan Kehidupan II/ The Exemplary Living II",
              credits: 2,
              type: "General",
              prerequisite:
                "- [FILG181] Teladan Kehidupan I/ The Exemplary Living I - 2 credit(s)",
              semester: 2,
            },
            {
              code: "IS1221",
              name: "Matematika Diskrit/ Discrete Mathematics",
              credits: 3,
              type: "Basic",
              prerequisite: "- [MATH000] Matematika/ Mathematics - 2 credit(s)",
              semester: 2,
            },
            {
              code: "IF1222",
              name: "Kalkulus/ Calculus",
              credits: 3,
              type: "Basic",
              prerequisite: "- [MATH000] Matematika/ Mathematics - 2 credit(s)",
              semester: 2,
            },
            {
              code: "IF1223",
              name: "Logika Informatika/ Informatics Logic",
              credits: 3,
              type: "Major",
              prerequisite:
                "- [IF1111] Pengantar Komputer/ Introduction to Computing - 3 credit(s)",
              semester: 2,
            },
            {
              code: "IS1224",
              name: "Struktur Data dan Algoritma/ Data Structure and Algorithms",
              credits: 3,
              type: "Major",
              prerequisite:
                "- [IS1113] Pemrograman Komputer/ Computer Programming - 6 credit(s)",
              semester: 2,
            },
            {
              code: "BIU102",
              name: "Bahasa Inggris Dasar/ Elementary English",
              credits: 3,
              type: "General",
              prerequisite:
                "- [BIU101] Bahasa Inggris Pra Dasar/ Pre-Elementary English - 3 credit(s)",
              semester: 2,
            },
            {
              code: "EDU112",
              name: "Filsafat Pendidikan Kristen/ Philosophy of Christian Education",
              credits: 2,
              type: "General",
              prerequisite: "",
              semester: 2,
            },
            {
              code: "GEN101",
              name: "Bahasa Inggris Pra Menengah I / Pre-Inter English I",
              credits: 3,
              type: "General",
              prerequisite:
                "- [GEN002] Bahasa Inggris Dasar II/ Elementary English II - 3 credit(s) \r\n- [LMTR999] Mata Kuliah Pembatas/ Limiter Subject - 1 credit(s)",
              semester: 3,
            },
            {
              code: "FILG283",
              name: "Prinsip-Prinsip Nilai Kristiani/ The Principles of Christian Values",
              credits: 2,
              type: "General",
              prerequisite:
                "- [FILG182] Teladan Kehidupan II/ The Exemplary Living II - 2 credit(s)",
              semester: 3,
            },
            {
              code: "PPKN101",
              name: "Pendidikan Kewarganegaraan/ Indonesian Civics",
              credits: 3,
              type: "General",
              prerequisite: "",
              semester: 3,
            },
            {
              code: "IF2131",
              name: "Organisasi dan Arsitektur Komputer/ Computer Organization and Architecture",
              credits: 3,
              type: "Major",
              prerequisite:
                "- [IF1223] Logika Informatika/ Informatics Logic - 3 credit(s) \r\n- [IF1111] Pengantar Komputer/ Introduction to Computing - 3 credit(s)",
              semester: 3,
            },
            {
              code: "IS2133",
              name: "Pengantar Basisdata/ Introduction to Database",
              credits: 3,
              type: "Major",
              prerequisite:
                "- [IF1111] Pengantar Komputer/ Introduction to Computing - 3 credit(s)",
              semester: 3,
            },
            {
              code: "IS2134",
              name: "Statistik dan Probabilitas/ Statistics and Probability",
              credits: 3,
              type: "Major",
              prerequisite: "- [MATH000] Matematika/ Mathematics - 2 credit(s)",
              semester: 3,
            },
            {
              code: "IS2132",
              name: "Perancangan Web/ Web Design",
              credits: 3,
              type: "Major",
              prerequisite:
                "- [IS1224] Struktur Data dan Algoritma/ Data Structure and Algorithms - 3 credit(s)",
              semester: 3,
            },
            {
              code: "BIU203",
              name: "Bahasa Inggris Pra Menengah I / Pre-Intermediate English I",
              credits: 3,
              type: "General",
              prerequisite:
                "- [BIU102] Bahasa Inggris Dasar/ Elementary English - 3 credit(s)",
              semester: 3,
            },
            {
              code: "BIU203",
              name: "Bahasa Inggris Pra Menengah I / Pre-Intermediate English I",
              credits: 3,
              type: "General",
              prerequisite:
                "- [GEN002] Bahasa Inggris Dasar II/ Elementary English II - 3 credit(s)",
              semester: 3,
            },
            {
              code: "GEN102",
              name: "Bahasa Inggris Pra Menengah II/ Pre-Inter English II",
              credits: 3,
              type: "General",
              prerequisite:
                "- [GEN101] Bahasa Inggris Pra Menengah I / Pre-Inter English I - 3 credit(s) \r\n- [LMTR999] Mata Kuliah Pembatas/ Limiter Subject - 1 credit(s)",
              semester: 4,
            },
            {
              code: "FILG284",
              name: "Orang Muda dan Dunia/ Youth and the World",
              credits: 2,
              type: "General",
              prerequisite:
                "- [FILG283] Prinsip-Prinsip Nilai Kristiani/ The Principles of Christian Values - 2 credit(s)",
              semester: 4,
            },
            {
              code: "IF2243",
              name: "Jaringan Komputer I/ Computer Network I",
              credits: 3,
              type: "Major",
              prerequisite:
                "- [IF2131] Organisasi dan Arsitektur Komputer/ Computer Organization and Architecture - 3 credit(s)",
              semester: 4,
            },
            {
              code: "IF2244",
              name: "Sistem Cerdas/ Expert System",
              credits: 3,
              type: "Major",
              prerequisite:
                "- [MATH000] Matematika/ Mathematics - 2 credit(s) \r\n- [IS1221] Matematika Diskrit/ Discrete Mathematics - 3 credit(s)",
              semester: 4,
            },
            {
              code: "IF2245",
              name: "Teori Bahasa dan Automata/ Language and Automata Theory",
              credits: 3,
              type: "Major",
              prerequisite:
                "- [IS1221] Matematika Diskrit/ Discrete Mathematics - 3 credit(s)",
              semester: 4,
            },
            {
              code: "IS2241",
              name: "Sistem Manajemen Basisdata/ Database Management System",
              credits: 3,
              type: "Major",
              prerequisite:
                "- [IS2133] Pengantar Basisdata/ Introduction to Database - 3 credit(s)",
              semester: 4,
            },
            {
              code: "IS2243",
              name: "Pemrograman Berorientasi Objek/ Object Oriented Programming",
              credits: 3,
              type: "Major",
              prerequisite:
                "- [IS1113] Pemrograman Komputer/ Computer Programming - 6 credit(s)",
              semester: 4,
            },
            {
              code: "BIU204",
              name: "Bahasa Inggris Pra Menengah II/ Pre-Intermediate English II",
              credits: 3,
              type: "General",
              prerequisite:
                "- [BIU203] Bahasa Inggris Pra Menengah I / Pre-Intermediate English I - 3 credit(s)",
              semester: 4,
            },
            {
              code: "BIU204",
              name: "Bahasa Inggris Pra Menengah II/ Pre-Intermediate English II",
              credits: 3,
              type: "General",
              prerequisite:
                "- [GEN101] Bahasa Inggris Pra Menengah I / Pre-Inter English I - 3 credit(s)",
              semester: 4,
            },
            {
              code: "FILG385",
              name: "Kehidupan Keluarga / Family Living",
              credits: 2,
              type: "General",
              prerequisite:
                "- [FILG284] Orang Muda dan Dunia/ Youth and the World - 2 credit(s)",
              semester: 5,
            },
            {
              code: "IF3156",
              name: "Jaringan Komputer II/ Computer Network II",
              credits: 3,
              type: "Major",
              prerequisite:
                "- [IF2243] Jaringan Komputer I/ Computer Network I - 3 credit(s)",
              semester: 5,
            },
            {
              code: "IF3155",
              name: "Pemrograman Visual/ Visual Programming",
              credits: 3,
              type: "Major",
              prerequisite:
                "- [IS2243] Pemrograman Berorientasi Objek/ Object Oriented Programming - 3 credit(s)",
              semester: 5,
            },
            {
              code: "IS3151",
              name: "Pengembangan Web Front-End/ Front-End Web Development",
              credits: 3,
              type: "Major",
              prerequisite:
                "- [IS2243] Pemrograman Berorientasi Objek/ Object Oriented Programming - 3 credit(s)",
              semester: 5,
            },
            {
              code: "IS3152",
              name: "Analisis dan Perancangan Sistem/ System Analysis and Design",
              credits: 3,
              type: "Major",
              prerequisite:
                "- [IS1113] Pemrograman Komputer/ Computer Programming - 6 credit(s)",
              semester: 5,
            },
            {
              code: "IF3153",
              name: "Konsep Sistem Operasi/ Operating System Concept",
              credits: 3,
              type: "Major",
              prerequisite:
                "- [IF2131] Organisasi dan Arsitektur Komputer/ Computer Organization and Architecture - 3 credit(s)",
              semester: 5,
            },
            {
              code: "IS3262",
              name: "Interaksi Manusia dan Komputer/ Human and Computer Interaction",
              credits: 3,
              type: "Major",
              prerequisite:
                "- [IS2243] Pemrograman Berorientasi Objek/ Object Oriented Programming - 3 credit(s)",
              semester: 5,
            },
            {
              code: "FILG386",
              name: "Kehidupan di Akhir Zaman/ End Time Living",
              credits: 2,
              type: "General",
              prerequisite:
                "- [FILG385] Kehidupan Keluarga / Family Living - 2 credit(s)",
              semester: 6,
            },
            {
              code: "IF3266",
              name: "Grafika Komputer/ Computer Graphics",
              credits: 3,
              type: "Major",
              prerequisite:
                "- [IS2243] Pemrograman Berorientasi Objek/ Object Oriented Programming - 3 credit(s)",
              semester: 6,
            },
            {
              code: "IF3262",
              name: "Pengembangan Web Back-End/ Back-End Web Development",
              credits: 3,
              type: "Major",
              prerequisite:
                "- [IS3151] Pengembangan Web Front-End/ Front-End Web Development - 3 credit(s)",
              semester: 6,
            },
            {
              code: "IF3263",
              name: "Kecerdasan Buatan/ Artificial Intelligence",
              credits: 3,
              type: "Major",
              prerequisite:
                "- [IF2244] Sistem Cerdas/ Expert System - 3 credit(s)\r\n- [IS1224] Struktur Data dan Algoritma/ Data Structure and Algorithms - 3 credit(s)",
              semester: 6,
            },
            {
              code: "IF3264",
              name: "Rekayasa Perangkat Lunak/ Software Engineering",
              credits: 3,
              type: "Major",
              prerequisite:
                "- [IS3152] Analisis dan Perancangan Sistem/ System Analysis and Design - 3 credit(s) \r\n- [IS3262] Interaksi Manusia dan Komputer/ Human and Computer Interaction - 3 credit(s)",
              semester: 6,
            },
            {
              code: "IS3261",
              name: "Pengembangan Perangkat Bergerak/ Mobile Application Development",
              credits: 3,
              type: "Major",
              prerequisite:
                "- [IS3262] Interaksi Manusia dan Komputer/ Human and Computer Interaction - 3 credit(s)",
              semester: 6,
            },
            {
              code: "IS3265",
              name: "Metodologi Penelitian/ Research Method",
              credits: 3,
              type: "Major",
              prerequisite:
                "- [IS3152] Analisis dan Perancangan Sistem/ System Analysis and Design - 3 credit(s) \r\n- [IS2134] Statistik dan Probabilitas/ Statistics and Probability - 3 credit(s)",
              semester: 6,
            },
            {
              code: "IS4171",
              name: "Skripsi I/ Research Project I",
              credits: 3,
              type: "Major",
              prerequisite:
                "- [IS3265] Metodologi Penelitian/ Research Method - 3 credit(s) \r\n- [IF3264] Rekayasa Perangkat Lunak/ Software Engineering - 3 credit(s)",
              semester: 7,
            },
            {
              code: "IS2245",
              name: "Penulisan Ilmiah/ Scientific Writing",
              credits: 2,
              type: "Major",
              prerequisite:
                "- [IS2133] Pengantar Basisdata/ Introduction to Database - 3 credit(s)",
              semester: 7,
            },
            {
              code: "IF4172",
              name: "Pengantar Pengembangan Game/ Introduction to Game Development",
              credits: 3,
              type: "Major",
              prerequisite:
                "- [IF3155] Pemrograman Visual/ Visual Programming - 3 credit(s)",
              semester: 7,
            },
            {
              code: "IF4173",
              name: "Pemrograman Sistem/ System Programming",
              credits: 3,
              type: "Major",
              prerequisite:
                "- [IF1223] Logika Informatika/ Informatics Logic - 3 credit(s) \r\n- [IF2131] Organisasi dan Arsitektur Komputer/ Computer Organization and Architecture - 3 credit(s)",
              semester: 7,
            },
            {
              code: "IS4281",
              name: "Skripsi II/ Research Project II",
              credits: 3,
              type: "Major",
              prerequisite:
                "- [IS4171] Skripsi I/ Research Project I - 3 credit(s)",
              semester: 8,
            },
            {
              code: "IF4282",
              name: "Robotika/ Robotics",
              credits: 3,
              type: "Major",
              prerequisite:
                "- [IF2131] Organisasi dan Arsitektur Komputer/ Computer Organization and Architecture - 3 credit(s) \r\n- [IF1223] Logika Informatika/ Informatics Logic - 3 credit(s)",
              semester: 8,
            },
            {
              code: "IS2242",
              name: "Kewirausahaan/ Entrepreneur - Project Capstone",
              credits: 3,
              type: "Major",
              prerequisite:
                "- [IF3264] Rekayasa Perangkat Lunak/ Software Engineering - 3 credit(s)",
              semester: 8,
            },
            {
              code: "IF4174",
              name: "Etika Komputer/ Computer Ethics",
              credits: 2,
              type: "Major",
              prerequisite:
                "- [IF1111] Pengantar Komputer/ Introduction to Computing - 3 credit(s) \r\n- [IF2244] Sistem Cerdas/ Expert System - 3 credit(s)",
              semester: 8,
            },
            {
              code: "IF4291",
              name: "Desain untuk Visualisasi dan Komputer/ Design for Visualization and Communication",
              credits: 3,
              type: "Elective",
              prerequisite:
                "- [IF4172] Pengantar Pengembangan Game/ Introduction to Game Development - 3 credit(s)",
              semester: 9,
            },
            {
              code: "IF4292",
              name: "Pemrograman Game/ Game Programming",
              credits: 3,
              type: "Elective",
              prerequisite:
                "- [IF4172] Pengantar Pengembangan Game/ Introduction to Game Development - 3 credit(s)",
              semester: 9,
            },
            {
              code: "IF4191",
              name: "Pengantar Animasi/ Introduction to Animation",
              credits: 3,
              type: "Elective",
              prerequisite:
                "- [IF3266] Grafika Komputer/ Computer Graphics - 3 credit(s)",
              semester: 9,
            },
            {
              code: "IF4192",
              name: "Prinsip-Prinsip Desain Kreatif/ Principles of Creative Design",
              credits: 3,
              type: "Elective",
              prerequisite:
                "- [IF3266] Grafika Komputer/ Computer Graphics - 3 credit(s)",
              semester: 9,
            },
            {
              code: "IF4294",
              name: "Pemrosesan Bahasa Alami/ Natural Language Processing",
              credits: 3,
              type: "Elective",
              prerequisite:
                "- [IS3154] Penambangan dan Pergudangan Data/ Data Mining and Warehousing - 3 credit(s)",
              semester: 9,
            },
            {
              code: "IS3154",
              name: "Penambangan dan Pergudangan Data/ Data Mining and Warehousing",
              credits: 3,
              type: "Elective",
              prerequisite:
                "- [IS2241] Sistem Manajemen Basisdata/ Database Management System - 3 credit(s)",
              semester: 9,
            },
            {
              code: "IF4293",
              name: "Pembelajaran Mesin/ Machine Learning",
              credits: 3,
              type: "Elective",
              prerequisite:
                "- [IF3263] Kecerdasan Buatan/ Artificial Intelligence - 3 credit(s)",
              semester: 9,
            },
            {
              code: "IF4194",
              name: "Pencarian Informasi/ Information Retrieval",
              credits: 3,
              type: "Elective",
              prerequisite:
                "- [IS3154] Penambangan dan Pergudangan Data/ Data Mining and Warehousing - 3 credit(s)",
              semester: 9,
            },
            {
              code: "IF4195",
              name: "Manajemen Proyek/ Project Management",
              credits: 3,
              type: "Elective",
              prerequisite:
                "- [IF3262] Pengembangan Web Back-End/ Back-End Web Development - 3 credit(s)",
              semester: 9,
            },
            {
              code: "IF4196",
              name: "Internet untuk Segala/ Internet of Things",
              credits: 3,
              type: "Elective",
              prerequisite:
                "- [IF3262] Pengembangan Web Back-End/ Back-End Web Development - 3 credit(s)",
              semester: 9,
            },
            {
              code: "IF4295",
              name: "Teknik Cloud/ Cloud Engineering",
              credits: 3,
              type: "Elective",
              prerequisite:
                "- [IF3262] Pengembangan Web Back-End/ Back-End Web Development - 3 credit(s)",
              semester: 9,
            },
            {
              code: "IF4296",
              name: "Rekayasa DevOps/ DevOps Engineering",
              credits: 3,
              type: "Elective",
              prerequisite:
                "- [IF3262] Pengembangan Web Back-End/ Back-End Web Development - 3 credit(s)",
              semester: 9,
            },
            {
              code: "CNET402",
              name: "Jaringan Nirkabel dan Perangkat Bergerak/ Wireless and Mobile Networks",
              credits: 3,
              type: "Elective",
              prerequisite: "",
              semester: 9,
            },
            {
              code: "BENG310",
              name: "Bahasa Inggris Bisnis Membaca dan Kosakata/ Business English Reading and Vocabulary",
              credits: 3,
              type: "Elective",
              prerequisite:
                "- [GEN102] Bahasa Inggris Pra Menengah II/ Pre-Inter English II - 3 credit(s)",
              semester: 9,
            },
            {
              code: "BENG330",
              name: "Komunikasi Bisnis Bahasa Inggris/ Business English Communication",
              credits: 3,
              type: "Elective",
              prerequisite:
                "- [GEN102] Bahasa Inggris Pra Menengah II/ Pre-Inter English II - 3 credit(s)",
              semester: 9,
            },
            {
              code: "BBEN320",
              name: "Korespondensi Bisnis Bahasa Inggris/ Business English Correspondence",
              credits: 3,
              type: "Elective",
              prerequisite:
                "- [GEN102] Bahasa Inggris Pra Menengah II/ Pre-Inter English II - 3 credit(s)",
              semester: 9,
            },
            {
              code: "ELIT271",
              name: "Studi Literatur I/ Literature Studies I",
              credits: 3,
              type: "Elective",
              prerequisite:
                "- [GEN102] Bahasa Inggris Pra Menengah II/ Pre-Inter English II - 3 credit(s)",
              semester: 9,
            },
            {
              code: "BIU305",
              name: "Bahasa Inggris Menengah I/ Intermediate English I",
              credits: 3,
              type: "Elective",
              prerequisite:
                "- [BIU204] Bahasa Inggris Pra Menengah II/ Pre-Intermediate English II - 3 credit(s)",
              semester: 9,
            },
            {
              code: "BIU305",
              name: "Bahasa Inggris Menengah I/ Intermediate English I",
              credits: 3,
              type: "Elective",
              prerequisite:
                "- [GEN102] Bahasa Inggris Pra Menengah II/ Pre-Inter English II - 3 credit(s)",
              semester: 9,
            },
            {
              code: "BIU306",
              name: "Bahasa Inggris Menengah II/ Intermediate English II",
              credits: 3,
              type: "Elective",
              prerequisite:
                "- [BIU204] Bahasa Inggris Pra Menengah II/ Pre-Intermediate English II - 3 credit(s)",
              semester: 9,
            },
            {
              code: "GEN306",
              name: "Bahasa Inggris Menengah Atas II/ Upper-Inter English II",
              credits: 3,
              type: "Elective",
              prerequisite:
                "- [GEN102] Bahasa Inggris Pra Menengah II/ Pre-Inter English II - 3 credit(s) \r\n- [LMTR999] Mata Kuliah Pembatas/ Limiter Subject - 1 credit(s)",
              semester: 9,
            },
            {
              code: "ESP401",
              name: "Bahasa Inggris Bisnis Membaca dan Kosakata/ Business English Reading and Vocabulary",
              credits: 3,
              type: "Elective",
              prerequisite:
                "- [BIU204] Bahasa Inggris Pra Menengah II/ Pre-Intermediate English II - 3 credit(s)",
              semester: 9,
            },
            {
              code: "ESP401",
              name: "Bahasa Inggris Bisnis Membaca dan Kosakata/ Business English Reading and Vocabulary",
              credits: 3,
              type: "Elective",
              prerequisite:
                "- [GEN102] Bahasa Inggris Pra Menengah II/ Pre-Inter English II - 3 credit(s)",
              semester: 9,
            },
            {
              code: "ESP402",
              name: "Korespondensi Bisnis Bahasa Inggris/ Business English Correspondence",
              credits: 3,
              type: "Elective",
              prerequisite:
                "- [BIU204] Bahasa Inggris Pra Menengah II/ Pre-Intermediate English II - 3 credit(s)",
              semester: 9,
            },
            {
              code: "ESP402",
              name: "Korespondensi Bisnis Bahasa Inggris/ Business English Correspondence",
              credits: 3,
              type: "Elective",
              prerequisite:
                "- [GEN102] Bahasa Inggris Pra Menengah II/ Pre-Inter English II - 3 credit(s)",
              semester: 9,
            },
            {
              code: "ESP403",
              name: "Komunikasi Bisnis Bahasa Inggris/ Business English Communication",
              credits: 3,
              type: "Elective",
              prerequisite:
                "- [BIU204] Bahasa Inggris Pra Menengah II/ Pre-Intermediate English II - 3 credit(s)",
              semester: 9,
            },
            {
              code: "ESP403",
              name: "Komunikasi Bisnis Bahasa Inggris/ Business English Communication",
              credits: 3,
              type: "Elective",
              prerequisite:
                "- [GEN102] Bahasa Inggris Pra Menengah II/ Pre-Inter English II - 3 credit(s)",
              semester: 9,
            },
            {
              code: "ENG433",
              name: "Penulisan Akademik Bahasa Inggris III/ Academic English Writing III",
              credits: 3,
              type: "Elective",
              prerequisite:
                "- [BIU204] Bahasa Inggris Pra Menengah II/ Pre-Intermediate English II - 3 credit(s)",
              semester: 9,
            },
            {
              code: "BIU306",
              name: "Bahasa Inggris Menengah II/ Intermediate English II",
              credits: 3,
              type: "General",
              prerequisite:
                "- [GEN102] Bahasa Inggris Pra Menengah II/ Pre-Inter English II - 3 credit(s)",
              semester: 9,
            },
            {
              code: "ENG433",
              name: "Penulisan Akademik Bahasa Inggris III/ Academic English Writing III",
              credits: 3,
              type: "General",
              prerequisite:
                "- [GEN102] Bahasa Inggris Pra Menengah II/ Pre-Inter English II - 3 credit(s)",
              semester: 9,
            },
            {
              code: "MG4191",
              name: "Pengalaman Kerja di Industri Teknologi Informasi/ Industrial Experience in Information Technology",
              credits: 8,
              type: "Elective",
              prerequisite: "",
              semester: 9,
            },
            {
              code: "MG4192",
              name: "Pengalaman Praktek di Bidang Teknologi Informasi/ Information Technology Practice in Industrial Experience",
              credits: 8,
              type: "Elective",
              prerequisite: "",
              semester: 9,
            },
            {
              code: "MG4193",
              name: "Pengembangan profesional di Industri Teknologi InformasiDevelopment in Information Technology Industry/ Professional Development in Information Technology Industry",
              credits: 4,
              type: "Elective",
              prerequisite: "",
              semester: 9,
            },
            {
              code: "SI42901",
              name: "Mata Kuliah Pilihan untuk Studi Independen 1/ Elective Course for Specific Independent Study 1/",
              credits: 8,
              type: "Elective",
              prerequisite: "",
              semester: 9,
            },
            {
              code: "SI42902",
              name: "Mata Kuliah Pilihan untuk Studi Independen 2/ Elective Course for Specific Independent Study 2",
              credits: 8,
              type: "Elective",
              prerequisite: "",
              semester: 9,
            },
            {
              code: "SI42903",
              name: "Mata Kuliah Pilihan untuk Studi Independen 3/ Elective Course for Specific Independent Study 3",
              credits: 4,
              type: "Elective",
              prerequisite: "",
              semester: 9,
            },
            {
              code: "SI42905",
              name: "Mata Kuliah Pilihan untuk Studi Independen 5/ Elective Course for Specific Independent Study 5",
              credits: 3,
              type: "Elective",
              prerequisite: "",
              semester: 9,
            },
            {
              code: "SI42904",
              name: "Mata Kuliah Pilihan untuk Studi Independen 4/ Elective Course for Specific Independent Study 4",
              credits: 4,
              type: "Elective",
              prerequisite: "",
              semester: 9,
            },
            {
              code: "SI42906",
              name: "Mata Kuliah Pilihan untuk Studi Independen 6/ Elective Course for Specific Independent Study 6",
              credits: 3,
              type: "Elective",
              prerequisite: "",
              semester: 9,
            },
            {
              code: "SI42907",
              name: "Mata Kuliah Pilihan untuk Studi Independen 7/ Elective Course for Specific Independent Study 7",
              credits: 3,
              type: "Elective",
              prerequisite: "",
              semester: 9,
            },
            {
              code: "SI42908",
              name: "Mata Kuliah Pilihan untuk Studi Independen 8/ Elective Course for Specific Independent Study 8",
              credits: 2,
              type: "Elective",
              prerequisite: "",
              semester: 9,
            },
            {
              code: "SI42909",
              name: "Mata Kuliah Pilihan untuk Studi Independen 9/ Elective Course for Specific Independent Study 9",
              credits: 2,
              type: "Elective",
              prerequisite: "",
              semester: 9,
            },
            {
              code: "SI42910",
              name: "Mata Kuliah Pilihan untuk Studi Independen 10/ Elective Course for Specific Independent Study 10",
              credits: 1,
              type: "Elective",
              prerequisite: "",
              semester: 9,
            },
            {
              code: "SI42911",
              name: "Mata Kuliah Pilihan untuk Studi Independen 11/ Elective Course for Specific Independent Study 11",
              credits: 1,
              type: "Elective",
              prerequisite: "",
              semester: 9,
            },
            {
              code: "SI42912",
              name: "Mata Kuliah Pilihan untuk Studi Independen 12/ Elective Course for Specific Independent Study 12",
              credits: 20,
              type: "Elective",
              prerequisite: "",
              semester: 9,
            },
          ],
        },
      },
    },
  });

  kurikulum_informatika = curriculum.id;

  // .then(async (student) => {
  //   await prisma.userRole.create({
  //     data: {
  //       userId: student.nim,
  //       role: "MAHASISWA",
  //     },
  //   });
  // });

  // CREATE ADMIN
  await prisma.admin.create({
    data: {
      email: "admin@mail.com",
      username: "admin",
      password: "$2b$10$8i4.tmBGcK619R.lL6goi.GBRA3E7y25fARKYRqIPR46PjwlPV9eu",
      role: "ADMIN",
    },
  });

  // CREATE SUPER_ADMIN
  await prisma.admin.create({
    data: {
      email: "super_admin@mail.com",
      username: "superadmin",
      password: "$2b$10$8i4.tmBGcK619R.lL6goi.GBRA3E7y25fARKYRqIPR46PjwlPV9eu",
      role: "SUPER_ADMIN",
    },
  });

  // CREATE ADMIN_LPMI
  await prisma.admin.create({
    data: {
      email: "admin_lpmi@mail.com",
      username: "adminlpmi",
      password: "$2b$10$8i4.tmBGcK619R.lL6goi.GBRA3E7y25fARKYRqIPR46PjwlPV9eu",
      role: "ADMIN_LPMI",
    },
  });

  // CREATE STUDENT
  await prisma.student
    .create({
      data: {
        nim: "student",
        studentEmail: "student@mail.com",
        firstName: "John",
        lastName: "Doe",
        gender: "MALE",
        faculty: "Fakultas Ilmu Komputer",
        major: "IF",
        password:
          "$2b$10$8i4.tmBGcK619R.lL6goi.GBRA3E7y25fARKYRqIPR46PjwlPV9eu",
      },
    })
    .then(async (student) => {
      await prisma.userRole.create({
        data: {
          userId: student.id,
          role: "MAHASISWA",
        },
      });
    });

  // CREATE ALUMNI
  // TODO: solve this error
  // await prisma.employee
  //   .create({
  //     data: {
  //       Address: 'Manado',
  //       phoneNum: '081287340823',
  //       email: 'alumni@test.com',
  //       firstName: "Alumni",
  //       lastName: "Alumni",
  //       nik: "alumni",
  //       password:
  //         "$2b$10$8i4.tmBGcK619R.lL6goi.GBRA3E7y25fARKYRqIPR46PjwlPV9eu",
  //     },
  //   })
  //   .then(async (employee) => {
  //     await prisma.userRole.create({
  //       data: {
  //         userId: employee.nik,
  //         role: "ALUMNI",
  //       },
  //     });
  //   });

  // CREATE DOSEN
  // await prisma.employee
  //   .create({
  //     data: {
  //       email: "dosen@test.com",
  //       phoneNum: "081283498",
  //       Address: "Manado",
  //       firstName: "Lecturer",
  //       lastName: "Dosen",
  //       nik: "dosen",
  //       password:
  //         "$2b$10$8i4.tmBGcK619R.lL6goi.GBRA3E7y25fARKYRqIPR46PjwlPV9eu",
  //     },
  //   })
  //   .then(async (employee) => {
  //     await prisma.userRole.create({
  //       data: {
  //         userId: employee.nik,
  //         role: "DOSEN",
  //       },
  //     });
  //   });

  // CREATE DEKAN
  // await prisma.employee
  //   .create({
  //     data: {
  //       Address: "Manado",
  //       email: "dekan@test.com",
  //       phoneNum: "08123874983",
  //       firstName: "Dekan",
  //       lastName: "Dekan",
  //       nik: "dekan",
  //       password:
  //         "$2b$10$8i4.tmBGcK619R.lL6goi.GBRA3E7y25fARKYRqIPR46PjwlPV9eu",
  //     },
  //   })
  //   .then(async (employee) => {
  //     await prisma.userRole.create({
  //       data: {
  //         userId: employee.nik,
  //         role: "DEKAN",
  //       },
  //     });
  //   });

  // // CREATE KAPRODI
  // await prisma.employee
  //   .create({
  //     data: {
  //       Address: "Manado",
  //       phoneNum: "0819834412",
  //       email: "kaprodi@test.com",
  //       firstName: "Kaprodi",
  //       lastName: "Kaprodi",
  //       nik: "kaprodi",
  //       password:
  //         "$2b$10$8i4.tmBGcK619R.lL6goi.GBRA3E7y25fARKYRqIPR46PjwlPV9eu",
  //     },
  //   })
  //   .then(async (employee) => {
  //     await prisma.userRole.create({
  //       data: {
  //         userId: employee.nik,
  //         role: "KAPRODI",
  //       },
  //     });
  //   });

  // // CREATE SEKRETARIS
  // await prisma.employee
  //   .create({
  //     data: {
  //       Address: "Manado",
  //       phoneNum: "08193834412",
  //       email: "sekretaris1@test.com",
  //       firstName: "Sekretaris",
  //       lastName: "Sekretaris",
  //       nik: "sekretaris",
  //       password:
  //         "$2b$10$8i4.tmBGcK619R.lL6goi.GBRA3E7y25fARKYRqIPR46PjwlPV9eu",
  //     },
  //   })
  //   .then(async (employee) => {
  //     await prisma.userRole.create({
  //       data: {
  //         userId: employee.nik,
  //         role: "SEKRETARIS",
  //       },
  //     });
  //   });

  // // CREATE REGISTER
  // await prisma.employee
  //   .create({
  //     data: {
  //       Address: "Manado",
  //       phoneNum: "083834412",
  //       email: "register@test.com",
  //       firstName: "Register",
  //       lastName: "Register",
  //       nik: "register",
  //       password:
  //         "$2b$10$8i4.tmBGcK619R.lL6goi.GBRA3E7y25fARKYRqIPR46PjwlPV9eu",
  //     },
  //   })
  //   .then(async (employee) => {
  //     await prisma.userRole.create({
  //       data: {
  //         userId: employee.nik,
  //         role: "REGISTER",
  //       },
  //     });
  //   });

  // // CREATE OPERATOR
  // await prisma.employee
  //   .create({
  //     data: {
  //       email: "operator@test.com",
  //       phoneNum: "08128347934",
  //       Address: "Manado",
  //       firstName: "Operator",
  //       lastName: "LPMI",
  //       nik: "operatorlpmi",
  //       password:
  //         "$2b$10$8i4.tmBGcK619R.lL6goi.GBRA3E7y25fARKYRqIPR46PjwlPV9eu",
  //     },
  //   })
  //   .then(async (employee) => {
  //     await prisma.userRole.create({
  //       data: {
  //         userId: employee.nik,
  //         role: "OPERATOR_LPMI",
  //       },
  //     });
  //   });

  //--------------------------------------Skripsi App--------------------------------------------
  // IF
  const francesId = "1efcdc53-f12c-4683-b9ff-db6e53fe5c83";
  const geovalgaId = "9036e2e9-3601-4f00-b74a-bf4e731c9eb8";
  const angelId = "9036e2e9-3601-4f00-b74a-bf4e731c9eb1";
  const cindyId = "bc75d933-8f6b-4619-a41c-8727360a8c1e";
  const robbyId = "f3c97a48-66eb-4ac7-82a5-5dd89c83607d";
  const sitiID = "768a30f7-e02b-41ac-810d-78d8a94da49b";
  const wahyuID = "f5cfb85f-d65c-4cc5-b03f-d0c2dd29ec27";
  const nadiaID = "1c65096d-d768-48c0-9a41-4b06e28a27a3";
  const sintaID = "sinta96d-d768-48c0-9a41-4b06e28a27a3";
  // SI
  const marcelId = "9036e2e9-3601-4f00-b74a-bf4e731c9eb2";
  const leaId = "9036e2e9-3601-4f00-b74a-bf4e731c9eb3";
  const rizkyID = "7c3ab47b-3e48-4c14-bcb5-10d37cf5c50a";
  const DianaID = "4f2c8ec3-6505-438e-afdd-7f14d1c4c789";
  const ahmadID = "a5f2180b-73f5-46c1-8b77-50ec25551b64";
  const bellaID = "0ac7c7ed-bf7f-45eb-8d8e-d983af4511e7";
  const faisalID = "e6f3e7e2-e6e7-4281-a7e3-14d9e69d0f61";

  const kaprodiTIId = "2eb35687-c414-4634-b010-1b64caa1bf27";
  const kaprodiSIId = "cebd73c8-9ad9-4136-a65a-50ad7b4d5896";
  const dekanId = "9ddc8258-3fa2-40ea-8477-1a651c9039be";
  const dosen1Id = "550e8400-e29b-41d4-a716-446655440000";
  const dosen2Id = "550e8400-e29b-41d4-a716-446655440001";
  const dosen3Id = "550e8400-e29b-41d4-a716-446655440002";

  const sekretarisId = "f6b7d2b0-b7f8-4393-9027-e4374e1eea52";

  // CREATE STUDENT
  await prisma.student
    .create({
      data: {
        id: francesId,
        gender: "MALE",
        firstName: "Frances",
        lastName: "Yong",
        studentEmail: "frances@mail.com",
        nim: "105021920001",
        faculty: "Fakultas Ilmu Komputer",
        major: "IF",
        password:
          "$2b$10$8i4.tmBGcK619R.lL6goi.GBRA3E7y25fARKYRqIPR46PjwlPV9eu",
      },
    })
    .then(async (student) => {
      await prisma.userRole.create({
        data: {
          userId: student.id,
          role: "MAHASISWA",
        },
      });
    });

  await prisma.student
    .create({
      data: {
        id: geovalgaId,
        gender: "MALE",
        firstName: "Geovalga",
        lastName: "Lim",
        studentEmail: "geovalga@mail.com",
        nim: "105021920002",
        faculty: "Fakultas Ilmu Komputer",
        major: "IF",
        password:
          "$2b$10$8i4.tmBGcK619R.lL6goi.GBRA3E7y25fARKYRqIPR46PjwlPV9eu",
      },
    })
    .then(async (student) => {
      await prisma.userRole.create({
        data: {
          userId: student.id,
          role: "MAHASISWA",
        },
      });
    });

  await prisma.student
    .create({
      data: {
        id: angelId,
        gender: "FEMALE",
        firstName: "Angel",
        lastName: "Mackenzie",
        studentEmail: "mackenzie@mail.com",
        nim: "105021920003",
        faculty: "Fakultas Ilmu Komputer",
        major: "IF",
        password:
          "$2b$10$8i4.tmBGcK619R.lL6goi.GBRA3E7y25fARKYRqIPR46PjwlPV9eu",
      },
    })
    .then(async (student) => {
      await prisma.userRole.create({
        data: {
          userId: student.id,
          role: "MAHASISWA",
        },
      });
    });

  await prisma.student
    .create({
      data: {
        id: marcelId,
        gender: "MALE",
        firstName: "Marcel Eferson Putra",
        lastName: "Haerani",
        studentEmail: "haerani@mail.com",
        nim: "105021920004",
        faculty: "Fakultas Ilmu Komputer",
        major: "SI",
        password:
          "$2b$10$8i4.tmBGcK619R.lL6goi.GBRA3E7y25fARKYRqIPR46PjwlPV9eu",
      },
    })
    .then(async (student) => {
      await prisma.userRole.create({
        data: {
          userId: student.id,
          role: "MAHASISWA",
        },
      });
    });

  await prisma.student
    .create({
      data: {
        id: leaId,
        gender: "FEMALE",
        firstName: "Shyereal Imanuelita",
        lastName: "Saerang",
        studentEmail: "saerang@mail.com",
        nim: "105021920005",
        faculty: "Fakultas Ilmu Komputer",
        major: "SI",
        password:
          "$2b$10$8i4.tmBGcK619R.lL6goi.GBRA3E7y25fARKYRqIPR46PjwlPV9eu",
      },
    })
    .then(async (student) => {
      await prisma.userRole.create({
        data: {
          userId: student.id,
          role: "MAHASISWA",
        },
      });
    });

  await prisma.student
    .create({
      data: {
        id: rizkyID,
        gender: "MALE",
        firstName: "Rizky",
        lastName: "Wibisono",
        studentEmail: "rizky@mail.com",
        nim: "105021920006",
        faculty: "Fakultas Ilmu Komputer",
        major: "SI",
        password:
          "$2b$10$8i4.tmBGcK619R.lL6goi.GBRA3E7y25fARKYRqIPR46PjwlPV9eu",
      },
    })
    .then(async (student) => {
      await prisma.userRole.create({
        data: {
          userId: student.id,
          role: "MAHASISWA",
        },
      });
    });

  await prisma.student
    .create({
      data: {
        id: DianaID,
        gender: "FEMALE",
        firstName: "Diana",
        lastName: "Setiawan",
        studentEmail: "diana@mail.com",
        nim: "105021920007",
        faculty: "Fakultas Ilmu Komputer",
        major: "SI",
        password:
          "$2b$10$8i4.tmBGcK619R.lL6goi.GBRA3E7y25fARKYRqIPR46PjwlPV9eu",
      },
    })
    .then(async (student) => {
      await prisma.userRole.create({
        data: {
          userId: student.id,
          role: "MAHASISWA",
        },
      });
    });

  await prisma.student
    .create({
      data: {
        id: ahmadID,
        gender: "MALE",
        firstName: "Ahmad",
        lastName: "Sukma",
        studentEmail: "ahmad@mail.com",
        nim: "105021920008",
        faculty: "Fakultas Ilmu Komputer",
        major: "SI",
        password:
          "$2b$10$8i4.tmBGcK619R.lL6goi.GBRA3E7y25fARKYRqIPR46PjwlPV9eu",
      },
    })
    .then(async (student) => {
      await prisma.userRole.create({
        data: {
          userId: student.id,
          role: "MAHASISWA",
        },
      });
    });

  await prisma.student
    .create({
      data: {
        id: bellaID,
        gender: "FEMALE",
        firstName: "Bella",
        lastName: "Putri",
        studentEmail: "bella@mail.com",
        nim: "105021920009",
        faculty: "Fakultas Ilmu Komputer",
        major: "SI",
        password:
          "$2b$10$8i4.tmBGcK619R.lL6goi.GBRA3E7y25fARKYRqIPR46PjwlPV9eu",
      },
    })
    .then(async (student) => {
      await prisma.userRole.create({
        data: {
          userId: student.id,
          role: "MAHASISWA",
        },
      });
    });

  await prisma.student
    .create({
      data: {
        id: faisalID,
        gender: "MALE",
        firstName: "Faisal",
        lastName: "Saputra",
        studentEmail: "faisal@mail.com",
        nim: "105021920010",
        faculty: "Fakultas Ilmu Komputer",
        major: "SI",
        password:
          "$2b$10$8i4.tmBGcK619R.lL6goi.GBRA3E7y25fARKYRqIPR46PjwlPV9eu",
      },
    })
    .then(async (student) => {
      await prisma.userRole.create({
        data: {
          userId: student.id,
          role: "MAHASISWA",
        },
      });
    });

  await prisma.student
    .create({
      data: {
        id: cindyId,
        gender: "FEMALE",
        firstName: "Cindy",
        lastName: "Lestari",
        studentEmail: "cindy@mail.com",
        nim: "105021920011",
        faculty: "Fakultas Ilmu Komputer",
        major: "IF",
        password:
          "$2b$10$8i4.tmBGcK619R.lL6goi.GBRA3E7y25fARKYRqIPR46PjwlPV9eu",
      },
    })
    .then(async (student) => {
      await prisma.userRole.create({
        data: {
          userId: student.id,
          role: "MAHASISWA",
        },
      });
    });

  await prisma.student
    .create({
      data: {
        id: robbyId,
        gender: "MALE",
        firstName: "Robby",
        lastName: "Hidayat",
        studentEmail: "robby@mail.com",
        nim: "105021920012",
        faculty: "Fakultas Ilmu Komputer",
        major: "IF",
        password:
          "$2b$10$8i4.tmBGcK619R.lL6goi.GBRA3E7y25fARKYRqIPR46PjwlPV9eu",
      },
    })
    .then(async (student) => {
      await prisma.userRole.create({
        data: {
          userId: student.id,
          role: "MAHASISWA",
        },
      });
    });

  await prisma.student
    .create({
      data: {
        id: sitiID,
        gender: "FEMALE",
        firstName: "Siti",
        lastName: "Hidayat",
        studentEmail: "siti@mail.com",
        nim: "105021920013",
        faculty: "Fakultas Ilmu Komputer",
        major: "IF",
        password:
          "$2b$10$8i4.tmBGcK619R.lL6goi.GBRA3E7y25fARKYRqIPR46PjwlPV9eu",
      },
    })
    .then(async (student) => {
      await prisma.userRole.create({
        data: {
          userId: student.id,
          role: "MAHASISWA",
        },
      });
    });

  await prisma.student
    .create({
      data: {
        id: wahyuID,
        gender: "MALE",
        firstName: "Wahyu",
        lastName: "Saputra",
        studentEmail: "wahyu@mail.com",
        nim: "105021920014",
        faculty: "Fakultas Ilmu Komputer",
        major: "IF",
        password:
          "$2b$10$8i4.tmBGcK619R.lL6goi.GBRA3E7y25fARKYRqIPR46PjwlPV9eu",
      },
    })
    .then(async (student) => {
      await prisma.userRole.create({
        data: {
          userId: student.id,
          role: "MAHASISWA",
        },
      });
    });

  await prisma.student
    .create({
      data: {
        id: nadiaID,
        gender: "FEMALE",
        firstName: "Nadia",
        lastName: "Sari",
        studentEmail: "nadia@mail.com",
        nim: "105021920015",
        faculty: "Fakultas Ilmu Komputer",
        major: "IF",
        password:
          "$2b$10$8i4.tmBGcK619R.lL6goi.GBRA3E7y25fARKYRqIPR46PjwlPV9eu",
      },
    })
    .then(async (student) => {
      await prisma.userRole.create({
        data: {
          userId: student.id,
          role: "MAHASISWA",
        },
      });
    });

  await prisma.student
    .create({
      data: {
        id: sintaID,
        gender: "FEMALE",
        firstName: "Sinta",
        lastName: "Lily",
        studentEmail: "lily@mail.com",
        nim: "105021920016",
        faculty: "Fakultas Ilmu Komputer",
        major: "IF",
        password:
          "$2b$10$8i4.tmBGcK619R.lL6goi.GBRA3E7y25fARKYRqIPR46PjwlPV9eu",
      },
    })
    .then(async (student) => {
      await prisma.userRole.create({
        data: {
          userId: student.id,
          role: "MAHASISWA",
        },
      });
    });

  // CREATE DOSEN SKRIPSI, KAPRODI IF
  await prisma.employee
    .create({
      data: {
        id: kaprodiTIId,
        Address: "Manado",
        email: "mandias@test.com",
        phoneNum: "081234567890",
        firstName: "Green",
        lastName: "Mandias",
        degree: "SKom, MCs",
        nik: "1001",
        nidn: "0904028101",
        major: "IF",
        password:
          "$2b$10$8i4.tmBGcK619R.lL6goi.GBRA3E7y25fARKYRqIPR46PjwlPV9eu",
      },
    })
    .then(async (employee) => {
      // Daftar peran yang akan Anda tambahkan pada dosen
      const rolesToAdd = ["DOSEN", "DOSEN_MK", "KAPRODI"];

      // Membuat entri UserRole untuk setiap peran
      for (const role of rolesToAdd) {
        await prisma.userRole.create({
          data: {
            userId: employee.id,
            role: role,
          },
        });
      }
    });

  // CREATE DOSEN SKRIPSI, KAPRODI SI
  await prisma.employee
    .create({
      data: {
        id: kaprodiSIId,
        Address: "Manado",
        phoneNum: "081234567891",
        email: "pungus@test.com",
        firstName: "Stenly",
        lastName: "Pungus",
        degree: "MT, PhD",
        nik: "1002",
        nidn: "0922098101",
        major: "SI",
        password:
          "$2b$10$8i4.tmBGcK619R.lL6goi.GBRA3E7y25fARKYRqIPR46PjwlPV9eu",
      },
    })
    .then(async (employee) => {
      // Daftar peran yang akan Anda tambahkan pada dosen
      const rolesToAdd = ["DOSEN", "DOSEN_MK", "KAPRODI"];

      // Membuat entri UserRole untuk setiap peran
      for (const role of rolesToAdd) {
        await prisma.userRole.create({
          data: {
            userId: employee.id,
            role: role,
          },
        });
      }
    });

  // CREATE DEKAN
  await prisma.employee
    .create({
      data: {
        id: dekanId,
        Address: "Manado",
        phoneNum: "081234567892",
        email: "liem@test.com",
        firstName: "Andrew Tanny",
        lastName: "Liem",
        degree: "MT, PhD",
        nik: "1003",
        nidn: "0916038101",
        major: "IF",
        password:
          "$2b$10$8i4.tmBGcK619R.lL6goi.GBRA3E7y25fARKYRqIPR46PjwlPV9eu",
      },
    })
    .then(async (employee) => {
      // Daftar peran yang akan Anda tambahkan pada dosen
      const rolesToAdd = ["DOSEN", "DOSEN_MK", "DEKAN"];

      // Membuat entri UserRole untuk setiap peran
      for (const role of rolesToAdd) {
        await prisma.userRole.create({
          data: {
            userId: employee.id,
            role: role,
          },
        });
      }
    });

  // CREATE DOSEN 1
  await prisma.employee
    .create({
      data: {
        id: dosen1Id,
        Address: "Airmadidi",
        phoneNum: "081234567893",
        email: "adam@test.com",
        firstName: "Stenly Ibrahim ",
        lastName: "Adam",
        degree: " SKom, MSc",
        nik: "1004",
        nidn: " 0915098707",
        major: "SI",
        password:
          "$2b$10$8i4.tmBGcK619R.lL6goi.GBRA3E7y25fARKYRqIPR46PjwlPV9eu",
      },
    })
    .then(async (employee) => {
      // Daftar peran yang akan Anda tambahkan pada dosen
      const rolesToAdd = ["DOSEN"];

      // Membuat entri UserRole untuk setiap peran
      for (const role of rolesToAdd) {
        await prisma.userRole.create({
          data: {
            userId: employee.id,
            role: role,
          },
        });
      }
    });

  // CREATE DOSEN 2
  await prisma.employee
    .create({
      data: {
        id: dosen2Id,
        Address: "Airmadidi",
        phoneNum: "081234567894",
        email: "moedjahedy@test.com",
        firstName: "Jimmy Herawan",
        lastName: "Moedjahedy ",
        degree: " SKom, MKom, MM",
        nik: "1005",
        nidn: "0923128602",
        major: "SI",
        password:
          "$2b$10$8i4.tmBGcK619R.lL6goi.GBRA3E7y25fARKYRqIPR46PjwlPV9eu",
      },
    })
    .then(async (employee) => {
      // Daftar peran yang akan Anda tambahkan pada dosen
      const rolesToAdd = ["DOSEN"];

      // Membuat entri UserRole untuk setiap peran
      for (const role of rolesToAdd) {
        await prisma.userRole.create({
          data: {
            userId: employee.id,
            role: role,
          },
        });
      }
    });

  // CREATE DOSEN 3
  await prisma.employee
    .create({
      data: {
        id: dosen3Id,
        Address: "Airmadidi",
        phoneNum: "081234567895",
        email: "lengkong@test.com",
        firstName: "Oktoverano Hendrik",
        lastName: "Lengkong",
        degree: " SKom, MDs, MM",
        nik: "1006",
        nidn: " 0912108301",
        major: "DKV",
        password:
          "$2b$10$8i4.tmBGcK619R.lL6goi.GBRA3E7y25fARKYRqIPR46PjwlPV9eu",
      },
    })
    .then(async (employee) => {
      // Daftar peran yang akan Anda tambahkan pada dosen
      const rolesToAdd = ["DOSEN", "DOSEN_MK", "KAPRODI"];

      // Membuat entri UserRole untuk setiap peran
      for (const role of rolesToAdd) {
        await prisma.userRole.create({
          data: {
            userId: employee.id,
            role: role,
          },
        });
      }
    });

  // CREATE DOSEN 4
  await prisma.employee
    .create({
      data: {
        Address: "Airmadidi",
        phoneNum: "081234567801",
        email: "greensandag@test.com",
        firstName: "Green Arther",
        lastName: "Sandag",
        degree: " SKom, MDs, MM",
        nik: "1007",
        nidn: "0907129001",
        major: "IF",
        password:
          "$2b$10$8i4.tmBGcK619R.lL6goi.GBRA3E7y25fARKYRqIPR46PjwlPV9eu",
      },
    })
    .then(async (employee) => {
      // Daftar peran yang akan Anda tambahkan pada dosen
      const rolesToAdd = ["DOSEN", "DOSEN_MK"];

      // Membuat entri UserRole untuk setiap peran
      for (const role of rolesToAdd) {
        await prisma.userRole.create({
          data: {
            userId: employee.id,
            role: role,
          },
        });
      }
    });

  // CREATE DOSEN 5
  await prisma.employee
    .create({
      data: {
        Address: "Airmadidi",
        phoneNum: "081234567802",
        email: "debysondakh@test.com",
        firstName: "Debby Erce",
        lastName: "Sondakh",
        degree: " SKom, MDs, MM",
        nik: "1008",
        nidn: "0926128001",
        major: "IF",
        password:
          "$2b$10$8i4.tmBGcK619R.lL6goi.GBRA3E7y25fARKYRqIPR46PjwlPV9eu",
      },
    })
    .then(async (employee) => {
      // Daftar peran yang akan Anda tambahkan pada dosen
      const rolesToAdd = ["DOSEN", "DOSEN_MK"];

      // Membuat entri UserRole untuk setiap peran
      for (const role of rolesToAdd) {
        await prisma.userRole.create({
          data: {
            userId: employee.id,
            role: role,
          },
        });
      }
    });

  // CREATE DOSEN 6
  await prisma.employee
    .create({
      data: {
        Address: "Airmadidi",
        phoneNum: "081234567803",
        email: "jacqulinewaworundeng@test.com",
        firstName: "Jacquline",
        lastName: "Waworundeng",
        degree: " SKom, MDs, MM",
        nik: "1009",
        nidn: "0904118303",
        major: "IF",
        password:
          "$2b$10$8i4.tmBGcK619R.lL6goi.GBRA3E7y25fARKYRqIPR46PjwlPV9eu",
      },
    })
    .then(async (employee) => {
      // Daftar peran yang akan Anda tambahkan pada dosen
      const rolesToAdd = ["DOSEN", "DOSEN_MK"];

      // Membuat entri UserRole untuk setiap peran
      for (const role of rolesToAdd) {
        await prisma.userRole.create({
          data: {
            userId: employee.id,
            role: role,
          },
        });
      }
    });

  // CREATE DOSEN 7
  await prisma.employee
    .create({
      data: {
        Address: "Airmadidi",
        phoneNum: "081234567804",
        email: "edsonputra@test.com",
        firstName: "Edson Yahuda",
        lastName: "Putra",
        degree: " SKom, MDs, MM",
        nik: "1010",
        nidn: " 0011106901",
        major: "IF",
        password:
          "$2b$10$8i4.tmBGcK619R.lL6goi.GBRA3E7y25fARKYRqIPR46PjwlPV9eu",
      },
    })
    .then(async (employee) => {
      // Daftar peran yang akan Anda tambahkan pada dosen
      const rolesToAdd = ["DOSEN", "DOSEN_MK"];

      // Membuat entri UserRole untuk setiap peran
      for (const role of rolesToAdd) {
        await prisma.userRole.create({
          data: {
            userId: employee.id,
            role: role,
          },
        });
      }
    });

  // CREATE DOSEN 8
  await prisma.employee
    .create({
      data: {
        Address: "Airmadidi",
        phoneNum: "081234567805",
        email: "marcheltombeng@test.com",
        firstName: "Marchel Timothy",
        lastName: "Tombeng",
        degree: " SKom, MDs, MM",
        nik: "1011",
        nidn: "2330038801",
        major: "IF",
        password:
          "$2b$10$8i4.tmBGcK619R.lL6goi.GBRA3E7y25fARKYRqIPR46PjwlPV9eu",
      },
    })
    .then(async (employee) => {
      // Daftar peran yang akan Anda tambahkan pada dosen
      const rolesToAdd = ["DOSEN", "DOSEN_MK"];

      // Membuat entri UserRole untuk setiap peran
      for (const role of rolesToAdd) {
        await prisma.userRole.create({
          data: {
            userId: employee.id,
            role: role,
          },
        });
      }
    });

  // CREATE DOSEN 9
  await prisma.employee
    .create({
      data: {
        Address: "Airmadidi",
        phoneNum: "081234567806",
        email: "andriawahyudi@test.com",
        firstName: "Andria Kusuma",
        lastName: "Wahyudi",
        degree: " SKom, MDs, MM",
        nik: "1012",
        nidn: "0916088901",
        major: "IF",
        password:
          "$2b$10$8i4.tmBGcK619R.lL6goi.GBRA3E7y25fARKYRqIPR46PjwlPV9eu",
      },
    })
    .then(async (employee) => {
      // Daftar peran yang akan Anda tambahkan pada dosen
      const rolesToAdd = ["DOSEN", "DOSEN_MK"];

      // Membuat entri UserRole untuk setiap peran
      for (const role of rolesToAdd) {
        await prisma.userRole.create({
          data: {
            userId: employee.id,
            role: role,
          },
        });
      }
    });

  // CREATE DOSEN 10
  await prisma.employee
    .create({
      data: {
        Address: "Airmadidi",
        phoneNum: "081234567807",
        email: "lidyalaoh@test.com",
        firstName: "Lidya Chitra",
        lastName: "Laoh",
        degree: " SKom, MDs, MM",
        nik: "1013",
        nidn: "0929038001",
        major: "IF",
        password:
          "$2b$10$8i4.tmBGcK619R.lL6goi.GBRA3E7y25fARKYRqIPR46PjwlPV9eu",
      },
    })
    .then(async (employee) => {
      // Daftar peran yang akan Anda tambahkan pada dosen
      const rolesToAdd = ["DOSEN", "DOSEN_MK"];

      // Membuat entri UserRole untuk setiap peran
      for (const role of rolesToAdd) {
        await prisma.userRole.create({
          data: {
            userId: employee.id,
            role: role,
          },
        });
      }
    });

  // CREATE DOSEN 11
  await prisma.employee
    .create({
      data: {
        Address: "Airmadidi",
        phoneNum: "081234567808",
        email: "joemambu@test.com",
        firstName: "Joe Yuan Yulian",
        lastName: "Mambu",
        degree: " SKom, MDs, MM",
        nik: "1014",
        nidn: "0927078306",
        major: "SI",
        password:
          "$2b$10$8i4.tmBGcK619R.lL6goi.GBRA3E7y25fARKYRqIPR46PjwlPV9eu",
      },
    })
    .then(async (employee) => {
      // Daftar peran yang akan Anda tambahkan pada dosen
      const rolesToAdd = ["DOSEN", "DOSEN_MK"];

      // Membuat entri UserRole untuk setiap peran
      for (const role of rolesToAdd) {
        await prisma.userRole.create({
          data: {
            userId: employee.id,
            role: role,
          },
        });
      }
    });

  // CREATE DOSEN 12
  await prisma.employee
    .create({
      data: {
        Address: "Airmadidi",
        phoneNum: "081234567809",
        email: "reynoldussahulata@test.com",
        firstName: "Reynoldus Andrias",
        lastName: "Sahulata",
        degree: " SKom, MDs, MM",
        nik: "1015",
        nidn: "0311106605",
        major: "SI",
        password:
          "$2b$10$8i4.tmBGcK619R.lL6goi.GBRA3E7y25fARKYRqIPR46PjwlPV9eu",
      },
    })
    .then(async (employee) => {
      // Daftar peran yang akan Anda tambahkan pada dosen
      const rolesToAdd = ["DOSEN", "DOSEN_MK"];

      // Membuat entri UserRole untuk setiap peran
      for (const role of rolesToAdd) {
        await prisma.userRole.create({
          data: {
            userId: employee.id,
            role: role,
          },
        });
      }
    });

  // CREATE DOSEN 13
  await prisma.employee
    .create({
      data: {
        Address: "Airmadidi",
        phoneNum: "081234567810",
        email: "semmytaju@test.com",
        firstName: "Semmy Wellem",
        lastName: "Taju",
        degree: " SKom, MDs, MM",
        nik: "1016",
        nidn: "1604098901",
        major: "SI",
        password:
          "$2b$10$8i4.tmBGcK619R.lL6goi.GBRA3E7y25fARKYRqIPR46PjwlPV9eu",
      },
    })
    .then(async (employee) => {
      // Daftar peran yang akan Anda tambahkan pada dosen
      const rolesToAdd = ["DOSEN", "DOSEN_MK"];

      // Membuat entri UserRole untuk setiap peran
      for (const role of rolesToAdd) {
        await prisma.userRole.create({
          data: {
            userId: employee.id,
            role: role,
          },
        });
      }
    });

  // CREATE DOSEN 14
  await prisma.employee
    .create({
      data: {
        Address: "Airmadidi",
        phoneNum: "081234567811",
        email: "rollylontaan@test.com",
        firstName: "Rolly Junius",
        lastName: "Lontaan",
        degree: " SKom, MDs, MM",
        nik: "1017",
        nidn: "1626068101",
        major: "SI",
        password:
          "$2b$10$8i4.tmBGcK619R.lL6goi.GBRA3E7y25fARKYRqIPR46PjwlPV9eu",
      },
    })
    .then(async (employee) => {
      // Daftar peran yang akan Anda tambahkan pada dosen
      const rolesToAdd = ["DOSEN", "DOSEN_MK"];

      // Membuat entri UserRole untuk setiap peran
      for (const role of rolesToAdd) {
        await prisma.userRole.create({
          data: {
            userId: employee.id,
            role: role,
          },
        });
      }
    });

  // CREATE DOSEN 15
  await prisma.employee
    .create({
      data: {
        Address: "Airmadidi",
        phoneNum: "081234567812",
        email: "stevenlolong@test.com",
        firstName: "Steven",
        lastName: "Lolong",
        degree: " SKom, MDs, MM",
        nik: "1018",
        nidn: "0922098001",
        major: "SI",
        password:
          "$2b$10$8i4.tmBGcK619R.lL6goi.GBRA3E7y25fARKYRqIPR46PjwlPV9eu",
      },
    })
    .then(async (employee) => {
      // Daftar peran yang akan Anda tambahkan pada dosen
      const rolesToAdd = ["DOSEN", "DOSEN_MK"];

      // Membuat entri UserRole untuk setiap peran
      for (const role of rolesToAdd) {
        await prisma.userRole.create({
          data: {
            userId: employee.id,
            role: role,
          },
        });
      }
    });

  // CREATE DOSEN 16
  await prisma.employee
    .create({
      data: {
        Address: "Airmadidi",
        phoneNum: "081234567813",
        email: "jeinrewah@test.com",
        firstName: "Jein",
        lastName: "Rewah",
        degree: " SKom, MDs, MM",
        nik: "1019",
        nidn: "0917018303",
        major: "SI",
        password:
          "$2b$10$8i4.tmBGcK619R.lL6goi.GBRA3E7y25fARKYRqIPR46PjwlPV9eu",
      },
    })
    .then(async (employee) => {
      // Daftar peran yang akan Anda tambahkan pada dosen
      const rolesToAdd = ["DOSEN", "DOSEN_MK"];

      // Membuat entri UserRole untuk setiap peran
      for (const role of rolesToAdd) {
        await prisma.userRole.create({
          data: {
            userId: employee.id,
            role: role,
          },
        });
      }
    });

  // ===================================================================================
  // CREATE SEKRETARIS
  await prisma.employee
    .create({
      data: {
        id: sekretarisId,
        Address: "Manado",
        phoneNum: "081234567896",
        email: "kainde@test.com",
        firstName: "Wilma",
        lastName: "Kainde",
        nik: "1020",
        password:
          "$2b$10$8i4.tmBGcK619R.lL6goi.GBRA3E7y25fARKYRqIPR46PjwlPV9eu",
      },
    })
    .then(async (employee) => {
      await prisma.userRole.create({
        data: {
          userId: employee.id,
          role: "OPERATOR_FAKULTAS",
        },
      });
    });

  //--------------------------------------Klabat Bridge--------------------------------------------
  // Create Student
  await prisma.student.createMany({
    data: [
      {
        id: "1efcdc53-f12c-4683-b9ff-db6e53fe5c01",
        nim: "10502201001",
        studentEmail: "s2200001@student.unklab.ac.id",
        firstName: "Angel Triany",
        lastName: "Pangkey",
        gender: "FEMALE",
        faculty: "Fakultas Ilmu Komputer",
        major: "IF",
        curriculumId: kurikulum_informatika,
        arrivalYear: "2020",
        // majorGlobalId: 55201,
        password:
          "$2b$10$8i4.tmBGcK619R.lL6goi.GBRA3E7y25fARKYRqIPR46PjwlPV9eu",
      },
      {
        id: "1efcdc53-f12c-4683-b9ff-db6e53fe5c02",
        nim: "10502201002",
        studentEmail: "s2200002@student.unklab.ac.id",
        firstName: "Brenda",
        lastName: "Rambi",
        gender: "FEMALE",
        faculty: "Fakultas Ilmu Komputer",
        major: "IF",
        curriculumId: kurikulum_informatika,
        arrivalYear: "2020",
        password:
          "$2b$10$8i4.tmBGcK619R.lL6goi.GBRA3E7y25fARKYRqIPR46PjwlPV9eu",
      },
      {
        id: "1efcdc53-f12c-4683-b9ff-db6e53fe5c07",
        nim: "10502201007",
        studentEmail: "s2200007@student.unklab.ac.id",
        firstName: "Dannye",
        lastName: "MacNeilage",
        gender: "MALE",
        faculty: "Fakultas Ilmu Komputer",
        major: "IF",
        curriculumId: kurikulum_informatika,
        arrivalYear: "2020",
        password:
          "$2b$10$8i4.tmBGcK619R.lL6goi.GBRA3E7y25fARKYRqIPR46PjwlPV9eu",
      },
      {
        id: "1efcdc53-f12c-4683-b9ff-db6e53fe5c08",
        nim: "10502201008",
        studentEmail: "s2200008@student.unklab.ac.id",
        firstName: "Rozanna",
        lastName: "Ilyin",
        gender: "FEMALE",
        faculty: "Fakultas Ilmu Komputer",
        major: "IF",
        curriculumId: kurikulum_informatika,
        arrivalYear: "2020",
        password:
          "$2b$10$8i4.tmBGcK619R.lL6goi.GBRA3E7y25fARKYRqIPR46PjwlPV9eu",
      },
      {
        id: "1efcdc53-f12c-4683-b9ff-db6e53fe5c09",
        nim: "10502201009",
        studentEmail: "s2200009@student.unklab.ac.id",
        firstName: "Lars",
        lastName: "Hulle",
        gender: "MALE",
        faculty: "Fakultas Ilmu Komputer",
        major: "IF",
        curriculumId: kurikulum_informatika,
        arrivalYear: "2020",
        password:
          "$2b$10$8i4.tmBGcK619R.lL6goi.GBRA3E7y25fARKYRqIPR46PjwlPV9eu",
      },
      {
        id: "1efcdc53-f12c-4683-b9ff-db6e53fe5c10",
        nim: "10502201010",
        studentEmail: "s2200010@student.unklab.ac.id",
        firstName: "Dunn",
        lastName: "Hillan",
        gender: "MALE",
        faculty: "Fakultas Ilmu Komputer",
        major: "IF",
        curriculumId: kurikulum_informatika,
        arrivalYear: "2020",
        password:
          "$2b$10$8i4.tmBGcK619R.lL6goi.GBRA3E7y25fARKYRqIPR46PjwlPV9eu",
      },
      {
        id: "1efcdc53-f12c-4683-b9ff-db6e53fe5c03",
        nim: "10502201003",
        studentEmail: "s2200003@student.unklab.ac.id",
        firstName: "Darel",
        lastName: "Yuhu",
        gender: "MALE",
        faculty: "Fakultas Ilmu Komputer",
        major: "DKV",
        arrivalYear: "2020",
        password:
          "$2b$10$8i4.tmBGcK619R.lL6goi.GBRA3E7y25fARKYRqIPR46PjwlPV9eu",
      },
      {
        id: "1efcdc53-f12c-4683-b9ff-db6e53fe5c04",
        nim: "10502201004",
        studentEmail: "s2200004@student.unklab.ac.id",
        firstName: "Shyereal",
        lastName: "Saerang",
        gender: "FEMALE",
        faculty: "Fakultas Ilmu Komputer",
        major: "DKV",
        arrivalYear: "2020",
        password:
          "$2b$10$8i4.tmBGcK619R.lL6goi.GBRA3E7y25fARKYRqIPR46PjwlPV9eu",
      },
      {
        id: "1efcdc53-f12c-4683-b9ff-db6e53fe5c05",
        nim: "10502201005",
        studentEmail: "s2200005@student.unklab.ac.id",
        firstName: "Marika",
        lastName: "Connechy",
        gender: "FEMALE",
        faculty: "Fakultas Ilmu Komputer",
        major: "SI",
        arrivalYear: "2020",
        password:
          "$2b$10$8i4.tmBGcK619R.lL6goi.GBRA3E7y25fARKYRqIPR46PjwlPV9eu",
      },
      {
        id: "1efcdc53-f12c-4683-b9ff-db6e53fe5c06",
        nim: "10502201006",
        studentEmail: "s2200006@student.unklab.ac.id",
        firstName: "Delphinia",
        lastName: "Leggatt",
        gender: "FEMALE",
        faculty: "Fakultas Ilmu Komputer",
        major: "SI",
        arrivalYear: "2020",
        password:
          "$2b$10$8i4.tmBGcK619R.lL6goi.GBRA3E7y25fARKYRqIPR46PjwlPV9eu",
      },
      {
        id: "1efcdc53-f12c-4683-b9ff-db6e53fe5c11",
        nim: "10502201011",
        studentEmail: "s2200011@student.unklab.ac.id",
        firstName: "Arlyn",
        lastName: "Schimoni",
        gender: "FEMALE",
        faculty: "Fakultas Ilmu Komputer",
        major: "SI",
        password:
          "$2b$10$8i4.tmBGcK619R.lL6goi.GBRA3E7y25fARKYRqIPR46PjwlPV9eu",
      },
      {
        id: "1efcdc53-f12c-4683-b9ff-db6e53fe5c12",
        nim: "10502201012",
        studentEmail: "s2200012@student.unklab.ac.id",
        firstName: "Cookie",
        lastName: "Farlambe",
        gender: "FEMALE",
        faculty: "Fakultas Ilmu Komputer",
        major: "SI",
        password:
          "$2b$10$8i4.tmBGcK619R.lL6goi.GBRA3E7y25fARKYRqIPR46PjwlPV9eu",
      },
      {
        id: "1efcdc53-f12c-4683-b9ff-db6e53fe5c13",
        nim: "10502201013",
        studentEmail: "s2200013@student.unklab.ac.id",
        firstName: "Stacy",
        lastName: "Bullivant",
        gender: "MALE",
        faculty: "Fakultas Ilmu Komputer",
        major: "SI",
        password:
          "$2b$10$8i4.tmBGcK619R.lL6goi.GBRA3E7y25fARKYRqIPR46PjwlPV9eu",
      },
      {
        id: "1efcdc53-f12c-4683-b9ff-db6e53fe5c14",
        nim: "10502201014",
        studentEmail: "s2200014@student.unklab.ac.id",
        firstName: "Oralia",
        lastName: "Labadini",
        gender: "FEMALE",
        faculty: "Fakultas Ilmu Komputer",
        major: "SI",
        password:
          "$2b$10$8i4.tmBGcK619R.lL6goi.GBRA3E7y25fARKYRqIPR46PjwlPV9eu",
      },
      {
        id: "1efcdc53-f12c-4683-b9ff-db6e53fe5c15",
        nim: "10502201015",
        studentEmail: "s2200015@student.unklab.ac.id",
        firstName: "Bethina",
        lastName: "MacKettrick",
        gender: "FEMALE",
        faculty: "Fakultas Ilmu Komputer",
        major: "SI",
        password:
          "$2b$10$8i4.tmBGcK619R.lL6goi.GBRA3E7y25fARKYRqIPR46PjwlPV9eu",
      },
      {
        id: "1efcdc53-f12c-4683-b9ff-db6e53fe5c16",
        nim: "10502201016",
        studentEmail: "s2200016@student.unklab.ac.id",
        firstName: "Arleyne",
        lastName: "Simonds",
        gender: "FEMALE",
        faculty: "Fakultas Ilmu Komputer",
        major: "SI",
        password:
          "$2b$10$8i4.tmBGcK619R.lL6goi.GBRA3E7y25fARKYRqIPR46PjwlPV9eu",
      },
      {
        id: "1efcdc53-f12c-4683-b9ff-db6e53fe5c17",
        nim: "10502201017",
        studentEmail: "s2200017@student.unklab.ac.id",
        firstName: "Julianna",
        lastName: "Extal",
        gender: "FEMALE",
        faculty: "Fakultas Ilmu Komputer",
        major: "SI",
        password:
          "$2b$10$8i4.tmBGcK619R.lL6goi.GBRA3E7y25fARKYRqIPR46PjwlPV9eu",
      },
      {
        id: "1efcdc53-f12c-4683-b9ff-db6e53fe5c18",
        nim: "10502201018",
        studentEmail: "s2200018@student.unklab.ac.id",
        firstName: "Dario",
        lastName: "Blagbrough",
        gender: "MALE",
        faculty: "Fakultas Ilmu Komputer",
        major: "SI",
        password:
          "$2b$10$8i4.tmBGcK619R.lL6goi.GBRA3E7y25fARKYRqIPR46PjwlPV9eu",
      },
      {
        id: "1efcdc53-f12c-4683-b9ff-db6e53fe5c19",
        nim: "10502201019",
        studentEmail: "s2200019@student.unklab.ac.id",
        firstName: "Pietra",
        lastName: "Di Biagi",
        gender: "FEMALE",
        faculty: "Fakultas Ilmu Komputer",
        major: "SI",
        password:
          "$2b$10$8i4.tmBGcK619R.lL6goi.GBRA3E7y25fARKYRqIPR46PjwlPV9eu",
      },
      {
        id: "1efcdc53-f12c-4683-b9ff-db6e53fe5c20",
        nim: "10502201020",
        studentEmail: "s2200020@student.unklab.ac.id",
        firstName: "Derril",
        lastName: "O'Lochan",
        gender: "MALE",
        faculty: "Fakultas Ilmu Komputer",
        major: "SI",
        password:
          "$2b$10$8i4.tmBGcK619R.lL6goi.GBRA3E7y25fARKYRqIPR46PjwlPV9eu",
      },
    ],
  });

  await prisma.userRole.createMany({
    data: [
      {
        userId: "1efcdc53-f12c-4683-b9ff-db6e53fe5c01",
        role: "MAHASISWA",
      },
      {
        userId: "1efcdc53-f12c-4683-b9ff-db6e53fe5c02",
        role: "MAHASISWA",
      },
      {
        userId: "1efcdc53-f12c-4683-b9ff-db6e53fe5c03",
        role: "MAHASISWA",
      },
      {
        userId: "1efcdc53-f12c-4683-b9ff-db6e53fe5c04",
        role: "MAHASISWA",
      },
      {
        userId: "1efcdc53-f12c-4683-b9ff-db6e53fe5c05",
        role: "MAHASISWA",
      },
      {
        userId: "1efcdc53-f12c-4683-b9ff-db6e53fe5c06",
        role: "MAHASISWA",
      },
      {
        userId: "1efcdc53-f12c-4683-b9ff-db6e53fe5c07",
        role: "MAHASISWA",
      },
      {
        userId: "1efcdc53-f12c-4683-b9ff-db6e53fe5c08",
        role: "MAHASISWA",
      },
      {
        userId: "1efcdc53-f12c-4683-b9ff-db6e53fe5c09",
        role: "MAHASISWA",
      },
      {
        userId: "1efcdc53-f12c-4683-b9ff-db6e53fe5c10",
        role: "MAHASISWA",
      },
      {
        userId: "1efcdc53-f12c-4683-b9ff-db6e53fe5c11",
        role: "MAHASISWA",
      },
      {
        userId: "1efcdc53-f12c-4683-b9ff-db6e53fe5c12",
        role: "MAHASISWA",
      },
      {
        userId: "1efcdc53-f12c-4683-b9ff-db6e53fe5c13",
        role: "MAHASISWA",
      },
      {
        userId: "1efcdc53-f12c-4683-b9ff-db6e53fe5c14",
        role: "MAHASISWA",
      },
      {
        userId: "1efcdc53-f12c-4683-b9ff-db6e53fe5c15",
        role: "MAHASISWA",
      },
      {
        userId: "1efcdc53-f12c-4683-b9ff-db6e53fe5c16",
        role: "MAHASISWA",
      },
      {
        userId: "1efcdc53-f12c-4683-b9ff-db6e53fe5c17",
        role: "MAHASISWA",
      },
      {
        userId: "1efcdc53-f12c-4683-b9ff-db6e53fe5c18",
        role: "MAHASISWA",
      },
      {
        userId: "1efcdc53-f12c-4683-b9ff-db6e53fe5c19",
        role: "MAHASISWA",
      },
      {
        userId: "1efcdc53-f12c-4683-b9ff-db6e53fe5c20",
        role: "MAHASISWA",
      },
    ],
  });

  // Create Alumni
  await prisma.student.createMany({
    data: [
      {
        id: "9036e2e9-3601-4f00-b74a-bf4e731c9e01",
        nim: "20502201001",
        studentEmail: "s2300001@student.unklab.ac.id",
        firstName: "Stirling",
        lastName: "Branchflower",
        gender: "FEMALE",
        faculty: "Fakultas Ilmu Komputer",
        major: "IF",
        password:
          "$2b$10$8i4.tmBGcK619R.lL6goi.GBRA3E7y25fARKYRqIPR46PjwlPV9eu",
        status: "GRADUATE",
        graduate_year: "2022",
      },
      {
        id: "9036e2e9-3601-4f00-b74a-bf4e731c9e02",
        nim: "20502201002",
        studentEmail: "s2300002@student.unklab.ac.id",
        firstName: "Julina",
        lastName: "Breton",
        gender: "FEMALE",
        faculty: "Fakultas Ilmu Komputer",
        major: "IF",
        password:
          "$2b$10$8i4.tmBGcK619R.lL6goi.GBRA3E7y25fARKYRqIPR46PjwlPV9eu",
        status: "GRADUATE",
        graduate_year: "2022",
      },
      {
        id: "9036e2e9-3601-4f00-b74a-bf4e731c9e03",
        nim: "20502201003",
        studentEmail: "s2300003@student.unklab.ac.id",
        firstName: "Koenraad",
        lastName: "Tolliday",
        gender: "MALE",
        faculty: "Fakultas Ilmu Komputer",
        major: "IF",
        password:
          "$2b$10$8i4.tmBGcK619R.lL6goi.GBRA3E7y25fARKYRqIPR46PjwlPV9eu",
        status: "GRADUATE",
        graduate_year: "2022",
      },
      {
        id: "9036e2e9-3601-4f00-b74a-bf4e731c9e04",
        nim: "20502201004",
        studentEmail: "s2300004@student.unklab.ac.id",
        firstName: "Rad",
        lastName: "Beverstock",
        gender: "MALE",
        faculty: "Fakultas Ilmu Komputer",
        major: "IF",
        password:
          "$2b$10$8i4.tmBGcK619R.lL6goi.GBRA3E7y25fARKYRqIPR46PjwlPV9eu",
        status: "GRADUATE",
        graduate_year: "2022",
      },
      {
        id: "9036e2e9-3601-4f00-b74a-bf4e731c9e05",
        nim: "20502201005",
        studentEmail: "s2300005@student.unklab.ac.id",
        firstName: "Gene",
        lastName: "Trobe",
        gender: "FEMALE",
        faculty: "Fakultas Ilmu Komputer",
        major: "IF",
        password:
          "$2b$10$8i4.tmBGcK619R.lL6goi.GBRA3E7y25fARKYRqIPR46PjwlPV9eu",
        status: "GRADUATE",
        graduate_year: "2022",
      },
      {
        id: "9036e2e9-3601-4f00-b74a-bf4e731c9e06",
        nim: "20502201006",
        studentEmail: "s2300006@student.unklab.ac.id",
        firstName: "Stewart",
        lastName: "Heasman",
        gender: "MALE",
        faculty: "Fakultas Ilmu Komputer",
        major: "SI",
        password:
          "$2b$10$8i4.tmBGcK619R.lL6goi.GBRA3E7y25fARKYRqIPR46PjwlPV9eu",
        status: "GRADUATE",
        graduate_year: "2022",
      },
      {
        id: "9036e2e9-3601-4f00-b74a-bf4e731c9e07",
        nim: "20502201007",
        studentEmail: "s2300007@student.unklab.ac.id",
        firstName: "Maxim",
        lastName: "holmes",
        gender: "MALE",
        faculty: "Fakultas Ilmu Komputer",
        major: "SI",
        password:
          "$2b$10$8i4.tmBGcK619R.lL6goi.GBRA3E7y25fARKYRqIPR46PjwlPV9eu",
        status: "GRADUATE",
        graduate_year: "2022",
      },
      {
        id: "9036e2e9-3601-4f00-b74a-bf4e731c9e08",
        nim: "20502201008",
        studentEmail: "s2300008@student.unklab.ac.id",
        firstName: "Sheilakathryn",
        lastName: "Heppner",
        gender: "FEMALE",
        faculty: "Fakultas Ilmu Komputer",
        major: "SI",
        password:
          "$2b$10$8i4.tmBGcK619R.lL6goi.GBRA3E7y25fARKYRqIPR46PjwlPV9eu",
        status: "GRADUATE",
        graduate_year: "2022",
      },
      {
        id: "9036e2e9-3601-4f00-b74a-bf4e731c9e09",
        nim: "20502201009",
        studentEmail: "s2300009@student.unklab.ac.id",
        firstName: "Adelle",
        lastName: "Macvain",
        gender: "FEMALE",
        faculty: "Fakultas Ilmu Komputer",
        major: "SI",
        password:
          "$2b$10$8i4.tmBGcK619R.lL6goi.GBRA3E7y25fARKYRqIPR46PjwlPV9eu",
        status: "GRADUATE",
        graduate_year: "2022",
      },
      {
        id: "9036e2e9-3601-4f00-b74a-bf4e731c9e10",
        nim: "20502201010",
        studentEmail: "s2300010@student.unklab.ac.id",
        firstName: "Estevan",
        lastName: "Kingswood",
        gender: "MALE",
        faculty: "Fakultas Ilmu Komputer",
        major: "SI",
        password:
          "$2b$10$8i4.tmBGcK619R.lL6goi.GBRA3E7y25fARKYRqIPR46PjwlPV9eu",
        status: "GRADUATE",
        graduate_year: "2022",
      },
      {
        id: "9036e2e9-3601-4f00-b74a-bf4e731c9e11",
        nim: "20502201011",
        studentEmail: "s2300011@student.unklab.ac.id",
        firstName: "Tybalt",
        lastName: "Champneys",
        gender: "MALE",
        faculty: "Fakultas Ilmu Komputer",
        major: "IF",
        password:
          "$2b$10$8i4.tmBGcK619R.lL6goi.GBRA3E7y25fARKYRqIPR46PjwlPV9eu",
        status: "GRADUATE",
        graduate_year: "2023",
      },
      {
        id: "9036e2e9-3601-4f00-b74a-bf4e731c9e12",
        nim: "20502201012",
        studentEmail: "s2300012@student.unklab.ac.id",
        firstName: "Egor",
        lastName: "Smaling",
        gender: "MALE",
        faculty: "Fakultas Ilmu Komputer",
        major: "SI",
        password:
          "$2b$10$8i4.tmBGcK619R.lL6goi.GBRA3E7y25fARKYRqIPR46PjwlPV9eu",
        status: "GRADUATE",
        graduate_year: "2023",
      },
      {
        id: "9036e2e9-3601-4f00-b74a-bf4e731c9e13",
        nim: "20502201013",
        studentEmail: "s2300013@student.unklab.ac.id",
        firstName: "Jerrie",
        lastName: "Bushnell",
        gender: "FEMALE",
        faculty: "Fakultas Ilmu Komputer",
        major: "IF",
        password:
          "$2b$10$8i4.tmBGcK619R.lL6goi.GBRA3E7y25fARKYRqIPR46PjwlPV9eu",
        status: "GRADUATE",
        graduate_year: "2023",
      },
      {
        id: "9036e2e9-3601-4f00-b74a-bf4e731c9e14",
        nim: "20502201014",
        studentEmail: "s2300014@student.unklab.ac.id",
        firstName: "Calli",
        lastName: "Gallehawk",
        gender: "FEMALE",
        faculty: "Fakultas Ilmu Komputer",
        major: "IF",
        password:
          "$2b$10$8i4.tmBGcK619R.lL6goi.GBRA3E7y25fARKYRqIPR46PjwlPV9eu",
        status: "GRADUATE",
        graduate_year: "2023",
      },
      {
        id: "9036e2e9-3601-4f00-b74a-bf4e731c9e15",
        nim: "20502201015",
        studentEmail: "s2300015@student.unklab.ac.id",
        firstName: "Lucilia",
        lastName: "Chittey",
        gender: "FEMALE",
        faculty: "Fakultas Ilmu Komputer",
        major: "IF",
        password:
          "$2b$10$8i4.tmBGcK619R.lL6goi.GBRA3E7y25fARKYRqIPR46PjwlPV9eu",
        status: "GRADUATE",
        graduate_year: "2023",
      },
      {
        id: "9036e2e9-3601-4f00-b74a-bf4e731c9e16",
        nim: "20502201016",
        studentEmail: "s2300016@student.unklab.ac.id",
        firstName: "Rowan",
        lastName: "Origin",
        gender: "MALE",
        faculty: "Fakultas Ilmu Komputer",
        major: "SI",
        password:
          "$2b$10$8i4.tmBGcK619R.lL6goi.GBRA3E7y25fARKYRqIPR46PjwlPV9eu",
        status: "GRADUATE",
        graduate_year: "2023",
      },
      {
        id: "9036e2e9-3601-4f00-b74a-bf4e731c9e17",
        nim: "20502201017",
        studentEmail: "s2300017@student.unklab.ac.id",
        firstName: "Norine",
        lastName: "Aubrun",
        gender: "FEMALE",
        faculty: "Fakultas Ilmu Komputer",
        major: "SI",
        password:
          "$2b$10$8i4.tmBGcK619R.lL6goi.GBRA3E7y25fARKYRqIPR46PjwlPV9eu",
        status: "GRADUATE",
        graduate_year: "2023",
      },
      {
        id: "9036e2e9-3601-4f00-b74a-bf4e731c9e18",
        nim: "20502201018",
        studentEmail: "s2300018@student.unklab.ac.id",
        firstName: "Sarina",
        lastName: "Fulmen",
        gender: "FEMALE",
        faculty: "Fakultas Ilmu Komputer",
        major: "SI",
        password:
          "$2b$10$8i4.tmBGcK619R.lL6goi.GBRA3E7y25fARKYRqIPR46PjwlPV9eu",
        status: "GRADUATE",
        graduate_year: "2023",
      },
      {
        id: "9036e2e9-3601-4f00-b74a-bf4e731c9e19",
        nim: "20502201019",
        studentEmail: "s2300019@student.unklab.ac.id",
        firstName: "Rachele",
        lastName: "Skillett",
        gender: "FEMALE",
        faculty: "Fakultas Ilmu Komputer",
        major: "SI",
        password:
          "$2b$10$8i4.tmBGcK619R.lL6goi.GBRA3E7y25fARKYRqIPR46PjwlPV9eu",
        status: "GRADUATE",
        graduate_year: "2023",
      },
      {
        id: "9036e2e9-3601-4f00-b74a-bf4e731c9e20",
        nim: "20502201020",
        studentEmail: "s2300020@student.unklab.ac.id",
        firstName: "Gayle",
        lastName: "Wardhough",
        gender: "FEMALE",
        faculty: "Fakultas Ilmu Komputer",
        major: "SI",
        password:
          "$2b$10$8i4.tmBGcK619R.lL6goi.GBRA3E7y25fARKYRqIPR46PjwlPV9eu",
        status: "GRADUATE",
        graduate_year: "2023",
      },
    ],
  });

  await prisma.userRole.createMany({
    data: [
      {
        userId: "9036e2e9-3601-4f00-b74a-bf4e731c9e01",
        role: "ALUMNI",
      },
      {
        userId: "9036e2e9-3601-4f00-b74a-bf4e731c9e02",
        role: "ALUMNI",
      },
      {
        userId: "9036e2e9-3601-4f00-b74a-bf4e731c9e03",
        role: "ALUMNI",
      },
      {
        userId: "9036e2e9-3601-4f00-b74a-bf4e731c9e04",
        role: "ALUMNI",
      },
      {
        userId: "9036e2e9-3601-4f00-b74a-bf4e731c9e05",
        role: "ALUMNI",
      },
      {
        userId: "9036e2e9-3601-4f00-b74a-bf4e731c9e06",
        role: "ALUMNI",
      },
      {
        userId: "9036e2e9-3601-4f00-b74a-bf4e731c9e07",
        role: "ALUMNI",
      },
      {
        userId: "9036e2e9-3601-4f00-b74a-bf4e731c9e08",
        role: "ALUMNI",
      },
      {
        userId: "9036e2e9-3601-4f00-b74a-bf4e731c9e09",
        role: "ALUMNI",
      },
      {
        userId: "9036e2e9-3601-4f00-b74a-bf4e731c9e10",
        role: "ALUMNI",
      },
      {
        userId: "9036e2e9-3601-4f00-b74a-bf4e731c9e11",
        role: "ALUMNI",
      },
      {
        userId: "9036e2e9-3601-4f00-b74a-bf4e731c9e12",
        role: "ALUMNI",
      },
      {
        userId: "9036e2e9-3601-4f00-b74a-bf4e731c9e13",
        role: "ALUMNI",
      },
      {
        userId: "9036e2e9-3601-4f00-b74a-bf4e731c9e14",
        role: "ALUMNI",
      },
      {
        userId: "9036e2e9-3601-4f00-b74a-bf4e731c9e15",
        role: "ALUMNI",
      },
      {
        userId: "9036e2e9-3601-4f00-b74a-bf4e731c9e16",
        role: "ALUMNI",
      },
      {
        userId: "9036e2e9-3601-4f00-b74a-bf4e731c9e17",
        role: "ALUMNI",
      },
      {
        userId: "9036e2e9-3601-4f00-b74a-bf4e731c9e18",
        role: "ALUMNI",
      },
      {
        userId: "9036e2e9-3601-4f00-b74a-bf4e731c9e19",
        role: "ALUMNI",
      },
      {
        userId: "9036e2e9-3601-4f00-b74a-bf4e731c9e20",
        role: "ALUMNI",
      },
    ],
  });

  //CREATE Tracer Study
  await prisma.tracer_Study.createMany({
    data: [
      {
        kdptimsmh: "161002",
        kdpstmsmh: "55201",
        nimhsmsmh: "20502201001",
        nmmhsmsmh: "Stirling Branchflower",
        telpomsmh: "085298528966",
        emailmsmh: "s2300001@student.unklab.ac.id",
        tahun_lulus: "2022",
        nik: "7171849398765456",
        npwp: "123456788",
        f8: "1",
        f504: "1",
        f502: "2",
        f505: "8000000",
        f506: "",
        f5a1: "Sumatera Utara",
        f5a2: "Medan",
        f1101: "3",
        f1102: "",
        f5b: "PT Tekno Klabat",
        f5c: "",
        f5d: "Lokal/Wilayah/Wiraswasta/tidak berbadan hukum",
        f18a: "",
        f18b: "",
        f18c: "",
        f18d: "",
        f1201: "1",
        f1202: "",
        f14: "2",
        f15: "2",
        f1761: "4",
        f1762: "4",
        f1763: "4",
        f1764: "4",
        f1765: "4",
        f1766: "4",
        f1767: "4",
        f1768: "4",
        f1769: "4",
        f1770: "4",
        f1771: "4",
        f1772: "4",
        f1773: "4",
        f1774: "4",
        f21: "2",
        f22: "3",
        f23: "3",
        f24: "5",
        f25: "3",
        f26: "2",
        f27: "3",
        f301: "2",
        f302: "",
        f303: "1",
        f401: "1",
        f402: "0",
        f403: "0",
        f404: "0",
        f405: "0",
        f406: "0",
        f407: "0",
        f408: "0",
        f409: "0",
        f410: "0",
        f411: "0",
        f412: "0",
        f413: "0",
        f414: "0",
        f415: "0",
        f416: "",
        f6: "3",
        f7: "1",
        f7a: "0",
        f1001: "1",
        f1002: "",
        f1601: "1",
        f1602: "0",
        f1603: "0",
        f1604: "0",
        f1605: "0",
        f1606: "0",
        f1607: "0",
        f1608: "0",
        f1609: "0",
        f1610: "0",
        f1611: "0",
        f1612: "0",
        f1613: "0",
        f1614: "",
        studentId: "20502201001",
      },
      {
        kdptimsmh: "161002",
        kdpstmsmh: "55201",
        nimhsmsmh: "20502201002",
        nmmhsmsmh: "Julina Breton",
        telpomsmh: "081234567890",
        emailmsmh: "s2300003@student.unklab.ac.id",
        tahun_lulus: "2022",
        nik: "71718493987576545",
        npwp: "0987654456789",
        f8: "1",
        f504: "1",
        f502: "5",
        f505: "5000000",
        f506: "",
        f5a1: "Sulawesi Utara",
        f5a2: "Manado",
        f1101: "1",
        f1102: "",
        f5b: "Dinas Pendidikan Kota Manado",
        f5c: "",
        f5d: "Nasional/Wiraswasta berbadan hukum",
        f18a: "",
        f18b: "",
        f18c: "",
        f18d: "",
        f1201: "1",
        f1202: "",
        f14: "2",
        f15: "2",
        f1761: "5",
        f1762: "4",
        f1763: "4",
        f1764: "3",
        f1765: "5",
        f1766: "4",
        f1767: "4",
        f1768: "2",
        f1769: "3",
        f1770: "3",
        f1771: "4",
        f1772: "4",
        f1773: "5",
        f1774: "4",
        f21: "3",
        f22: "4",
        f23: "1",
        f24: "1",
        f25: "1",
        f26: "2",
        f27: "3",
        f301: "2",
        f302: "",
        f303: "4",
        f401: "0",
        f402: "0",
        f403: "0",
        f404: "0",
        f405: "0",
        f406: "0",
        f407: "0",
        f408: "0",
        f409: "0",
        f410: "0",
        f411: "1",
        f412: "0",
        f413: "0",
        f414: "0",
        f415: "0",
        f416: "",
        f6: "4",
        f7: "2",
        f7a: "1",
        f1001: "3",
        f1002: "",
        f1601: "0",
        f1602: "0",
        f1603: "0",
        f1604: "0",
        f1605: "0",
        f1606: "0",
        f1607: "0",
        f1608: "0",
        f1609: "0",
        f1610: "0",
        f1611: "0",
        f1612: "1",
        f1613: "0",
        f1614: "",
        studentId: "20502201002",
      },
      {
        kdptimsmh: "161002",
        kdpstmsmh: "55201",
        nimhsmsmh: "20502201004",
        nmmhsmsmh: "Rad Beverstock",
        telpomsmh: "098876543216",
        emailmsmh: "s2300005@student.unklab.ac.id",
        tahun_lulus: "2022",
        nik: "14785258742146",
        npwp: "7458557784523",
        f8: "1",
        f504: "1",
        f502: "5",
        f505: "9999999",
        f506: "",
        f5a1: "Sumatera Utara",
        f5a2: "Pematangsiantar",
        f1101: "3",
        f1102: "",
        f5b: "CV Maju Tak Gentar",
        f5c: "",
        f5d: "Lokal/Wilayah/Wiraswasta/tidak berbadan hukum",
        f18a: "",
        f18b: "",
        f18c: "",
        f18d: "",
        f1201: "3",
        f1202: "",
        f14: "2",
        f15: "2",
        f1761: "5",
        f1762: "4",
        f1763: "5",
        f1764: "4",
        f1765: "5",
        f1766: "4",
        f1767: "5",
        f1768: "4",
        f1769: "5",
        f1770: "4",
        f1771: "5",
        f1772: "4",
        f1773: "5",
        f1774: "4",
        f21: "2",
        f22: "4",
        f23: "1",
        f24: "3",
        f25: "1",
        f26: "3",
        f27: "3",
        f301: "2",
        f302: "",
        f303: "5",
        f401: "0",
        f402: "0",
        f403: "1",
        f404: "0",
        f405: "0",
        f406: "0",
        f407: "0",
        f408: "0",
        f409: "0",
        f410: "0",
        f411: "0",
        f412: "0",
        f413: "0",
        f414: "0",
        f415: "0",
        f416: "",
        f6: "6",
        f7: "4",
        f7a: "2",
        f1001: "3",
        f1002: "",
        f1601: "0",
        f1602: "0",
        f1603: "1",
        f1604: "0",
        f1605: "0",
        f1606: "0",
        f1607: "0",
        f1608: "0",
        f1609: "0",
        f1610: "0",
        f1611: "0",
        f1612: "0",
        f1613: "0",
        f1614: "0",
        studentId: "20502201004",
      },
      {
        kdptimsmh: "161002",
        kdpstmsmh: "55201",
        nimhsmsmh: "20502201003",
        nmmhsmsmh: "Koenraad Tolliday",
        telpomsmh: "0874123698541",
        emailmsmh: "s2300004@student.unklab.ac.id",
        tahun_lulus: "2022",
        nik: "765432345678765",
        npwp: "74123658473",
        f8: "1",
        f504: "1",
        f502: "7",
        f505: "14999999",
        f506: "",
        f5a1: "DKI Jakarta",
        f5a2: "Kota Administrasi Jakarta Selatan",
        f1101: "4",
        f1102: "",
        f5b: "CV Abadi",
        f5c: "",
        f5d: "Nasional/Wiraswasta berbadan hukum",
        f18a: "0",
        f18b: "0",
        f18c: "0",
        f18d: "0",
        f1201: "2",
        f1202: "",
        f14: "4",
        f15: "3",
        f1761: "5",
        f1762: "3",
        f1763: "4",
        f1764: "2",
        f1765: "5",
        f1766: "4",
        f1767: "3",
        f1768: "2",
        f1769: "5",
        f1770: "5",
        f1771: "4",
        f1772: "4",
        f1773: "4",
        f1774: "3",
        f21: "3",
        f22: "3",
        f23: "3",
        f24: "3",
        f25: "2",
        f26: "2",
        f27: "1",
        f301: "1",
        f302: "12",
        f303: "",
        f401: "0",
        f402: "0",
        f403: "0",
        f404: "0",
        f405: "0",
        f406: "0",
        f407: "0",
        f408: "0",
        f409: "0",
        f410: "0",
        f411: "0",
        f412: "1",
        f413: "0",
        f414: "0",
        f415: "0",
        f416: "",
        f6: "0",
        f7: "0",
        f7a: "0",
        f1001: "1",
        f1002: "0",
        f1601: "0",
        f1602: "0",
        f1603: "0",
        f1604: "0",
        f1605: "0",
        f1606: "0",
        f1607: "0",
        f1608: "1",
        f1609: "0",
        f1610: "0",
        f1611: "0",
        f1612: "0",
        f1613: "0",
        f1614: "0",
        studentId: "20502201003",
      },
      {
        kdptimsmh: "161002",
        kdpstmsmh: "55201",
        nimhsmsmh: "20502201005",
        nmmhsmsmh: "Gene Trobe",
        telpomsmh: "085412369871",
        emailmsmh: "s2300005@student.unklab.ac.id",
        tahun_lulus: "2022",
        nik: "765432345678765",
        npwp: "74123658473",
        f8: "1",
        f504: "1",
        f502: "9",
        f505: "2000000",
        f506: "",
        f5a1: "Sulawesi Utara",
        f5a2: "Manado",
        f1101: "6",
        f1102: "",
        f5b: "PT Makmur",
        f5c: "",
        f5d: "Lokal/Wilayah/Wiraswasta/tidak berbadan hukum",
        f18a: "",
        f18b: "",
        f18c: "",
        f18d: "",
        f1201: "6",
        f1202: "",
        f14: "1",
        f15: "4",
        f1761: "2",
        f1762: "4",
        f1763: "4",
        f1764: "3",
        f1765: "3",
        f1766: "2",
        f1767: "4",
        f1768: "5",
        f1769: "5",
        f1770: "2",
        f1771: "5",
        f1772: "4",
        f1773: "4",
        f1774: "4",
        f21: "3",
        f22: "5",
        f23: "3",
        f24: "2",
        f25: "3",
        f26: "2",
        f27: "1",
        f301: "2",
        f302: "",
        f303: "2",
        f401: "1",
        f402: "0",
        f403: "0",
        f404: "0",
        f405: "0",
        f406: "0",
        f407: "0",
        f408: "0",
        f409: "0",
        f410: "0",
        f411: "0",
        f412: "0",
        f413: "0",
        f414: "0",
        f415: "0",
        f416: "",
        f6: "3",
        f7: "2",
        f7a: "2",
        f1001: "1",
        f1002: "",
        f1601: "0",
        f1602: "0",
        f1603: "0",
        f1604: "0",
        f1605: "0",
        f1606: "0",
        f1607: "0",
        f1608: "1",
        f1609: "0",
        f1610: "0",
        f1611: "0",
        f1612: "0",
        f1613: "0",
        f1614: "",
        studentId: "20502201005",
      },
      {
        kdptimsmh: "161002",
        kdpstmsmh: "57201",
        nimhsmsmh: "20502201006",
        nmmhsmsmh: "Stewart Heasman",
        telpomsmh: "081234567895",
        emailmsmh: "s2300006@student.unklab.ac.id",
        tahun_lulus: "2022",
        nik: "71718273646573837",
        npwp: "8765431122",
        f8: "1",
        f504: "1",
        f502: "3",
        f505: "2000000",
        f506: "",
        f5a1: "DKI Jakarta",
        f5a2: "Kota Administrasi Jakarta Timur",
        f1101: "6",
        f1102: "",
        f5b: "Maju Sejahtera",
        f5c: "",
        f5d: "Lokal/Wilayah/Wiraswasta/tidak berbadan hukum",
        f18a: "",
        f18b: "",
        f18c: "",
        f18d: "",
        f1201: "1",
        f1202: "",
        f14: "2",
        f15: "1",
        f1761: "4",
        f1762: "3",
        f1763: "5",
        f1764: "5",
        f1765: "5",
        f1766: "4",
        f1767: "4",
        f1768: "4",
        f1769: "3",
        f1770: "1",
        f1771: "4",
        f1772: "3",
        f1773: "4",
        f1774: "3",
        f21: "3",
        f22: "5",
        f23: "1",
        f24: "2",
        f25: "2",
        f26: "2",
        f27: "1",
        f301: "2",
        f302: "",
        f303: "5",
        f401: "0",
        f402: "0",
        f403: "1",
        f404: "0",
        f405: "0",
        f406: "0",
        f407: "0",
        f408: "0",
        f409: "0",
        f410: "0",
        f411: "0",
        f412: "0",
        f413: "0",
        f414: "0",
        f415: "0",
        f416: "",
        f6: "5",
        f7: "4",
        f7a: "2",
        f1001: "1",
        f1002: "",
        f1601: "0",
        f1602: "0",
        f1603: "1",
        f1604: "0",
        f1605: "0",
        f1606: "0",
        f1607: "0",
        f1608: "0",
        f1609: "0",
        f1610: "0",
        f1611: "0",
        f1612: "0",
        f1613: "0",
        f1614: "",
        studentId: "20502201006",
      },
      {
        kdptimsmh: "161002",
        kdpstmsmh: "57201",
        nimhsmsmh: "20502201007",
        nmmhsmsmh: "Maxim Holmes",
        telpomsmh: "087412589632",
        emailmsmh: "s2300007@student.unklab.ac.id",
        tahun_lulus: "2022",
        nik: "717109876432",
        npwp: "22587413694",
        f8: "1",
        f504: "1",
        f502: "1",
        f505: "8000000",
        f506: "",
        f5a1: "Daerah Istimewa Yogyakarta",
        f5a2: "Yogyakarta",
        f1101: "6",
        f1102: "",
        f5b: "Hope",
        f5c: "",
        f5d: "Lokal/Wilayah/Wiraswasta/tidak berbadan hukum",
        f18a: "",
        f18b: "",
        f18c: "",
        f18d: "",
        f1201: "1",
        f1202: "",
        f14: "4",
        f15: "3",
        f1761: "2",
        f1762: "4",
        f1763: "3",
        f1764: "3",
        f1765: "4",
        f1766: "4",
        f1767: "5",
        f1768: "5",
        f1769: "3",
        f1770: "3",
        f1771: "2",
        f1772: "3",
        f1773: "4",
        f1774: "3",
        f21: "3",
        f22: "4",
        f23: "1",
        f24: "2",
        f25: "4",
        f26: "3",
        f27: "2",
        f301: "1",
        f302: "1",
        f303: "",
        f401: "0",
        f402: "1",
        f403: "0",
        f404: "0",
        f405: "0",
        f406: "0",
        f407: "0",
        f408: "0",
        f409: "0",
        f410: "0",
        f411: "0",
        f412: "0",
        f413: "0",
        f414: "0",
        f415: "0",
        f416: "",
        f6: "0",
        f7: "0",
        f7a: "0",
        f1001: "2",
        f1002: "",
        f1601: "1",
        f1602: "0",
        f1603: "0",
        f1604: "0",
        f1605: "0",
        f1606: "0",
        f1607: "0",
        f1608: "0",
        f1609: "0",
        f1610: "0",
        f1611: "0",
        f1612: "0",
        f1613: "0",
        f1614: "",
        studentId: "20502201007",
      },
      {
        kdptimsmh: "161002",
        kdpstmsmh: "55201",
        nimhsmsmh: "20502201011",
        nmmhsmsmh: "Tybalt Champneys",
        telpomsmh: "089513578624",
        emailmsmh: "s2300011@student.unklab.ac.id",
        tahun_lulus: "2023",
        nik: "71716253465746",
        npwp: "87654321455",
        f8: "1",
        f504: "1",
        f502: "5",
        f505: "9000000",
        f506: "",
        f5a1: "DKI Jakarta",
        f5a2: "Kota Administrasi Jakarta Barat",
        f1101: "1",
        f1102: "",
        f5b: "Dinas Kebersihan",
        f5c: "",
        f5d: "Lokal/Wilayah/Wiraswasta/tidak berbadan hukum",
        f18a: "",
        f18b: "",
        f18c: "",
        f18d: "",
        f1201: "4",
        f1202: "",
        f14: "5",
        f15: "3",
        f1761: "4",
        f1762: "3",
        f1763: "5",
        f1764: "2",
        f1765: "4",
        f1766: "4",
        f1767: "5",
        f1768: "3",
        f1769: "4",
        f1770: "4",
        f1771: "4",
        f1772: "2",
        f1773: "5",
        f1774: "2",
        f21: "3",
        f22: "3",
        f23: "2",
        f24: "4",
        f25: "3",
        f26: "2",
        f27: "2",
        f301: "1",
        f302: "4",
        f303: "",
        f401: "1",
        f402: "0",
        f403: "0",
        f404: "0",
        f405: "0",
        f406: "0",
        f407: "0",
        f408: "0",
        f409: "0",
        f410: "0",
        f411: "0",
        f412: "0",
        f413: "0",
        f414: "0",
        f415: "0",
        f416: "",
        f6: "4",
        f7: "3",
        f7a: "1",
        f1001: "1",
        f1002: "",
        f1601: "0",
        f1602: "0",
        f1603: "1",
        f1604: "0",
        f1605: "0",
        f1606: "0",
        f1607: "0",
        f1608: "0",
        f1609: "0",
        f1610: "0",
        f1611: "0",
        f1612: "0",
        f1613: "0",
        f1614: "",
        studentId: "20502201011",
      },
      {
        kdptimsmh: "161002",
        kdpstmsmh: "57201",
        nimhsmsmh: "20502201012",
        nmmhsmsmh: "Egor Smaling",
        telpomsmh: "08745136945",
        emailmsmh: "s2300012@student.unklab.ac.id",
        tahun_lulus: "2023",
        nik: "717154545214548",
        npwp: "78965412365487",
        f8: "1",
        f504: "1",
        f502: "5",
        f505: "8000000",
        f506: "",
        f5a1: "Banten",
        f5a2: "Serang",
        f1101: "6",
        f1102: "",
        f5b: "Ava Ia",
        f5c: "",
        f5d: "Lokal/Wilayah/Wiraswasta/tidak berbadan hukum",
        f18a: "",
        f18b: "",
        f18c: "",
        f18d: "",
        f1201: "1",
        f1202: "",
        f14: "3",
        f15: "2",
        f1761: "3",
        f1762: "4",
        f1763: "4",
        f1764: "2",
        f1765: "3",
        f1766: "4",
        f1767: "2",
        f1768: "3",
        f1769: "4",
        f1770: "5",
        f1771: "3",
        f1772: "4",
        f1773: "2",
        f1774: "1",
        f21: "3",
        f22: "3",
        f23: "2",
        f24: "4",
        f25: "5",
        f26: "2",
        f27: "2",
        f301: "1",
        f302: "3",
        f303: "",
        f401: "1",
        f402: "0",
        f403: "0",
        f404: "0",
        f405: "0",
        f406: "0",
        f407: "0",
        f408: "0",
        f409: "0",
        f410: "0",
        f411: "0",
        f412: "0",
        f413: "0",
        f414: "0",
        f415: "0",
        f416: "0",
        f6: "5",
        f7: "3",
        f7a: "2",
        f1001: "1",
        f1002: "",
        f1601: "0",
        f1602: "1",
        f1603: "0",
        f1604: "0",
        f1605: "0",
        f1606: "0",
        f1607: "0",
        f1608: "0",
        f1609: "0",
        f1610: "0",
        f1611: "0",
        f1612: "0",
        f1613: "0",
        f1614: "",
        studentId: "20502201012",
      },
      {
        kdptimsmh: "161002",
        kdpstmsmh: "57201",
        nimhsmsmh: "20502201016",
        nmmhsmsmh: "Rowan Origin",
        telpomsmh: "087451236589",
        emailmsmh: "s2300016@student.unklab.ac.id",
        tahun_lulus: "2023",
        nik: "7845123658",
        npwp: "7410258963025",
        f8: "5",
        f504: "",
        f502: "",
        f505: "",
        f506: "",
        f5a1: "",
        f5a2: "",
        f1101: "",
        f1102: "",
        f5b: "",
        f5c: "",
        f5d: "",
        f18a: "",
        f18b: "",
        f18c: "",
        f18d: "",
        f1201: "",
        f1202: "",
        f14: "",
        f15: "",
        f1761: "",
        f1762: "",
        f1763: "",
        f1764: "",
        f1765: "",
        f1766: "",
        f1767: "",
        f1768: "",
        f1769: "",
        f1770: "",
        f1771: "",
        f1772: "",
        f1773: "",
        f1774: "",
        f21: "",
        f22: "",
        f23: "",
        f24: "",
        f25: "",
        f26: "",
        f27: "",
        f301: "",
        f302: "",
        f303: "",
        f401: "0",
        f402: "0",
        f403: "0",
        f404: "0",
        f405: "0",
        f406: "0",
        f407: "0",
        f408: "0",
        f409: "0",
        f410: "0",
        f411: "0",
        f412: "0",
        f413: "0",
        f414: "0",
        f415: "0",
        f416: "",
        f6: "",
        f7: "",
        f7a: "",
        f1001: "",
        f1002: "",
        f1601: "0",
        f1602: "0",
        f1603: "0",
        f1604: "0",
        f1605: "0",
        f1606: "0",
        f1607: "0",
        f1608: "0",
        f1609: "0",
        f1610: "0",
        f1611: "0",
        f1612: "0",
        f1613: "0",
        f1614: "",
        studentId: "20502201016",
      },
    ],
  });

  await prisma.formSPT.createMany({
    data: [
      {
        full_name: "Brenda Rambi",
        reg_num: "s2200002",
        date_of_birth: "10-10-2002",
        gender: "FEMALE",
        nik: "71712345678910",
        nim: "10502201002",
        faculty: "Fakultas Ilmu Komputer",
        major: "Informatika",
        minor: "",
        birth_mother: "Ariana Grande",
        phone_num: "08177309038",
        personal_email: "brendarambi02@gmail.com",
        graduate_plan: "Semester II 2023/2024",
        remaining_credits: "6",
        remaining_classes: JSON.stringify([
          {
            subject: "Research Project II",
            sks: "3",
            keterangan: "Semester I 2023/2024",
          },
          {
            subject: "Introduction to Game Development",
            sks: "3",
            keterangan: "Semester I 2023/2024",
          },
        ]),
        certificateURL:
          "https://firebasestorage.googleapis.com/v0/b/filkom-apps-project.appspot.com/o/certificate%2F10502201002%2Fjavascript_basic%20certificate.pdf?alt=media&token=8bae54df-8f5c-4a47-9834-73491fe6dcb3",
        studentId: "10502201002",
      },
    ],
  });

  await prisma.student.updateMany({
    where: {
      major: "IF",
    },
    data: {
      majorGlobalId: "55201",
    },
  });

  await prisma.student.updateMany({
    where: {
      major: "SI",
    },
    data: {
      majorGlobalId: "57201",
    },
  });
}

main()
  .catch(async (e) => {
    console.log(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
