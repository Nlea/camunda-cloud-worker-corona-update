# camunda-cloud-worker-corona-update
A worker written in JS to fetch and log tasks from Camunda Cloud and complete them. It is used for this [workflow](https://github.com/Nlea/camunda-cloud-corona-update-process)

The worker itself calls a REST-API to get information about the current Corona numbers in Germany and sends the information to the workflow. 


If you want to use the worker, make sure to install all needed packages on your machine 

```
npm i -g typescript ts-node
```

This package provides functions to connect to Camunda Cloud (Zeebe)
```
npm i zeebe-node dotenv
```

In order to make the REST call the code uses the package got. So make sure you install it:
```
npm i got
```

You want to connect your worker to your Camunda cloud cluster. Therefore create a a file .env in the root of the project. And put in there your camunda cloud credentials. You can find more information [here](https://docs.camunda.io/docs/guides/setting-up-development-project#configure-connection)



To run the worker open a terminal and use the command:

```javascript
ts-node src/app.ts
```
As soon as a task with the type is avaidable the worker will fetch and lock it and then complete it. 

If you like to build your own worker from scretch you can follow this [tutorial](https://docs.camunda.io/docs/guides/setting-up-development-project)


