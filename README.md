# am-render-og

This repository includes two services that are required in order to render stats images for Aftermath.
- `webapp` is a NextJS app straight from the OG tutorial with JSX components required to render the UI and one API route that returns a base64 encoded png image.

- `service` is a small api service written in Go which is used to validate the input and do any required pre/post processing. Everything that is done by this service can be done as part of the NextJS app, but I am not a fan of JS and I prefer Go in case I integrate this with gRPC later on. 

