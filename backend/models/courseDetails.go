package models

import (
	"blog-app/types"
	"encoding/json"
	"fmt"

	"github.com/lib/pq"
)

func CourseDetails(trackID, courseID int) (types.CourseDetails, error) {
	var courseDetails types.CourseDetails

	// SQL query to fetch course details by track_id and course_id
	query := `
		SELECT
			id,
			track_id,
			course_id,
			duration,
			title,
			heading1,
			heading2,
			test,
			video,
			books,
			level,
			for_whom,
			help_out,
			knowledge_required,
			will_be_plus,
			after_course,
			projects,
			speaker_info_img_url,
			speaker_info_details
		FROM course_details
		WHERE track_id = $1 AND course_id = $2;
	`

	// Execute the query and scan the result into courseDetails
	err := database.QueryRow(query, trackID, courseID).Scan(
		&courseDetails.ID,
		&courseDetails.TrackID,
		&courseDetails.CourseID,
		&courseDetails.Duration,
		&courseDetails.Title,
		&courseDetails.Heading1,
		&courseDetails.Heading2,
		&courseDetails.Test,
		&courseDetails.Video,
		&courseDetails.Books,
		// Scan the JSONB fields as []byte (or json.RawMessage)
		&courseDetails.Level,   // Scan the level field as []byte
		&courseDetails.ForWhom, // Scan the for_whom field as []byte
		pq.Array(&courseDetails.HelpOut),
		pq.Array(&courseDetails.KnowledgeRequired),
		pq.Array(&courseDetails.WillBePlus),
		pq.Array(&courseDetails.AfterCourse),
		&courseDetails.Projects, // Scan the projects field as []byte
		&courseDetails.SpeakerInfoIMGURL,
		pq.Array(&courseDetails.SpeakerInfoDetails),
	)

	if err != nil {
		return courseDetails, fmt.Errorf("failed to fetch course details: %v", err)
	}

	// Decode the JSONB fields (like 'level' and 'for_whom') if they're stored as JSONB
	if err := json.Unmarshal(courseDetails.Level, &courseDetails.Level); err != nil {
		return courseDetails, fmt.Errorf("failed to unmarshal level JSON: %v", err)
	}

	if err := json.Unmarshal(courseDetails.ForWhom, &courseDetails.ForWhom); err != nil {
		return courseDetails, fmt.Errorf("failed to unmarshal for_whom JSON: %v", err)
	}

	// Optionally, unmarshal other fields like 'projects' if they are also JSONB
	if err := json.Unmarshal(courseDetails.Projects, &courseDetails.Projects); err != nil {
		return courseDetails, fmt.Errorf("failed to unmarshal projects JSON: %v", err)
	}

	// Return the populated struct
	return courseDetails, nil
}
