# SEI Project 4: The Potting Shed

## Contents
* [Deployed Project Link](https://github.com/sapphire-p/SEI-Project-4#deployed-project-link)
* [The Brief](https://github.com/sapphire-p/SEI-Project-4#the-brief)
* [Overview and Concept](https://github.com/sapphire-p/SEI-Project-4#overview-and-concept)
* [Code Installation](https://github.com/sapphire-p/SEI-Project-4#code-installation)
* [Technologies and Tools Used](https://github.com/sapphire-p/SEI-Project-4#technologies-and-tools-used)
* [Planning](https://github.com/sapphire-p/SEI-Project-4#planning)
* [Development Process](https://github.com/sapphire-p/SEI-Project-4#development-process)
* [Challenges](https://github.com/sapphire-p/SEI-Project-4#challenges)
* [Wins](https://github.com/sapphire-p/SEI-Project-4#wins)
* [Future Improvements](https://github.com/sapphire-p/SEI-Project-4#future-improvements)
* [Key Learnings](https://github.com/sapphire-p/SEI-Project-4#key-learnings)

## Deployed Project Link

In this solo project, I built a full-stack application using Python, Django and PostgreSQL on the back end, and React for the front end. The Potting Shed is a simulated store and social community built around pot plants.

**This project has been deployed online and can be viewed [HERE](https://the-potting-shed.herokuapp.com/)**.

To access all features you can create an account by clicking Register, or feel free to use the test login, which is username ‘the-potting-shed’ and password ‘pass’.

## The Brief

* **Build a full stack application** complete with your own back end and front end
* **Use Python and Django to build the back end**, serving data from a **PostgreSQL database**
* **Implement a fully functional RESTful API** with all CRUD routes (POST, GET, PUT, DELETE)
* **Use React to build the front end** that consumes your API
* **Include at least one OneToMany or ManyToMany relationship** between the tables in your database
* **Deploy the project online** so it is accessible to the public
* **Timeframe:** 8 days

## Overview and Concept

The Potting Shed is a full-stack application built using Python, Django and PostgreSQL on the back end, and React for the front end, simulating a store and social community built around pot plants. Users can browse plants, register to create a profile and login, add and delete reviews of plants, add plants to their profile and explore other users’ profiles.

<p align="center">
  <img src="https://user-images.githubusercontent.com/84339614/148792590-7fbcfc04-705c-4e6a-a8f7-5399473d0b87.png" height="400" alt="Home page">
  <img src="https://user-images.githubusercontent.com/84339614/148792667-3531209a-7b03-40a2-9a17-f1a60b037e43.png" height="400" alt="Plant Show">
</p>

In this final solo project for my Software Engineering Immersive course, I developed my knowledge of SQL databases and relationships, realised a RESTful API with full CRUD functionality, implemented a custom user model and authentication, and challenged myself to learn and apply the React-Bootstrap framework.

<p align="center">
  <img src="https://user-images.githubusercontent.com/84339614/148798019-05bcc783-eaa6-4db8-8439-5beaf1f325cf.png" height="400" alt="MyProfile">
  <img src="https://user-images.githubusercontent.com/84339614/148798025-48c17f88-fd9a-41af-9124-7e50dfadf432.png" height="400" alt="Community page">
</p>

## Code Installation

The project can be viewed online [here](https://the-potting-shed.herokuapp.com/), but if you would like to explore the code on your local machine, please clone or download this repo then run the following Terminal commands:
* Ensure you have Python 3 and pipenv installed
* Install dependencies for back end: `pipenv`
* Enter virtual environment shell: `pipenv shell`
* Make migrations for the database: `python manage.py makemigrations`
* Migrate to the database: `python manage.py migrate`
* Seed data to the database:
  * `python manage.py loaddata plants/seeds.json`
  * `python manage.py loaddata jwt_auth/seeds.json`
  * `python manage.py loaddata reviews/seeds.json`
* Start back end server: `python manage.py runserver`
* Navigate into front end directory: `cd frontend`
* Install dependencies for front end: `yarn`
* Start front end server: `yarn start` to view the app in your browser

## Technologies and Tools Used

**Back end**

* Python
* Django
* Django REST Framework
* PostgreSQL
* Psycopg2
* pyJWT
* Pylint (Python linter)
* autopep8 (Python formatter)

**Front end**

* JavaScript (ES6)
* HTML5
* React.js
* React Router DOM
* Axios
* React-Bootstrap / Bootstrap
* CSS
* Nodemon
* ESLint (JavaScript linter)

**Other technologies**

* Pipenv
* VS Code
* Yarn
* Insomnia
* TablePlus
* Git / GitHub
* Heroku (deployment)
* Cloudinary (image hosting and uploading)

**Other tools**

* Lucid (creating Entity Relationship Diagram)
* Google Jamboard (wireframing)
* Trello (project management)

## Planning

### Entity Relationship Diagram (ERD)

After coming up with the app idea and brainstorming the features and functionality I wanted it to have, I planned out the structure of my PostgreSQL database. I created an Entity Relationship Diagram (ERD), complete with the four tables in my database, the relationships between them, and the fields and Django field types within each table.

![5_ERD](https://user-images.githubusercontent.com/84339614/148799593-f077c552-d090-4e29-b7f2-06194ba8548b.png)

### API Request and Response Plan

I also planned out the API requests that various React components on my front end would need to make, and the data that my back end would need to send back in response. I ensured that the request types encompassed full CRUD functionality, as specified by the brief.

![6_API-Request-and-Response-Plan](https://user-images.githubusercontent.com/84339614/148799725-2b143af3-e7ec-43e1-b781-5537b4f4e627.png)

### Wireframes

I then created some wireframes to plan the user interface of the app and inform layouting and styling.

<p align="center">
  <img src="https://user-images.githubusercontent.com/84339614/148799842-23f5e720-5b8f-49c9-b4fa-2aa92b2d8dca.png" height="210" alt="Wireframe Home">
  <img src="https://user-images.githubusercontent.com/84339614/148799853-ee15cdc2-7888-4bd7-bfa7-e78045999bac.png" height="210" alt="Wireframe PlantShow">
</p>
<p align="center">
  <img src="https://user-images.githubusercontent.com/84339614/148799867-5db84084-aa5e-4222-a743-95636fa2deee.png" height="210" alt="Wireframe Community">
  <img src="https://user-images.githubusercontent.com/84339614/148799877-2b068409-ccee-48bd-abf5-c70c36f67f95.png" height="210" alt="Wireframe Profile">
</p>

### Project Management

Aware that I only had 8 days to complete this project, I used Trello to create a tracker of tasks required to complete the build, which I updated daily using a traffic light system to monitor the progress of individual tasks.

![11_Trello_SEI-Project-4_project management](https://user-images.githubusercontent.com/84339614/148800650-26a0ae19-ec44-4470-b0fe-67b18c2432a9.png)


## Development Process

### Back end

I spent the first three days building out the back end, establishing the models, views and routes for my three PostgreSQL database tables: Users, Plants and Reviews. I also established the different kinds of relationships between them: a Many-To-Many relationship between Users and Plants (the user’s ‘Must-Have Plants’ collection), and One-To-Many relationships between Users and Reviews (one user can post many reviews) and Plants and Reviews (one plant can have many reviews).

![12_code_Custom-User-Model](https://user-images.githubusercontent.com/84339614/148800903-d2a8744c-40e3-4841-bdc2-cddfca2f1de3.png)

I tried different methods of getting visibility of the data structures in my database, including the Django Admin Portal, TablePlus and Insomnia, and found I preferred Insomnia for testing out my API request routes and responses, and viewing all the data via GET requests.

Correct configuration of the back end was one of the most time-consuming parts of the project, in large part due to the many serializers I realised were needed. However, this was worth it to minimise the number of API requests each front end component would need to make to get all the data required to display.

![13_code_Review-Serializers](https://user-images.githubusercontent.com/84339614/148800995-00e38e64-63b9-4d73-ba21-5ffe9b8e193a.png)

![14_code_Plant-Serializers](https://user-images.githubusercontent.com/84339614/148801005-184271bf-8166-41e5-b391-3dbd44635477.png)

### Front end

From day four onwards I focused on the front end, where I used React Hooks to build out components, React Router DOM for routing, Axios to make API requests and React-Bootstrap for layout and styling.

I used Cloudinary for image hosting for the app and used it to include an image upload field on the Register form, so users can add a profile picture. I was able to configure the uploader so that it recognises faces and formats the profile image to a set size and circular crop. To accommodate users that might not have a photo to upload, I had already established a neutral default profile image in the User model in the back end.

<p align="center">
  <img src="https://user-images.githubusercontent.com/84339614/148801132-80a3171d-f1f1-4d86-99e5-6e66f62800fb.png" alt="Image upload field" width="520"/>
</p>
<p align="center">
<img src="https://user-images.githubusercontent.com/84339614/148801225-52384534-cb54-49b7-b414-8ec867ca13d7.png" alt="Register with image upload" width="520"/>
</p>

I made use of conditional rendering with ternary operators to ensure different features could be seen (or not) depending on pieces of state. This enabled me to provide different experiences of the app for authenticated vs non-authenticated users, display different data on the Profile page depending on whether it belongs to the user or not, and implement error handling and loading states.

This code shows the use of a conditional render to display different items on the Navbar, according to whether the user is logged in or not:

![17_code_NavBar-conditional-render](https://user-images.githubusercontent.com/84339614/148801892-dda60690-6c9f-46a3-bcfd-ee4dbb156107.png)


## Challenges

* **Setting up serializers from Django REST Framework** - figuring out how to use these to populate the responses to different requests with the right data fields was one of the biggest challenges. I found I had to create a greater number of specialised serializers than I had initially anticipated.
* **Excess API routes** - so as to keep doors open, I included more back end routes than were ultimately used by the front end (for example, update review, update plant). This was to enable me to add further features with ease, but with hindsight I might have only included API routes that I knew I would have time to build front end functionality for within the tight time frame of this solo project.
* **New front end framework** - in my previous projects I had either used Bulma or custom CSS for layout and styling, so learning React-Bootstrap whilst implementing many other features for the first time was a challenge. By observing similarities with other frameworks I had used and keeping the styling relatively simple, I was able to produce something presentable, with more time I might have added more flair.

## Wins

* **Fully responsive design** across different devices.
* **Custom user model and authentication** extending Django’s default offerings and enabling significantly different experiences for logged in users versus logged out users.
* **Image uploading** field on the Register form that recognises faces and formats the profile image to a set size and circular crop. I found Cloudinary a helpful tool and will use it in future for image hosting and uploading.
* **Effective use of conditional rendering** through which I was able to ensure thorough error handling and loading states included across components, ensuring a positive and consistent user experience. I am confident in my use of conditional renders to account for different user behaviours as they interact with the app, and added helpful messages to improve the UX. Some examples of these messages shown below:
<p align="center">
  <img src="https://user-images.githubusercontent.com/84339614/148802431-cb27554e-3c97-4633-af60-cd1ee5d0a043.png" width="500" alt="Conditional render">
  <img src="https://user-images.githubusercontent.com/84339614/148802420-7679bad7-4118-4b05-aa1b-560e5939c126.png" width="300" alt="Conditional render">
</p>

## Future Improvements

* Ability to update reviews - API route exists but front end functionality not yet added.
* Automatic clearing of text input field when a review is submitted.
* Ability to update other aspects of the profile beyond adding Must Have Plants, adding delete functionality for Must Have Plants.
* Functionality to filter and search plants.
* Greater social interactivity - ability to comment on others’ profiles.

## Key Learnings

* **Relational databases and SQL** - this project enhanced my knowledge and understanding of these concepts and it was interesting to compare them with the noSQL non-relational databases used in previous projects, such as Project 3. I found working with an SQL database required more thorough up-front planning and it was more difficult to make changes to the back end in a dynamic way. However, once established, the structure seemed more robust and organised.
* **Python and Django** - this was my first project using Python and it was informative to learn more about this language and its pared-back syntax. I now understand how Django’s many helpful in-built features (including some authentication and error handling, the superuser, and the Admin Portal) might speed up the app development process, though customising aspects - such as the custom user model - was not always straightforward.
* **Full stack app development** - individually undertaking the process of building an app from end to end in this solo project really grew my confidence as a full stack engineer. Advancing both my project management and technical skills across the stack grew my excitement about the possibilities for future projects.
