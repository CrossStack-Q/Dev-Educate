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

	utils.EnableCors(w, r)

	idStr := r.URL.Query().Get("id")
	if idStr == "" {
		http.Error(w, "Missing 'id' parameter", http.StatusBadRequest)
		return
	}

	id, err := strconv.Atoi(idStr)
	if err != nil {
		http.Error(w, "Invalid 'id' parameter, must be an integer", http.StatusBadRequest)
		return
	}

	courses, err := models.ListCourse(id)
	if err != nil {
		http.Error(w, "Unable to retrieve courses", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")

	if err := json.NewEncoder(w).Encode(courses); err != nil {
		log.Printf("Error encoding JSON: %v", err)
		http.Error(w, "Error encoding JSON response", http.StatusInternalServerError)
	}
}

func CourseDetailsHandler(w http.ResponseWriter, r *http.Request) {
	utils.EnableCors(w, r)

	trackIDStr := r.URL.Query().Get("track_id")
	courseIDStr := r.URL.Query().Get("course_id")

	if trackIDStr == "" || courseIDStr == "" {
		http.Error(w, "Missing track_id or course_id query parameter", http.StatusBadRequest)
		return
	}

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

	courseDetails, err := models.CourseDetails(trackID, courseID)
	if err != nil {
		http.Error(w, fmt.Sprintf("Failed to fetch course details: %v", err), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")

	jsonData, err := json.MarshalIndent(courseDetails, "", "  ")
	if err != nil {
		http.Error(w, fmt.Sprintf("Error marshaling JSON: %v", err), http.StatusInternalServerError)
		return
	}

	w.Write(jsonData)
}
