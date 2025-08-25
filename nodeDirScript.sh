#!/bin/bash
# to making file management for creating this app file needs

mkdir app
cd app
mkdir public environment models routes controllers services middleware config
touch server.js
cd public 
mkdir pages js css
cd ..
cd environment
touch environment.js
cd ..
cd models
touch user.model.js
cd ..
cd routes
touch user.route.js
cd ..
cd controllers
touch auth.controller.js user.controller.js
cd ..
cd services
touch storageLocal.js storageS3.js
cd ..
mkdir uploads
