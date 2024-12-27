package models

import (
	"blog-app/types"
	"fmt"

	"github.com/lib/pq"
)

func GetJobs() ([]types.Job, error) {

	rows, err := database.Query("SELECT job_id, title, company_name, location, salary_min, salary_max, salary_currency, job_post_date, applicants_this_week FROM jobs")
	if err != nil {
		return nil, fmt.Errorf("could not execute query: %v", err)
	}
	defer rows.Close()

	var jobs []types.Job

	for rows.Next() {
		var job types.Job
		err := rows.Scan(&job.JobID, &job.Title, &job.CompanyName, &job.Location, &job.SalaryMin, &job.SalaryMax, &job.SalaryCurrency, &job.JobPostDate, &job.ApplicantsThisWeek)
		if err != nil {
			return nil, fmt.Errorf("could not scan row: %v", err)
		}
		jobs = append(jobs, job)
	}

	if err := rows.Err(); err != nil {
		return nil, fmt.Errorf("error iterating rows: %v", err)
	}

	return jobs, nil
}

func GetJobByID(jobID int) (types.JobDetails, error) {
	var jobDetails types.JobDetails

	// Query the job_details table for the job with the given jobID
	rows, err := database.Query(`
		SELECT job_id, details_id, description, perks, what_you_will, requirements
		FROM job_details
		WHERE job_id = $1
	`, jobID)

	if err != nil {
		return jobDetails, fmt.Errorf("could not execute query: %v", err)
	}
	defer rows.Close()

	// Check if any rows were returned
	if rows.Next() {
		// Use pq.StringArray to handle the PostgreSQL text[] arrays
		var perks, whatYouWill, requirements pq.StringArray
		err := rows.Scan(&jobDetails.JobID, &jobDetails.DetailsID, &jobDetails.Description, &perks, &whatYouWill, &requirements)
		if err != nil {
			return jobDetails, fmt.Errorf("could not scan job row: %v", err)
		}

		// Convert pq.StringArray to []string
		jobDetails.Perks = []string(perks)
		jobDetails.WhatYouWill = []string(whatYouWill)
		jobDetails.Requirements = []string(requirements)
	} else {
		return jobDetails, fmt.Errorf("job not found with id %d", jobID)
	}

	// Return the populated jobDetails struct
	return jobDetails, nil
}
