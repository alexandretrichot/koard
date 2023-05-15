package utils

import (
	"encoding/json"
	"os"
)

func Debug(toDebug interface{}) {
	j, err := json.MarshalIndent(toDebug, "", "    ")
	if err != nil {
		panic(err)
	}

	os.WriteFile("debug.json", j, 0644)

	println(string(j))
}
