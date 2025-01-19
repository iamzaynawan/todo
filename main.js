import express from 'express';
const app = express();

const PORT = 4320;

app.listen(PORT, () => {
    console.log(`Server is started on port ${PORT}`);
});