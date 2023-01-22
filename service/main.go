package main

import (
	"bytes"
	"image/png"
	"io/ioutil"

	"github.com/byvko-dev/am-render-og/internal/render"

	stats "github.com/byvko-dev/am-types/api/stats/v1"
)

func main() {
	// Setup a server
	// app := fiber.New()

	// app.Use(logger.New())

	// v1 := app.Group("/v1")

	// session := v1.Group("/session")
	// // session.Post("/player", handlers.GetPlayerSession)

	// port := env.MustGetString("PORT")
	// panic(app.Listen(":" + port))

	img, err := render.GetStatsImage(stats.RequestPayload{AccountID: 1013072123, Realm: "NA"})
	if err != nil {
		panic(err)
	}

	var buf bytes.Buffer
	err = png.Encode(&buf, img)
	if err != nil {
		panic(err)
	}

	err = ioutil.WriteFile("test.png", buf.Bytes(), 0644)
}
