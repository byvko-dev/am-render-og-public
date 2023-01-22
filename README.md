# am-render-og

This repository includes two services that are required in order to render stats images for Aftermath.

## How to start this up?
First and foremost, install `yarn`, `node` and `go`.

1. Start the mock api service
```
(cd mock; go run main.go)
```
2. Start the webapp
```
(cd webapp; cat .env.example > .env.local)
(cd webapp; yarn; yarn dev)
```
3. Start the api service
```
(cd services; cat .env.example > .env.local)
(cd services; go run main.go)
```

#
### `webapp` 
Is a NextJS app straight from the OG tutorial with JSX components required to render the UI and one API route that returns a base64 encoded png image.
- This app makes a request to an existing Aftermath API that actually generates player session and all the `Block` elements. This service is a closed source for now, but feel free to make your own logic to actually create the UI inside `webapp/src/core/components/render/StatsContainer.tsx`.
#  
### `service`
Is a small api service written in Go which is used to validate the input and do any required pre/post processing. Everything that is done by this service can be done as part of the NextJS app, but I am not a fan of JS and I prefer Go in case I integrate this with gRPC later on. 

Here is a sample request:  
`POST: http://localhost:9098/v1/session/player?debug=true`  
```
{
    "account_id": 1034813981,
    "realm": "na",
    "locale": "eng",
    "preset": "legacy",
    "days":0
}
```
_Remove `?debug=true` to get a JSON response_