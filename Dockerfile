# use the official node.js image
FROM node:18-alpine

# set the working directory
WORKDIR /app

# Accept build-time env variables
ARG MONGODB_URI
ARG NEXTAUTH_URL
ARG NEXTAUTH_SECRET

# copy package files and install dependencies
COPY package*.json ./
RUN npm install

# copy the rest of the app
COPY . .

# Set build-time env so Next.js can use them
ENV MONGODB_URI=$MONGODB_URI
ENV NEXTAUTH_URL=$NEXTAUTH_URL
ENV NEXTAUTH_SECRET=$NEXTAUTH_SECRET

# build the app (for prod)
# RUN npm run build

# expose the post Next.js runs on
EXPOSE 3000

# start the app
# CMD ["npm", "start", "build-and-start"]
CMD ["npm", "run", "dev"]
