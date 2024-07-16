import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import axios from 'axios';

dotenv.config();

require("./src/bot/main");

require("./src/api/main");


