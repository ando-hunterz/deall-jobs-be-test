FROM node:16
WORKDIR /usr/src/app
COPY ../src/package.json /usr/src/app
RUN npm install
COPY ../src /usr/src/app
EXPOSE 3000
CMD ["nodemon", "app.js"]
