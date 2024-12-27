package types

type Job struct {
	JobID              int    `json:"job_id"`
	Title              string `json:"title"`
	CompanyName        string `json:"company_name"`
	Location           string `json:"location"`
	SalaryMin          int    `json:"salary_min"`
	SalaryMax          int    `json:"salary_max"`
	SalaryCurrency     string `json:"salary_currency"`
	JobPostDate        string `json:"job_post_date"`
	ApplicantsThisWeek int    `json:"applicants_this_week"`
	JobDescription     string `json:"job_description"`
}

type JobDetails struct {
	DetailsID    int      `json:"details_id"`
	JobID        int      `json:"job_id"`
	Description  string   `json:"description"`
	Perks        []string `json:"perks"`
	WhatYouWill  []string `json:"what_you_will"`
	Requirements []string `json:"requirements"`
}
