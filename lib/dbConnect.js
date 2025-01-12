//create a functiont o connect db
import mongoose from 'mongoose';

export default async function connectDb() {
    try {
        await mongoose.connect(process.env.MONGO_URI)
            .then(() => { console.log('MongoDBconnected') })

    } catch (error) {
        console.error('Error connecting to MongoDB: ' + error.message);
        process.exit(1);
    }
}