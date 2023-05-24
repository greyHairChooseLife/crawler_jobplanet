#!/bin/sh

categoryID=(`cat ./rawData/totalCategory`)

companyCount=(`cat ./rawData/totalCompanyCount`)

LENGTH=${#categoryID[*]}


#categoryNumber=0
categoryNumber=58

while [ $categoryNumber -lt $LENGTH ]
do
	pageNumber=0
	while [ $pageNumber -lt ${companyCount[$categoryNumber]} ]
	do
		_categoryID=${categoryID[$categoryNumber]}
		mkdir ./rawData/category/$_categoryID

		pageNumber=`expr $pageNumber + 1`

		baseUrl=https://www.jobplanet.co.kr/companies/by_industry/$_categoryID?page=$pageNumber

		curl $baseUrl > ./rawData/category/$_categoryID/$pageNumber.html
	done

	categoryNumber=`expr $categoryNumber + 1`
done
