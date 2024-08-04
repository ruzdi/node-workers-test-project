
## Task 1 - Identify and fix the issue with getCatsInfo API

File Name: getCatsWorker.js

Changes: Update Refresh Token Function
In the `refreshToken` function, there is a call to `invokeTokenService` that incorrectly accesses the `key` property. The current implementation uses `data.value.key` to access the key, whereas it should directly use `data.key`.


## Task 2 - Add correlationId header to all the requests and response


File Name: correlation-id.plugin.js
Add correlation-id plugin in plugins/correlation-id.plugin.js
get the correlation id from header if not exist then create one
set that correlation id to header 


File Name: index.js
register correlation-id.plugin.js plugin
Also send correlationId t workers so that they can log if needed 
Log using request to test correlationid is working


## Task 3 - Terminate the idle worker and recreate when needed


File Name: utils/manageWorker.js
Created a class manageWorker inside utils folder
This class contain following four function 

createWorker - for creating a worker if it doesn't exist. If exist then return the worker.
getWorker - user will call this worker to get woker and it doesn't exist then it will create a new worker using createWorker
terminateWorker - terminate the worker
resetTimer - reset timer if worker is again called within 15 min time and if it is not called within 15 minutes then worker will be terminated

File Name: index.js
Create catWorkerManager and dogWorkerManager
call getWorker using these object so that we can terminate any worker that is idle
