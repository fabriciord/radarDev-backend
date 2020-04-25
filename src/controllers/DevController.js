const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');
module.exports = {
    async index(req, res){
        const devs = await Dev.find();
        console.log({ Devs: devs});
        return res.json(devs)
    },
    async store(req, res){
        const { github_username: userName, techs, latitude, longitude } = req.body;
        github_username = userName.toLowerCase();
        let dev = await Dev.findOne({
            github_username
        });
        if (!dev) {        
            const response = await axios.get(`https://api.github.com/users/${github_username}`);
            const { name = login, avatar_url, bio } = response.data;
            
            const techsArray = parseStringAsArray(techs);
            const location = {
                type: 'Point',
                coordinates: [longitude,latitude]
            }
            dev = await Dev.create({
                name,
                github_username,
                avatar_url,
                bio,
                techs: techsArray,
                location,
            });
        }
        return res.json(dev);
    },
    async destroy(req, res){
        const { id } = req.params;
        const dev = await Dev.findById(id);
        if(!dev) return res.json({ message: 'Dev não encontrado' });
        dev.remove();
        return res.json(dev);
    },
    async update(req, res){
        const { id } = req.params;
        const { name, techs, latitude, longitude }  = req.body;
        const location = {
            type: 'Point',
            coordinates: [longitude,latitude]
        };
        const response = await Dev.updateOne({
            id,
            name,
            techs: parseStringAsArray(techs),
            location,
        });
        return res.json(response);
    }
};