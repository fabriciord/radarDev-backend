module.exports = (data) => {
    if(!data) return undefined;
    return data.split(',').map(tech => tech.trim());
};