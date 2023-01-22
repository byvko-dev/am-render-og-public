package main

import (
	"bytes"
	"encoding/base64"
	"image/png"
	"io/ioutil"

	"github.com/byvko-dev/am-core/helpers/env"
	"github.com/byvko-dev/am-render-og/internal/render"
	api "github.com/byvko-dev/am-types/api/generic/v1"
	"github.com/byvko-dev/am-types/api/stats/v1"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/logger"
)

func main() {
	// Setup a server
	app := fiber.New()

	app.Use(logger.New())

	v1 := app.Group("/v1")

	session := v1.Group("/session")
	session.Post("/player", playerSessionImageHandler)

	port := env.MustGetString("PORT")
	panic(app.Listen(":" + port))
}

func playerSessionImageHandler(c *fiber.Ctx) error {
	var response api.ResponseWithError
	var request stats.RequestPayload

	err := c.BodyParser(&request)
	if err != nil {
		response.Error.Message = err.Error()
		response.Error.Context = "failed to parse request"
		response.Error.Code = fiber.StatusBadRequest
		c.Status(fiber.StatusBadRequest).JSON(response)
	}

	img, err := render.GetStatsImage(request)
	if err != nil {
		response.Error.Message = err.Error()
		response.Error.Context = "failed to render image"
		response.Error.Code = fiber.StatusInternalServerError
		c.Status(fiber.StatusInternalServerError).JSON(response)
	}

	// Encode image as png
	buf := new(bytes.Buffer)
	err = png.Encode(buf, img)
	if err != nil {
		response.Error.Message = err.Error()
		response.Error.Context = "failed to encode image"
		response.Error.Code = fiber.StatusInternalServerError
		c.Status(fiber.StatusInternalServerError).JSON(response)
	}

	if c.Query("debug") == "true" {
		// This is for debugging purposes, so we can see the image in the browser/postman
		c.Set("Content-Type", "image/png")
		return c.Send(buf.Bytes())
	}

	// Encode image as base64
	s, err := ioutil.ReadAll(buf)
	if err != nil {
		response.Error.Message = err.Error()
		response.Error.Context = "failed to read image"
		response.Error.Code = fiber.StatusInternalServerError
		c.Status(fiber.StatusInternalServerError).JSON(response)
	}

	encoded := base64.StdEncoding.EncodeToString(s)
	response.Data = encoded
	return c.JSON(response)
}
