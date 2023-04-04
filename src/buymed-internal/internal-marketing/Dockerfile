FROM node:14

# receive CI token to pull outside git repo
ARG CI_JOB_TOKEN

RUN git config --global url."https://gitlab-ci-token:${CI_JOB_TOKEN}@gitlab.com/".insteadOf https://gitlab.com/

# Setting working directory. All the path will be relative to WORKDIR
WORKDIR /usr/src/app

# Installing dependencies
COPY package*.json ./
RUN npm install

# Copying source files
COPY . .

# Building app
RUN npx next telemetry disable
RUN npm run build

# Running the app
CMD [ "npm", "run", "start" ]