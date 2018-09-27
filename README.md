# MongoScrape
This Mongoose Mongo DB / Node application is a demonstration of a webscraping
This application is scrapong the web content- In this case articles from a selected website - "The Verge"
This application has 
    - Lists all the latest articles from the website by scraping from the website and saving on to mongo database.
    - Each of the article will have a header a summary  with a link to the article page and a save button to save
    - Saved articles can be viewed
    - Each of the saved articles can be removed from the saved list.
    - For each of the saved article, notes can be added. 
    - Multiple notes are allowed. Entered notes can be deleted as well.
    - There are two tables used- Article and Notes.
*************************************************************************************************
Burger application has the following file structure
Root(MongoScrape)
    |
    config
        |
        database.js
    controllers
        |
        articles.js
        notes.js
        routes.js
    models
        |
        Articles.js
        Note.js
    public
        |
        public
            |
            assets
                |
                css
                    |
                    style.css
                image
                    |
                javascript
                    |
                    app.js
                    scrape.js
    views
        |
        layouts
            |
            main.handlebars
            empty.handlebars
            index.handlebars
            saved.handlebars
    server.js
    node_modules    
    package.JSON
    package-lock.JSON
    README
*************************************************************************************************
News Scrape  app uses a Mongo DB database. To run we have to start Mongo D and Mongo
![](https://github.com/JPillai2018/MongoScrape/blob/master/public/assets/img/CMD-MONGO-1.PNG)
*************************************************************************************************
![](https://github.com/JPillai2018/MongoScrape/blob/master/public/assets/img/CMD-MONGOD-2.PNG)
*************************************************************************************************
Start the application by node Server.js 
![](https://github.com/JPillai2018/MongoScrape/blob/master/public/assets/img/Server-Starting-3.PNG)
On the browser use the url http://localhost:3000.
Home screen has a Home button, Scrape articles and Save articles. Also first time list all the previosuly saved articles.
![](https://github.com/JPillai2018/MongoScrape/blob/master/public/assets/img/Home-Screen-4.PNG)
Click Scrape articles button. All teh articles from the given website will be scraped and displayed ina formatted pattern. with header, summary and link to the full article. Also a save button is available.
![](https://github.com/JPillai2018/MongoScrape/blob/master/public/assets/img/Srape-Articles-5.PNG)
To save the article, click save button, one ata time.
![](https://github.com/JPillai2018/MongoScrape/blob/master/public/assets/img/Save-Article-6.PNG)
To view the saved article, click Saved article button
![](https://github.com/JPillai2018/MongoScrape/blob/master/public/assets/img/Go%20to-Saved-Article-7.PNG)
Saved article can be removed by clicking the saved remove button
![](https://github.com/JPillai2018/MongoScrape/blob/master/public/assets/img/Going-to-Remove-8.PNG)
![](https://github.com/JPillai2018/MongoScrape/blob/master/public/assets/img/Removed-9.PNG)
Each of the sabed article, a note can be entered by clicking the add/remove note button
![](https://github.com/JPillai2018/MongoScrape/blob/master/public/assets/img/View-Add-Notes-10.PNG)
![](https://github.com/JPillai2018/MongoScrape/blob/master/public/assets/img/Add-Notes-Modal-11.PNG)
![](https://github.com/JPillai2018/MongoScrape/blob/master/public/assets/img/Add-Notes-Modal-12.PNG)
![](https://github.com/JPillai2018/MongoScrape/blob/master/public/assets/img/Add-Notes-Modal-13.PNG)
![](https://github.com/JPillai2018/MongoScrape/blob/master/public/assets/img/Add-Notes-Modal-14.PNG)
Existing notes for an article can be deleted.
![](https://github.com/JPillai2018/MongoScrape/blob/master/public/assets/img/Going-to-Delete-Notes-15.PNG)
![](https://github.com/JPillai2018/MongoScrape/blob/master/public/assets/img/After-Deleting-Notes-16.PNG)
Following are a snapshot of the database.
![](https://github.com/JPillai2018/MongoScrape/blob/master/public/assets/img/Article%20Database-17.PNG)
![](https://github.com/JPillai2018/MongoScrape/blob/master/public/assets/img/Notes-Table-18.PNG)