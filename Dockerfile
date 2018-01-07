FROM node:latest

# Create app directory
WORKDIR /usr/src/app

RUN apt-get update
RUN apt-get install net-tools

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN rm -rf node_modules

RUN npm install
# If you are building your code for production
# RUN npm install --only=production

# Bundle app source
COPY . .

EXPOSE 3001
CMD [ "npm", "start" ]
