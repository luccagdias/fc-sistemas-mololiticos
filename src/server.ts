import app from './app';
import sequelize from './infra/database/sequelize';

const port = process.env.PORT || 3000;

async function startServer() {
    try {
        await sequelize.sync();
        console.log('Database synchronized successfully');
        
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    } catch (error) {
        console.error('Unable to start server:', error);
    }
}

startServer(); 