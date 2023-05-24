const cheerio = require('cheerio');
const fs = require('fs');
const util = require('util');

const categoryIDs = fs.readFileSync('./rawData/totalCategory', {encoding: 'utf8'}).split('\n')
categoryIDs.pop();

//for(let i=0; i<20; i++) {
for(let i=0; i<categoryIDs.length; i++) {
	const dirFileCount = fs.readdirSync(`./rawData/category/${categoryIDs[i]}`).length;
	
	fs.mkdirSync(`./rawData/companyID/${categoryIDs[i]}`);

	const targets = []; 

	for(let j=1; j<=dirFileCount; j++) {
		const baseURL = `./rawData/category/${categoryIDs[i]}/`;
		const filename = `${j}.html`;
		const html = fs.readFileSync(baseURL+filename, {encoding: 'utf8'})
		const pieceCompanyID = extractCompanyID(html);

		targets.push(...pieceCompanyID);
	}

	fs.writeFileSync(`./rawData/companyID/${categoryIDs[i]}/ids`, targets.join(' '))
}



function extractCompanyID(html) {
	if(html === undefined || html === null) throw new Error('no html');

	const storyDom = cheerio.load(html)

	return storyDom('button.btn_heart1').map((_, idx) => storyDom(idx).attr('data-company_id')).toArray()
}


