import express from "express";
import path from 'path';
import {fileURLToPath} from 'url';

const app = express();
const PORT = process.env.PORT || 8000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.get('/api/time', (req, resp) => {
    resp.status(200).send({
        cit: "Lorem",
        time: 0
    });
})

app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});