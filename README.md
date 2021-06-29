


## Components

| Component        | Route                | Description                |
| :--------------- | :------------------- |:------------------------- |
| `App` || The main container of this whole app. |
| -- `Navbar` || Navigation bar for this whole app. |
| -- `Loading` || Component to show when loading data. |
| -- `Routes` || Component that contains all the routes. |
| ---- `HomePage` | / | Homepage |
| ---- `Login` | /login | Login page. |
| ---- `Signup` | /signup | Sign up page. |
| ---- `Profile` | /profile | Profile update page. |
| ---- `Password` | /password | Password update page. |
| ---- `Tours` | /tours | Tour list page. redirect to  upcoming tours.|
|  | /tours/upcoming | Upcoming tours page.|
|  | /tours/past | Past tours page.|
| ------ `TourSearchForm` || Tour search form |
| ------ `TourList` || Tour list component |
| -------- `TourListItem` || Tour list item component |
| ---- `MyTours` | /tours/my | My tours page. |
|  | /tours/my/created | Created tours page.|
|  | /tours/my/attended | Attended tours page.|
|  | /tours/my/won | Won tours page.|
|  | /tours/my/following | Saved tours page.|
| ------ `TourList` || Tour list component |
| -------- `TourListItem` || Tour list item component |
| ---- `TourDetail` | /tours/:handle | Tour detail page. |
| ---- `TourNew` | /tours/new | New Tour page. Basic information only.|
| ------ `TourForm` || Tour input form. |
| ---- `TourEdit` | /tours/:handle/edit | Edit Tour page. |
| ------ `TourForm` || Tour input form |
| -------- `TourSettingForm` || Tour setting input form |
| ---- `Players` | /tours/:handle/players | Tour players page. |
| ------ `PlayerSearchForm` || Tour player search form |
| ------ `PlayerList` |  | Tour player list component. |
| ------ `PlayerListItem` |  | Tour player list item component. |
| ---- `PlayerForm` | /tours/:handle/players/:username | Tour player update page. |
| ---- `TourClock` | /tours/:handle/clock | Tour clock page. |