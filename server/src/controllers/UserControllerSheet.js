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
    const { lastPlanId } = await getLastData();
    // Initialize planId and sr based on last data
    let planId = lastPlanId + 1;

    const rows = req.body.map((entry) => {
      const { sr, date, day, country, state, city, clientName, purpose, remarks } = entry;
      return [planId, sr, date, day, country, state, city, clientName, purpose, remarks];
    });


    const addRows = await googleSheets.spreadsheets.values.append({
      auth,
      spreadsheetId,
      range: "Sheet1!A:K",
      valueInputOption: "USER_ENTERED",
      resource: {
        values: rows,
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

//Get Users Data
const getEmployee = async (req, res) => {
  const getRows = await googleSheets.spreadsheets.values.get({
    auth,
    spreadsheetId,
    range: "Sheet2",
    // range: "Sheet2!A2:B",
  });
  const values = getRows.data.values.slice(1);

  res.send(values);
  console.log(values)
};

const deletePlan = async (req, res) => {
  try {
    const { sr, date } = req.body;
    const srString = sr.toString();

    console.log(req.body)
    console.log(srString, date)
    const getRows = await googleSheets.spreadsheets.values.get({
      auth,
      spreadsheetId,
      range: 'Sheet1!A:K', // Adjust range according to your sheet
    });

    const rows = getRows.data.values;
    // Step 2: Find the row with matching sr and date
    const dataRows = rows.slice(1);
    console.log(dataRows)
    // Step 2: Find the row with matching sr and date
    let rowIndex = -1;
    for (let i = 0; i < dataRows.length; i++) {
      const [currentPlanId, currentSr, currentDate] = dataRows[i];
      console.log(`Checking row ${i + 1}: sr=${currentSr}, date=${currentDate}`);
      if (currentSr === srString && currentDate === date) {
        rowIndex = i + 1; // Adjust index to account for the header row and 1-based index
        break;
      }
    }


    if (rowIndex === -1) {
      return res.status(404).send('Row not found');
    }

    // Step 3: Mark as deleted
    const range = `Sheet1!K${rowIndex + 1}`; // Adjust column if necessary
    const update = await googleSheets.spreadsheets.values.update({
      auth,
      spreadsheetId,
      range: range,
      valueInputOption: 'USER_ENTERED',
      resource: {
        values: [['Deleted']], // Mark as deleted
      },
    });

    res.status(200).send('Cell updated successfully');
  } catch (error) {
    console.error('Error updating cell in Google Sheets:', error);
    res.status(500).send('An error occurred while updating the cell.');
  }
};

export { getTripPlan, createTripPlan, updateTripPlan, getEmployee, deletePlan };


