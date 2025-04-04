import express from 'express';
import bodyParser from 'body-parser';
import translationRoutes from './routes/translationRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/api', translationRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});