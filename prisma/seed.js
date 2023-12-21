const { PrismaClient } = require("@prisma/client");
const { curriculum } = require("../app/database");
const prisma = new PrismaClient();

let kurikulum_informatika;

async function main() {
  // CREATE MAJOR
  await prisma.majorGlobal.createMany({
    data: [
      { id: "55201", shortName: "IF", name: "Informatika" },
      { id: "57201", shortName: "SI", name: "Sistem Informasi" },
    ],
  });

  // CREATE CURRICULUM
  await prisma.curriculum.create({
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
          userId: student.nim,
          role: "MAHASISWA",
        },
      });
    });

  await prisma.userRole.createMany({
    data: [
      {
        userId: "10502201001",
        role: "MAHASISWA",
      },
      {
        userId: "10502201002",
        role: "MAHASISWA",
      },
      {
        userId: "10502201003",
        role: "MAHASISWA",
      },
      {
        userId: "10502201004",
        role: "MAHASISWA",
      },
      {
        userId: "10502201005",
        role: "MAHASISWA",
      },
      {
        userId: "10502201006",
        role: "MAHASISWA",
      },
      {
        userId: "10502201007",
        role: "MAHASISWA",
      },
      {
        userId: "10502201008",
        role: "MAHASISWA",
      },
      {
        userId: "10502201009",
        role: "MAHASISWA",
      },
      {
        userId: "10502201010",
        role: "MAHASISWA",
      },
      {
        userId: "10502201011",
        role: "MAHASISWA",
      },
      {
        userId: "10502201012",
        role: "MAHASISWA",
      },
      {
        userId: "10502201013",
        role: "MAHASISWA",
      },
      {
        userId: "10502201014",
        role: "MAHASISWA",
      },
      {
        userId: "10502201015",
        role: "MAHASISWA",
      },
      {
        userId: "10502201016",
        role: "MAHASISWA",
      },
      {
        userId: "10502201017",
        role: "MAHASISWA",
      },
      {
        userId: "10502201018",
        role: "MAHASISWA",
      },
      {
        userId: "10502201019",
        role: "MAHASISWA",
      },
      {
        userId: "10502201020",
        role: "MAHASISWA",
      },
    ],
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
  await prisma.employee
    .create({
      data: {
        email: "dosen@test.com",
        phoneNum: "081283498",
        Address: "Manado",
        firstName: "Lecturer",
        lastName: "Dosen",
        nik: "dosen",
        password:
          "$2b$10$8i4.tmBGcK619R.lL6goi.GBRA3E7y25fARKYRqIPR46PjwlPV9eu",
      },
    })
    .then(async (employee) => {
      await prisma.userRole.create({
        data: {
          userId: employee.nik,
          role: "DOSEN",
        },
      });
    });

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

  // CREATE KAPRODI
  await prisma.employee
    .create({
      data: {
        Address: "Manado",
        phoneNum: "0819834412",
        email: "kaprodi@test.com",
        firstName: "Kaprodi",
        lastName: "Kaprodi",
        nik: "kaprodi",
        password:
          "$2b$10$8i4.tmBGcK619R.lL6goi.GBRA3E7y25fARKYRqIPR46PjwlPV9eu",
      },
    })
    .then(async (employee) => {
      await prisma.userRole.create({
        data: {
          userId: employee.nik,
          role: "KAPRODI",
        },
      });
    });

  // CREATE SEKRETARIS
  await prisma.employee
    .create({
      data: {
        Address: "Manado",
        phoneNum: "08193834412",
        email: "sekretaris1@test.com",
        firstName: "Sekretaris",
        lastName: "Sekretaris",
        nik: "sekretaris",
        password:
          "$2b$10$8i4.tmBGcK619R.lL6goi.GBRA3E7y25fARKYRqIPR46PjwlPV9eu",
      },
    })
    .then(async (employee) => {
      await prisma.userRole.create({
        data: {
          userId: employee.nik,
          role: "SEKRETARIS",
        },
      });
    });

  // CREATE REGISTER
  await prisma.employee
    .create({
      data: {
        Address: "Manado",
        phoneNum: "083834412",
        email: "register@test.com",
        firstName: "Register",
        lastName: "Register",
        nik: "register",
        password:
          "$2b$10$8i4.tmBGcK619R.lL6goi.GBRA3E7y25fARKYRqIPR46PjwlPV9eu",
      },
    })
    .then(async (employee) => {
      await prisma.userRole.create({
        data: {
          userId: employee.nik,
          role: "REGISTER",
        },
      });
    });

  // CREATE OPERATOR
  await prisma.employee
    .create({
      data: {
        email: "operator@test.com",
        phoneNum: "08128347934",
        Address: "Manado",
        firstName: "Operator",
        lastName: "LPMI",
        nik: "operatorlpmi",
        password:
          "$2b$10$8i4.tmBGcK619R.lL6goi.GBRA3E7y25fARKYRqIPR46PjwlPV9eu",
      },
    })
    .then(async (employee) => {
      await prisma.userRole.create({
        data: {
          userId: employee.nik,
          role: "OPERATOR_LPMI",
        },
      });
    });

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
          userId: student.nim,
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
          userId: student.nim,
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
          userId: student.nim,
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
          userId: student.nim,
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
          userId: student.nim,
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
          userId: student.nim,
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
          userId: student.nim,
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
          userId: student.nim,
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
          userId: student.nim,
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
          userId: student.nim,
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
          userId: student.nim,
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
          userId: student.nim,
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
          userId: student.nim,
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
          userId: student.nim,
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
          userId: student.nim,
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
            userId: employee.nik,
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
            userId: employee.nik,
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
            userId: employee.nik,
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
            userId: employee.nik,
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
            userId: employee.nik,
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
            userId: employee.nik,
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
            userId: employee.nik,
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
            userId: employee.nik,
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
            userId: employee.nik,
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
            userId: employee.nik,
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
            userId: employee.nik,
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
            userId: employee.nik,
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
            userId: employee.nik,
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
            userId: employee.nik,
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
            userId: employee.nik,
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
            userId: employee.nik,
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
            userId: employee.nik,
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
            userId: employee.nik,
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
            userId: employee.nik,
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
          userId: employee.nik,
          role: "OPERATOR_FAKULTAS",
        },
      });
    });

  // CREATE SKRIPSI APP DATA
  async function createSkripsiAppData() {
    try {
      // dosen1Id =
      //          advisor_1
      //          advisor_5
      //          coAdvisor1_2
      //          co_advisor2_3
      //          chairman_4
      //          member_5
      // dosen2Id =
      //          advisor_2
      //          co_advisor1_3
      //          co_advisor2_4
      //          dosen2Id
      //          chairman_1
      //          member_5
      // dosen3Id =
      //          advisor_3
      //          co_advisor1_4
      //          member_1
      //          chairman_2
      // dekanId =
      //          advisor_4
      //          member_2
      //          chairman_3
      // kaprodiSIId =
      //          member_3
      //          member_4
      // kaprodiTIId =
      //          chairman_5

      // Informatika
      // -finish
      const student1_1 = angelId;
      const title_1 = "Pengambangan Aplikasi Dinning";
      const submissionFileName_1 = "Pengambangan Aplikasi Dinning.pdf";
      const submissionFilePath_1 = "link_pengembangan_aplikasi_dinning";
      const proposalFileName_1 = "Skripsi 1_Pengambangan Aplikasi Dinning.pdf";
      const proposalPaymentFileName_1 = "Bukti Pembayaran Skripsi 1.pdf";
      const proposalPlagiatFileName_1 =
        "SKUHP-Uji 1_Angel_FILKOM_Skripsi 1_Pengambangan Aplikasi Dinning.pdf";
      const proposalFilePath_1 = "link_Skripsi_1_Pengambangan_Aplikasi_Dinning";
      const proposalPaymentPath_1 = "link_Bukti_Pembayaran_Skripsi_1";
      const proposalPlagiatPath_1 =
        "link_SKUHP_Uji_1_Angel_FILKOM_Skripsi_1_Pengambangan_Aplikasi_Dinning";
      const proposalRevisiFileName_1 =
        "Revisi Skripsi 1_Pengambangan Aplikasi Dinning.pdf";
      const proposalRevisiFilePath_1 =
        "link_Revisi_Skripsi_1_Pengambangan_Aplikasi_Dinning";
      const proposalStart_1 = "08:30";
      const proposalEnd_1 = "10:00";
      const proposalRoom_1 = "GK3-TL - Teacher Lounge";
      const proposalDate_1 = "24/11/2022";
      const skripsiFileName_1 = "Skripsi 2_Pengambangan Aplikasi Dinning.Pdf";
      const skripsiPaymentFileName_1 = "Bukti Pembayaran Skripsi 2.pdf";
      const skripsiPlagiatFileName_1 =
        "SKUHP-Uji 2_Angel_FILKOM_Skripsi 2_Pengambangan Aplikasi Dinning.pdf";
      const skripsiFilePath_1 = "link_Skripsi_2_Pengambangan_Aplikasi_Dinning";
      const skripsiPaymentPath_1 = "link_Bukti_Pembayaran_Skripsi_2";
      const skripsiPlagiatPath_1 =
        "link_SKUHP_Uji_2_Angel_FILKOM_Skripsi_2_Pengambangan_Aplikasi_Dinning";
      const skripsiRevisiFileName_1 =
        "Revisi Skripsi 2_Pengambangan Aplikasi Dinning.pdf";
      const skripsiRevisiFilePath_1 =
        "link_Revisi_Skripsi_2_Pengambangan_Aplikasi_Dinning";
      const skripsiStart_1 = "08:30";
      const skripsiEnd_1 = "10:00";
      const skripsiRoom_1 = "GK3-TL - Teacher Lounge";
      const skripsiDate_1 = "03/04/2023";
      const advisor_1 = dosen1Id;
      const chairman_1 = dosen2Id;
      const member_1 = dosen3Id;
      // -skripsi-empty
      const student1_2 = cindyId;
      const student2_2 = robbyId;
      const title_2 = "Pengembangan Aplikasi Reservasi Hotel";
      const submissionFileName_2 = "Pengembangan Aplikasi Reservasi Hotel.pdf";
      const submissionFilePath_2 = "link_pengembangan_aplikasi_reservasi_hotel";
      const proposalFileName_2 =
        "Skripsi 1_Pengembangan Aplikasi Reservasi Hotel.pdf";
      const proposalPaymentFileName_2 = "Bukti Pembayaran Skripsi 1.pdf";
      const proposalPlagiatFileName_2 =
        "SKUHP-Uji 1_Angel_FILKOM_Skripsi 1_Pengembangan Aplikasi Reservasi Hotel.pdf";
      const proposalFilePath_2 =
        "link_Skripsi_1_Pengembangan_Aplikasi_Reservasi_Hotel";
      const proposalPaymentPath_2 = "link_Bukti_Pembayaran_Skripsi_1";
      const proposalPlagiatPath_2 =
        "link_SKUHP_Uji_1_Angel_FILKOM_Skripsi_1_Pengembangan_Aplikasi_Reservasi_Hotel";
      const proposalRevisiFileName_2 =
        "Revisi Skripsi 1_Pengembangan Aplikasi Reservasi Hotel.pdf";
      const proposalRevisiFilePath_2 =
        "link_Revisi_Skripsi_1_Pengembangan_Aplikasi_Reservasi_Hotel";
      const proposalStart_2 = "09:00";
      const proposalEnd_2 = "11:30";
      const proposalRoom_2 = "GK4-TL - Teacher Lounge";
      const proposalDate_2 = "24/11/2022";
      const advisor_2 = dosen2Id;
      const co_advisor1_2 = dosen1Id;
      const chairman_2 = dosen3Id;
      const member_2 = dekanId;
      // Sistem Informasi
      // -finish
      const student1_3 = marcelId;
      const title_3 = "Pengembangan Aplikasi E-commerce";
      const submissionFileName_3 = "Pengembangan Aplikasi E-commerce.pdf";
      const submissionFilePath_3 = "link_pengembangan_aplikasi_ecommerce";
      const proposalFileName_3 =
        "Skripsi 1_Pengembangan Aplikasi E-commerce.pdf";
      const proposalPaymentFileName_3 = "Bukti Pembayaran Skripsi 1.pdf";
      const proposalPlagiatFileName_3 =
        "SKUHP-Uji 1_Angel_FILKOM_Skripsi 1_Pengembangan Aplikasi E-commerce.pdf";
      const proposalFilePath_3 =
        "link_Skripsi_1_Pengembangan_Aplikasi_Ecommerce";
      const proposalPaymentPath_3 = "link_Bukti_Pembayaran_Skripsi_1";
      const proposalPlagiatPath_3 =
        "link_SKUHP_Uji_1_Angel_FILKOM_Skripsi_1_Pengembangan_Aplikasi_Ecommerce";
      const proposalRevisiFileName_3 =
        "Revisi Skripsi 1_Pengembangan Aplikasi E-commerce.pdf";
      const proposalRevisiFilePath_3 =
        "link_Revisi_Skripsi_1_Pengembangan_Aplikasi_Ecommerce";
      const proposalStart_3 = "08:30";
      const proposalEnd_3 = "10:00";
      const proposalRoom_3 = "GK1-207";
      const proposalDate_3 = "24/11/2022";
      const skripsiFileName_3 =
        "Skripsi 2_Pengembangan Aplikasi E-commerce.pdf";
      const skripsiPaymentFileName_3 = "Bukti Pembayaran Skripsi 2.pdf";
      const skripsiPlagiatFileName_3 =
        "SKUHP-Uji 2_Angel_FILKOM_Skripsi 2_Pengembangan Aplikasi E-commerce.pdf";
      const skripsiFilePath_3 =
        "link_Skripsi_2_Pengembangan_Aplikasi_Ecommerce";
      const skripsiPaymentPath_3 = "link_Bukti_Pembayaran_Skripsi_2";
      const skripsiPlagiatPath_3 =
        "link_SKUHP_Uji_2_Angel_FILKOM_Skripsi_2_Pengembangan_Aplikasi_Ecommerce";
      const skripsiRevisiFileName_3 =
        "Revisi Skripsi 2_Pengembangan Aplikasi E-commerce.pdf";
      const skripsiRevisiFilePath_3 =
        "link_Revisi_Skripsi_2_Pengembangan_Aplikasi_Ecommerce";
      const skripsiStart_3 = "08:30";
      const skripsiEnd_3 = "10:00";
      const skripsiRoom_3 = "GK1-207";
      const skripsiDate_3 = "03/04/2023";
      const advisor_3 = dosen3Id;
      const co_advisor1_3 = dosen2Id;
      const co_advisor2_3 = dosen1Id;
      const chairman_3 = dekanId;
      const member_3 = kaprodiSIId;
      // -skripsi-empty
      const student1_4 = leaId;
      const student2_4 = rizkyID;
      const title_4 = "Pengembangan Aplikasi Sistem Informasi Keuangan";
      const submissionFileName_4 =
        "Pengembangan Aplikasi Sistem Informasi Keuangan.pdf";
      const submissionFilePath_4 =
        "link_pengembangan_aplikasi_sistem_informasi_keuangan";
      const proposalFileName_4 =
        "Skripsi 1_Pengembangan Aplikasi Sistem Informasi Keuangan.pdf";
      const proposalPaymentFileName_4 = "Bukti Pembayaran Skripsi 1.pdf";
      const proposalPlagiatFileName_4 =
        "SKUHP-Uji 1_Angel_FILKOM_Skripsi 1_Pengembangan Aplikasi Sistem Informasi Keuangan.pdf";
      const proposalFilePath_4 =
        "link_Skripsi_1_Pengembangan_Aplikasi_Sistem_Informasi_Keuangan";
      const proposalPaymentPath_4 = "link_Bukti_Pembayaran_Skripsi_1";
      const proposalPlagiatPath_4 =
        "link_SKUHP_Uji_1_Angel_FILKOM_Skripsi_1_Pengembangan_Aplikasi_Sistem_Informasi_Keuangan";
      const proposalRevisiFileName_4 =
        "Revisi Skripsi 1_Pengembangan Aplikasi Sistem Informasi Keuangan.pdf";
      const proposalRevisiFilePath_4 =
        "link_Revisi_Skripsi_1_Pengembangan_Aplikasi_Sistem_Informasi_Keuangan";
      const proposalStart_4 = "11:00";
      const proposalEnd_4 = "12:30";
      const proposalRoom_4 = "GK6-TL - Teacher Lounge";
      const proposalDate_4 = "24/11/2022";
      const advisor_4 = dekanId;
      const co_advisor1_4 = dosen3Id;
      const co_advisor2_4 = dosen2Id;
      const chairman_4 = dosen1Id;
      const member_4 = kaprodiSIId;

      // informatika
      // - Proposal-empty
      const student1_5 = sitiID;
      const student2_5 = wahyuID;
      const student3_5 = nadiaID;
      const title_5 = "Pengembangan Aplikasi Manajemen Proyek";
      const submissionFileName_5 = "Pengembangan Aplikasi Manajemen Proyek.pdf";
      const submissionFilePath_5 =
        "link_pengembangan_aplikasi_manajemen_proyek";
      const advisor_5 = dosen1Id;
      const chairman_5 = kaprodiTIId;
      const member_5 = dosen2Id;

      // akademik 1
      const academicCalendarGanjil = await prisma.academic_Calendar.create({
        data: {
          semester: "Ganjil",
          year: "2021/2022",
        },
      });

      const classroomProposalGanjil = await prisma.classroom.create({
        data: {
          dosen_mk_id: kaprodiTIId,
          academic_id: academicCalendarGanjil.id,
          name: "Proposal",
        },
      });

      // Skripsi
      const classroomSkripsiGanjilIF = await prisma.classroom.create({
        data: {
          dosen_mk_id: kaprodiTIId,
          academic_id: academicCalendarGanjil.id,
          name: "Skripsi",
        },
      });
      const classroomSkripsiGanjilSI = await prisma.classroom.create({
        data: {
          dosen_mk_id: kaprodiSIId,
          academic_id: academicCalendarGanjil.id,
          name: "Skripsi",
        },
      });
      // Proposal
      if (classroomProposalGanjil) {
        // student1_1
        const proposalStudent1_1 = await prisma.proposal_Student.create({
          data: {
            student_id: student1_1,
            classroom_id: classroomProposalGanjil.id,
          },
        });
        await prisma.skripsi_Student.create({
          data: {
            student_id: student1_1,
            classroom_id: classroomSkripsiGanjilIF.id,
          },
        });
        // Group student1_1
        const group_1 = await prisma.group.create({
          data: {
            title: title_1,
            progress: "Finished",
          },
        });
        await prisma.group_Student.create({
          data: {
            group_id: group_1.id,
            student_id: proposalStudent1_1.student_id,
          },
        });
        if (proposalStudent1_1) {
          // Submission student1_1
          const submission = await prisma.submission.create({
            data: {
              file_name: submissionFileName_1,
              upload_date: new Date(),
              file_size: "2.5 MB",
              file_path: submissionFilePath_1,
              is_consultation: true,
              proposed_advisor_id: advisor_1,
              is_approve: "Approve",
              classroom_id: classroomProposalGanjil.id,
            },
          });
          // Proposal student1_1
          const proposal = await prisma.proposal.create({
            data: {
              file_name_proposal: proposalFileName_1,
              file_name_payment: proposalPaymentFileName_1,
              file_name_plagiarismcheck: proposalPlagiatFileName_1,
              upload_date_proposal: new Date(),
              upload_date_payment: new Date(),
              upload_date_plagiarismcheck: new Date(),
              file_size_proposal: "2.5 MB",
              file_size_payment: "2.5 MB",
              file_size_plagiarismcheck: "2.5 MB",
              file_path_proposal: proposalFilePath_1,
              file_path_payment: proposalPaymentPath_1,
              file_path_plagiarismcheck: proposalPlagiatPath_1,
              advisor_id: advisor_1,
              classroom_id: classroomProposalGanjil.id,
              is_proposal_approve_by_advisor: "Approve",
              advisor_proposal_approved_date: new Date(),
              panelist_chairman_id: chairman_1,
              panelist_member_id: member_1,
              start_defence: proposalStart_1,
              end_defence: proposalEnd_1,
              defence_room: proposalRoom_1,
              defence_date: proposalDate_1,
              is_report_open: true,
              is_report_approve_by_dekan: true,
              is_report_approve_by_panelist_chairman: true,
              is_report_approve_by_panelist_member: true,
              is_report_approve_by_advisor: true,
              dekan_report_approve_date: new Date(),
              panelist_chairman_report_approve_date: new Date(),
              panelist_member_report_approve_date: new Date(),
              advisor_report_approve_date: new Date(),
              exam_conclution: "Approve",
              changes_conclusion: "Minor",
              assessment_conclution: "A-",
              is_pass: "Pass",
              report_date: proposalDate_1,
              file_name_revision: proposalRevisiFileName_1,
              upload_date_revision: new Date(),
              file_size_revision: "2.5 MB",
              file_path_revision: proposalRevisiFilePath_1,
              is_revision_approve_by_panelist_chairman: "Approve",
              is_revision_approve_by_panelist_member: "Approve",
              is_revision_approve_by_advisor: "Approve",
              panelist_chairman_revision_approve_date: new Date(),
              panelist_member_revision_approve_date: new Date(),
              advisor_revision_approve_date: new Date(),
            },
          });
          if (proposal) {
            // konsultasi student1_1 - advisor (1)
            await prisma.thesis_Consultation.create({
              data: {
                group_id: group_1.id,
                description: "Konsultasi bab 1",
                date: new Date(),
                dosen_id: advisor_1,
              },
            });
            // konsultasi student1_1 - advisor (2)
            await prisma.thesis_Consultation.create({
              data: {
                group_id: group_1.id,
                description: "Konsultasi bab 2",
                date: new Date(),
                dosen_id: advisor_1,
              },
            });
            // konsultasi student1_1 - advisor (3)
            await prisma.thesis_Consultation.create({
              data: {
                group_id: group_1.id,
                description: "Konsultasi bab 3",
                date: new Date(),
                dosen_id: advisor_1,
              },
            });

            // assessment student1_1 - student1 - ketua
            await prisma.proposal_Assessment.create({
              data: {
                proposal_id: proposal.id,
                student_id: proposalStudent1_1.student_id,
                dosen_id: chairman_1,
                value: "9",
              },
            });
            // assessment student1_1 - student1 - anggota
            await prisma.proposal_Assessment.create({
              data: {
                proposal_id: proposal.id,
                student_id: proposalStudent1_1.student_id,
                dosen_id: member_1,
                value: "9",
              },
            });
            // assessment student1_1 - student1 - advisor
            await prisma.proposal_Assessment.create({
              data: {
                proposal_id: proposal.id,
                student_id: proposalStudent1_1.student_id,
                dosen_id: advisor_1,
                value: "9",
              },
            });

            // changes student1_1 - ketua
            await prisma.proposal_Changes.create({
              data: {
                proposal_id: proposal.id,
                dosen_id: chairman_1,
                changes: "Ubah Bab 1",
              },
            });
            // changes student1_1 - anggota
            await prisma.proposal_Changes.create({
              data: {
                proposal_id: proposal.id,
                dosen_id: member_1,
                changes: "Ubah Bab 2",
              },
            });
            // changes student1_1 - advisor
            await prisma.proposal_Changes.create({
              data: {
                proposal_id: proposal.id,
                dosen_id: advisor_1,
                changes: "Ubah Bab 3",
              },
            });
          }
          // Skripsi student1_1
          const skripsi = await prisma.skripsi.create({
            data: {
              file_name_skripsi: skripsiFileName_1,
              file_name_payment: skripsiPaymentFileName_1,
              file_name_plagiarismcheck: skripsiPlagiatFileName_1,
              upload_date_skripsi: new Date(),
              upload_date_payment: new Date(),
              upload_date_plagiarismcheck: new Date(),
              file_size_skripsi: "2.5 MB",
              file_size_payment: "2.5 MB",
              file_size_plagiarismcheck: "2.5 MB",
              file_path_skripsi: skripsiFilePath_1,
              file_path_payment: skripsiPaymentPath_1,
              file_path_plagiarismcheck: skripsiPlagiatPath_1,
              advisor_id: advisor_1,
              classroom_id: classroomSkripsiGanjilIF.id,
              is_skripsi_approve_by_advisor: "Approve",
              is_skripsi_approve_by_co_advisor1: "Approve",
              is_skripsi_approve_by_co_advisor2: "Approve",
              advisor_skripsi_approved_date: new Date(),
              co_advisor1_skripsi_approved_date: new Date(),
              co_advisor2_skripsi_approved_date: new Date(),
              panelist_chairman_id: chairman_1,
              panelist_member_id: member_1,
              start_defence: skripsiStart_1,
              end_defence: skripsiEnd_1,
              defence_room: skripsiRoom_1,
              defence_date: skripsiDate_1,
              is_report_open: true,
              is_report_approve_by_dekan: true,
              is_report_approve_by_panelist_chairman: true,
              is_report_approve_by_panelist_member: true,
              is_report_approve_by_advisor: true,
              dekan_report_approve_date: new Date(),
              panelist_chairman_report_approve_date: new Date(),
              panelist_member_report_approve_date: new Date(),
              advisor_report_approve_date: new Date(),
              exam_conclution: "Approve",
              changes_conclusion: "Minor",
              assessment_conclution: "A-",
              is_pass: "Pass",
              report_date: skripsiDate_1,
              file_name_revision: skripsiRevisiFileName_1,
              upload_date_revision: new Date(),
              file_size_revision: "2.5 MB",
              file_path_revision: skripsiRevisiFilePath_1,
              is_revision_approve_by_panelist_chairman: "Approve",
              is_revision_approve_by_panelist_member: "Approve",
              is_revision_approve_by_advisor: "Approve",
              panelist_chairman_revision_approve_date: new Date(),
              panelist_member_revision_approve_date: new Date(),
              advisor_revision_approve_date: new Date(),
              file_name_hki: "HKI.pdf",
              file_name_journal: "Journal",
              file_name_sourcecode: "Source_Code.zip",
              upload_date_hki: new Date(),
              upload_date_journal: new Date(),
              upload_date_sourcecode: new Date(),
              file_size_hki: "2.5 MB",
              file_size_journal: "2.5 MB",
              file_size_sourcecode: "2.5 MB",
              link_soucecode: "link_source_code",
              upload_date_link_soucecode: new Date(),
              file_path_hki: "link_hki",
              file_path_journal: "link_journal",
              file_path_sourcecode: "link_source_code",
            },
          });
          if (skripsi) {
            // konsultasi student1_1 - advisor (1)
            await prisma.thesis_Consultation.create({
              data: {
                group_id: group_1.id,
                description: "Konsultasi bab 4",
                date: new Date(),
                dosen_id: advisor_1,
              },
            });
            // konsultasi student1_1 - advisor (2)
            await prisma.thesis_Consultation.create({
              data: {
                group_id: group_1.id,
                description: "Konsultasi bab 5",
                date: new Date(),
                dosen_id: advisor_1,
              },
            });
            // konsultasi student1_1 - advisor (3)
            await prisma.thesis_Consultation.create({
              data: {
                group_id: group_1.id,
                description: "Konsultasi penulisan",
                date: new Date(),
                dosen_id: advisor_1,
              },
            });

            // assessment student1_1 - student1 - ketua
            await prisma.skripsi_Assessment.create({
              data: {
                skripsi_id: skripsi.id,
                student_id: proposalStudent1_1.student_id,
                dosen_id: chairman_1,
                value: "9",
              },
            });
            // assessment student1_1 - student1 - anggota
            await prisma.skripsi_Assessment.create({
              data: {
                skripsi_id: skripsi.id,
                student_id: proposalStudent1_1.student_id,
                dosen_id: member_1,
                value: "9",
              },
            });
            // assessment student1_1 - student1 - advisor
            await prisma.skripsi_Assessment.create({
              data: {
                skripsi_id: skripsi.id,
                student_id: proposalStudent1_1.student_id,
                dosen_id: advisor_1,
                value: "9",
              },
            });

            // changes student1_1 - ketua
            await prisma.skripsi_Changes.create({
              data: {
                skripsi_id: skripsi.id,
                dosen_id: chairman_1,
                changes: "Ubah Bab 4",
              },
            });

            // changes student1_1 - anggota
            await prisma.skripsi_Changes.create({
              data: {
                skripsi_id: skripsi.id,
                dosen_id: member_1,
                changes: "Ubah Bab 5",
              },
            });

            // changes student1_1 - advisor
            await prisma.skripsi_Changes.create({
              data: {
                skripsi_id: skripsi.id,
                dosen_id: advisor_1,
                changes: "Ubah Bab use case",
              },
            });

            // Update group
            await prisma.group.update({
              where: {
                id: group_1.id,
              },
              data: {
                submission_id: submission.id,
                proposal_id: proposal.id,
                skripsi_id: skripsi.id,
              },
            });

            // History Submission
            await prisma.thesis_History.create({
              data: {
                user_id: student1_1,
                description: "Mengajukan Judul",
                date: new Date(),
                group_id: group_1.id,
              },
            });
            await prisma.thesis_History.create({
              data: {
                user_id: student1_1,
                description: "Mengubah Pengajuan Judul",
                date: new Date(),
                group_id: group_1.id,
              },
            });
            await prisma.thesis_History.create({
              data: {
                user_id: kaprodiTIId,
                description: "Mengganti Pembimbing",
                date: new Date(),
                group_id: group_1.id,
              },
            });
            await prisma.thesis_History.create({
              data: {
                user_id: kaprodiTIId,
                description: "Menyetujui Pengajuan Judul",
                date: new Date(),
                group_id: group_1.id,
              },
            });
            await prisma.thesis_History.create({
              data: {
                user_id: student1_1,
                description: "Mengganti Judul Penelitian",
                date: new Date(),
                group_id: group_1.id,
              },
            });
            // History Proposal
            await prisma.thesis_History.create({
              data: {
                user_id: student1_1,
                description: "Mengunggah Dokumen Proposal",
                date: new Date(),
                group_id: group_1.id,
              },
            });
            await prisma.thesis_History.create({
              data: {
                user_id: advisor_1,
                description: "Advisor Menyetujui Dokumen Proposal",
                date: new Date(),
                group_id: group_1.id,
              },
            });
            await prisma.thesis_History.create({
              data: {
                user_id: student1_1,
                description: "Mengunggah Bukti Pembayaran Proposal",
                date: new Date(),
                group_id: group_1.id,
              },
            });
            await prisma.thesis_History.create({
              data: {
                user_id: student1_1,
                description: "Mengunggah Bukti Pembayaran Proposal",
                date: new Date(),
                group_id: group_1.id,
              },
            });
            await prisma.thesis_History.create({
              data: {
                user_id: student1_1,
                description: "Mengunggah Hasil Cek Plagiat Proposal",
                date: new Date(),
                group_id: group_1.id,
              },
            });
            await prisma.thesis_History.create({
              data: {
                user_id: sekretarisId,
                description: "Menyusun Jadwal Sidang Proposal",
                date: new Date(),
                group_id: group_1.id,
              },
            });
            await prisma.thesis_History.create({
              data: {
                user_id: chairman_1,
                description: "Sidang Proposal di Mulai",
                date: new Date(),
                group_id: group_1.id,
              },
            });
            await prisma.thesis_History.create({
              data: {
                user_id: chairman_1,
                description: "Sidang Proposal Berakhir",
                date: new Date(),
                group_id: group_1.id,
              },
            });
            await prisma.thesis_History.create({
              data: {
                user_id: student1_1,
                description: "Menggungah Dokumen Revisi Proposal",
                date: new Date(),
                group_id: group_1.id,
              },
            });
            await prisma.thesis_History.create({
              data: {
                user_id: chairman_1,
                description: "Ketua Panelis Menyetujui Dokumen Revisi Proposal",
                date: new Date(),
                group_id: group_1.id,
              },
            });
            await prisma.thesis_History.create({
              data: {
                user_id: member_1,
                description:
                  "Anggota Panelis Menyetujui Dokumen Revisi Proposal",
                date: new Date(),
                group_id: group_1.id,
              },
            });
            await prisma.thesis_History.create({
              data: {
                user_id: advisor_1,
                description: "Advisor Menyetujui Dokumen Revisi Proposal",
                date: new Date(),
                group_id: group_1.id,
              },
            });
            // History Skripsi
            await prisma.thesis_History.create({
              data: {
                user_id: student1_1,
                description: "Mengunggah Dokumen Skripsi",
                date: new Date(),
                group_id: group_1.id,
              },
            });
            await prisma.thesis_History.create({
              data: {
                user_id: advisor_1,
                description: "Advisor Menyetujui Dokumen Skripsi",
                date: new Date(),
                group_id: group_1.id,
              },
            });
            await prisma.thesis_History.create({
              data: {
                user_id: student1_1,
                description: "Mengunggah Bukti Pembayaran Skripsi",
                date: new Date(),
                group_id: group_1.id,
              },
            });
            await prisma.thesis_History.create({
              data: {
                user_id: student1_1,
                description: "Mengunggah Bukti Pembayaran Skripsi",
                date: new Date(),
                group_id: group_1.id,
              },
            });
            await prisma.thesis_History.create({
              data: {
                user_id: student1_1,
                description: "Mengunggah Hasil Cek Plagiat Skripsi",
                date: new Date(),
                group_id: group_1.id,
              },
            });
            await prisma.thesis_History.create({
              data: {
                user_id: sekretarisId,
                description: "Menyusun Jadwal Sidang Skripsi",
                date: new Date(),
                group_id: group_1.id,
              },
            });
            await prisma.thesis_History.create({
              data: {
                user_id: chairman_1,
                description: "Sidang Skripsi di Mulai",
                date: new Date(),
                group_id: group_1.id,
              },
            });
            await prisma.thesis_History.create({
              data: {
                user_id: chairman_1,
                description: "Sidang Skripsi Berakhir",
                date: new Date(),
                group_id: group_1.id,
              },
            });
            await prisma.thesis_History.create({
              data: {
                user_id: student1_1,
                description: "Menggungah Dokumen Revisi Skripsi",
                date: new Date(),
                group_id: group_1.id,
              },
            });
            await prisma.thesis_History.create({
              data: {
                user_id: chairman_1,
                description: "Ketua Panelis Menyetujui Dokumen Revisi Skripsi",
                date: new Date(),
                group_id: group_1.id,
              },
            });
            await prisma.thesis_History.create({
              data: {
                user_id: member_1,
                description:
                  "Anggota Panelis Menyetujui Dokumen Revisi Skripsi",
                date: new Date(),
                group_id: group_1.id,
              },
            });
            await prisma.thesis_History.create({
              data: {
                user_id: advisor_1,
                description: "Advisor Menyetujui Dokumen Revisi Skripsi",
                date: new Date(),
                group_id: group_1.id,
              },
            });
            await prisma.thesis_History.create({
              data: {
                user_id: student1_1,
                description: "Mengunggah HKI",
                date: new Date(),
                group_id: group_1.id,
              },
            });
            await prisma.thesis_History.create({
              data: {
                user_id: student1_1,
                description: "Mengunggah Jurnal",
                date: new Date(),
                group_id: group_1.id,
              },
            });
            await prisma.thesis_History.create({
              data: {
                user_id: student1_1,
                description: "Mengunggah Source Code",
                date: new Date(),
                group_id: group_1.id,
              },
            });
            await prisma.thesis_History.create({
              data: {
                user_id: student1_1,
                description: "Mengunggah Link Source Code",
                date: new Date(),
                group_id: group_1.id,
              },
            });
          }
        }

        // =========================================================

        // student1_2
        const proposalStudent1_2 = await prisma.proposal_Student.create({
          data: {
            student_id: student1_2,
            classroom_id: classroomProposalGanjil.id,
          },
        });
        // student2_2
        const proposalStudent2_2 = await prisma.proposal_Student.create({
          data: {
            student_id: student2_2,
            classroom_id: classroomProposalGanjil.id,
          },
        });
        await prisma.skripsi_Student.create({
          data: {
            student_id: student1_2,
            classroom_id: classroomSkripsiGanjilIF.id,
          },
        });
        await prisma.skripsi_Student.create({
          data: {
            student_id: student2_2,
            classroom_id: classroomSkripsiGanjilIF.id,
          },
        });
        // Group
        const group_2 = await prisma.group.create({
          data: {
            title: title_2,
            progress: "Skripsi",
          },
        });
        await prisma.group_Student.create({
          data: {
            group_id: group_2.id,
            student_id: proposalStudent1_2.student_id,
          },
        });
        await prisma.group_Student.create({
          data: {
            group_id: group_2.id,
            student_id: proposalStudent2_2.student_id,
          },
        });
        if (proposalStudent1_2) {
          // Submission
          const submission = await prisma.submission.create({
            data: {
              file_name: submissionFileName_2,
              upload_date: new Date(),
              file_size: "2.5 MB",
              file_path: submissionFilePath_2,
              is_consultation: true,
              proposed_advisor_id: advisor_2,
              proposed_co_advisor1_id: co_advisor1_2,
              is_approve: "Approve",
              classroom_id: classroomProposalGanjil.id,
            },
          });
          // Proposal
          const proposal = await prisma.proposal.create({
            data: {
              file_name_proposal: proposalFileName_2,
              file_name_payment: proposalPaymentFileName_2,
              file_name_plagiarismcheck: proposalPlagiatFileName_2,
              upload_date_proposal: new Date(),
              upload_date_payment: new Date(),
              upload_date_plagiarismcheck: new Date(),
              file_size_proposal: "2.5 MB",
              file_size_payment: "2.5 MB",
              file_size_plagiarismcheck: "2.5 MB",
              file_path_proposal: proposalFilePath_2,
              file_path_payment: proposalPaymentPath_2,
              file_path_plagiarismcheck: proposalPlagiatPath_2,
              advisor_id: advisor_2,
              co_advisor1_id: co_advisor1_2,
              classroom_id: classroomProposalGanjil.id,
              is_proposal_approve_by_advisor: "Approve",
              is_proposal_approve_by_co_advisor1: "Approve",
              advisor_proposal_approved_date: new Date(),
              co_advisor1_proposal_approved_date: new Date(),
              panelist_chairman_id: chairman_2,
              panelist_member_id: member_2,
              start_defence: proposalStart_2,
              end_defence: proposalEnd_2,
              defence_room: proposalRoom_2,
              defence_date: proposalDate_2,
              is_report_open: true,
              is_report_approve_by_dekan: true,
              is_report_approve_by_panelist_chairman: true,
              is_report_approve_by_panelist_member: true,
              is_report_approve_by_advisor: true,
              dekan_report_approve_date: new Date(),
              panelist_chairman_report_approve_date: new Date(),
              panelist_member_report_approve_date: new Date(),
              advisor_report_approve_date: new Date(),
              exam_conclution: "Approve",
              changes_conclusion: "Minor",
              assessment_conclution: "A-",
              is_pass: "Pass",
              report_date: proposalDate_2,
              file_name_revision: proposalRevisiFileName_2,
              upload_date_revision: new Date(),
              file_size_revision: "2.5 MB",
              file_path_revision: proposalRevisiFilePath_2,
              is_revision_approve_by_panelist_chairman: "Approve",
              is_revision_approve_by_panelist_member: "Approve",
              is_revision_approve_by_advisor: "Approve",
              panelist_chairman_revision_approve_date: new Date(),
              panelist_member_revision_approve_date: new Date(),
              advisor_revision_approve_date: new Date(),
            },
          });
          if (proposal) {
            // konsultasi - advisor (1)
            await prisma.thesis_Consultation.create({
              data: {
                group_id: group_2.id,
                description: "Konsultasi bab 1",
                date: new Date(),
                dosen_id: advisor_2,
              },
            });
            // konsultasi - advisor (2)
            await prisma.thesis_Consultation.create({
              data: {
                group_id: group_2.id,
                description: "Konsultasi bab 2",
                date: new Date(),
                dosen_id: advisor_2,
              },
            });
            // konsultasi - advisor (3)
            await prisma.thesis_Consultation.create({
              data: {
                group_id: group_2.id,
                description: "Konsultasi bab 3",
                date: new Date(),
                dosen_id: advisor_2,
              },
            });
            // konsultasi - co-advisor1 (1)
            await prisma.thesis_Consultation.create({
              data: {
                group_id: group_2.id,
                description: "Konsultasi sistem",
                date: new Date(),
                dosen_id: co_advisor1_2,
              },
            });
            // konsultasi - co-advisor1 (2)
            await prisma.thesis_Consultation.create({
              data: {
                group_id: group_2.id,
                description: "Konsultasi database",
                date: new Date(),
                dosen_id: co_advisor1_2,
              },
            });
            // konsultasi - co-advisor1 (3)
            await prisma.thesis_Consultation.create({
              data: {
                group_id: group_2.id,
                description: "Konsultasi metode",
                date: new Date(),
                dosen_id: co_advisor1_2,
              },
            });

            // assessment student1_2 - ketua
            await prisma.proposal_Assessment.create({
              data: {
                proposal_id: proposal.id,
                student_id: proposalStudent1_2.student_id,
                dosen_id: chairman_2,
                value: "9",
              },
            });
            // assessment student1_2 - anggota
            await prisma.proposal_Assessment.create({
              data: {
                proposal_id: proposal.id,
                student_id: proposalStudent1_2.student_id,
                dosen_id: member_2,
                value: "9",
              },
            });
            // assessment student1_2 - advisor
            await prisma.proposal_Assessment.create({
              data: {
                proposal_id: proposal.id,
                student_id: proposalStudent1_2.student_id,
                dosen_id: advisor_2,
                value: "9",
              },
            });
            // assessment student2_2 - ketua
            await prisma.proposal_Assessment.create({
              data: {
                proposal_id: proposal.id,
                student_id: proposalStudent2_2.student_id,
                dosen_id: chairman_2,
                value: "9",
              },
            });
            // assessment student2_2 - anggota
            await prisma.proposal_Assessment.create({
              data: {
                proposal_id: proposal.id,
                student_id: proposalStudent2_2.student_id,
                dosen_id: member_2,
                value: "9",
              },
            });
            // assessment student2_2 - advisor
            await prisma.proposal_Assessment.create({
              data: {
                proposal_id: proposal.id,
                student_id: proposalStudent2_2.student_id,
                dosen_id: advisor_2,
                value: "9",
              },
            });

            // changes - ketua
            await prisma.proposal_Changes.create({
              data: {
                proposal_id: proposal.id,
                dosen_id: chairman_2,
                changes: "Ubah Bab 1",
              },
            });
            // changes - anggota
            await prisma.proposal_Changes.create({
              data: {
                proposal_id: proposal.id,
                dosen_id: member_2,
                changes: "Ubah Bab 2",
              },
            });
            // changes - advisor
            await prisma.proposal_Changes.create({
              data: {
                proposal_id: proposal.id,
                dosen_id: advisor_2,
                changes: "Ubah Bab 3",
              },
            });
            // changes - co-advisor1
            await prisma.proposal_Changes.create({
              data: {
                proposal_id: proposal.id,
                dosen_id: co_advisor1_2,
                changes: "Ubah Gambar",
              },
            });
          }
          // Skripsi
          const skripsi = await prisma.skripsi.create({
            data: {
              advisor_id: advisor_2,
              co_advisor1_id: co_advisor1_2,
              classroom_id: classroomSkripsiGanjilIF.id,
              panelist_chairman_id: chairman_2,
              panelist_member_id: member_2,
            },
          });
          if (skripsi) {
            await prisma.group.update({
              where: {
                id: group_2.id,
              },
              data: {
                submission_id: submission.id,
                proposal_id: proposal.id,
                skripsi_id: skripsi.id,
              },
            });

            // History Submission
            await prisma.thesis_History.create({
              data: {
                user_id: student1_2,
                description: "Mengajukan Judul",
                date: new Date(),
                group_id: group_2.id,
              },
            });
            await prisma.thesis_History.create({
              data: {
                user_id: student1_2,
                description: "Mengubah Pengajuan Judul",
                date: new Date(),
                group_id: group_2.id,
              },
            });
            await prisma.thesis_History.create({
              data: {
                user_id: kaprodiTIId,
                description: "Mengganti Pembimbing",
                date: new Date(),
                group_id: group_2.id,
              },
            });
            await prisma.thesis_History.create({
              data: {
                user_id: kaprodiTIId,
                description: "Menyetujui Pengajuan Judul",
                date: new Date(),
                group_id: group_2.id,
              },
            });
            await prisma.thesis_History.create({
              data: {
                user_id: student1_2,
                description: "Mengganti Judul Penelitian",
                date: new Date(),
                group_id: group_2.id,
              },
            });
            // History Proposal
            await prisma.thesis_History.create({
              data: {
                user_id: student1_2,
                description: "Mengunggah Dokumen Proposal",
                date: new Date(),
                group_id: group_2.id,
              },
            });
            await prisma.thesis_History.create({
              data: {
                user_id: advisor_2,
                description: "Advisor Menyetujui Dokumen Proposal",
                date: new Date(),
                group_id: group_2.id,
              },
            });
            await prisma.thesis_History.create({
              data: {
                user_id: co_advisor1_2,
                description: "Co-Advisor 1 Menyetujui Dokumen Proposal",
                date: new Date(),
                group_id: group_2.id,
              },
            });
            await prisma.thesis_History.create({
              data: {
                user_id: student2_2,
                description: "Mengunggah Bukti Pembayaran Proposal",
                date: new Date(),
                group_id: group_2.id,
              },
            });
            await prisma.thesis_History.create({
              data: {
                user_id: student2_2,
                description: "Mengunggah Bukti Pembayaran Proposal",
                date: new Date(),
                group_id: group_2.id,
              },
            });
            await prisma.thesis_History.create({
              data: {
                user_id: student2_2,
                description: "Mengunggah Hasil Cek Plagiat Proposal",
                date: new Date(),
                group_id: group_2.id,
              },
            });
            await prisma.thesis_History.create({
              data: {
                user_id: sekretarisId,
                description: "Menyusun Jadwal Sidang Proposal",
                date: new Date(),
                group_id: group_2.id,
              },
            });
            await prisma.thesis_History.create({
              data: {
                user_id: chairman_2,
                description: "Sidang Proposal di Mulai",
                date: new Date(),
                group_id: group_2.id,
              },
            });
            await prisma.thesis_History.create({
              data: {
                user_id: chairman_2,
                description: "Sidang Proposal Berakhir",
                date: new Date(),
                group_id: group_2.id,
              },
            });
            await prisma.thesis_History.create({
              data: {
                user_id: student1_2,
                description: "Menggungah Dokumen Revisi Proposal",
                date: new Date(),
                group_id: group_2.id,
              },
            });
            await prisma.thesis_History.create({
              data: {
                user_id: chairman_2,
                description: "Ketua Panelis Menyetujui Dokumen Revisi Proposal",
                date: new Date(),
                group_id: group_2.id,
              },
            });
            await prisma.thesis_History.create({
              data: {
                user_id: member_2,
                description:
                  "Anggota Panelis Menyetujui Dokumen Revisi Proposal",
                date: new Date(),
                group_id: group_2.id,
              },
            });
            await prisma.thesis_History.create({
              data: {
                user_id: advisor_2,
                description: "Advisor Menyetujui Dokumen Revisi Proposal",
                date: new Date(),
                group_id: group_2.id,
              },
            });
          }
        }

        // =========================================================

        // student1_3
        const proposalStudent1_3 = await prisma.proposal_Student.create({
          data: {
            student_id: student1_3,
            classroom_id: classroomProposalGanjil.id,
          },
        });
        await prisma.skripsi_Student.create({
          data: {
            student_id: student1_3,
            classroom_id: classroomSkripsiGanjilIF.id,
          },
        });
        // Group student1_3
        const group_3 = await prisma.group.create({
          data: {
            title: title_3,
            progress: "Finished",
          },
        });
        await prisma.group_Student.create({
          data: {
            group_id: group_3.id,
            student_id: proposalStudent1_3.student_id,
          },
        });
        if (proposalStudent1_3) {
          // Submission
          const submission = await prisma.submission.create({
            data: {
              file_name: submissionFileName_3,
              upload_date: new Date(),
              file_size: "2.5 MB",
              file_path: submissionFilePath_3,
              is_consultation: true,
              proposed_advisor_id: advisor_3,
              proposed_co_advisor1_id: co_advisor1_3,
              proposed_co_advisor2_id: co_advisor2_3,
              is_approve: "Approve",
              classroom_id: classroomProposalGanjil.id,
            },
          });
          // Proposal
          const proposal = await prisma.proposal.create({
            data: {
              file_name_proposal: proposalFileName_3,
              file_name_payment: proposalPaymentFileName_3,
              file_name_plagiarismcheck: proposalPlagiatFileName_3,
              upload_date_proposal: new Date(),
              upload_date_payment: new Date(),
              upload_date_plagiarismcheck: new Date(),
              file_size_proposal: "2.5 MB",
              file_size_payment: "2.5 MB",
              file_size_plagiarismcheck: "2.5 MB",
              file_path_proposal: proposalFilePath_3,
              file_path_payment: proposalPaymentPath_3,
              file_path_plagiarismcheck: proposalPlagiatPath_3,
              advisor_id: advisor_3,
              co_advisor1_id: co_advisor1_3,
              co_advisor2_id: co_advisor2_3,
              classroom_id: classroomProposalGanjil.id,
              is_proposal_approve_by_advisor: "Approve",
              advisor_proposal_approved_date: new Date(),
              panelist_chairman_id: chairman_3,
              panelist_member_id: member_3,
              start_defence: proposalStart_3,
              end_defence: proposalEnd_3,
              defence_room: proposalRoom_3,
              defence_date: proposalDate_3,
              is_report_open: true,
              is_report_approve_by_dekan: true,
              is_report_approve_by_panelist_chairman: true,
              is_report_approve_by_panelist_member: true,
              is_report_approve_by_advisor: true,
              dekan_report_approve_date: new Date(),
              panelist_chairman_report_approve_date: new Date(),
              panelist_member_report_approve_date: new Date(),
              advisor_report_approve_date: new Date(),
              exam_conclution: "Approve",
              changes_conclusion: "Minor",
              assessment_conclution: "A-",
              is_pass: "Pass",
              report_date: proposalDate_3,
              file_name_revision: proposalRevisiFileName_3,
              upload_date_revision: new Date(),
              file_size_revision: "2.5 MB",
              file_path_revision: proposalRevisiFilePath_3,
              is_revision_approve_by_panelist_chairman: "Approve",
              is_revision_approve_by_panelist_member: "Approve",
              is_revision_approve_by_advisor: "Approve",
              panelist_chairman_revision_approve_date: new Date(),
              panelist_member_revision_approve_date: new Date(),
              advisor_revision_approve_date: new Date(),
            },
          });
          if (proposal) {
            // konsultasi - advisor (1)
            await prisma.thesis_Consultation.create({
              data: {
                group_id: group_3.id,
                description: "Konsultasi bab 1",
                date: new Date(),
                dosen_id: advisor_3,
              },
            });
            // konsultasi - advisor (2)
            await prisma.thesis_Consultation.create({
              data: {
                group_id: group_3.id,
                description: "Konsultasi bab 2",
                date: new Date(),
                dosen_id: advisor_3,
              },
            });
            // konsultasi - advisor (3)
            await prisma.thesis_Consultation.create({
              data: {
                group_id: group_3.id,
                description: "Konsultasi bab 3",
                date: new Date(),
                dosen_id: advisor_3,
              },
            });
            // konsultasi - co-advisor1 (1)
            await prisma.thesis_Consultation.create({
              data: {
                group_id: group_3.id,
                description: "Konsultasi sistem",
                date: new Date(),
                dosen_id: co_advisor1_3,
              },
            });
            // konsultasi - co-advisor1 (2)
            await prisma.thesis_Consultation.create({
              data: {
                group_id: group_3.id,
                description: "Konsultasi database",
                date: new Date(),
                dosen_id: co_advisor1_3,
              },
            });
            // konsultasi - co-advisor1 (3)
            await prisma.thesis_Consultation.create({
              data: {
                group_id: group_3.id,
                description: "Konsultasi metode",
                date: new Date(),
                dosen_id: co_advisor1_3,
              },
            });

            // assessment student1_3 - ketua
            await prisma.proposal_Assessment.create({
              data: {
                proposal_id: proposal.id,
                student_id: proposalStudent1_3.student_id,
                dosen_id: chairman_3,
                value: "9",
              },
            });
            // assessment student1_3 - anggota
            await prisma.proposal_Assessment.create({
              data: {
                proposal_id: proposal.id,
                student_id: proposalStudent1_3.student_id,
                dosen_id: member_1,
                value: "9",
              },
            });
            // assessment student1_3 - advisor
            await prisma.proposal_Assessment.create({
              data: {
                proposal_id: proposal.id,
                student_id: proposalStudent1_3.student_id,
                dosen_id: advisor_3,
                value: "9",
              },
            });

            // changes - ketua
            await prisma.proposal_Changes.create({
              data: {
                proposal_id: proposal.id,
                dosen_id: chairman_3,
                changes: "Ubah Bab 1",
              },
            });
            // changes - anggota
            await prisma.proposal_Changes.create({
              data: {
                proposal_id: proposal.id,
                dosen_id: member_3,
                changes: "Ubah Bab 2",
              },
            });
            // changes - advisor
            await prisma.proposal_Changes.create({
              data: {
                proposal_id: proposal.id,
                dosen_id: advisor_3,
                changes: "Ubah Bab 3",
              },
            });
          }
          // Skripsi
          const skripsi = await prisma.skripsi.create({
            data: {
              file_name_skripsi: skripsiFileName_3,
              file_name_payment: skripsiPaymentFileName_3,
              file_name_plagiarismcheck: skripsiPlagiatFileName_3,
              upload_date_skripsi: new Date(),
              upload_date_payment: new Date(),
              upload_date_plagiarismcheck: new Date(),
              file_size_skripsi: "2.5 MB",
              file_size_payment: "2.5 MB",
              file_size_plagiarismcheck: "2.5 MB",
              file_path_skripsi: skripsiFilePath_3,
              file_path_payment: skripsiPaymentPath_3,
              file_path_plagiarismcheck: skripsiPlagiatPath_3,
              advisor_id: advisor_3,
              co_advisor1_id: co_advisor1_3,
              co_advisor2_id: co_advisor2_3,
              classroom_id: classroomSkripsiGanjilSI.id,
              is_skripsi_approve_by_advisor: "Approve",
              is_skripsi_approve_by_co_advisor1: "Approve",
              is_skripsi_approve_by_co_advisor2: "Approve",
              advisor_skripsi_approved_date: new Date(),
              co_advisor1_skripsi_approved_date: new Date(),
              co_advisor2_skripsi_approved_date: new Date(),
              panelist_chairman_id: chairman_3,
              panelist_member_id: member_3,
              start_defence: skripsiStart_3,
              end_defence: skripsiEnd_3,
              defence_room: skripsiRoom_3,
              defence_date: skripsiDate_3,
              is_report_open: true,
              is_report_approve_by_dekan: true,
              is_report_approve_by_panelist_chairman: true,
              is_report_approve_by_panelist_member: true,
              is_report_approve_by_advisor: true,
              dekan_report_approve_date: new Date(),
              panelist_chairman_report_approve_date: new Date(),
              panelist_member_report_approve_date: new Date(),
              advisor_report_approve_date: new Date(),
              exam_conclution: "Approve",
              changes_conclusion: "Minor",
              assessment_conclution: "A-",
              is_pass: "Pass",
              report_date: skripsiDate_3,
              file_name_revision: skripsiRevisiFileName_3,
              upload_date_revision: new Date(),
              file_size_revision: "2.5 MB",
              file_path_revision: skripsiRevisiFilePath_3,
              is_revision_approve_by_panelist_chairman: "Approve",
              is_revision_approve_by_panelist_member: "Approve",
              is_revision_approve_by_advisor: "Approve",
              panelist_chairman_revision_approve_date: new Date(),
              panelist_member_revision_approve_date: new Date(),
              advisor_revision_approve_date: new Date(),
              file_name_hki: "HKI.pdf",
              file_name_journal: "Journal",
              file_name_sourcecode: "Source_Code.zip",
              upload_date_hki: new Date(),
              upload_date_journal: new Date(),
              upload_date_sourcecode: new Date(),
              file_size_hki: "2.5 MB",
              file_size_journal: "2.5 MB",
              file_size_sourcecode: "2.5 MB",
              link_soucecode: "link_source_code",
              upload_date_link_soucecode: new Date(),
              file_path_hki: "link_hki",
              file_path_journal: "link_journal",
              file_path_sourcecode: "link_source_code",
            },
          });
          if (skripsi) {
            // konsultasi - advisor (1)
            await prisma.thesis_Consultation.create({
              data: {
                group_id: group_3.id,
                description: "Konsultasi bab 4",
                date: new Date(),
                dosen_id: advisor_3,
              },
            });
            // konsultasi - advisor (2)
            await prisma.thesis_Consultation.create({
              data: {
                group_id: group_3.id,
                description: "Konsultasi bab 5",
                date: new Date(),
                dosen_id: advisor_3,
              },
            });
            // konsultasi - advisor (3)
            await prisma.thesis_Consultation.create({
              data: {
                group_id: group_3.id,
                description: "Konsultasi penulisan",
                date: new Date(),
                dosen_id: advisor_3,
              },
            });

            // assessment student1_3 - ketua
            await prisma.skripsi_Assessment.create({
              data: {
                skripsi_id: skripsi.id,
                student_id: proposalStudent1_1.student_id,
                dosen_id: chairman_3,
                value: "9",
              },
            });
            // assessment student1_3 - anggota
            await prisma.skripsi_Assessment.create({
              data: {
                skripsi_id: skripsi.id,
                student_id: proposalStudent1_1.student_id,
                dosen_id: member_3,
                value: "9",
              },
            });
            // assessment student1_3 - advisor
            await prisma.skripsi_Assessment.create({
              data: {
                skripsi_id: skripsi.id,
                student_id: proposalStudent1_1.student_id,
                dosen_id: advisor_3,
                value: "9",
              },
            });

            // changes - ketua
            await prisma.skripsi_Changes.create({
              data: {
                skripsi_id: skripsi.id,
                dosen_id: chairman_1,
                changes: "Ubah Bab 4",
              },
            });

            // changes - anggota
            await prisma.skripsi_Changes.create({
              data: {
                skripsi_id: skripsi.id,
                dosen_id: member_1,
                changes: "Ubah Bab 5",
              },
            });

            // changes - advisor
            await prisma.skripsi_Changes.create({
              data: {
                skripsi_id: skripsi.id,
                dosen_id: advisor_1,
                changes: "Ubah Bab use case",
              },
            });

            // Update group
            await prisma.group.update({
              where: {
                id: group_3.id,
              },
              data: {
                submission_id: submission.id,
                proposal_id: proposal.id,
                skripsi_id: skripsi.id,
              },
            });

            // History Submission
            await prisma.thesis_History.create({
              data: {
                user_id: student1_3,
                description: "Mengajukan Judul",
                date: new Date(),
                group_id: group_3.id,
              },
            });
            await prisma.thesis_History.create({
              data: {
                user_id: student1_3,
                description: "Mengubah Pengajuan Judul",
                date: new Date(),
                group_id: group_3.id,
              },
            });
            await prisma.thesis_History.create({
              data: {
                user_id: kaprodiSIId,
                description: "Mengganti Pembimbing",
                date: new Date(),
                group_id: group_3.id,
              },
            });
            await prisma.thesis_History.create({
              data: {
                user_id: kaprodiSIId,
                description: "Menyetujui Pengajuan Judul",
                date: new Date(),
                group_id: group_3.id,
              },
            });
            await prisma.thesis_History.create({
              data: {
                user_id: student1_3,
                description: "Mengganti Judul Penelitian",
                date: new Date(),
                group_id: group_3.id,
              },
            });
            // History Proposal
            await prisma.thesis_History.create({
              data: {
                user_id: student1_3,
                description: "Mengunggah Dokumen Proposal",
                date: new Date(),
                group_id: group_3.id,
              },
            });
            await prisma.thesis_History.create({
              data: {
                user_id: advisor_3,
                description: "Advisor Menyetujui Dokumen Proposal",
                date: new Date(),
                group_id: group_3.id,
              },
            });
            await prisma.thesis_History.create({
              data: {
                user_id: co_advisor1_3,
                description: "Co-Advisor 1 Menyetujui Dokumen Proposal",
                date: new Date(),
                group_id: group_3.id,
              },
            });
            await prisma.thesis_History.create({
              data: {
                user_id: co_advisor2_3,
                description: "Co-Advisor 2 Menyetujui Dokumen Proposal",
                date: new Date(),
                group_id: group_3.id,
              },
            });
            await prisma.thesis_History.create({
              data: {
                user_id: student1_3,
                description: "Mengunggah Bukti Pembayaran Proposal",
                date: new Date(),
                group_id: group_3.id,
              },
            });
            await prisma.thesis_History.create({
              data: {
                user_id: student1_3,
                description: "Mengunggah Bukti Pembayaran Proposal",
                date: new Date(),
                group_id: group_3.id,
              },
            });
            await prisma.thesis_History.create({
              data: {
                user_id: student1_3,
                description: "Mengunggah Hasil Cek Plagiat Proposal",
                date: new Date(),
                group_id: group_3.id,
              },
            });
            await prisma.thesis_History.create({
              data: {
                user_id: sekretarisId,
                description: "Menyusun Jadwal Sidang Proposal",
                date: new Date(),
                group_id: group_3.id,
              },
            });
            await prisma.thesis_History.create({
              data: {
                user_id: chairman_3,
                description: "Sidang Proposal di Mulai",
                date: new Date(),
                group_id: group_3.id,
              },
            });
            await prisma.thesis_History.create({
              data: {
                user_id: chairman_3,
                description: "Sidang Proposal Berakhir",
                date: new Date(),
                group_id: group_3.id,
              },
            });
            await prisma.thesis_History.create({
              data: {
                user_id: student1_1,
                description: "Menggungah Dokumen Revisi Proposal",
                date: new Date(),
                group_id: group_3.id,
              },
            });
            await prisma.thesis_History.create({
              data: {
                user_id: chairman_3,
                description: "Ketua Panelis Menyetujui Dokumen Revisi Proposal",
                date: new Date(),
                group_id: group_3.id,
              },
            });
            await prisma.thesis_History.create({
              data: {
                user_id: member_3,
                description:
                  "Anggota Panelis Menyetujui Dokumen Revisi Proposal",
                date: new Date(),
                group_id: group_3.id,
              },
            });
            await prisma.thesis_History.create({
              data: {
                user_id: advisor_3,
                description: "Advisor Menyetujui Dokumen Revisi Proposal",
                date: new Date(),
                group_id: group_3.id,
              },
            });
            // History Skripsi
            await prisma.thesis_History.create({
              data: {
                user_id: student1_3,
                description: "Mengunggah Dokumen Skripsi",
                date: new Date(),
                group_id: group_3.id,
              },
            });
            await prisma.thesis_History.create({
              data: {
                user_id: advisor_3,
                description: "Advisor Menyetujui Dokumen Skripsi",
                date: new Date(),
                group_id: group_3.id,
              },
            });
            await prisma.thesis_History.create({
              data: {
                user_id: student1_3,
                description: "Mengunggah Bukti Pembayaran Skripsi",
                date: new Date(),
                group_id: group_3.id,
              },
            });
            await prisma.thesis_History.create({
              data: {
                user_id: student1_3,
                description: "Mengunggah Bukti Pembayaran Skripsi",
                date: new Date(),
                group_id: group_3.id,
              },
            });
            await prisma.thesis_History.create({
              data: {
                user_id: student1_3,
                description: "Mengunggah Hasil Cek Plagiat Skripsi",
                date: new Date(),
                group_id: group_3.id,
              },
            });
            await prisma.thesis_History.create({
              data: {
                user_id: sekretarisId,
                description: "Menyusun Jadwal Sidang Skripsi",
                date: new Date(),
                group_id: group_3.id,
              },
            });
            await prisma.thesis_History.create({
              data: {
                user_id: chairman_3,
                description: "Sidang Skripsi di Mulai",
                date: new Date(),
                group_id: group_3.id,
              },
            });
            await prisma.thesis_History.create({
              data: {
                user_id: chairman_3,
                description: "Sidang Skripsi Berakhir",
                date: new Date(),
                group_id: group_3.id,
              },
            });
            await prisma.thesis_History.create({
              data: {
                user_id: student1_3,
                description: "Menggungah Dokumen Revisi Skripsi",
                date: new Date(),
                group_id: group_3.id,
              },
            });
            await prisma.thesis_History.create({
              data: {
                user_id: chairman_3,
                description: "Ketua Panelis Menyetujui Dokumen Revisi Skripsi",
                date: new Date(),
                group_id: group_3.id,
              },
            });
            await prisma.thesis_History.create({
              data: {
                user_id: member_3,
                description:
                  "Anggota Panelis Menyetujui Dokumen Revisi Skripsi",
                date: new Date(),
                group_id: group_3.id,
              },
            });
            await prisma.thesis_History.create({
              data: {
                user_id: advisor_3,
                description: "Advisor Menyetujui Dokumen Revisi Skripsi",
                date: new Date(),
                group_id: group_3.id,
              },
            });
            await prisma.thesis_History.create({
              data: {
                user_id: student1_3,
                description: "Mengunggah HKI",
                date: new Date(),
                group_id: group_3.id,
              },
            });
            await prisma.thesis_History.create({
              data: {
                user_id: student1_3,
                description: "Mengunggah Jurnal",
                date: new Date(),
                group_id: group_3.id,
              },
            });
            await prisma.thesis_History.create({
              data: {
                user_id: student1_3,
                description: "Mengunggah Source Code",
                date: new Date(),
                group_id: group_3.id,
              },
            });
            await prisma.thesis_History.create({
              data: {
                user_id: student1_3,
                description: "Mengunggah Link Source Code",
                date: new Date(),
                group_id: group_3.id,
              },
            });
          }
        }

        // // =========================================================

        // student1_4
        const proposalStudent1_4 = await prisma.proposal_Student.create({
          data: {
            student_id: student1_4,
            classroom_id: classroomProposalGanjil.id,
          },
        });
        // student2_4
        const proposalStudent2_4 = await prisma.proposal_Student.create({
          data: {
            student_id: student2_4,
            classroom_id: classroomProposalGanjil.id,
          },
        });
        await prisma.skripsi_Student.create({
          data: {
            student_id: student1_4,
            classroom_id: classroomSkripsiGanjilSI.id,
          },
        });
        await prisma.skripsi_Student.create({
          data: {
            student_id: student2_4,
            classroom_id: classroomSkripsiGanjilSI.id,
          },
        });
        // Group
        const group_4 = await prisma.group.create({
          data: {
            title: title_4,
            progress: "Skripsi",
          },
        });
        await prisma.group_Student.create({
          data: {
            group_id: group_4.id,
            student_id: proposalStudent1_4.student_id,
          },
        });
        await prisma.group_Student.create({
          data: {
            group_id: group_4.id,
            student_id: proposalStudent2_4.student_id,
          },
        });
        if (proposalStudent1_4) {
          // Submission
          const submission = await prisma.submission.create({
            data: {
              file_name: submissionFileName_4,
              upload_date: new Date(),
              file_size: "2.5 MB",
              file_path: submissionFilePath_4,
              is_consultation: true,
              proposed_advisor_id: advisor_4,
              proposed_co_advisor1_id: co_advisor1_4,
              proposed_co_advisor2_id: co_advisor2_4,
              is_approve: "Approve",
              classroom_id: classroomProposalGanjil.id,
            },
          });
          // Proposal
          const proposal = await prisma.proposal.create({
            data: {
              file_name_proposal: proposalFileName_4,
              file_name_payment: proposalPaymentFileName_4,
              file_name_plagiarismcheck: proposalPlagiatFileName_4,
              upload_date_proposal: new Date(),
              upload_date_payment: new Date(),
              upload_date_plagiarismcheck: new Date(),
              file_size_proposal: "2.5 MB",
              file_size_payment: "2.5 MB",
              file_size_plagiarismcheck: "2.5 MB",
              file_path_proposal: proposalFilePath_4,
              file_path_payment: proposalPaymentPath_4,
              file_path_plagiarismcheck: proposalPlagiatPath_4,
              advisor_id: advisor_4,
              co_advisor1_id: co_advisor1_4,
              co_advisor2_id: co_advisor2_4,
              classroom_id: classroomProposalGanjil.id,
              is_proposal_approve_by_advisor: "Approve",
              is_proposal_approve_by_co_advisor1: "Approve",
              is_proposal_approve_by_co_advisor2: "Approve",
              advisor_proposal_approved_date: new Date(),
              co_advisor1_proposal_approved_date: new Date(),
              co_advisor2_proposal_approved_date: new Date(),
              panelist_chairman_id: chairman_4,
              panelist_member_id: member_4,
              start_defence: proposalStart_4,
              end_defence: proposalEnd_4,
              defence_room: proposalRoom_4,
              defence_date: proposalDate_4,
              is_report_open: true,
              is_report_approve_by_dekan: true,
              is_report_approve_by_panelist_chairman: true,
              is_report_approve_by_panelist_member: true,
              is_report_approve_by_advisor: true,
              dekan_report_approve_date: new Date(),
              panelist_chairman_report_approve_date: new Date(),
              panelist_member_report_approve_date: new Date(),
              advisor_report_approve_date: new Date(),
              exam_conclution: "Approve",
              changes_conclusion: "Minor",
              assessment_conclution: "A-",
              is_pass: "Pass",
              report_date: proposalDate_4,
              file_name_revision: proposalRevisiFileName_4,
              upload_date_revision: new Date(),
              file_size_revision: "2.5 MB",
              file_path_revision: proposalRevisiFilePath_4,
              is_revision_approve_by_panelist_chairman: "Approve",
              is_revision_approve_by_panelist_member: "Approve",
              is_revision_approve_by_advisor: "Approve",
              panelist_chairman_revision_approve_date: new Date(),
              panelist_member_revision_approve_date: new Date(),
              advisor_revision_approve_date: new Date(),
            },
          });
          if (proposal) {
            // konsultasi - advisor (1)
            await prisma.thesis_Consultation.create({
              data: {
                group_id: group_4.id,
                description: "Konsultasi bab 1",
                date: new Date(),
                dosen_id: advisor_4,
              },
            });
            // konsultasi - advisor (2)
            await prisma.thesis_Consultation.create({
              data: {
                group_id: group_4.id,
                description: "Konsultasi bab 2",
                date: new Date(),
                dosen_id: advisor_4,
              },
            });
            // konsultasi - advisor (3)
            await prisma.thesis_Consultation.create({
              data: {
                group_id: group_4.id,
                description: "Konsultasi bab 3",
                date: new Date(),
                dosen_id: advisor_4,
              },
            });
            // konsultasi - co-advisor1 (1)
            await prisma.thesis_Consultation.create({
              data: {
                group_id: group_4.id,
                description: "Konsultasi sistem",
                date: new Date(),
                dosen_id: co_advisor1_4,
              },
            });
            // konsultasi - co-advisor1 (2)
            await prisma.thesis_Consultation.create({
              data: {
                group_id: group_4.id,
                description: "Konsultasi database",
                date: new Date(),
                dosen_id: co_advisor1_4,
              },
            });
            // konsultasi - co-advisor1 (3)
            await prisma.thesis_Consultation.create({
              data: {
                group_id: group_4.id,
                description: "Konsultasi metode",
                date: new Date(),
                dosen_id: co_advisor1_4,
              },
            });
            // konsultasi - co-advisor2 (1)
            await prisma.thesis_Consultation.create({
              data: {
                group_id: group_4.id,
                description: "Konsultasi UI",
                date: new Date(),
                dosen_id: co_advisor2_4,
              },
            });
            // konsultasi - co-advisor2 (2)
            await prisma.thesis_Consultation.create({
              data: {
                group_id: group_4.id,
                description: "Konsultasi Warna",
                date: new Date(),
                dosen_id: co_advisor2_4,
              },
            });
            // konsultasi - co-advisor2 (3)
            await prisma.thesis_Consultation.create({
              data: {
                group_id: group_4.id,
                description: "Konsultasi Konsep",
                date: new Date(),
                dosen_id: co_advisor2_4,
              },
            });

            // assessment student1_4 - ketua
            await prisma.proposal_Assessment.create({
              data: {
                proposal_id: proposal.id,
                student_id: proposalStudent1_4.student_id,
                dosen_id: chairman_4,
                value: "9",
              },
            });
            // assessment student1_4 - anggota
            await prisma.proposal_Assessment.create({
              data: {
                proposal_id: proposal.id,
                student_id: proposalStudent1_4.student_id,
                dosen_id: member_4,
                value: "9",
              },
            });
            // assessment student1_4 - advisor
            await prisma.proposal_Assessment.create({
              data: {
                proposal_id: proposal.id,
                student_id: proposalStudent1_4.student_id,
                dosen_id: advisor_4,
                value: "9",
              },
            });
            // assessment student2_4 - ketua
            await prisma.proposal_Assessment.create({
              data: {
                proposal_id: proposal.id,
                student_id: proposalStudent2_4.student_id,
                dosen_id: chairman_4,
                value: "9",
              },
            });
            // assessment student2_4 - anggota
            await prisma.proposal_Assessment.create({
              data: {
                proposal_id: proposal.id,
                student_id: proposalStudent2_4.student_id,
                dosen_id: member_4,
                value: "9",
              },
            });
            // assessment student2_4 - advisor
            await prisma.proposal_Assessment.create({
              data: {
                proposal_id: proposal.id,
                student_id: proposalStudent2_4.student_id,
                dosen_id: advisor_4,
                value: "9",
              },
            });

            // changes - ketua
            await prisma.proposal_Changes.create({
              data: {
                proposal_id: proposal.id,
                dosen_id: chairman_4,
                changes: "Ubah Bab 1",
              },
            });
            // changes - anggota
            await prisma.proposal_Changes.create({
              data: {
                proposal_id: proposal.id,
                dosen_id: member_4,
                changes: "Ubah Bab 2",
              },
            });
            // changes - advisor
            await prisma.proposal_Changes.create({
              data: {
                proposal_id: proposal.id,
                dosen_id: advisor_4,
                changes: "Ubah Bab 3",
              },
            });
            // changes - co-advisor1
            await prisma.proposal_Changes.create({
              data: {
                proposal_id: proposal.id,
                dosen_id: co_advisor1_4,
                changes: "Ubah Gambar",
              },
            });
          }
          // Skripsi student1_2
          const skripsi = await prisma.skripsi.create({
            data: {
              advisor_id: advisor_4,
              co_advisor1_id: co_advisor2_4,
              classroom_id: classroomSkripsiGanjilSI.id,
              panelist_chairman_id: chairman_4,
              panelist_member_id: member_4,
            },
          });
          if (skripsi) {
            await prisma.group.update({
              where: {
                id: group_4.id,
              },
              data: {
                submission_id: submission.id,
                proposal_id: proposal.id,
                skripsi_id: skripsi.id,
              },
            });

            // History Submission
            await prisma.thesis_History.create({
              data: {
                user_id: student1_4,
                description: "Mengajukan Judul",
                date: new Date(),
                group_id: group_4.id,
              },
            });
            await prisma.thesis_History.create({
              data: {
                user_id: student1_4,
                description: "Mengubah Pengajuan Judul",
                date: new Date(),
                group_id: group_4.id,
              },
            });
            await prisma.thesis_History.create({
              data: {
                user_id: kaprodiTIId,
                description: "Mengganti Pembimbing",
                date: new Date(),
                group_id: group_4.id,
              },
            });
            await prisma.thesis_History.create({
              data: {
                user_id: kaprodiTIId,
                description: "Menyetujui Pengajuan Judul",
                date: new Date(),
                group_id: group_4.id,
              },
            });
            await prisma.thesis_History.create({
              data: {
                user_id: student2_4,
                description: "Mengganti Judul Penelitian",
                date: new Date(),
                group_id: group_4.id,
              },
            });
            // History Proposal
            await prisma.thesis_History.create({
              data: {
                user_id: student2_4,
                description: "Mengunggah Dokumen Proposal",
                date: new Date(),
                group_id: group_4.id,
              },
            });
            await prisma.thesis_History.create({
              data: {
                user_id: advisor_4,
                description: "Advisor Menyetujui Dokumen Proposal",
                date: new Date(),
                group_id: group_4.id,
              },
            });
            await prisma.thesis_History.create({
              data: {
                user_id: co_advisor1_4,
                description: "Co-Advisor 1 Menyetujui Dokumen Proposal",
                date: new Date(),
                group_id: group_4.id,
              },
            });
            await prisma.thesis_History.create({
              data: {
                user_id: co_advisor2_4,
                description: "Co-Advisor 2 Menyetujui Dokumen Proposal",
                date: new Date(),
                group_id: group_4.id,
              },
            });
            await prisma.thesis_History.create({
              data: {
                user_id: student2_4,
                description: "Mengunggah Bukti Pembayaran Proposal",
                date: new Date(),
                group_id: group_4.id,
              },
            });
            await prisma.thesis_History.create({
              data: {
                user_id: student2_4,
                description: "Mengunggah Bukti Pembayaran Proposal",
                date: new Date(),
                group_id: group_4.id,
              },
            });
            await prisma.thesis_History.create({
              data: {
                user_id: student2_4,
                description: "Mengunggah Hasil Cek Plagiat Proposal",
                date: new Date(),
                group_id: group_4.id,
              },
            });
            await prisma.thesis_History.create({
              data: {
                user_id: sekretarisId,
                description: "Menyusun Jadwal Sidang Proposal",
                date: new Date(),
                group_id: group_4.id,
              },
            });
            await prisma.thesis_History.create({
              data: {
                user_id: chairman_4,
                description: "Sidang Proposal di Mulai",
                date: new Date(),
                group_id: group_4.id,
              },
            });
            await prisma.thesis_History.create({
              data: {
                user_id: chairman_4,
                description: "Sidang Proposal Berakhir",
                date: new Date(),
                group_id: group_4.id,
              },
            });
            await prisma.thesis_History.create({
              data: {
                user_id: student1_4,
                description: "Menggungah Dokumen Revisi Proposal",
                date: new Date(),
                group_id: group_4.id,
              },
            });
            await prisma.thesis_History.create({
              data: {
                user_id: chairman_4,
                description: "Ketua Panelis Menyetujui Dokumen Revisi Proposal",
                date: new Date(),
                group_id: group_4.id,
              },
            });
            await prisma.thesis_History.create({
              data: {
                user_id: member_4,
                description:
                  "Anggota Panelis Menyetujui Dokumen Revisi Proposal",
                date: new Date(),
                group_id: group_4.id,
              },
            });
            await prisma.thesis_History.create({
              data: {
                user_id: advisor_4,
                description: "Advisor Menyetujui Dokumen Revisi Proposal",
                date: new Date(),
                group_id: group_4.id,
              },
            });
          }
        }

        // =========================================================

        // student1_5
        const proposalStudent1_5 = await prisma.proposal_Student.create({
          data: {
            student_id: student1_5,
            classroom_id: classroomProposalGanjil.id,
          },
        });
        // student2_5
        const proposalStudent2_5 = await prisma.proposal_Student.create({
          data: {
            student_id: student2_5,
            classroom_id: classroomProposalGanjil.id,
          },
        });
        // student3_5
        const proposalStudent3_5 = await prisma.proposal_Student.create({
          data: {
            student_id: student3_5,
            classroom_id: classroomProposalGanjil.id,
          },
        });
        await prisma.skripsi_Student.create({
          data: {
            student_id: student1_5,
            classroom_id: classroomSkripsiGanjilSI.id,
          },
        });
        await prisma.skripsi_Student.create({
          data: {
            student_id: student2_5,
            classroom_id: classroomSkripsiGanjilSI.id,
          },
        });
        await prisma.skripsi_Student.create({
          data: {
            student_id: student3_5,
            classroom_id: classroomSkripsiGanjilSI.id,
          },
        });
        // Group
        const group_5 = await prisma.group.create({
          data: {
            title: title_5,
            progress: "Proposal",
          },
        });
        await prisma.group_Student.create({
          data: {
            group_id: group_5.id,
            student_id: proposalStudent1_5.student_id,
          },
        });
        await prisma.group_Student.create({
          data: {
            group_id: group_5.id,
            student_id: proposalStudent2_5.student_id,
          },
        });
        await prisma.group_Student.create({
          data: {
            group_id: group_5.id,
            student_id: proposalStudent3_5.student_id,
          },
        });
        if (proposalStudent1_5) {
          // Submission
          const submission = await prisma.submission.create({
            data: {
              file_name: submissionFileName_5,
              upload_date: new Date(),
              file_size: "2.5 MB",
              file_path: submissionFilePath_5,
              is_consultation: true,
              proposed_advisor_id: advisor_5,
              is_approve: "Approve",
              classroom_id: classroomProposalGanjil.id,
            },
          });
          // Proposal
          const proposal = await prisma.proposal.create({
            data: {
              advisor_id: advisor_5,
              classroom_id: classroomProposalGanjil.id,
              is_proposal_approve_by_advisor: "Approve",
              advisor_proposal_approved_date: new Date(),
            },
          });
          // Skripsi student1_2
          const skripsi = await prisma.skripsi.create({
            data: {
              advisor_id: advisor_5,
              classroom_id: classroomSkripsiGanjilIF.id,
            },
          });
          if (skripsi) {
            await prisma.group.update({
              where: {
                id: group_5.id,
              },
              data: {
                submission_id: submission.id,
                proposal_id: proposal.id,
                skripsi_id: skripsi.id,
              },
            });

            // History Submission
            await prisma.thesis_History.create({
              data: {
                user_id: student1_5,
                description: "Mengajukan Judul",
                date: new Date(),
                group_id: group_5.id,
              },
            });
            await prisma.thesis_History.create({
              data: {
                user_id: student1_5,
                description: "Mengubah Pengajuan Judul",
                date: new Date(),
                group_id: group_5.id,
              },
            });
            await prisma.thesis_History.create({
              data: {
                user_id: kaprodiTIId,
                description: "Mengganti Pembimbing",
                date: new Date(),
                group_id: group_5.id,
              },
            });
            await prisma.thesis_History.create({
              data: {
                user_id: kaprodiTIId,
                description: "Menyetujui Pengajuan Judul",
                date: new Date(),
                group_id: group_5.id,
              },
            });
            await prisma.thesis_History.create({
              data: {
                user_id: student2_5,
                description: "Mengganti Judul Penelitian",
                date: new Date(),
                group_id: group_5.id,
              },
            });
          }
        }
      }
    } catch (error) {
      // Tangani kesalahan jika terjadi
      console.error(error);
    }
  }

  // Panggil fungsi untuk membuat entitas akademik
  createSkripsiAppData();

  await prisma.student.createMany({
    data: [
      {
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

  //--------------------------------------Klabat Bridge--------------------------------------------
  // Create Alumni
  await prisma.student.createMany({
    data: [
      {
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
        userId: "20502201001",
        role: "ALUMNI",
      },
      {
        userId: "20502201002",
        role: "ALUMNI",
      },
      {
        userId: "20502201003",
        role: "ALUMNI",
      },
      {
        userId: "20502201004",
        role: "ALUMNI",
      },
      {
        userId: "20502201005",
        role: "ALUMNI",
      },
      {
        userId: "20502201006",
        role: "ALUMNI",
      },
      {
        userId: "20502201007",
        role: "ALUMNI",
      },
      {
        userId: "20502201008",
        role: "ALUMNI",
      },
      {
        userId: "20502201009",
        role: "ALUMNI",
      },
      {
        userId: "20502201010",
        role: "ALUMNI",
      },
      {
        userId: "20502201011",
        role: "ALUMNI",
      },
      {
        userId: "20502201012",
        role: "ALUMNI",
      },
      {
        userId: "20502201013",
        role: "ALUMNI",
      },
      {
        userId: "20502201014",
        role: "ALUMNI",
      },
      {
        userId: "20502201015",
        role: "ALUMNI",
      },
      {
        userId: "20502201016",
        role: "ALUMNI",
      },
      {
        userId: "20502201017",
        role: "ALUMNI",
      },
      {
        userId: "20502201018",
        role: "ALUMNI",
      },
      {
        userId: "20502201019",
        role: "ALUMNI",
      },
      {
        userId: "20502201020",
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
