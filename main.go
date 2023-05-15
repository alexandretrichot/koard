package main

import (
	"embed"
	"fmt"
	"koard/core/auth"
	"koard/core/namespaces"
	"koard/core/pods"
	"koard/pkg/api"
	"net/http"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/filesystem"
)

var port = 3000

//go:embed "dist/*"
var embedDirStatic embed.FS

func main() {
	clientsSet, err := auth.GetClientSet()
	if err != nil {
		panic(err)
	}

	namespacesService := namespaces.NewService(clientsSet)
	podsService := pods.NewService(clientsSet)

	app := fiber.New(fiber.Config{
		ServerHeader:          "koard",
		DisableStartupMessage: true,
	})

	api.AddAPIRoutes(app, namespacesService, podsService)

	app.Use("/", filesystem.New(filesystem.Config{
		Root:         http.FS(embedDirStatic),
		PathPrefix:   "dist",
		NotFoundFile: "dist/index.html",
		Browse:       true,
	}))

	fmt.Printf("Starting koard at http://localhost:%d\n", port)

	if err := app.Listen(fmt.Sprintf(":%d", port)); err != nil {
		panic(err)
	}
}
