import React, { useEffect, useState } from "react";

const UserQuiz = () => {
  const [activeSection, setActiveSection] = useState(null);
  const [selectedSection, setSelectedSection] = useState(null);
  const [quizData, setQuizData] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const track_id = localStorage.getItem("TrackId");
  const subtopic_id = localStorage.getItem("CourseId");


  const fetchQuizData = async () => {
    setLoading(true); 
    try {
      const response = await fetch(
        `http://13.202.240.58:8080/quiz?track_id=${track_id}&subtopic_id=${subtopic_id}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch quiz data");
      }
      const data = await response.json();
      setQuizData(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

 
  useEffect(() => {
    fetchQuizData();
  }, [track_id, subtopic_id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Handle user option selection
  const handleOptionClick = (questionId, optionText) => {
    setUserAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: optionText,
    }));
  };

  // Check if an answer is correct
  const isAnswerCorrect = (question, userAnswer) => {
    return question.correct_answer === userAnswer;
  };

  // Submit the quiz and calculate section-wise score
  const handleSubmit = () => {
    const sectionScores = {};
    quizData.forEach((section) => {
      let correctAnswers = 0;
      section.questions.forEach((question) => {
        const userAnswer = userAnswers[question.id];
        if (isAnswerCorrect(question, userAnswer)) {
          correctAnswers += 1;
        }
      });
      sectionScores[section.section_id] = correctAnswers;
    });
    setScore(sectionScores);
    setIsSubmitted(true);
  };

  // Toggle active section for section navigation
  const toggleAccordion = (sectionId) => {
    setActiveSection(activeSection === sectionId ? null : sectionId);
    setSelectedSection(null); // Reset selected question when toggling section
  };

  // Get section score from the calculated sectionScores
  const getSectionScore = (sectionId) => {
    return score[sectionId] || 0;
  };

  // Update background color based on correctness of answer
  const getAnswerBgColor = (question, option, userAnswer) => {
    if (isSubmitted) {
      // After submission, green if correct, red if incorrect
      if (userAnswer === option.option_text) {
        return option.is_correct ? "bg-green-400" : "bg-red-400";
      }
    } else {
      // Before submission, highlight the selected option in purple
      if (userAnswer === option.option_text) {
        return "bg-purple-400";
      }
    }
    return ""; // No color if not selected or not submitted
  };

  // Reset the quiz (Refresh the page or reset all state)
  const handleReset = () => {
    setActiveSection(null);
    setSelectedSection(null);
    setUserAnswers({});
    setIsSubmitted(false);
    setScore({});
    fetchQuizData(); // Re-fetch quiz data after reset to ensure it's fresh
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar for Section Navigation */}
      <div className="w-1/4 bg-gray-100 p-4">
        <h2 className="text-lg font-bold mb-4">Quiz Navigation</h2>
        {quizData.map((section) => (
          <div key={section.section_id}>
            <button
              className="w-full text-lg text-left px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md mb-2 font-medium"
              onClick={() => toggleAccordion(section.section_id)}
            >
              Section {section.section_id}
            </button>
            {activeSection === section.section_id && (
              <ul className="mt-2 mb-4 flex flex-col space-y-2">
                {section.questions.map((question) => (
                  <li key={question.id}>
                    <button
                      className="text-lg text-left pl-4 font-semibold drop-shadow-lg bg-white text-blue-500 w-full py-1 rounded-md"
                      onClick={() => setSelectedSection(question.id)}
                    >
                      Question {question.id}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="w-3/4 p-6">
        <h2 className="text-2xl font-bold mb-6">Quiz Questions</h2>

        {/* Show questions from active section */}
        {quizData.map((section) =>
          activeSection === section.section_id
            ? section.questions.map((question) => (
                <div key={question.id} className="mb-8">
                  <h3
                    className="text-lg font-semibold mb-2"
                    dangerouslySetInnerHTML={{ __html: question.question }}
                  />
                  <ul>
                    {question.options.map((option) => {
                      const userAnswer = userAnswers[question.id];
                      const bgColor = getAnswerBgColor(question, option, userAnswer);
                      return (
                        <li
                          key={option.id}
                          className={`p-2 border rounded-md mb-2 cursor-pointer ${bgColor}`}
                          onClick={() => !isSubmitted && handleOptionClick(question.id, option.option_text)}
                        >
                          {option.option_text}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))
            : null
        )}

        {/* Submit Button */}
        <div className="mt-6">
          <button
            className="px-6 py-2 bg-blue-500 text-white rounded-md"
            onClick={handleSubmit}
            disabled={isSubmitted}
          >
            {isSubmitted ? "Quiz Submitted" : "Submit Quiz"}
          </button>
        </div>

        {/* Reset Button */}
        {isSubmitted && (
          <div className="mt-4">
            <button
              className="px-6 py-2 bg-gray-500 text-white rounded-md"
              onClick={handleReset}
            >
              Reset Quiz
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserQuiz;
