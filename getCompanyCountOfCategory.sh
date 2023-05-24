#!/bin/sh

categoryID=(`cat ./rawData/totalCategory`)
categoryTotalCount=${#categoryID[*]}

categoryNumber=0

while [ $categoryNumber -le $categoryTotalCount ]
do
	baseUrl=https://www.jobplanet.co.kr/companies/by_industry/${categoryID[categoryNumber]}
	
	categoryNumber=`expr $categoryNumber + 1`

	curl $baseUrl > ./rawData/numberOfEachCategory/$categoryNumber.html
done


