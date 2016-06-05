# mock-backend

Node-based API with in-memory storage built with [hapi][hapi-url].

API documentation is generated from [route configuration][route-config-url]
using [lout][lout-url] and can seen at at `/docs` (deployed [here][deployment-url])
## Installation & Usage

```
npm install
npm start
```

[ngrok][ngrok-url] is an easy way to make your local server publicly accessible if
required.

## Data Persistence

When the server stops, your data is dead. So it goes.

## Options

The following environment variables are used for configuring the server.

- `API_HOST` - The hostname/ip to bind the server to (default: `0.0.0.0`)
- `APP_PORT` - The port to listen to requests on (default: `5000`)

## CORS (Cross-origin resource sharing)

By default, all routes are accessible from any origin. You may change that to a
whitelist of origins in `server/config/index.js` - `hapi.options.routes.cors`.
 
[ngrok-url]: https://ngrok.com/
[hapi-url]: http://hapijs.com/
[lout-url]: https://www.npmjs.com/package/lout
[route-config-url]: http://hapijs.com/tutorials/routing#config
[deployment-url]: https://mock-backend.herokuapp.com/docs
