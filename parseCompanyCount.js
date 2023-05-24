const cheerio = require('cheerio');
const fs = require('fs');
const util = require('util');

const dirFileCount = fs.readdirSync('./rawData/numberOfEachCategory').length;

const result = []; 

for(let i=1; i<=dirFileCount; i++) {
	const baseURL = './rawData/numberOfEachCategory/';
	const filename = `${i}.html`;
	const html = fs.readFileSync(baseURL+filename, {encoding: 'utf8'})
	const pieceCompanyInfo = extractCompanyCount(html);

	result.push(pieceCompanyInfo);
}

fs.writeFileSync('./rawData/totalCompanyCount', JSON.stringify(result, 2))

function extractCompanyCount(html) {
	if(html === undefined || html === null) throw new Error('no html');

	const storyDom = cheerio.load(html)

	const count = storyDom('#listCompaniesTitle > span').text();

	return count
//	const name = storyDom('body > div.body_wrap > div.cmp_hd > div.new_top_bnr > div > div.top_bnr_wrap > div > div > div.company_info_sec > div.company_info_box > div.company_name > h1 > a').text();
//	const ups = storyDom('ul.basic_info_list > li > div > div > strong').map((_, idx) => storyDom(idx).text()).toArray();
////	const downs = storyDom('ul.basic_info_more > li > dl > dd').map((_, idx) => {
////		if(_ === 4) {
////			const years = storyDom('ul.basic_info_more > li:nth-child(5) > dl > dd > ol > li > em').map((_, idx) => storyDom(idx).text()).toArray();
////			const descs = storyDom('ul.basic_info_more > li:nth-child(5) > dl > dd > ol > li > span').map((_, idx) => storyDom(idx).text()).toArray();
////			return [years, descs]
////		}
////		else
////			return storyDom(idx).text()
////	}).toArray();
//	const downs = storyDom('ul.basic_info_more > li > dl > dd').map((_, idx) => storyDom(idx).text()).toArray();
//
//	const historyYears = storyDom('ul.basic_info_more > li:nth-child(5) > dl > dd > ol > li > em').map((_, idx) => storyDom(idx).text()).toArray();
//	const historyDescs = storyDom('ul.basic_info_more > li:nth-child(5) > dl > dd > ol > li > span').map((_, idx) => storyDom(idx).text()).toArray();
//	const history = historyDescs.length !== 0 ? historyYears.map((ele, idx) => {
//		return {
//			[ele]: historyDescs[idx]
//		}
//	}) : '-';
//
//	return {
//		name: name,
//		industry: ups[0],
//		companyShape: ups[1],
//		employees: ups[2],
//		establish: ups[3],
//		ceo: downs[0],
//		sales: downs[1],
//		address: downs[2],
//		website: downs[3],
//		history: history,
//		introduce: downs[5]
//	}
}
