# camunda-cloud-worker-corona-update
A worker written in JS to fetch and log service tasks from Camunda Cloud and complete them. 

 **prerequirements**:exclamation: \
In order to run the worker you need to make sure that a process is deployed to Camunda Cloud, an instance of it has been started and that a service task with the right type is available. You can find the matching process to the worker [here](https://github.com/Nlea/camunda-cloud-corona-update-process) as well as all the information how to get an account and set up a cluster, which will be needed for the worker as well.


**set up the worker** \
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


