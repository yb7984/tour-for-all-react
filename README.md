
# Tour For All

I have been working as a poker dealer for over 10 years. Every day I work I need to deal with poker tournaments and looking at the tournament clocks all the time. An idea came up to me I want to make my tournament clock one day and share it with everyone.

Here is the project. Everyone can find tournaments and see the real-time updated clocks online. Tournament hosts can run the same tournament in different rooms even in different cities, everyone would see the same clock with the same information no matter where you are.



## Authors

Sunbao Wu[@yb7984](https://www.github.com/yb7984)  
Email: [bobowu@outlook.com](mailto:bobowu@outlook.com)  
Linkedin: [https://www.linkedin.com/in/sunbao-wu/](https://www.linkedin.com/in/sunbao-wu/)


## Tech Stack
[![Node.js](https://img.shields.io/badge/%20-Node.js-blue)](https://nodejs.org/en/)
[![React](https://img.shields.io/badge/%20-React-blue)](https://reactjs.org/)
[![express.js](https://img.shields.io/badge/%20-express.js-blue)](http://expressjs.com/)
[![PostgreSQL](https://img.shields.io/badge/%20-PostgreSQL-blue)](https://www.postgresql.org/)

[![create-react-app](https://img.shields.io/badge/%20-create--react--app-green)](https://github.com/facebook/create-react-app)
[![React Testing Library](https://img.shields.io/badge/%20-React%20Testing%20Library-green)](https://testing-library.com/docs/react-testing-library/intro/)
[![React Router](https://img.shields.io/badge/%20-react--router--dom-green)](https://reactrouter.com/web/guides/quick-start)
[![React-Redux](https://img.shields.io/badge/%20-react--redux-green)](https://redux.js.org/)
[![Redux-Persist](https://img.shields.io/badge/%20-redux--persist-green)](https://github.com/rt2zz/redux-persist)
[![Redux-thunk](https://img.shields.io/badge/%20-redux--thunk-green)](https://github.com/reduxjs/redux-thunk)

[![Material-UI](https://img.shields.io/badge/%20-Material--UI-orange)](https://material-ui.com/)
[![jsonwebtoken](https://img.shields.io/badge/%20-jsonwebtoken-orange)](https://www.npmjs.com/package/jsonwebtoken)
[![axios](https://img.shields.io/badge/%20-axios-orange)](https://github.com/axios/axios)
[![moment](https://img.shields.io/badge/%20-moment-orange)](https://momentjs.com/)

[![Amazon S3](https://img.shields.io/badge/Amazon-S3-yellow)](https://aws.amazon.com/s3/)
[![bcrypt](https://img.shields.io/badge/%20-bcrypt-yellow)](https://www.npmjs.com/package/bcrypt)
[![jsonschema](https://img.shields.io/badge/%20-jsonschema-yellow)](https://www.npmjs.com/package/jsonschema)
[![express-ws](https://img.shields.io/badge/%20-express--ws-yellow)](https://www.npmjs.com/package/express-ws)
[![heroku](https://img.shields.io/badge/%20-heroku-yellow)](https://www.heroku.com)
[![surge](https://img.shields.io/badge/%20-surge-yellow)](https://surge.sh/)

  
## Demo
- [Tour For All Frontend](http://tourforall.surge.sh/) hosted on [Surge](https://surge.sh/)
- [Tour For All Backend](https://tourforall.herokuapp.com/) hosted on [Heroku](https://www.heroku.com/)


## Github
- Frontend: [tour-for-all-react](https://github.com/yb7984/tour-for-all-react)
- Backend: [tour-for-all-express](https://github.com/yb7984/tour-for-all-express)
  
## Components

| Component                  | Route                            | Description                                         |
| :------------------------- | :------------------------------- | :-------------------------------------------------- |
| `App`                      |                                  | The main container of this whole app.               |
| -- `Navbar`                |                                  | Navigation bar for this whole app.                  |
| -- `Loading`               |                                  | Component to show when loading data.                |
| -- `SnackAlert`            |                                  | Component to show alert message.                    |
| -- `Error`                 |                                  | Component to show when something unexpected happen. |
| -- `ImageUpload`           |                                  | Component to handle image file upload.              |
| -- `Routes`                |                                  | Component that contains all the routes.             |
| ---- `HomePage`            | /                                | Homepage                                            |
| ---- `Login`               | /login                           | Login page.                                         |
| ---- `Signup`              | /signup                          | Sign up page.                                       |
| ---- `Profile`             | /profile                         | Profile update page.                                |
| ---- `Password`            | /password                        | Password update page.                               |
| ---- `Tours`               | /tours                           | Tour list page. redirect to  upcoming tours.        |
|                            | /tours/upcoming                  | Upcoming tours page.                                |
|                            | /tours/past                      | Past tours page.                                    |
| ------ `TourSearchForm`    |                                  | Tour search form                                    |
| ------ `TourList`          |                                  | Tour list component                                 |
| -------- `TourListItem`    |                                  | Tour list item component                            |
| ---- `MyTours`             | /tours/my                        | My tours page.                                      |
|                            | /tours/my/created                | Created tours page.                                 |
|                            | /tours/my/attended               | Attended tours page.                                |
|                            | /tours/my/won                    | Won tours page.                                     |
|                            | /tours/my/following              | Saved tours page.                                   |
| ------ `TourList`          |                                  | Tour list component                                 |
| -------- `TourListItem`    |                                  | Tour list item component                            |
| ---- `TourDetail`          | /tours/:handle                   | Tour detail page.                                   |
| ---- `TourNew`             | /tours/new                       | New Tour page. Basic information only.              |
| ------ `TourForm`          |                                  | Tour input form.                                    |
| ---- `TourEdit`            | /tours/:handle/edit              | Edit Tour page.                                     |
| ------ `TourForm`          |                                  | Tour input form                                     |
| -------- `TourSettingForm` |                                  | Tour setting input form                             |
| ---- `Players`             | /tours/:handle/players           | Tour players page.                                  |
| ------ `PlayerSearchForm`  |                                  | Tour player search form                             |
| ------ `PlayerList`        |                                  | Tour player list component.                         |
| ------ `PlayerListItem`    |                                  | Tour player list item component.                    |
| ---- `PlayerForm`          | /tours/:handle/players/:username | Tour player update page.                            |
| ---- `TourClock`           | /tours/:handle/clock             | Tour clock page.                                    |