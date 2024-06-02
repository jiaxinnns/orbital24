Link to our code:
https://drive.google.com/file/d/1OFRDyPu5js2onea-yErGTBDkEmtC0uc8/view?usp=drive_link

Team Name:
Study Buddies

Proposed Level of Achievement:
Apollo 11

Motivation:
Many students feel unmotivated when studying alone, as seen from the influx of students asking for study buddies on the NUS ConfessIT channel. Studybuddies aims to seek study buddies for NUS students in a safe manner, according to their preferences.

Our motivation stems from a keen understanding of the common challenges faced by university students, such as feeling isolated, unmotivated, or overwhelmed by their coursework. We recognize the profound impact that a supportive academic community can have on a student's educational journey. By creating a platform that eases the formation of study groups and encourages collaborative learning, we aim to address these challenges directly, enhancing students' learning experiences and academic outcomes. Our team is driven by a passion for leveraging technology to foster educational engagement and peer support, inspired by our own experiences and observations within the NUS community. Through this project, we aspire to empower students to take charge of their learning, connect with peers, and achieve their academic goals in a more interactive and fulfilling way.

Vision:
The primary aim of our project is to develop an innovative and interactive platform designed specifically for NUS students to enhance their academic experience through collaboration and shared learning. By leveraging advanced matchmaking algorithms and user-friendly interfaces, our system will facilitate the formation of study groups among students with common academic interests, challenges, and schedules. We aim to create an inclusive, supportive, and engaging environment that encourages peer-to-peer learning, boosts motivation, and fosters a sense of community among students, ultimately contributing to their academic success and personal growth.

User Stories:
As an NUS student who is struggling with my major, I want to be able to find a group of motivated individuals to have peer tutoring sessions and discussions about assignments and coursework
As an NUS student with a busy schedule, I want my faculty, major, schedule, and preferences to be used in finding me a study buddy
As an NUS student, I want to chat with other students for help with my work
As an NUS student who feels unmotivated or lonely studying alone, I want to be able to form study groups with new people with similar interests.
As an NUS student, I want to be able to track my progress and hours spent studying
As an NUS student, I want to be motivated by my peers and keep up with their progress

Project Scope:

Study Buddies is an app where NUS students can find study partners/groups and study together, while tracking their progress and against their peers.

Users can create an account, and enter their faculty, major, and study preferences in their profile. They will be matched based on their preferences, and they can chat with their matches to engage in study sessions or discussions.

Users can track their progress using timers which log their hours spent studying, and they can view their peers’ progress on the leaderboard.

Features:

Current Progress:
Currently, our app has a landing page, register page and sign in page. Users can register and enter their name, email (we will be enforcing the use of an NUS email and an email verification system soon, but have decided to omit this for Milestone 1 for ease of testing the auth features), password, and select their faculty and gender.

Once the user creates the account, he can sign in using the email and password to gain access to his account.

Proposed:
Users will be able to add preferences to their profile, such as faculty, gender, year, and these will be used to find a match for them. They can choose to chat with others, or match with more people and create a study group.

Users can track their time spent studying using a timer function. Their time spent studying will be stored in their account.

Plan for the next development cycles:
Milestone 1 - Technical proof of concept (i.e., a minimal working system with both the frontend and the backend integrated for a very simple feature)
User portal completed, may not be mobile-optimised yet
Backend and database set up and linked
All authentication design features completed
Milestone 2 - Prototype (i.e., a working system with the core features)
Advanced user features implemented (edit profile, find matches etc.)
Live chat implemented
Mobile optimisation
Milestone 3 - Extended system (i.e., a working system with both the core + extension features)
Study timer implemented
Leaderboard implemented

Setup Instructions:

This project uses Vite (React) and Express.js. We have included the .env files in our git commit for Milestone 1 for ease of testing. It contains only our supabase key.

Make sure you are working in the main directory at all times for the React setup.
Git clone OR unzip and open the file (in the link provided at the top of this document) in a code editor like VScode
`git clone https://github.com/jiaxinnns/orbital24.git`
Install dependencies
`npm install`
Run development server (this should start both the frontend and backend servers)
`npm start`
Check if the server is running, by checking the full message printed on the console (might need to scroll)
The console in your code editor should print ‘Server running on port 4000’ (among other things)
If any error occurs regarding the port already being used, kill the port (replace 4000 with any port causing the issue)
`npx kill-port 4000`
Access the web app at http://localhost:5173 or whichever URL is provided in the terminal after running the development server.
