# Project Name

Contact us form with mail to 

## Table of Contents
- [Description](#description)
- [Installation-and-Usage](#installation-and-Usage)
- [Screenshots](#Screenshots)



## Description

Project has a contact us form in the frontend made with react native and native base. Form has four fields name,number,email and message to be sent. In backend is made in express which takes the request at /send-email route at frowards the mail to recipent.

## Installation-and-Usage

Provide instructions on how to install the project. Include prerequisites, dependencies, and step-by-step installation instructions. For example:

```bash
# Clone the repository
git clone https://github.com/yourusername/yourproject.git

# Navigate to the project directory
cd ContactUs

# Navigate to the frontend directory and install the dependecnies
cd frontend
npm install

# run the following command to start the app which can be seen in expo app downloaded in your phone by scanning the qr code provided
npx expo start


# Navigate to the backend directory and install the dependecnies
cd ..
cd backend
npm install

# Navigate to the backend directory add .env file with following details
SMTP_HOST='smtp.gmail.com'
SMTP_PORT=465
SMTP_MAIL='youremail@gmail.com'
SMTP_PASSWORD='yourpassword'


# run the following command to start the backend server
nodemon server 

```

## Screenshots
![image1](E:\smit\ContactUs\images\WithError.jpg)
![image2](E:\smit\ContactUs\images\WithoutError.jpg)



