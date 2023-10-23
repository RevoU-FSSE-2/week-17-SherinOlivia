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

# install project dependencies
RUN npm install

# Copy the Source Code into the container
COPY  . .

# Expose the port that the vite project project runs on
EXPOSE 5173

# Command to run the vite project
CMD ["pnpm","run","dev"]