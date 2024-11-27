package types

import "encoding/json"

type Course struct {
	ID            int    `json:"id,omitempty"`
	TrackID       int    `json:"track_id,omitempty"`
	Name          string `json:"name,omitempty"`
	IMG_URL       string `json:"img_url,omitempty"`
	LEVEL         string `json:"level"`
	USERSENROLLED string `json:"users_enrolled"`
	DESCRIPTION   string `json:"description"`
}

// CourseDetails represents the course details structure
type CourseDetails struct {
	ID                 int             `json:"id"`
	TrackID            int             `json:"track_id"`
	CourseID           int             `json:"course_id"`
	Duration           string          `json:"duration"`
	Title              string          `json:"title"`
	Heading1           string          `json:"heading1"`
	Heading2           string          `json:"heading2"`
	Test               bool            `json:"test"`
	Video              bool            `json:"video"`
	Books              bool            `json:"books"`
	Level              json.RawMessage `json:"level"`    // Store raw JSON for later unmarshalling
	ForWhom            json.RawMessage `json:"for_whom"` // Store raw JSON for later unmarshalling
	HelpOut            []string        `json:"help_out"`
	KnowledgeRequired  []string        `json:"knowledge_required"`
	WillBePlus         []string        `json:"will_be_plus"`
	AfterCourse        []string        `json:"after_course"`
	Projects           json.RawMessage `json:"projects"` // Store raw JSON for later unmarshalling
	SpeakerInfoIMGURL  string          `json:"speaker_info_img_url"`
	SpeakerInfoDetails []string        `json:"speaker_info_details"`
}
