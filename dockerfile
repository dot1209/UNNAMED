FROM node:18

WORKDIR /react-app

COPY ./package.json /react-app
RUN npm install

COPY . .

CMD serve -s build

# CMD npm start