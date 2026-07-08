const app = require('./dist/app').default;
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log('Listening on', PORT);
});
