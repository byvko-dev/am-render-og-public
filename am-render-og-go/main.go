package main

import (
	"bytes"
	"encoding/base64"
	"encoding/json"
	"fmt"
	"image"
	"image/png"
	"io/ioutil"
	"log"
	"strings"

	"github.com/byvko-dev/am-core/helpers/env"
	"github.com/byvko-dev/am-core/helpers/requests"

	api "github.com/byvko-dev/am-types/api/generic/v1"

	stats "github.com/byvko-dev/am-types/api/stats/v1"
	"github.com/gofiber/fiber/v2"
)

var renderApiURL = env.MustGetString("RENDER_API_URL")

func main() {
	// Setup a server
	// app := fiber.New()

	// app.Use(logger.New())

	// v1 := app.Group("/v1")

	// session := v1.Group("/session")
	// // session.Post("/player", handlers.GetPlayerSession)

	// port := env.MustGetString("PORT")
	// panic(app.Listen(":" + port))

	img, err := getStatsImage(stats.RequestPayload{AccountID: 1013072123, Realm: "NA"})
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

func getStatsImage(payload stats.RequestPayload) (image.Image, error) {
	// Encode payload as base64 json
	data, err := json.Marshal(payload)
	if err != nil {
		log.Printf("Error encoding payload: %v", err)
		return nil, err
	}
	encoded := base64.StdEncoding.EncodeToString(data)

	// Send request to render api
	var response api.ResponseWithError
	_, err = requests.Send(fmt.Sprintf("%v?d=%v", renderApiURL, encoded), fiber.MethodPost, nil, nil, &response)
	if err != nil {
		log.Printf("Error sending request to render api: %v", err)
		return nil, err
	}
	if response.Error.Message != "" {
		log.Printf("Error response from render api: %v", response.Error.Message)
		return nil, err
	}

	// Decode image to image.Image
	reader := base64.NewDecoder(base64.StdEncoding, strings.NewReader(response.Data.(string)))
	img, _, err := image.Decode(reader)
	if err != nil {
		log.Printf("Error decoding image: %v", err)
		return nil, err
	}

	return cropByAlphaPixels(img), nil
}

type subImg interface {
	SubImage(r image.Rectangle) image.Image
}

func cropByAlphaPixels(img image.Image) image.Image {
	// Find the first alpha 0 pixel on x and y
	var crop image.Rectangle = image.Rect(0, 0, img.Bounds().Max.X, img.Bounds().Max.Y)
	for y := 0; y < img.Bounds().Max.Y; y++ {
		_, _, _, a := img.At(0, y).RGBA()
		if a == 0 {
			crop.Max.Y = y
			break
		}
	}
	for x := 0; x < img.Bounds().Max.X; x++ {
		_, _, _, a := img.At(x, 0).RGBA()
		if a == 0 {
			crop.Max.X = x
			break
		}
	}

	// Crop the image
	imgCropped := img.(subImg)
	return imgCropped.SubImage(crop)
}
