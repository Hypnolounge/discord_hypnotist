import express from 'express';
import auth from './auth';

console.log("API is starting...");

const api = express();
const port = process.env.PORT || 3000;
const version = process.env.VERSION || 'v1';
const prefix = `/api/${version}`;
const url = process.env.URL || 'http://localhost';

api.use(express.json());
api.use(express.urlencoded({ extended: true }));

api.get(`${prefix}`, (req, res) => {
  res.json({ message: 'API is working!' });
});

api.get(`${prefix}/auth`, (req, res) => auth(req, res));

api.listen(port, () => {
  console.log(`API is running on ${url}:${port}${prefix}`);
});

export default api;