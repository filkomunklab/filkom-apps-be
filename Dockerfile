# Use the official Node.js image as the base image
FROM alpine:3.19

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Expose the port that the app will listen on
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
