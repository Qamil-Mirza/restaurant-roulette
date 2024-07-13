# Restaurant Roulette App

## About
Hi, this is a quick and simple app I decided to create for fun. Ever had moments with your family/friends where you ask the classic first world question, "Where do you want to eat?" ? Well I sure as heck did, and it was always a pain to choose, especially when everyone says "I'm fine with anything" (but are they really?). 

The goal of the project is simple, let users generate a random restaurant from One Utama's offerings

## Approach

### Frontend
I'll simply be using Next.js with React, Typescript, tailwind and ShadCn for the dropdown component. Nothing too complicated, and not trying to go crazy with styling either. I'll be fetching data with async/await and fetch. 

### Backend
I've written a selenium and bs4 script with python that scrapes the One Utama website for relevant data and exports that data as a JSON file, which is then passed to an API endpoint written with Express.js.

## Future Work
If I find that people like the idea haha, maybe I'll start improving it with the following:

1. Add filter feature to allow users to filter by cuisine type or Halal/ Non-Halal
2. Improve design
3. Add other shopping Malls besides One Utama. 

🐪