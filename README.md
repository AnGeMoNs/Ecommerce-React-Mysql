![comercio](https://github.com/AnGeMoNs/Ecommerce-React-Mysql/assets/129752667/9ee614a7-38a1-4a8a-9b61-176028691c19)
![Screenshot_8](https://github.com/AnGeMoNs/Ecommerce-React-Mysql/assets/129752667/a1563f58-a59e-4fce-8c8b-dccead704a6b)
![Screenshot_9](https://github.com/AnGeMoNs/Ecommerce-React-Mysql/assets/129752667/6d616979-cbc1-468d-a426-17689dc58661)
![Screenshot_10](https://github.com/AnGeMoNs/Ecommerce-React-Mysql/assets/129752667/1e8fd745-5c61-41e1-8aa6-d798a1228cf0)

## Installation

1. **Clone the repository:**

    ```sh
    git clone https://github.com/AnGeMoNs/Ecommerce-React-Mysql.git
    cd Ecommerce-React-Mysql
    ```

2. **Install backend dependencies:**

    ```sh
    cd backend
    npm install
    ```

3. **Install frontend dependencies:**

    ```sh
    cd ../frontend
    npm install
    ```

4. **Configure the .env file in the backend**

    Update the `.env` file in the `backend` directory with your database configuration and other environment variables.

5. **Execute the migrations and seeders:**

    ```sh
    npx sequelize-cli db:migrate
    npx sequelize-cli db:seed:all
    ```

6. **Start the server:**

    - **Run backend:**

        ```sh
        cd backend
        npm run dev
        ```

    - **Run frontend:**

        ```sh
        cd frontend
        npm start
        ```


