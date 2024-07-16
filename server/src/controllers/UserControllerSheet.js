import { auth, spreadsheetId, googleSheets } from "../databases/sheet.js";

//Get Users Data
const getTripPlan = async (req, res) => {
  const getRows = await googleSheets.spreadsheets.values.get({
    auth,
    spreadsheetId,
    range: "Sheet1",
    // range: "Sheet1!A2:B",
  });
  const values = getRows.data.values.slice(1);

  res.send(values);
  console.log(values)
};

//Create Users Data
const createTripPlan = async (req, res) => {
  try {

    console.log('Request body:', req.body);
    const { sr, date, country, state, city, clientName, purpose, remarks, deleted } = req.body;

    const addRows = await googleSheets.spreadsheets.values.append({
      auth,
      spreadsheetId,
      range: "Sheet1!A:I",
      valueInputOption: "USER_ENTERED",
      resource: {
        values: [[sr, date, country, state, city, clientName, purpose, remarks, deleted]],
      },
    });
    res.status(200).send('Data appended successfully');
  } catch (error) {
    console.error('Error appending data to Google Sheets:', error);
    res.status(500).send('An error occurred while appending data.');
  }
};

//Update Users Data
const updateTripPlan = async (req, res) => {
  const tripId = parseInt(req.params.Sr)
  const { Sr, Date, Country, State, City, ClientName, Purpose, Remarks, Deleted } = req.body

  try {
    const updatedRow = await googleSheets.spreadsheets.values.update({
      auth,
      spreadsheetId,
      range: `Sheet1!A${Sr + 1}`,
      valueInputOption: "USER_ENTERED",
      resource: {
        values: [[Sr, Date, Country, State, City, ClientName, Purpose, Remarks, Deleted]],
      },
    });
    console.log(updatedRow.config.data.values)
    res.send(updatedRow.config.data.values)
  } catch (err) {
    console.log(err)
  }
};

export { getTripPlan, createTripPlan, updateTripPlan };
