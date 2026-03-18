This README.md is tailored specifically to your React 19, Vite, and Tailwind 4 tech stack. It provides a professional overview for anyone viewing your repository, ensuring they can get the app running quickly. 

React Quiz App
    A modern, high-performance quiz application built with React 19, Vite, and Tailwind CSS v4. This app features a real-time countdown timer, randomized answers, and a detailed summary of results. 

🚀 Features
    Real-time Timer: 10-second countdown per question using a synchronised progress bar and setTimeout logic.
    Dynamic Feedback: Instant visual cues (Correct/Wrong) and toast notifications using React-Toastify.
    Smart Shuffling: Answer options are randomized on every question to ensure a unique experience.
    Result Summary: A final modal displaying the total score, percentage, and correct/incorrect counts.
    Modern Styling: Built with the latest Tailwind CSS v4 engine for high-speed performance and CSS-first configuration. 

🛠️ Tech Stack
    Frontend: React 19, Vite 8.
    Styling: Tailwind CSS v4.
    State Management: React Context API & useReducer.
    Notifications: React-Toastify.
    Icons: Lucide React. 

🏁 Getting Started
        Follow these steps to run the project locally on your machine. 

        Prerequisites
            Node.js (v18 or higher recommended). 

        Installation
            Clone the repository:
                bash
                git clone https://github.com
                cd react-quiz-app
                Use code with caution.

            Install dependencies:
                bash
                npm install
                Use code with caution.

            Start the development server:
                bash
                npm run dev
                Use code with caution.

            The app will be available at http://localhost:3000. 

📂 Project Structure
    src/components: UI components (Header, Quiz, QuestionTimer, Summary).
    src/store: Context and Reducer logic for global state.
    src/assets: Images and the question.js data file.
    src/utilities: Custom Modal and Toaster configurations. 

=======================================================================================================================================================================
                                                            Business Requirements Document (BRD)

1. Executive Summary
    The React Quiz App is an interactive, web-based platform designed to test user knowledge through a timed, multi-question interface. The goal is to provide a smooth, engaging experience using a modern tech stack (React 19, Tailwind 4) that offers real-time feedback and a detailed performance summary upon completion.

2. Project Objectives
    Engagement:           Increase user retention through a high-pressure countdown timer and visual progress tracking.
    Immediate Feedback:   Provide instant visual and toast notifications for correct/incorrect answers.
    Performance Tracking: Deliver a final score summary with percentage-based results.
    Modernization:        Utilize the latest frontend standards (React 19, Vite 8, Tailwind 4) for optimal speed and developer efficiency.

3. Project Scope
    In-Scope:
        A centralized state management system using React Context and Reducers.
        A 10-second per-question timer with auto-skip logic.
        Randomized/shuffled answer options for every attempt.
        A responsive, mobile-first UI with custom gradients and animations.
        Final summary modal with correct/wrong count and a "Retake" option.
    Out-of-Scope:
        User authentication or persistent databases (data is currently stored locally in assets/question.js).
        Leaderboards or social media sharing (future phase).

4. Business Requirements
    ID	     Requirement Name	                               Description	                                               Priority
    BR-01	Timed Interaction	Each question must have a visible countdown; failing to answer skips the question.	       Critical
    BR-02	Visual Indicators	Answers must change color (Green/Red) immediately after selection to indicate status.	     High
    BR-03	Result Accuracy	    The system must track user answers against the first index of the source data array.	   Critical
    BR-04	Responsive Design	The app must be fully functional and aesthetically consistent on mobile and desktop.	     High

5. Key Stakeholders
    Project Lead/Developer: Responsible for technical implementation and state logic.
    End Users:              Individuals seeking a quick, interactive way to test their React knowledge.
    Content Creator:        Responsible for maintaining the question bank in assets/question.js.

6. Project Constraints & Risks
    Constraint:            No backend API; quiz is limited to static data provided at build time.
    Risk (Race Condition): Rapid state changes between answer selection and next-question logic could cause score miscalculations if dependencies aren't handled        carefully in the Context.
    Risk (Accessibility): CSS-only feedback (colors) may be difficult for color-blind users; toast messages are included to mitigate this.

7. Cost-Benefit Analysis
    Cost:    Low. Development uses open-source tools (React, Vite, Tailwind) and static hosting (Netlify/Vercel).
    Benefit: High educational value and proof-of-concept for React 19 patterns; serves as a high-quality template for future interactive projects.

=========================================================================================================================================================================

                                                            Software Requirements Specification (SRS)

1. Introduction
    Purpose:           Define the functional and non-functional requirements for a web-based quiz application designed for real-time knowledge assessment.
    Scope:             The application includes a landing header, a timed question interface, real-time toast feedback, and a performance summary.
    Intended Audience: Frontend developers, UI/UX designers, and project stakeholders. 

2. Overall Description
    Product Perspective:    A standalone client-side application built with React 19 and Vite, utilizing a local JSON data source for questions.
    User Classes:           Participants who take the quiz and view results.
    Operating Environment:  Modern web browsers (Chrome, Firefox, Safari, Edge) on desktop and mobile platforms. 

3. Functional Requirements
    ID 	       Requirement	                                  Description
    FR-01	Question Display	  Show one question at a time with four multiple-choice options.
    FR-02	Answer Selection	  Allow users to click an option, triggering a transition to "answered" state.
    FR-03	Timer Logic	          Each question must have a 10-second countdown. Auto-skip to the next question if the timer expires.
    FR-04	Immediate Feedback	  Highlight selected answers (Orange), then reveal status (Green for correct, Pink/Red for wrong).
    FR-05	Toast Notifications	  Display a success/error message using react-toastify immediately after an answer is validated.
    FR-06	Scoring System	      Track correct, incorrect, and skipped questions in a central state (Reducer).
    FR-07	Summary View	      Display final percentage and counts (Correct/Wrong/Total) in a modal upon completion.
4. Non-Functional Requirements
    Performance:     The app should load in under 2 seconds; question transitions should feel instantaneous.
    Usability:       Follow a clean, responsive layout with clear typography (Roboto Condensed) and accessible button states.
    Reliability:     State must be managed via QuizContext to ensure data consistency during rapid user interactions.
    Maintainability: Code must be modularized into components (Header, Quiz, QuestionTimer, Summary). 

5. System Interfaces
    User Interface: Styled using Tailwind CSS v4 utility classes for a consistent theme.
    Data Interface: Questions are imported from a static dummyRaWQuizData array provided at build time.

=========================================================================================================================================================================

