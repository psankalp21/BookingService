import express from 'express';
import routes from './routes/index';
import mongoose, { ConnectOptions } from 'mongoose';
import BookingCollection from './database/models/booking.model';
import { appConfig } from './common/appconfig';
import ReviewCollection from './database/models/review.model';

const PORT = appConfig.env.PORT
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json())

mongoose.connect(appConfig.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
} as ConnectOptions);

app.use('/', routes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    BookingCollection;
    ReviewCollection;
});
