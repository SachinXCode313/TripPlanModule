import { auth, spreadsheetId, googleSheets } from "../databases/sheet.js";

const getLastData = async () => {
  try {
    const getRows = await googleSheets.spreadsheets.values.get({
      auth,
      spreadsheetId,
      range: "Sheet1!A:B", // Assuming planId in column A and sr in column B
    });
    const values = getRows.data.values;
    if (!values || values.length === 0) {
      return { lastPlanId: 200167, lastSr: 0 }; // Default planId if no data found
    }

    // Find the last non-empty row with numeric values
    let lastRow = values.length - 1;
    while (lastRow >= 0 && (isNaN(parseInt(values[lastRow][0])) || isNaN(parseInt(values[lastRow][1])))) {
      lastRow--;
    }

    if (lastRow < 0 || isNaN(parseInt(values[lastRow][0]))) {
      return { lastPlanId: 200167, lastSr: 0 }; // Default planId if no valid data found
    }

    const lastPlanId = parseInt(values[lastRow][0]);
    const lastSr = parseInt(values[lastRow][1]);

    return { lastPlanId, lastSr };
  } catch (error) {
    console.error('Error fetching last planId and sr:', error);
    throw error;
  }
};

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

    const { lastPlanId, lastSr } = await getLastData();
    // Increment sr and generate new planId
    const planId = lastPlanId + 1;
    const sr = lastSr + 1;

    const { date, country, state, city, clientName, purpose, remarks, deleted } = req.body;

    const addRows = await googleSheets.spreadsheets.values.append({
      auth,
      spreadsheetId,
      range: "Sheet1!A:J",
      valueInputOption: "USER_ENTERED",
      resource: {
        values: [[planId, sr, date, country, state, city, clientName, purpose, remarks, deleted]],
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
  const tripId = parseInt(req.params.sr)
  const { planId, sr, date, country, state, city, clientName, purpose, remarks, deleted } = req.body

  try {
    const updatedRow = await googleSheets.spreadsheets.values.update({
      auth,
      spreadsheetId,
      range: `Sheet1!A${sr + 1}`,
      valueInputOption: "USER_ENTERED",
      resource: {
        values: [[planId, sr, date, country, state, city, clientName, purpose, remarks, deleted]],
      },
    });
    console.log(updatedRow.config.data.values)
    res.send(updatedRow.config.data.values)
  } catch (err) {
    console.log(err)
  }
};

export { getTripPlan, createTripPlan, updateTripPlan };
