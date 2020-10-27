# User Authenticaion

user_auth is user authentication service which provides APIs using express and MySQL. By which we can retrive, update and add user credentials.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. 

### Prerequisites

You need to install
```
    "bcryptjs": "^2.4.3",
    "body-parser": "^1.19.0",
    "cors": "^2.8.5",
    "express": "^4.17.1",
    "jsonwebtoken": "^8.5.1",
    "mysql2": "^2.1.0",
    "sequelize": "^5.21.12"
```

### Installing

Use following command to Install required modules

```
npm i
```

End with an example of getting some data out of the system or using it for a little demo

## Running the tests

Just turn on your mysql server, I used XAMPP activate appache and mysql.
Create a Database name it as "ucd"

Run the following command

```
node server.js
```

## Deployment

Before Deploying it on local machine Make sure that you have all the dependencies and your MYSQL service is actively running.

## Built With

* [VS Code](https://code.visualstudio.com/) - The Editor used
* [XAMPP](https://www.apachefriends.org/) - Server Used
* [NodeJs](https://nodejs.org/en/docs/) - RunTime environment

## Authors

* **Mirza Akber Namazi** - *Initial work* - [UCD](https://github.com/akbernamazi/user_auth)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE) file for details
