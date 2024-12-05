const express = require('express');
const dotenv = require('dotenv');
const DatabaseConnection = require('./config/database');
const coinRoutes = require('./routes/coinRoutes');

dotenv.config();

class App {
    constructor() {
        this.app = express();
        this.initializeMiddlewares();
        this.initializeRoutes();
        this.connectDatabase();
    }

    initializeMiddlewares() {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
    }

    initializeRoutes() {
        this.app.use('/api/coins', coinRoutes);
    }

    async connectDatabase() {
        await DatabaseConnection.connect();
    }

    listen() {
        const PORT = process.env.PORT || 3000;
        this.app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    }
}
