# Use the official Node.js img as the base image
FROM node:18

# Specify multiple environment variables
ENV VITE_REACT_APP_BASE_URL=https://week-17-sherinolivia.up.railway.app/api
ENV VITE_REACT_APP_LOGIN_URL=https://week-17-sherinolivia.up.railway.app/api/users/login
ENV VITE_REACT_APP_REGISTER_URL=https://week-17-sherinolivia.up.railway.app/api/users/register
ENV VITE_REACT_APP_ORDERS_URL=https://week-17-sherinolivia.up.railway.app/api/orders
ENV VITE_REACT_APP_BASE_CREATE_URL=https://week-17-sherinolivia.up.railway.app/api/orders/new
ENV VITE_REACT_APP_UPDATE_URL=https://week-17-sherinolivia.up.railway.app/api/orders/update/:orderId


# Set Working Directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json into the container
COPY  package*.json ./

# Copy the Source Code into the container
COPY  . .

# install project dependencies
RUN npm install -g serve
RUN npm install
RUN npm run build

# Expose the port that the vite project project runs on
EXPOSE 8080

# Command to run the vite project
CMD ["serve","-s","-l","8080","./dist"]