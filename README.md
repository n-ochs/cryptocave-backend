# Crypto Cave, Backend

Cryptocave is an online web application that allows users to research new and existing cryptocurrencies, keep up with the latest news surrounding the market, and keep track of their own portfolio. This repository is for our backend database.

## Scope of Functionalities
Registered users are able to search for thousands of coins and take part in a booming market first hand. With easy-to-use graphs, users can observe trends and analyze data over any historical period. In order to stay up to date with their favorite coins, users can also add them to their own custom watchlist, which will display their respective information in a neat, organized manner. To track their own portfolio over time, users are able to add and delete coins to their own custom portfolio, which is kept secure in our NoSQL database.

## Installation

Clone or fork [this repository](https://github.com/n-ochs/cryptocave-backend) and run:

```
npm install
npm run start
```

## Technology Stack
The main technologies that Crypto Cave utilizes include: 
* [MongoDB](https://www.mongodb.com/) - Database
* [Express](https://expressjs.com/) - Connecting the database
* [Node.js](https://nodejs.org/en/) - Server side

Other technologies include:

* [Axios](https://github.com/axios/axios) - make multiple asynchronous HTTP requests
* [Mailgun](https://www.mailgun.com/) - provide email verification to users upon registration
* [JWT](https://jwt.io/) & [JS-Cookie](https://github.com/js-cookie/js-cookie) - provide authorization for each request made to the database
* [Chart.js](https://www.chartjs.org/) - in order to display visual data to users and to observe trends over time
* [Material-UI](https://material-ui.com/) - overall design
* [Netlify](https://www.netlify.com/) - application hosting

## Sources Used
For users making life choices as critical as investing their hard earned money or users simply wanting to do their own due diligence, we knew that we needed to provide our users with the most accurate data available. That's why we decided to use the world's most comprehensive cryptocurrency API - [CoinGecko](https://www.coingecko.com/en/api). With CoinGecko, we are able to provide statistics for almost any coin, including but not limited to: market cap, volume, time-interval percentage performance, historical data, and trending news.

## Status
Backend is live and running stable.

## Future Updates
We are looking into developing a native mobile application for users that will include an education portal for users that are looking for that extra knowledge. Please stay tuned for more information.

## Contributors
| Developer                                      | Role        |
| :--------------------------------------------- | :----------:|
| [Eric Owen](https://github.com/eric-owen)      | Front End   |
| [Nick Ochs](https://github.com/n-ochs)         | Back End    |

## Have an idea, suggestion, or need assistance?
Pull requests are welcome. Please open an issue first to discuss the suggested changes.