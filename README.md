# Data Playground

Data Playground(DP) is a Full Stack Web Application, that runs on Django and Django Rest Framework for the Backend and REACT and Redux for the Frontend. With DP you can upload CSV files to train Machine Learning Models such as Linear Regression and Logistic Regression. These models will then be saved on the application's database so that you can run them any time either through the Front End or through the REST Api. 
<br><br>
Data Playground with only its Chat Application is availible in a previous repository: <br>https://github.com/gugzkumar/dataplayground_chatroom.

## Table of Contents
- [Login](#1)
- [Chat Room](#2)
- [Create and Run Models](#3)
- [Using REST Api](#4)
  - [Get List of Models](#5)
  - [Get Model By ID/pk](#6)
  - [Create Model](#7)
  - [Run Model](#8)
- [Setup](#9)

<a id='1'/><br>
## Login
Once the application is set up and running you can register and login by visiting `localhost:8000/users/` on your browser. Also if you try visiting any other application you will be redirected to this page.
![](https://cloud.githubusercontent.com/assets/24658548/26040792/27a63382-38f6-11e7-91eb-9eb59fff2b28.png)

<a id='2'/><br>
## Chat Room
Then by either clicking Chatroom on the navigation bar or visiting `localhost:8000/chatroom` you can try using the chat application. Select a room a by clicking one the left panel. Then try joining the conversation by hitting subimt or pressing Enter after typing in the text area.
![](https://cloud.githubusercontent.com/assets/24658548/26042887/0ff1f9b8-3907-11e7-8b49-6df1c4282fa0.png)

<a id='3'/><br>
## Create and Run Models
Click "Linear Regression" or "Logistic Regression" or visit `localhost:8000/linreg/` or `localhost:8000/logreg/` to upload or use a new model.<br><br>

To run a model use the top part of the application. Users will only be able to use models they created. Select an existing model by clicking it. Then type an array with number of values equal to the number of features in the text area. The text area recognizes a list of numbers in JSON format. After clicking submit the predicted result will be displayed on the right. If there is any error with your input pay attention to the error message.

![](https://cloud.githubusercontent.com/assets/24658548/26040755/f3a47bca-38f5-11e7-97ce-3daf3435dcf9.png)
![](https://cloud.githubusercontent.com/assets/24658548/26040754/f3a0b1b6-38f5-11e7-84b7-f72c8b9f2c9d.png)
<br>
<br>
To create a model use the bottom part of the application. Select a CSV file to train with and a name for the model. If successful the new model will show up in the list above. If there is something wrong with your upload, and Error should show up. Data Playground works under the assumption that each column of your CSV is a <b>feature</b> and the final column is a <b>label</b>. So if your CSV has 5 columns, a model that takes 4 features will be created. Also Data Playground expects all values aside from your first row (feature names) will be numbers.
![](https://cloud.githubusercontent.com/assets/24658548/26040756/f3a75e76-38f5-11e7-9a02-b4c8b57dbb3e.png)
![](https://cloud.githubusercontent.com/assets/24658548/26040757/f3a851c8-38f5-11e7-8edb-7a0825710a51.png)

<a id='4'/><br>
## Using REST API
Note: To work with Logistic Regression Models instead, replace `linreg` in the instructions below with `logreg`
<a id='5'/><br>
#### Get List of Models
`GET: localhost:8000/linreg/api/models/`<br><br>
Result Example<br>
`[ { pk: 20, model_name: "Temperature", pk: 21, model_name: "3Sum" }]`
<a id='6'/><br>
#### Get Model By ID/pk
`GET: localhost:8000/linreg/api/models/[id]`<br><br>
Result Example<br>
`{pk: 20, model_name: "3Sum" }`
<a id='7'/><br>
#### Create Model
`POST: localhost:8000/linreg/api/models/`<br>
`data:{model_name = [String], csv_file = [File]}`
<br><br>
Result Example
<br>
`{pk: 20, model_name: "3Sum", csv_file: "3SumTrain.csv"}`
<a id='8'/><br>
#### Run Model
`POST: localhost:8000/linreg/api/runmodel/`<br>
`data:{ model_name: [String], feature_list: [String of JSON formated list of Numbers]}`<br><br>
Data Example:<br>
`data:{ model_name: "3Sum", feature_list: "[4,3.2,9]"}`<br><br>
Result Example:<br>
`{ prediction : 16.2 }`

<a id='9'/><br>
## Setup 
The application runs on multiple frameworks and libraries so be prepared to install the following.

Python Libraries and Frame Works:
* django
* djangorestframework
* django-webpack-loader
* channels
* asgi_redis
* pandas
* sklearn

Setting up Javascript and Webpack:
1) Please have node.js installed.
2) Run `npm install` in your root directory. This will install all javascript dependencies
3) Next run `webpack --config webpack.config.js`. This will create all the javascript bundles needed to run the App

Have a working server of [Redis](https://redis.io/download) running on your machine on `port 6379`. Afterwords just run `python manage.py runserver` in the root directory. Now Data Playground should be running on your `localhost` at `port 8000`

--------------------------

Note: Look out for new releases. More models and features will be added to Data Playground.
