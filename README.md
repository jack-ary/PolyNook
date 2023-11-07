# PolyNook
Collaborators: Ivanreet Kaur, Supriya Mandava, Jack Ary, Nick Hotelling, Spruha Nayak

## Product Vision
For a CalPoly student who needs to find a space to study. PolyNook is a website that can locate rooms to study in. Our primary competitor is 25Live. Unlike 25Live we will have an more approachable UI that provides essential and only mentions spaces that are not occupied, which is the inverse of our competitor. PolyNook is a more sophisticated and user-centric/friendly platform.

## Developer Wiki
[Getting started](#getting-started)<br>
[Scripts](#scripts)<br>
[File Structure](#file-structure)

## User Stories

- Find availability
  - Sort by time: (Supriya)  As a Cal Poly student, I want PolyNook to display the study spaces that are available across campus at certain times so that I could be more productive and get work done.
  - Sort by space(bldg/room): (Supriya) As a computer science major, I want PolyNook to display study spaces within the Engineering building so that I could study somewhere close between classes.
  - Filter by major: (Supriya) As an English major, I want PolyNook to allow filtering by major so that I can find other Liberal Arts students for collaboration.
  - Filter by Degree Level (Nick).: As an upperclassman, I want PolyNook to allow filtering by degree level for each study space so that I can surround myself with my peers.
  - Filter by Tools available (Nick): As an electrical engineer, I want PolyNook to allow filtering by tools so that I can have a computer available for my homework while studying.
  - Filter by AC (Nick): As a habitual warm-clothes wearer, I want PolyNook to allow filtering by air conditioning so that I can avoid sweating between classes.
  - Sort by capacity (Jack): as someone in a group of 10, I want PolyNook to allow sorting by capacity so that I can find study rooms to accommodate us all.
- Calendar 
  - (Jack) As a part-time employee and part-time student, I want PolyNook to have a visual calendar feature so that I can coordinate study rooms with my study time.
- Show density 
  - Register feature(density + 1) (Jack): As a busy student, I want PolyNook to allow others to register their attendance so that I can see when a study room is too full for me.
  - Drop ‘reservation’(density - 1) (Ivan): As a good citizen, I want PolyNook to allow me to register my absence from a study room so that others can fill in my spot.
  - Show Current Student count (Ivan): As someone sensitive to noise while studying, I want PolyNook to show how many people are in each room so that I can pick out a nice quiet place to work.
- Map (STRETCH)
  - (Ivan) As an underclassman on my campus, I want PolyNook to display study spaces in a map so that I can navigate to them without knowing names of locations.
- Actually book(STRETCH)
  - (Spruha) As a skeptical user, I want PolyNook to allow booking of study rooms so that I can be sure they are available by the time I arrive.
- Ratings(STRETCH)
  - (Spruha) As a new student, I want PolyNook to allow study space ratings from previous users so that I can be confident in the quality of the location.
- Coordinate Group Meetings(STRETCH)
  - (Spruha) As a team leader for group projects, I want PolyNook to offer coordination of group meetings so that I can estimate which of my teammates will arrive at the study location.
### Getting started
```console
git clone ...
```
Then please do the following
```console
cd PolyNook
cd packages
cd react-frontend
npm init
npm install express 
npm install jest
```
Then you should be able to run the following scripts
### Scripts
To start the frontend, go to front end folder and run:
```console
npm start
```
To start the backend, go to server folder and run:
```console
node backend.js
```
For unit testing, go to test folder and run:
```console
npm test
```
### Contributing
Current coding standards:
- No Single Quotes
- No Trailing Commas 

Then you should be able to run the following scripts in packages/:
```console
npm install prettier eslint
```
```console
 npm install eslint-config-prettier eslint-plugin-prettier prettier --save-dev
```
Run this command to ormat all files at once.
```console
npm run format
```

### File Structure
```
PolyNook
├── README.md
└── packages
    ├── package-lock.json
    ├── package.json
    ├── react-frontend
    │   ├── package-lock.json
    │   ├── package.json
    │   ├── public
    │   │   ├── ...
    │   └── src
    │       ├── App.css
    │       ├── App.js
    │       ├── App.test.js
    │       ├── index.css
    │       ├── index.js
    │       ├── ...
    ├── server
    │   ├── backend.js
    │   └── package.json
    └── test
        ├── package.json
        └── server.test.js
```
