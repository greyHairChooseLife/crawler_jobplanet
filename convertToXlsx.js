const excel = require('exceljs');
const fs = require('fs');

const workbook = new excel.Workbook();
const sheet1 = workbook.addWorksheet('sheet1');

sheet1.columns = [
	'name',
	'main_category',
	'industry',
	'companyShape',
	'employees',
	'establish',
	'ceo',
	'sales',
	'address',
	'website',
	'history',
	'introduce',
].map(ele => ({header: ele, key: ele}));

const categoryInfo = {
	100: "서비스업",
	200: "제조/화학",
	300: "의료/제약/복지",
	400: "유통/무역/운송",
	500: "교육업",
	600: "건설업",
	700: "IT/웹/통신",
	800: "미디어/디자인",
	900: "은행/금융업",
	1000: "기관/협회",
}

for(let i=0; i<72; i++) {
	const stringData = fs.readFileSync(`./DATA/${i}.json`, {encoding:'utf8'});
	const rawTotalData = JSON.parse(stringData);
	
	let mainCategory = '';
	if(i+1 <= 9) mainCategory = 100;
	else if(i+1 <= 23) mainCategory = 200;
	else if(i+1 <= 27) mainCategory = 300;
	else if(i+1 <= 31) mainCategory = 400;
	else if(i+1 <= 37) mainCategory = 500;
	else if(i+1 <= 42) mainCategory = 600;
	else if(i+1 <= 52) mainCategory = 700;
	else if(i+1 <= 62) mainCategory = 800;
	else if(i+1 <= 66) mainCategory = 900;
	else if(i+1 <= 72) mainCategory = 1000;

	for(let j=0; j<rawTotalData.length; j++) {
		const rawData = rawTotalData[j];	// obj of each
		if(rawData.name === '') console.log(i, j)

		const data = [{
			'name': rawData.name,
			'main_category': categoryInfo[mainCategory],
			'industry': rawData.industry,
			'companyShape': rawData.companyShape,
			'employees': rawData.employees,
			'establish': rawData.establish,
			'ceo': rawData.ceo,
			'sales': rawData.sales,
			'address': rawData.address,
			'website': rawData.website,
			'history': rawData.history,
			'introduce': rawData.introduce
		}]

		sheet1.addRows(data);
	}
}

workbook.xlsx.writeFile(`./DATA/jobplanetTotalCompanyInfo.xlsx`);
