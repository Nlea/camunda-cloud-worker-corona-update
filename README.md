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

-------------------------------------
## Run the worker on Kubernetes in the cloud

If you want to run the worker continuously (in a more realistic environment) it is a good idea not to run it on your machine. To deploy it to Kubernetes on a cloud provider the following steps are needed:

* Create a Docker image. If you want to publish it later on Docker hub make sure to exclude your credentials from the .env as they can be extracted from the docker image later
* Publish your Docker image at [Docker hub](https://hub.docker.com/) or you can use the image I created for the worker there: https://hub.docker.com/repository/docker/nlea/worker-send-telegram-message
* In order to communicate with Kubernetes make sure you have [kubectl](https://kubernetes.io/docs/tasks/tools/) installed on your maschine
* For the deployment to Kubernetes the project uses the `deploy.yml` file which describe a Kubernetes Deployment resource. As the docker image does not contain the credentials, you need to provide them by creating a [kubernetes secret](https://kubernetes.io/docs/concepts/configuration/secret/)  
```
kubectl create secret generic mysecret --from-literal=zeebeaddress
=xxxxx--from-literal=zeebeclientid=xxxxxx--from-literal=zeebeclientsecret=xxxxx--from-literal=zeebeauthorization=xxxxx
```

* Then link it inside the `deploy.yml` file using Environment Variables. In the `deploy.yml` you can find in this project the name of the secret is “mysecret”. In the example below you can see how the zeebeaddress is linked in the deploy.yml:  

```
        env: 
        - name: ZEEBE_ADDRESS
          valueFrom:
            secretKeyRef:
              name: mysecret
              key: zeebeaddress
``` 

Now you can deploy your Docker image to the Kubernetes cluster 🎉 



