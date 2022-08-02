# jobs app

## Table of Contents

- [Description](#description)
- [Main features](#main-features)
- [Built with](#built-with)
- [Installation and setup](#installation-and-setup)
- [What I learned in this project](#what-i-learned-in-this-project)
- [Screenshots](#screenshots)
- [Credits](#credits)

## description

Track your job applications.

## main features

- jwt authentication
- user can save and track their job applications
- user can edit jobs
- user can delete jobs
- drag and drop to sort the jobs in the desired order

## built with

MongoDB, Express, React, Node

## installation and setup

- clone this repo by running `git clone https://github.com/suchislif3/jobs-app.git`

### backend

- `cd server`
- `npm install`
- copy .env.example as .env and replace the values in the .env file.
- `npm run devStart`

### frontend

- `cd client`
- `npm install`
- copy .env.example as .env and replace the values in the .env file.
- `npm start`

Open http://localhost:3000 in your browser to see the result.

## what I learned in this project

- mongoose middleware and custom methods
- swagger API documentation
- React useContext with useReducer
- drag and drop sortable elements

## screenshots
![home](https://user-images.githubusercontent.com/79847008/180595950-4e749059-a1d2-4d9e-9d3e-8e12b78e7ecf.png)
![login](https://user-images.githubusercontent.com/79847008/180595952-1b841d66-8c03-4307-8c75-265cf7dadedc.png)
![new_job](https://user-images.githubusercontent.com/79847008/180595957-1233aa28-abef-4378-b41c-0b52946ec735.png)
![jobs](https://user-images.githubusercontent.com/79847008/180595960-20e1d7b5-a812-43f6-92f9-0806abe39069.png)
![edit_job](https://user-images.githubusercontent.com/79847008/180595962-8943c15e-5088-4342-908d-97c80f27e597.png)

## credits

- [NodeJS Tutorial and Projects Course](https://www.udemy.com/course/nodejs-tutorial-and-projects-course/)
