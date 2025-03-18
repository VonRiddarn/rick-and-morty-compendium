# The Rick and Morty Compendium

A streamlined way to look through the public rick and morty api!

## 📖 About

This is a simple Wikipedia-style page powered by the Rick and Morty API.  
Each entity fetched from the API can also be auto searched on the wiki (with a somewhat accurate result).

## 🥩🥔 Features

-   Responsive design that works on desktop and mobile
-   Custom note-system for each entity, allowing users to save data connected to cards
-   Custom modal-system for viewing cards, complete with its own history and pagination controls
-   Pagination controls for navigating the data collected from the API

## Quick look

![Rick and Morty Banner](/repo_assets/Preview_Main.png)
![Rick and Morty Banner](/repo_assets/Preview_Modal.png)

## 🛠 How to Install and run the project

1. Install Node.js  
   https://nodejs.org/en
2. Clone the repo:  
   `git clone https://github.com/VonRiddarn/rick-and-morty-compendium.git`
3. Navigate into the project folder:  
   `cd rick-and-morty-compendium`
4. Install dependencies:  
   `npm install`
5. Run  
   `npm run dev`

## 🔧 Technologies Used

-   **TypeScript**
-   **SCSS**
-   **Vite**
-   **Rick and Morty API**

## The brag zone

### Stack

The entire project is created using vanilla typescript with no additional state handling framework,
yet manages to mirror some of that workflow in a trivial state.

### Optimization

The app only saves tiny amount of relevant and LOCAL (!) data to the cache at during requests.  
For example: The crawler at initialization only collects 20 episode responses at a time,
parses them into episode references (which is a custom more memory efficient type).  
This means that if the database grows indefinitely, the app will never experience a critical fail due to irresponsible initialization logic.

### The note system

The note system is a very light weight solution shared between entities.  
All notes are collected in a singular dictionary for O(1) lookup where the keys are parsed using the endpoints and entity id's.  
To get the notes for "Morty Smith" whom is character `2` of the `Characters` endpoint we use the key: `"characters_2"`  
A note lookup is only done when trying to present a modal containing a note, meaning requests to the dictionary is only made when needed.

## 🔗 My socials

[Github - VonRiddarn](https://github.com/VonRiddarn)  
[LinkedIn - Timmy Öhman](https://www.linkedin.com/in/timmyohman/)
