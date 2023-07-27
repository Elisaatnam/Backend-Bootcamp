# Middleware

Req -> Middleware ---> Response -> Client

Middleware liegt zwischen request und response, ermöglicht uns Logik zwischen Routen zu teilen.
Wie zum beispiel ein logger.

```js
const logger = (req, res, next) => {
	console.log(`${req.method} request on ${req.url}`);
	next();
};
```

Durch den Aufruf `next` sagen wir express das wir zur nächsten Funktion springen wollen. Also die nächste registrierte Middleware oder Controller /Request Handler.

Das kann Global, für einen teil Pfad oder eine explizite route passierten:

```js
const logger = (req, res, next) => {
	console.log(`${req.method} request on ${req.url}`);
	next();
};
```

## Global

```js
app.use(logger);
```

## Pfad

```js
app.use("/api/posts", logger);
```

## Explizite Route

```js
app.get("/api/posts", logger, (req,res)=> ....)
```
