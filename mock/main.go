package main

import (
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/logger"
)

func main() {
	// Setup a server
	app := fiber.New()

	app.Use(logger.New())

	app.Post("/*", func(c *fiber.Ctx) error {
		c.Set("Content-Type", "application/json")
		return c.SendFile("dataprep-response.json")
	})

	port := "3003"
	panic(app.Listen(":" + port))
}
