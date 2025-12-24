export default async function handler(req, res) {
    try {
        const RANGE = "transaksi";
        const GSHEET_ID = process.env.GSHEET_ID;
        const API_KEY = process.env.GSHEET_KEY;

        if (!GSHEET_ID || !API_KEY) {
            return res.status(500).json({
                error: "ENV GSHEET_ID / GSHEET_KEY belum diset",
            });
        }

        const url = `https://sheets.googleapis.com/v4/spreadsheets/${GSHEET_ID}/values/${RANGE}?key=${API_KEY}`;

        const response = await fetch(url);
        const data = await response.json(); // 🔥 WAJIB await

        if (!data.values) {
            return res.status(500).json({
                error: "Data tidak valid",
                raw: data,
            });
        }

        return res.status(200).json(data);

    } catch (err) {
        return res.status(500).json({
            error: "Server error",
            detail: err.message,
        });
    }
}






