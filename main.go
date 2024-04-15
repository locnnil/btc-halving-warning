package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
)

// Halving happens each 210000

func main() {
	// Define HTTP server
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		// Define the HTML content with a specific title
		fileContent, err := os.ReadFile("index.html")
		if err != nil {
			log.Fatal(err)
		}
		htmlContent := string(fileContent)

		fmt.Fprint(w, htmlContent)
	})

	// Start the HTTP server on port 8080
	fmt.Println("Server starting on port 8080...")
	if err := http.ListenAndServe(":8080", nil); err != nil {
		fmt.Println("Failed to start server:", err)
	}
}
