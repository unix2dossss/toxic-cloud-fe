FROM node:latest

WORKDIR /app

COPY . .

# Install any required dependencies
RUN npm install

# Specify the command to run your application (in this case, a simple script)
CMD ["npm", "start"]