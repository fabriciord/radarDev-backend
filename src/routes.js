const { Router } = require('express');
const DevController = require('./controllers/DevController');
const SearchController = require('./controllers/SearchController');
const routes = Router();


routes.get('/', (req, res)=> {
    res.send('Hello Fabrício');
});
routes.get('/devs', DevController.index);
routes.post('/dev', DevController.store);
routes.delete('/dev/:id', DevController.destroy)
routes.put('/dev/:id', DevController.update);
routes.get('/search', SearchController.index);

module.exports = routes;