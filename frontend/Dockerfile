# Use an official Node.js runtime as the base image
FROM node:18.14.2

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (if available) to the container
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Define the command to start your application
CMD ["npm", "start"]
