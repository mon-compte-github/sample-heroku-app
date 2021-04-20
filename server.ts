
import * as express from 'express';
import * as http from 'http';

const PORT = process.env.PORT || 3000;

const INDEX = '/index.html';

// redis storage
const storage = {
    'clé': 'rouge',
    'clef': 'rouillée'
};

// --- EXPRESS/HTTP/WSS ---

// initialize express
const app = express();

// static files
app.use(express.static('webroot', { etag: false }));

// handle json payloads
app.use(express.json());

// initialize a simple http server
const server = http.createServer(app);

// --- ENDPOINTS ---

// redirect '/' to index.html
app.get('/', (req, res) => res.redirect(INDEX));

// --- BASIC REDIS IMPL ---

// get value
app.get('/values/:key', (req,res) => {
    res.status(200).json({value: storage[req.params.key]});
});
 
 // list keys
app.get('/keys/', (req,res) => {
    res.status(200).json(Object.keys(storage));
});
 
 // store data
app.post('/store/', (req,res) => {
    // { key: 'xxx', value: 'xxx'}
    const payload = req.body;
    if(payload.key && payload.value) {
        if(storage[payload.key]) {
            res.status(409).json({result: 'duplicate_key'});
        } else {
            storage[payload.key] = payload.value;
            res.status(200).json({result: 'success'});
        }
    } else {
        res.status(400).json({result: 'bad_arguments'});
    }
});

server.listen(PORT, () => console.log(`Listening on ${PORT}`));

// EOF