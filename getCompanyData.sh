#!/bin/sh

categoryIDs=(`cat ./rawData/totalCategory`)
categoryIDsLength=${#categoryIDs[*]}

idx=59

#while [ $idx -lt 2 ]
while [ $idx -lt $categoryIDsLength ]
do
	companyID=(`cat ./rawData/companyID/${categoryIDs[$idx]}/ids`)

	totalCompanyCount=${#companyID[*]}

	_idx=0
	while [ $_idx -lt $totalCompanyCount ]
	do
		baseUrl=https://www.jobplanet.co.kr/companies/${companyID[$_idx]}/landing

		_idx=`expr $_idx + 1`

		mkdir ./rawData/companyPage/${categoryIDs[$idx]}
		curl $baseUrl > ./rawData/companyPage/${categoryIDs[$idx]}/$_idx.html
	done

	idx=`expr $idx + 1`
done
