import http from 'http'

// denkt an client ---> server
// was bekommt der Server vom Client?
// ein Request

// wir müssen unseren Server sagen,was er eigentlich mit einem request machen soll

// super simpel
function requestHandler(req, res) {
    res.end('<h1>Hallo</h1>')
}

// simpel
function simpleRequestHandler(req, res) {
    if (req.url === '/') {
        res.end('Home')
    }
    else if (req.url === '/about') {
        res.end('About')
    }
    else {
        res.writeHead(404)
        res.end('Nichts da')
    }
}

//simpel mit request methoden
// GET    --> liefer mir Daten wir wollen was haben
// POST   --> nimm diese Daten, wir geben etwas neues
// PUT    --> veränder diese Daten, wir updaten vorhandenes
// DELETE --> lösche diese Daten, wir löschen vorhandene Daten

function simpleRequestHandlerPlus(req, res) {
    console.log('Unsere Methode:', req.method);
    if (req.url === '/') {
        if (req.method === 'POST') {
            res.end('Danke für deine Daten')
        } else {
            res.end('Home')
        }
    }
    else if (req.url === '/about') {
        res.end('About')
    }
    else {
        res.writeHead(404)
        res.end('Nichts da')
    }
}

const server = http.createServer(simpleRequestHandlerPlus)

server.listen(9898, () => console.log('Ich stehe vor der Tür und warte'))


// instagram alle beiträge bekommen
// instragam/beitrag 
// erstelle einen neuen beitrag
// instragam/beitrag/newbeitrag
// update einen beitrag
// instragam/beitrag/updatebeitrag
// lösche einen beitrag
// instragam/beitrag/deletebeitrag

// instagram/beitrag
// GET
// POST
// PUT
// DELETE