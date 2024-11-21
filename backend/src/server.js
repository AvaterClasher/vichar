const express = require('express');
const cors = require('cors');
const { initializeDatabase } = require('./models');
const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/post');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const log = require('./logger').log;
const { debugReq } = require("./middleware/debug");

require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth',debugReq, authRoutes);
app.use('/api/posts',debugReq, postRoutes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const PORT = process.env.PORT || 5000;
initializeDatabase().then(() => {
  app.listen(PORT, () => log.success(`Server running on ${PORT}`));
});
