const dotenv = require('dotenv').config();
const express = require('express');
const unless = require('express-unless');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoute = require('./routes/auth');
const productRoute = require('./routes/products');
const auth = require('./middleware/auth');

const app = express();

app.use(cors());
app.use(express.json());

// AUTH VERIFICATION AND UNLESS
auth.verifyToken.unless = unless;

app.use(
	auth.verifyToken.unless({
		path: [
			{ url: '/auth/login', method: ['POST'] },
			{ url: '/auth/register', method: ['POST'] },
		],
	})
);

//MONGODB CONNECTION

// mongoose.Promise = global.Promise;
// mongoose
// 	.connect(process.env.MONGO_URI, {
// 		useNewUrlParser: true,
// 		useUnifiedTopology: true,
// 	})
// 	.then(() => {
// 		console.log('Database connection is succesfull!');
// 	})
// 	.catch((err) => {
// 		console.log(`Database connection failed!`);
// 		console.log(`Details : ${err}`);
// 	});

//ROUTES

app.use('/auth', authRoute);
app.use('/products', productRoute);

app.listen(8000, () => {
	console.log(`Server is online! Port: 8000`);
});
