# Start by building a base image with Node.js installed
FROM node:16

# Create a working directory for your project
WORKDIR /app

# Copy the project to the working directory
COPY . .

# Install the dependencies from the package files
RUN npm install

# Run the build script
RUN ["npm", "run", "build"]

# Start the playground
CMD ["npm", "run", "start"]