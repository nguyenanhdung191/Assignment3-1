const fetch = require( "node-fetch" );
const fileWriter = require("write");


const createAuthenticationHeader = (username, password) => "Basic " + new Buffer( username + ":" + password ).toString( "base64" );
const transform = json => {
	let csvString = "dataElement,period,orgUnit,value\n";
	json.rows.forEach(row => {
		csvString += `${json.metaData.names[row[0]]},${row[1]},${json.metaData.names[row[2]]},${row[3]}\n`;
	});
	return csvString;
};

fetch(
		"http://dhis.academy/lao_25/api/25/analytics.json?dimension=dx:Q21U47uf0xo.REPORTING_RATE;Fpl26CKBEqZ.REPORTING_RATE;xm6LbvmURdm.REPORTING_RATE;eDXUmwx0yw8.REPORTING_RATE&dimension=pe:LAST_3_MONTHS&dimension=ou:IWp9dQGM0bS;OU_GROUP-jblbYwuvO33;OU_GROUP-gHfSdwPrC83&displayProperty=SHORTNAME&outputIdScheme=UID",
		{
			headers: {
				Authorization: createAuthenticationHeader( "Dung", "ABCD1234" )
			}
		}
)
.then(result => result.json())
.then(data => transform(data))
.then(outputCSV => fileWriter.sync('analytics.csv', outputCSV));


