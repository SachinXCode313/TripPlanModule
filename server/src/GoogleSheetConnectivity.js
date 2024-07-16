import express from 'express'
import {google} from 'googleapis'

const app = express();
const router = express.Router();


router.use(express.json());
router.use(cors());


//To Connect Node.js to Google Sheet
const auth = new google.auth.GoogleAuth({
    keyFile : "creads.json",
    scopes : "https://www.googleapis.com/auth/spreadsheets"
})
const client = await auth.getClient()
const googleSheets = google.sheets({version : "v4" , auth : client})
const spreadsheetId = "1tPWc5YJ9PcD9afIz4BEebTX1SSl2IJ5JXkYE9tnbtS0"
// const metaData = await googleSheets.spreadsheets.get({
//     auth,
//     spreadsheetId
// })


//display data to user
router.get("/api/sheet",async (req,res) => {
    const getRows = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range : "Sheet1!A2:B"
    })
    const values = getRows.data.values
    // console.log(values)
    // values.forEach((value) => {
    //     res.send(value)
    // })
    console.log(values)
    res.send(values)
})

//get data from user
router.post("/api/sheet",async (req,res) => {
    // res.send(req.body)
    const {user,pass} = req.body;

    const addRows = await googleSheets.spreadsheets.values.append({
        auth,
        spreadsheetId,
        range : "Sheet1!A:B",
        valueInputOption : "USER_ENTERED",
        resource : {
            values : [
                [user,pass]
            ]
        },
    })
})

export default router;

// npx create-react-app file-name