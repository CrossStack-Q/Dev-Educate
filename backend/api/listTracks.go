package api

import (
	"blog-app/models"
	"blog-app/utils"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strconv"
)

// ListTrackHandler handles the API request for listing tracks
func ListTrackHandler(w http.ResponseWriter, r *http.Request) {
	utils.EnableCors(w, r)
	// Get the list of tracks from the model
	tracks, err := models.ListTracks()
	if err != nil {
		http.Error(w, "Unable to retrieve tracks", http.StatusInternalServerError)
		return
	}

	// Set the response header to indicate that the content is JSON
	w.Header().Set("Content-Type", "application/json")

	// Write the tracks as a JSON response
	if err := json.NewEncoder(w).Encode(tracks); err != nil {
		log.Printf("Error encoding JSON: %v", err)
		http.Error(w, "Error encoding JSON response", http.StatusInternalServerError)
	}
}

func ListCourseHandler(w http.ResponseWriter, r *http.Request) {
	// Enable CORS if needed
	utils.EnableCors(w, r)

	// Extract 'id' from query string, e.g. process.env.Backend_URL/golang?id=1
	idStr := r.URL.Query().Get("id")
	if idStr == "" {
		http.Error(w, "Missing 'id' parameter", http.StatusBadRequest)
		return
	}

	// Convert the 'id' string to an integer
	id, err := strconv.Atoi(idStr)
	if err != nil {
		http.Error(w, "Invalid 'id' parameter, must be an integer", http.StatusBadRequest)
		return
	}

	// Call the ListCourse function with the extracted id
	courses, err := models.ListCourse(id)
	if err != nil {
		http.Error(w, "Unable to retrieve courses", http.StatusInternalServerError)
		return
	}

	// Set the response header to indicate that the content is JSON
	w.Header().Set("Content-Type", "application/json")

	// Write the courses as a JSON response
	if err := json.NewEncoder(w).Encode(courses); err != nil {
		log.Printf("Error encoding JSON: %v", err)
		http.Error(w, "Error encoding JSON response", http.StatusInternalServerError)
	}
}

// CourseDetailsHandler handles the HTTP request to fetch course details based on track_id and course_id
func CourseDetailsHandler(w http.ResponseWriter, r *http.Request) {
	utils.EnableCors(w, r)
	// Parse track_id and course_id from the query parameters
	trackIDStr := r.URL.Query().Get("track_id")
	courseIDStr := r.URL.Query().Get("course_id")

	// Check if track_id and course_id are provided
	if trackIDStr == "" || courseIDStr == "" {
		http.Error(w, "Missing track_id or course_id query parameter", http.StatusBadRequest)
		return
	}

	// Convert track_id and course_id to integers
	trackID, err := strconv.Atoi(trackIDStr)
	if err != nil {
		http.Error(w, fmt.Sprintf("Invalid track_id: %v", err), http.StatusBadRequest)
		return
	}

	courseID, err := strconv.Atoi(courseIDStr)
	if err != nil {
		http.Error(w, fmt.Sprintf("Invalid course_id: %v", err), http.StatusBadRequest)
		return
	}

	// Call the CourseDetails function to get the course details
	courseDetails, err := models.CourseDetails(trackID, courseID)
	if err != nil {
		http.Error(w, fmt.Sprintf("Failed to fetch course details: %v", err), http.StatusInternalServerError)
		return
	}

	// Set the content type to JSON
	w.Header().Set("Content-Type", "application/json")

	// Marshal the courseDetails struct to JSON
	jsonData, err := json.MarshalIndent(courseDetails, "", "  ")
	if err != nil {
		http.Error(w, fmt.Sprintf("Error marshaling JSON: %v", err), http.StatusInternalServerError)
		return
	}

	// Write the JSON response
	w.Write(jsonData)
}
