# Metadata scraper - NodeJS

Scrape an input URL and parse its metadata. If the page has OG parameters set exclusively, return all the OG parameters. If they are not set, parse the webpage to get relevant details such as title, description, images etc.

## Local development

* First clone this repository and `cd` into its directory:

* Install dependencies:

    ```
    npm install
    ```

* Copy the sample configuration file and edit it to match your configuration.

    ```
    $ cp .env.example .env
    ```
    Replace following environment variables in .env file:

    Port to listen: HTTP_PORT

    App mode: DEPLOYMENT_MODE 
    // DEPLOYMENT_MODE can be development Or production. 'development' will give descriptive logs & errors in webpages.

    Run `source .env` to export the environment variables

* Run the application. 
    For dev environment, start the app by "node ./bin/www" OR "nodemon ./bin/www" commands.

    Use pm2 in production. 
    Install pm2 globally and run it on startup:

    ```
    $ sudo npm install pm2 -g
    ```
    
    ```
    $ sudo pm2 startup systemd
    ```

    Run the app:
    
    ```
    $ pm2 start ./bin/www
    ```

    OPTIONAL: Restart and update environment variables:

    ```
    $ pm2 restart ./bin/www --update-env
    ```

* Go to  `http://your.domain:HTTP_PORT` to view the home page. e.g. localhost:3000
* Also it is able to send POST requests to the endpoint "http://your.domain:HTTP_PORT". 
  e.g. localhost:3000  data: {url: "url-to-scrap"}
* Send GET requests to the endpoint "http://your.domain:HTTP_PORT/?url=url-to-scrap". 
  e.g. http://localhost/parse?url=https://www.amazon.com/Clarks-Mens-Tilden-Oxford-Leather/dp/B01NGUTV8E/ref=lp_18637582011_1_1?srs=18637582011&ie=UTF8&qid=1550595446&sr=8-1
