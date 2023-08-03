# SubQuiz

SubQuiz is a web application that allows users to create and take quizzes on various topics. It provides a platform for quiz creators to design quizzes and share them with participants. Participants can take the quizzes and receive scores based on their answers.

## Features

- Quiz Creation: Admins can create quizzes with multiple-choice questions, including questions with multiple correct answers.
- Participant Mode: Participants can take quizzes shared with them using a unique link.
- Score Tracking: Participants receive scores based on their answers to the quiz questions.
- Multiple Correct Answers: Quizzes support questions with multiple correct answers.
- Quiz Management: Creators can view the list of participants and their scores for each quiz.

## Technologies Used

- Node.js: Backend runtime environment
- Express.js: Web application framework for Node.js
- MongoDB: Database for storing quizzes and participants' data
- Mongoose: MongoDB object modeling for Node.js
- JSON Web Tokens (JWT): For user authentication and authorization
- Express-Async-Errors: For automatic handling of asynchronous errors in Express
- Validator: For data validation

## Getting Started

To run the SubQuiz application locally, follow these steps:

1. Clone the repository to your local machine:

```bash
git clone https://github.com/your-username/SubQuiz.git
```

2. Install the dependencies:

```bash
npm install
```

3. Create a .env file in the root directory and add the following environment variables:

```bash
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
JWT_LIFETIME=1d
```

4. Start the application:

```bash
npm start
```

5. Open your browser and go to http://localhost:5000 to access the SubQuiz application. Use Postman to make requests.