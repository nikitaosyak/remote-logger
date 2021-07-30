const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const Express = require('express'); const app = Express(); const router = Express.Router()

//
// BOILERPLATE:
// body-parser, CORS, options
const bodyParser = require('body-parser')
app.use(bodyParser.raw())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : true}))

router.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, TwitchToken');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', true);
    return next();
})

router.post('/session-start', (req, res, next) => {
    const id = uuidv4()
    fs.writeFile(`./build/sessions/${req.body['device_name']}.${id}.txt`, `session started\n`, {encoding : 'utf-8'}, err => {
        if (err) return res.status(500).json(err);
        console.log(`started session ${id}`)
        return res.status(200).json({session: id});
    });
})

router.post('/message', (req, res, next) => {
    fs.appendFile(`./build/sessions/${req.body['device_name']}.${req.body.id}.txt`, `${req.body.message}\n`, {encoding : 'utf-8'}, err => {
        if (err) return res.status(500).json(err);
        console.log(`got message ${req.body.message}`)
        return res.status(200).json({ok : "ok"});
    });
})

router.get('/list-sessions', (req, res, next) => {
    fs.readdir('./build/sessions/', (err, files) => {
        if (err) return res.status(500).json(err);
        files = files
            .map(filename => ({
                name : filename.replace('.txt', ''),
                time : fs.statSync(`./build/sessions/${filename}`).mtime.getTime()/1000
            }))
            .sort((a, b) => b.time - a.time)

        return res.status(200).json({sessions : files.splice(0, 10)})
    })
})

router.get('/session-contents', (req, res, next) => {
    fs.readFile(`./build/sessions/${req.query.id}.txt`, 'utf8', (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json({contents : data})
    })
})

app.use('/', router)

app.listen(6061, () => {
    console.log(`running without SSL on ${6061}`)
})
