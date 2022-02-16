Youtube link --> https://youtu.be/GEnQHL1_yfA

Tools used:

- Framework: ReactJS, NodeJS

- Database: MySQL via AWS-RDS , DynamoDB

- AWS Services: Lambda, API Gateway, Cognito, S3, Amplify

- Hosting: Netlify and Heroku

- CICD – CircleCI

- Unit Testing – Jest with Enzyme

- Automation & UI Testing – Selenium with Mocha

Additional Implementation Details:

- Pre-commit hook: Before new commit even takes place, Prettify and Husky modules will beautify the code.

- We used Lambda triggers for API calls, thereby reducing server usage time.

- Cookies support is enabled. Logged-in users will be remembered.

- Code-splitting and Lazy Loading has been implemented to optimise performance.



Architecture Diagram:

![photo-2020-03-12-18-43-41.jpg](https://i.postimg.cc/N008jbTC/photo-2020-03-12-18-43-41.jpg)

![SS](https://i.postimg.cc/2jQj9YLm/cognito.png)
![SS](https://i.postimg.cc/Kj2GcqVd/dynamodb.png)
![SS](https://i.postimg.cc/CLwhW2b8/lambda.png)
![SS](https://i.postimg.cc/gjHYxybr/s3.png)


Screenshots:

![Screenshot](https://i.postimg.cc/L5ZFKzNn/1.png)

![Screenshot](https://i.postimg.cc/mhffbt5V/2.png)

![Screenshot](https://i.postimg.cc/L6Lhjf29/3.png)

![Screenshot](https://i.postimg.cc/7PC5YdRT/4.png)

![Screenshot](https://i.postimg.cc/Dft8W5Vp/5.png)

![Screenshot](https://i.postimg.cc/mgSD5sPK/6.png)

![Screenshot](https://i.postimg.cc/ZYyqh398/7.png)

![Screenshot](https://i.postimg.cc/pdGdPJYZ/8.png)

![Screenshot](https://i.postimg.cc/dVF361V8/9.png)

![Screenshot](https://i.postimg.cc/857zcfZV/10.png)

![Screenshot](https://i.postimg.cc/QtvxTNzK/12.png)

![Screenshot](https://i.postimg.cc/vT98LFRq/13.png)


If u explore long enough, you might run into this man, our special friend who helps in uploading files.(Wink Wink)


![Upload Barry Upload](https://github.com/haresrv/Vigilante/blob/master/FrontEnd/src/Components/S3Upload/flash.gif)




To replicate this project,
* Make sure to replace credentials in config.json with your own. By the time, you are seeing this, current credentials would no longer be valid
