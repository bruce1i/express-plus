/**
 * openApi用于本站自己提供的api
 */

module.exports = function (app, control) {

    app.get('/api/hello', control('index'));

    app.post('/api/hello', control('index'));
};