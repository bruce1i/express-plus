/**
 * openApi用于本站自己提供的api
 */

module.exports = function (app, control) {

    app.get('/api/demo1', control('demo/apiDemo1'));

    app.post('/api/demo2', control('demo/apiDemo2'));
};