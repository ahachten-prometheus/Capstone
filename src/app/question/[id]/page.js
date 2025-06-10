'use client';
import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';


// dummy data
const questionsData = {
  "1": [
    {
      id: 1, question: "Why are you visiting our site today?",
      options: [
        "To access resources",
        "To attend an event",
        "To find a provider",
      ],
    }
  ],
  "2": [
    {
      id: 1, question: "Are you looking for resources on a particular",
      options: [
        "Anxiety & Depression",
        "ADD & ADHD",
        "OCD",
        "Bipolar Disorder",
        "Drug & Addiction",
        "Eating Disorder",
      ],
    }
  ],
};



//routing by id function 
export default function questionPage() {
  const { id } = useParams();     // getting the 'id' parameter from the URL
  const router = useRouter()

  const questionSet = questionsData[id]

  if (!questionSet) return <p>Loading...</p>

  // Converting id to number to decrement navigating back to previous page  
  const currentId = Number(id);

  //Set up state to store user input for each textbox
  const [answers, setAnswers] = useState({});

  //Use useEffect 

  // Handle checkbox changes for a specific question
  const handleOptionChange = (questionId, option) => {
    setAnswers((prev) => {
      const selectedForQuestion = prev[questionId] || [];
      const isSelected = selectedForQuestion.includes(option);

      // Add or remove option from array
      const updatedSelections = isSelected
        ? selectedForQuestion.filter((o) => o !== option)
        : [...selectedForQuestion, option];

      return {
        ...prev,
        [questionId]: updatedSelections,
      };
    });
  };


  const handleContinue = () => {
    // Check at least one option selected per question
    const allAnswered = questionSet.every(q => (answers[q.id]?.length ?? 0) > 0);
    if (!allAnswered) {
      alert("Please select at least one option to continue.");
      // You can later add navigation here
    }
    // Go to next question page if it exists
    const nextId = currentId + 1;
    if (questionsData[nextId]) {
      router.push(`/question/${nextId}`);
    } else {
      alert("Survey complete. Thank you!");
      router.push('/');
    }
  };

  const handleBack = () => {
    // If current id is greater than 1
    if (currentId > 1) {
      // Go to the previous question page
      router.push(`/question/${currentId - 1}`);
    } else {
      // If no previous question, go back to landing page
      router.push(`/`);
    }
  };

  return <div>
    <h1> Survey ID is: {id}</h1>
    <button onClick={handleBack} className="#000000 w-[60px] h-[55px] rounded-[8px] text-xl flex items-center justify-center top-[67px] left-[128px]">
      ←
    </button>
    {questionSet.map((q) => (
      <div key={q.id} className="mb-8">
        <p className="text-lg font-semibold mb-4">{q.question}</p>

        <div className="space-y-3">
          {q.options.map((option) => (
            <label key={option} className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5"
                checked={answers[q.id]?.includes(option) || false}
                onChange={() => handleOptionChange(q.id, option)}
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
      </div>
    ))}
    <button onClick={handleContinue} className="absolute w-[410px] h-[55px] left-[497px] top-[797px] bg-[#C96C86] rounded-[8px]">
      Continue
    </button>
  </div>
}