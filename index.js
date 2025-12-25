import 'dotenv/config'
import express from 'express';
import guestRouter from './Routes/Guest-route.js'
import adminRouter from './Routes/Admin-route.js'
import cors from 'cors'


const app = express();
app.use(cors())

app.use('/blogs', guestRouter);
app.use('/admin', adminRouter);

app.listen(process.env.PORT, () => {
    console.log('server is listening on port ' + process.env.PORT);
});


