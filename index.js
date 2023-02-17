const express = require('express')
const {google} = require('googleapis')

const app = express()

app.get("/", async (req,res) => {
	
	
	const auth = new google.auth.GoogleAuth({
		keyFile: "credentials.json",
		scopes: "https://www.googleapis.com/auth/spreadsheets",

	});

	//create client instance
	const client = await auth.getClient();

	//create instance of google sheet
	const googleSheets = google.sheets({version: "v4", auth: client});
	const spreadsheetId = "1350xFw2NKwuUSY6EiFdHq1GOv_ic0a2kZ7-c6xxSUNQ"
	const metaData = await googleSheets.spreadsheets.get({
		auth,
		spreadsheetId
	});

	//read rows from spreadsheet
	const getRows = await googleSheets.spreadsheets.values.get({
		auth,
		spreadsheetId,
		range: "Sheet1!A2:Q3",

	})

	
	let orders =  getRows.data.values;
	const accessToken = 'your_access_token';
	const realmId = 'your_realm_id';
	
	res.send(orders);

});

app.listen(4000, (req,res) => console.log("Server running on 4000"))