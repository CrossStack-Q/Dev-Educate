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

func JobsListHandler(w http.ResponseWriter, r *http.Request) {

	utils.EnableCors(w, r)
	jobs, err := models.GetJobs()
	if err != nil {
		http.Error(w, fmt.Sprintf("Error retrieving jobs: %v", err), http.StatusInternalServerError)
		return
	}

	// Set content-type header
	w.Header().Set("Content-Type", "application/json")

	// Return the jobs as a JSON array
	err = json.NewEncoder(w).Encode(jobs)
	if err != nil {
		http.Error(w, fmt.Sprintf("Error encoding jobs to JSON: %v", err), http.StatusInternalServerError)
		return
	}
}

func GetJobDetails(w http.ResponseWriter, r *http.Request) {
	utils.EnableCors(w, r)
	jobID := r.URL.Query().Get("id")
	if jobID == "" {
		http.Error(w, "Missing job ID", http.StatusBadRequest)
		return
	}

	// Convert the job ID to an integer
	id, err := strconv.Atoi(jobID)
	if err != nil {
		http.Error(w, "Invalid job ID format", http.StatusBadRequest)
		return
	}

	// Call the GetJobByID function to fetch the job details
	job, err := models.GetJobByID(id)
	if err != nil {
		http.Error(w, fmt.Sprintf("Error retrieving job: %v", err), http.StatusInternalServerError)
		return
	}

	// Set the response header to indicate JSON response
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)

	// Return the job data as a JSON response
	if err := json.NewEncoder(w).Encode(job); err != nil {
		log.Println("Error encoding JSON:", err)
		http.Error(w, "Failed to return job data", http.StatusInternalServerError)
	}
}
