import express from "express";
import path from 'path';
import {fileURLToPath} from 'url';
import { sendQuote } from "./srv/quotesApi.js";

const app = express();
const PORT = process.env.PORT || 8000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public/img')));

app.get('/api', (req, resp) => {
    resp.status(200).send(sendQuote(req.query?.time));
})

app.use(function(req, res, next){
    res.status(404);
    res.send({ error: 'Not found' });
    return;
});

app.use(function(err, req, res, next){
    res.status(err.status || 500);
    res.send({ error: err.message });
    return;
});

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});

export default server = app;