The purpose of this data classification app that I made is to provide a South African business to classify all the personal information it keeps.

The app has a login / registering page, a main page where the user can upload a file, and a page that allows the user to add or remove detected information. I decided to follow a “serverless” approach, because of improved utilization, improved security and it is more cost-efficient.

The technologies used in this project is as follows:
- React development framework – Used for the fronted.
- AWS Amplify – Hosting the React App.
- AWS S3 – Temporarily stores the uploaded file to extract text.
- AWS Lambda – Used for my backend code in NodeJS.
- AWS DynamoDB – Used to store the metadata about the file.
- AWS API Gateway – Used to handle all communication between the App, S3, Lambda, and database.

I used Github for source control and Amplify uses the code from this repository.


Link to app: https://master.d1f6btr56owi0u.amplifyapp.com/
Link to lambda code: https://github.com/BernardDW/Personal-info-lambda-backend
