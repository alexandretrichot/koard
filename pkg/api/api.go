package api

import (
	"fmt"
	"koard/core/namespaces"
	"koard/core/pods"
	"strconv"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

func AddAPIRoutes(app *fiber.App, namespacesService *namespaces.Service, podsService *pods.Service) {
	api := app.Group("/api")
	api.Use(cors.New())

	// namespaces
	api.Get("/namespaces", func(c *fiber.Ctx) error {
		namespaces, err := namespacesService.GetNamespaces(c.Context())
		if err != nil {
			fmt.Println(err)
			return c.Status(500).JSON(fiber.Map{
				"error": "Internal server error",
			})
		}

		return c.JSON(namespaces)
	})

	api.Get("/pods", func(c *fiber.Ctx) error {
		pods, err := podsService.GetPods(c.Context(), c.Query("namespace"))
		if err != nil {
			fmt.Println(err)
			return c.Status(500).JSON(fiber.Map{
				"error": "Internal server error",
			})
		}

		return c.JSON(pods)
	})

	api.Get("/pods/:namespace/:podName", func(c *fiber.Ctx) error {
		pod, err := podsService.GetPod(c.Context(), c.Params("namespace"), c.Params("podName"))
		if err != nil {
			fmt.Println(err)
			return c.Status(500).JSON(fiber.Map{
				"error": "Internal server error",
			})
		}

		return c.JSON(pod)
	})

	api.Get("/pods/:namespace/:podName/:containerName/logs", func(c *fiber.Ctx) error {
		tailLines, err := strconv.ParseInt(c.Query("tailLines", "100"), 10, 64)
		if err != nil {
			fmt.Println(err)
			return c.Status(400).JSON(fiber.Map{
				"error": "Invalid tailLines",
			})
		}
		sinceTime, err := time.Parse(time.RFC3339, c.Query("sinceTime"))
		if err != nil {
			sinceTime = time.Time{}
		}

		logs, err := podsService.GetPodLogs(c.Context(), c.Params("namespace"), c.Params("podName"), c.Params("containerName"), tailLines, sinceTime)
		if err != nil {
			fmt.Println(err)
			return c.Status(500).JSON(fiber.Map{
				"error": "Internal server error",
			})
		}

		return c.JSON(logs)
	})
}
