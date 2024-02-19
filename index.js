import express from "express";
import dotenv from "dotenv";
import cors from  "cors";
import db from "./config/Database.js";
import router from "./routes/AuthRoute.js";
/* import session from "express-session";
import SequelizeStore from "connect-session-sequelize"; */
import AuthRoute from "./routes/AuthRoute.js";
import User from "./routes/UserRoute.js";
import Character from "./routes/CharacterRoute.js";
import Item from "./routes/ItemRoute.js";
import cookieParser from "cookie-parser";



dotenv.config();
const app = express();

app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}));
/* 
const sessionStore = SequelizeStore(session.Store);

const store = new sessionStore({
    db: db
});

app.use(session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
        secure: 'auto'
    }
})); */

// Middleware untuk mengatur header keamanan
app.use((req, res, next) => {
    res.setHeader('Content-Security-Policy', 'default-src "none"');
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
    next();
});



app.use(express.static("public"));

try {
    await db.authenticate();
    console.log('Database terhubung..');
    
} catch (error) {
    console.error(error);
    
}
app.use(cookieParser());
app.use(express.json());
app.use(router);
app.use(AuthRoute);
app.use(User);
app.use(Character);
app.use(Item);



app.listen(process.env.APP_PORT, ()=> {
    console.log('Server up and running...');
});

