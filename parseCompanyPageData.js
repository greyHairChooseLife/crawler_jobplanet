const cheerio = require('cheerio');
const fs = require('fs');
const util = require('util');

const categoryIDs = fs.readFileSync('./rawData/totalCategory', {encoding: 'utf8'}).split('\n')
categoryIDs.pop();

for(let i=0; i<categoryIDs.length; i++) {
//for(let i=0; i<2; i++) {
	const dirFileCount = fs.readdirSync(`./rawData/companyPage/${categoryIDs[i]}`).length;

	const result = []; 

	for(let _i=1; _i<=dirFileCount; _i++) {
		const baseURL = `./rawData/companyPage/${categoryIDs[i]}/`;
		const filename = `${_i}.html`;
		const html = fs.readFileSync(baseURL+filename, {encoding: 'utf8'})
		const pieceCompanyInfo = extractCompanyInfo(html);

		result.push(pieceCompanyInfo);
	}

	//console.log(util.inspect(result, {depth: null}));

	//fs.writeFileSync(`./DATA/${categoryIDs[i]}/${i}.json`, JSON.stringify(result))
	fs.writeFileSync(`./DATA/${i}.json`, JSON.stringify(result))
}


function extractCompanyInfo(html) {
	if(html === undefined || html === null) throw new Error('no html');

	const storyDom = cheerio.load(html)

	const name = storyDom('body > div.body_wrap > div.cmp_hd > div.new_top_bnr > div > div.top_bnr_wrap > div > div > div.company_info_sec > div.company_info_box > div.company_name > h1 > a').text();
	const ups = storyDom('ul.basic_info_list > li > div > div > strong').map((_, idx) => storyDom(idx).text()).toArray();
//	const downs = storyDom('ul.basic_info_more > li > dl > dd').map((_, idx) => {
//		if(_ === 4) {
//			const years = storyDom('ul.basic_info_more > li:nth-child(5) > dl > dd > ol > li > em').map((_, idx) => storyDom(idx).text()).toArray();
//			const descs = storyDom('ul.basic_info_more > li:nth-child(5) > dl > dd > ol > li > span').map((_, idx) => storyDom(idx).text()).toArray();
//			return [years, descs]
//		}
//		else
//			return storyDom(idx).text()
//	}).toArray();
	const downs = storyDom('ul.basic_info_more > li > dl > dd').map((_, idx) => storyDom(idx).text()).toArray();

	const historyYears = storyDom('ul.basic_info_more > li:nth-child(5) > dl > dd > ol > li > em').map((_, idx) => storyDom(idx).text()).toArray();
	const historyDescs = storyDom('ul.basic_info_more > li:nth-child(5) > dl > dd > ol > li > span').map((_, idx) => storyDom(idx).text()).toArray();
	const history = historyDescs.length !== 0 ? historyYears.map((ele, idx) => {
		return {
			[ele]: historyDescs[idx]
		}
	}) : '-';

	return {
		name: name,
		industry: ups[0],
		companyShape: ups[1],
		employees: ups[2],
		establish: ups[3],
		ceo: downs[0],
		sales: downs[1],
		address: downs[2],
		website: downs[3],
		history: history,
		introduce: downs[5]
	}
}
