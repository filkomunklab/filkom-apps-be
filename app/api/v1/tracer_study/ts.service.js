const tsRepository = require("./ts.repository");
const excel = require("exceljs");
const moment = require("moment");

const tracerStudy = async () => {
  return await tsRepository.tracerstudy();
};

const createTS = async (dataSPT) => {
  return await tsRepository.createTS(dataSPT);
};

const exportTStoExcel = async (filename) => {
  //tambah moment for return year
  // const currentYear = moment().format("YYYY");

  const tracerstudy = await tsRepository.tracerstudy();

  const filteredTS = tracerstudy;
  // .filter(
  //   (data) => data.created_at === currentYear
  // );

  const workbook = new excel.Workbook();
  const worksheet = workbook.addWorksheet("Data Tracer Study");
  worksheet.columns = [
    { header: "kdptimsmh", key: "kdptimsmh" },
    { header: "kdpstmsmh", key: "kdpstmsmh" },
    { header: "nimhsmsmh", key: "nimhsmsmh" },
    { header: "nmmhsmsmh", key: "nmmhsmsmh" },
    { header: "telpomsmh", key: "telpomsmh" },
    { header: "emailmsmh", key: "emailmsmh" },
    { header: "tahun_lulus", key: "tahun_lulus" },
    { header: "nik", key: "nik" },
    { header: "npwp", key: "npwp" },
    { header: "f8", key: "f8" },
    { header: "f504", key: "f504" },
    { header: "f502", key: "f502" },
    { header: "f505", key: "f505" },
    { header: "f506", key: "f506" },
    { header: "f5a1", key: "f5a1" },
    { header: "f5a2", key: "f5a2" },
    { header: "f1101", key: "f1101" },
    { header: "f1102", key: "f1102" },
    { header: "f5b", key: "f5b" },
    { header: "f5c", key: "f5c" },
    { header: "f5d", key: "f5d" },
    { header: "f18a", key: "f18a" },
    { header: "f18b", key: "f18b" },
    { header: "f18c", key: "f18c" },
    { header: "f18d", key: "f18d" },
    { header: "f1201", key: "f1201" },
    { header: "f1202", key: "f1202" },
    { header: "f14", key: "f14" },
    { header: "f15", key: "f15" },
    { header: "f1761", key: "f1761" },
    { header: "f1762", key: "f1762" },
    { header: "f1763", key: "f1763" },
    { header: "f1764", key: "f1764" },
    { header: "f1765", key: "f1765" },
    { header: "f1766", key: "f1766" },
    { header: "f1767", key: "f1767" },
    { header: "f1768", key: "f1768" },
    { header: "f1769", key: "f1769" },
    { header: "f1770", key: "f1770" },
    { header: "f1771", key: "f1771" },
    { header: "f1772", key: "f1772" }, //
    { header: "f1773", key: "f1773" },
    { header: "f1774", key: "f1774" },
    { header: "f21", key: "f21" },
    { header: "f22", key: "f22" },
    { header: "f23", key: "f23" },
    { header: "f24", key: "f24" },
    { header: "f25", key: "f25" },
    { header: "f26", key: "f26" },
    { header: "f27", key: "f27" },
    { header: "f301", key: "f301" },
    { header: "f302", key: "f302" },
    { header: "f303", key: "f303" },
    { header: "f401", key: "f401" },
    { header: "f402", key: "f402" },
    { header: "f403", key: "f403" },
    { header: "f404", key: "f404" },
    { header: "f405", key: "f405" },
    { header: "f406", key: "f406" },
    { header: "f407", key: "f407" },
    { header: "f408", key: "f408" },
    { header: "f409", key: "f409" },
    { header: "f410", key: "f410" },
    { header: "f411", key: "f411" },
    { header: "f412", key: "f412" },
    { header: "f413", key: "f413" },
    { header: "f414", key: "f414" },
    { header: "f415", key: "f415" },
    { header: "f416", key: "f416" },
    { header: "f6", key: "f6" },
    { header: "f7", key: "f7" },
    { header: "f7a", key: "f7a" },
    { header: "f1001", key: "f1001" },
    { header: "f1002", key: "f1002" },
    { header: "f1601", key: "f1601" },
    { header: "f1602", key: "f1602" },
    { header: "f1603", key: "f1603" },
    { header: "f1604", key: "f1604" },
    { header: "f1605", key: "f1605" },
    { header: "f1606", key: "f1606" },
    { header: "f1607", key: "f1607" },
    { header: "f1608", key: "f1608" },
    { header: "f1609", key: "f1609" },
    { header: "f1610", key: "f1610" },
    { header: "f1611", key: "f1611" },
    { header: "f1612", key: "f1612" },
    { header: "f1613", key: "f1613" },
    { header: "f1614", key: "f1614" },
  ];

  filteredTS.forEach((tracerstudy) => {
    worksheet.addRow(tracerstudy);
  });

  const buffer = await workbook.xlsx.writeBuffer();
  return buffer;
};

module.exports = {
  createTS,
  tracerStudy,
  exportTStoExcel,
};
