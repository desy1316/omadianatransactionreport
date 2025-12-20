export default async function handlelogin(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'method login tidak di ijinkan' })
    }

    const { token } = req.body
    if (!token) {
        return res.status(400).json({ message: 'Token Kosong' })
    }

    const range = "token"
    const google_api = process.env.GOOGLE_API_KEY
    const google_sheet_id = process.env.GOOGLE_SHEET_ID
    const uri = `https://sheets.googleapis.com/v4/spreadsheets/${google_sheet_id}/value/${range}?key=${google_api}`


    try {

        const response = await fetch(uri)
        const data = response.json()
        const [, ...rows] = data.values



    } catch (error) {
        return res.status(500).json({ error: "gagal Cek Token" })
    }



}

