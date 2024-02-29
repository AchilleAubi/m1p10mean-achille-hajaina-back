const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const routes = require('./routes/index');
const http = require('http');
var cron = require('node-cron');
const RendezVousServices = require('./services/rendezVousServices');
const email = require('./services/emailServices');

dotenv.config();

const app = express();

mongoose.connect(process.env.MONGO_URL);

// Middleware
app.use(express.json());
app.use(cors());

const server = http.createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: "http://localhost:4200",
    methods: ["GET", "POST", "PUT", "DELETE"]
  }
});

app.set('io', io);

// cron.schedule('*/20 * * * * *', () => {
//   RendezVousServices.getRdvValiderByUser("65d76133a703cf711c649f5a").then((data) => {
//     if (data.length > 0) {
//       const rdvListItems = data.map(rdv => `${rdv.Service[0].name} - ${rdv.dateTime} - ${rdv.Employe[0].username}/n`).join('');
//       const emailBody = `
//                 Voici vos rendez-vous :/n
//                     ${rdvListItems}/n
//             `;
//       email.sendEmail(data[0].User[0].email, "Notification", emailBody).then();
//     }
//   }

//   );

// });

// on init
app.get('/', (req, res) => {
  res.send('Hello');
});

// Routes
app.use('/', routes);

// Error middleware
app.use(require('./middleware/errorMiddleware'));

const PORT = process.env.PORT || 1200;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
