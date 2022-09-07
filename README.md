# Easy Fund

![Logo](https://github.com/Niloy173/EasyFund/blob/production/public/images/favicon.png)

**Easy fund** is a part of crowdfunding, an approach to raise assets for a particular reason or task by requesting an enormous number from individuals to give cash, ordinarily in limited quantities, and generally during a moderately brief timeframe, like a couple of months. It empowers pledge drives to gather cash from countless individuals through online stages.

<br>

## Table of Content

<ul>

  <li><a href="#description">WorkFlow</a></li>
  <li><a href="#tools">Tools & Software</a></li>
  <li><a href="#feature">Feature</a></li>
  <li><a href="#setup">Setup & Installation</a></li>
  <li><a href="#team">Team Member</a></li>

</ul>

<br>

<div id="description">

## WorkFlow

A modern prototype appplication of crowdfunding which reflects the work of aspiring talent, building network among the students, teachers as well as for the public who can appricate the meaning of hard-work, excellence and more precisely one's chasing to through the dream. It's not like the natural crowdfunding but now a days, there isn't a single person who doesn't need help from others in a nutshell you can think of as a platform for the speakers who can speak, represent and get the attraction for hope to make a change for their dream

Create your project with the steps or procedure whatever you can recall to stick with the prototype of **easyfund** and that project or story will be under 24hour monetization as admin will be verifying each and every single details wheither the project should go live or not. User will be notified as well as he/she will be alarmed when any person support small contribution to their project or commented even though any person can share their or other's project through given link in the
story page via social media.

<br>

> Three steps to create a project

<br>

- General Settings (your demand, days to cover, type of the project)
- CoverPage (upload a cover picture related to your story)
- Give a title, detailed story and related attachments to get more awareness

<br>

> A preview to take a look about the information you provide

<br>

> For the admin-panel

  <table>

  <tr>
    <td>Pending projects</td>
     <td>Runing projects</td>
      <td>Total Transactions amount</td>
       
  </tr>

</table>

<br>

admin is responsible whether the newly created project should go live or not through ( **accept**, **reject** ) button . After the successful project creation, user will be able to share, comment, track the required amount collection etc from their end so Keep crawling.

</div>

<br>

<div id="tools">

## Tools & Software

- Design Architecture & Tools : **MVC Design pattern**, **Figma**
- Template Engine : **Ejs**
- Front-end Development : **Html**, **CSS3**, **Bootstrap**
- Back-end Development : **Node JS**
- Database Design & Management : **MongoDB**
- IDE : **Visual Studio**

</div>

<br>

<div id="feature">

## Feature

1. Real Time Authentication like (**signIn**,**logIn**) & **forget password** option developed using nodemailer.
2. Role Base view rendering of which we're talking about (**user**,**admin**) only.
3. Able to upload **single** and **multiple** images as per the project story relates.
4. Notification gets popup in case of **project** gets **accepted**, **funded** or someone **commented** in the story.
5. Comment view enabled for any **logged** in user who wants to give effective message.
6. Payment gateway added using <a href="https://developer.sslcommerz.com/registration/">sslcommerz</a> for development practice.

</div>

<br>

<div id="setup">

## Setup & Installation

> check out the env.txt file which contains all the information regarding the project setup and
> some valuable information about role management

- clone the repository named (**production**) from here and run it in any empty folder through gitbash etc.

```sh
https://github.com/Niloy173/EasyFund.git
```

- In the project directory, run the below command to install required dependencies & dev-dependencies

```sh
  npm install
```

- create a **.env** file in the root directory && paste the below information

```sh
PORT = 3000
APP_NAME=Easy Fund
APP_URL=http://localhost:3000/
DB_URL=mongodb://localhost:27017/EasyFundDataBase
AUTH_EMAIL=provide_your_auth_email
AUTH_PASS=provide_your_auth_pass
COOKIE_NAME=easyfund
COOKIE_SECRET=re456wechh7895uhu12df
JWT_TOKEN=fd21uhu9587hhcew654er
JWT_EXPIRE=86400000
STORE_ID=register_ssl_id
STORE_PASSWORD=register_ssl_password
```

- go to package.json file and in the script tag paste the following code

```sh
  "start": "nodemon app.js"
```

- paste your auth_email and auth_password (below link to setup app password)

```sh
https://support.google.com/mail/answer/185833?hl=en
```

- run the project in your terminal with the below command

```sh
  npm start
```

- go to the below endpoint to see the result

```sh
  localhost:3000
```

> for the sslcommerz testing, try open an account from <a href="https://developer.sslcommerz.com/registration/">here</a>. you will get the store_id & store_password in your mail. replace (register_ssl_id,register_ssl_password) them in the .env file.

</div>

<br>

<div id="team">

## Team Member

[![avatar](https://images.weserv.nl/?url=avatars.githubusercontent.com/u/42918591?v=45h=45&w=48&fit=cover&mask=circle&maxage=7d)](https://github.com/newlyyyy)
[![avatar](https://images.weserv.nl/?url=avatars.githubusercontent.com/u/57285905?v=4&h=48&w=48&fit=cover&mask=circle&maxage=7d)](https://github.com/Coder-Towhid)
[![avatar](https://images.weserv.nl/?url=avatars.githubusercontent.com/u/63700841?v=4&h=48&w=48&fit=cover&mask=circle&maxage=7d)](https://github.com/Niloy173)

</div>
