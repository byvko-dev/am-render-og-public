package render

import "github.com/byvko-dev/am-core/helpers/env"

var renderApiURL string

func init() {
	renderApiURL = env.MustGetString("RENDER_API_URL")
}
