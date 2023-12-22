# CarCar

CarCar is an app for managing everything in an auto dealership - from cars to sales, and from salespeople to technicians and services.

## TOC

- [CarCar](#carcar)
  - [Team](#team)
  - [Setup Instructions](#setup-instructions)
  - [Design](#design)
    - [Microservices Overview](#microservices-overview)
    - [Inventory Microservice (Port: 8100)](#inventory-microservice-port-8100)
      - [Key Components](#key-components)
      - [Core Features](#core-features)
      - [API Endpoints](#api-endpoints)
        - [Manufacturers](#manufacturers)
        - [Vehicle](#vehicle)
        - [Automobiles](#automobiles)
      - [Example Data Entries](#example-data-entries)
    - [Service Microservice (Port: 8080)](#service-microservice-port-8080)
      - [API Endpoints:](#api-endpoints-1)
        - [Technicians](#technicians)
        - [Appointments](#appointments)
      - [Example Data Entries](#example-data-entries-1)
    - [Sales Microservice (Port: 8090)](#sales-microservice-port-8090)
      - [Key Components](#key-components-1)
      - [Core Features](#core-features-1)
      - [API Endpoints](#api-endpoints-2)
        - [Salespeople](#salespeople)
        - [Customers](#customers)
        - [Sales](#sales)
      - [Example Data Entries](#example-data-entries-2)

## Team

- **Henry Martija** - Auto Sales.
- **Christian Ramos** - Auto Services.

## Setup Instructions

1. **Install Dependencies**

   - Ensure Docker, Git, and Node.js are installed on your system.

2. **Clone the Repository**

   ```
   git clone https://gitlab.com/hencray/project-beta
   ```

3. **Project Setup**

   Navigate to the project directory and run:

   ```
   docker volume create beta-data
   docker-compose build
   docker-compose up
   ```

4. **Accessing the Application**
   Once the setup is complete, access the application via:
   `http://localhost:3000/` in your web browser.

## Design

### Microservices Overview

#### Diagram

![Diagram](./diagram.png)

### Inventory Microservice (Port: 8100)

The Inventory Microservice is dedicated to managing your dealership's vehicle inventory. It allows for detailed viewing of inventory, individual vehicle models, and specific automobile details.

#### Key Components

- **Manufacturers**: This covers all the vehicle manufacturers in your inventory.
- **Vehicle Models**: Details about different models of vehicles available.
- **Automobiles**: Individual vehicles in your inventory, each with unique attributes.

#### Core Features

- **Inventory Management**: Tracking and management of all vehicles in your dealership’s inventory.

#### API Endpoints

##### Manufacturers

| Endpoint                   | Method | URL                                                   |
| -------------------------- | ------ | ----------------------------------------------------- |
| Manufacturers List         | GET    | `GET http://localhost:8100/api/manufacturers/`        |
| Manufacturers Create       | POST   | `POST http://localhost:8100/api/manufacturers/`       |
| Manufacturers Get Specific | GET    | `GET http://localhost:8100/api/manufacturers/:id/`    |
| Manufacturers Update       | PUT    | `PUT http://localhost:8100/api/manufacturers/:id/`    |
| Manufacturers Delete       | DELETE | `DELETE http://localhost:8100/api/manufacturers/:id/` |

##### Vehicle

| Endpoint                    | Method | URL                                            |
| --------------------------- | ------ | ---------------------------------------------- |
| Vehicle Models List         | GET    | `GET http://localhost:8100/api/models/`        |
| Vehicle Models Create       | POST   | `POST http://localhost:8100/api/models/`       |
| Vehicle Models Get Specific | GET    | `GET http://localhost:8100/api/models/:id/`    |
| Vehicle Models Update       | PUT    | `PUT http://localhost:8100/api/models/:id/`    |
| Vehicle Models Delete       | DELETE | `DELETE http://localhost:8100/api/models/:id/` |

##### Automobiles

| Endpoint                 | Method | URL                                                  |
| ------------------------ | ------ | ---------------------------------------------------- |
| Automobiles List         | GET    | `GET http://localhost:8100/api/automobiles/`         |
| Automobiles Create       | POST   | `POST http://localhost:8100/api/automobiles/`        |
| Automobiles Get Specific | GET    | `GET http://localhost:8100/api/automobiles/:vin/`    |
| Automobiles Update       | PUT    | `PUT http://localhost:8100/api/automobiles/:vin/`    |
| Automobiles Delete       | DELETE | `DELETE http://localhost:8100/api/automobiles/:vin/` |

#### Example Data Entries

1. **Creating a Manufacturer**

   ```js
   POST
     {
       name: "Brady Motors",
       headquarters: "Tampa, FL",
       founded_year: "2023",
     };
   ```

2. **Adding a Vehicle Model**

   ```js
   POST
     {
       manufacturer_id: "1", // Assuming this is the ID of Brady Motors
       model_name: "Gronkowski GT",
       type: "SUV",
       launch_year: "2023",
     };
   ```

3. **Adding an Automobile**
   ```js
   POST
     {
       vin: "VIN123456789012345",
       model_id: "101", // Assuming this is the ID of Gronkowski GT model
       color: "Patriot Blue",
       price: "55000",
     };
   ```

### Service Microservice (Port: 8080)

The Service microservice manages service appointments, including their creation, cancellation, and completion.

**Auto technician:**

- "name", auto technician name, input received through form
- "employee_number", created through form input, references unique employee number.

**Service Appointment:**

- "vin", Vehicle vin.
- "customer_name", vehicle ownwer name.
- "date_time", scheduled service appointment date.
- "reason", reason for service appointment.
- "dealership_purchase", determines whether the vehicle vin for the service appointment matches inventory vehicle vin, for access to VIP treatment.
- "technician", the selected technician for the service appointment

**AutomobileVO (Value Object):**

- "Import_href", received from inventory database using poller.
- "color", color description of the automobile.
- "year", automobile year.
- "vin", of the vehicle in inventory.

#### API Endpoints:

##### Technicians

| Action            | HTTP Method | Endpoint                                     |
| ----------------- | ----------- | -------------------------------------------- |
| List Technicians  | GET         | `http://localhost:8080/api/technicians/`     |
| Create Technician | POST        | `http://localhost:8080/api/technicians/`     |
| Delete Specific   | DELETE      | `http://localhost:8080/api/technicians/:id/` |

##### Appointments

| Action                   | HTTP Method | Endpoint                                             |
| ------------------------ | ----------- | ---------------------------------------------------- |
| List Appointments        | GET         | `http://localhost:8080/api/appointments/`            |
| Create Appointment       | POST        | `http://localhost:8080/api/appointments/`            |
| Delete Appointment       | DELETE      | `http://localhost:8080/api/appointments/:id/`        |
| Set Status to "Canceled" | PUT         | `http://localhost:8080/api/appointments/:id/cancel/` |
| Set Status to "Finished" | PUT         | `http://localhost:8080/api/appointments/:id/finish/` |

#### Example Data Entries

1. **Create A Technician**

```js
POST
  {
    first_name: "Tom",
    last_name: "Jones",
    employee_id: "8675309",
  };
```

2. **Create An Appointment**

```js
POST
  {
    vin: "1GCEK14T9YE235215",
    customer: "Mike Tyson",
    date_time: "02/20/25 2:00",
    reason: "Oil Change",
    status: "",
    technician: 7,
  };
```

3. **Finish An Appointment**

```js
POST /api/appointments/:id/finish/
```

4. **Cancel AN Appointment**

```js
POST /api/appointments/:id/cancel/
```

### Sales Microservice (Port: 8090)

The Sales Microservice manages automobile sales to customers and ensures that the dealership only sells vehicles that are not already sold.

#### Key Components

- **Salesperson**: Each salesperson in the dealership is recorded with `first_name`, `last_name`, and a unique `employee_id`.
- **Customer**: This model captures details of the buyers, including their `first_name`, `last_name`, `phone_number`, and `address`.
- **Sale**: This record links a salesperson and a customer to a vehicle, detailing the sale transaction, including the price.
- **AutomobileVO (Value Object)**: This model is focused on vehicle details, identified by a `vin`.

#### Core Features

- **Unsold Only**: Sales are only processed for vehicles that are currently unsold.

#### API Endpoints

##### Salespeople

| Action             | Method | Endpoint                                            |
| ------------------ | ------ | --------------------------------------------------- |
| List Salespeople   | GET    | `GET http://localhost:8090/api/salespeople/`        |
| Create Salespeople | POST   | `POST http://localhost:8090/api/salespeople/`       |
| Delete Salespeople | DELETE | `DELETE http://localhost:8090/api/salespeople/:id/` |

##### Customers

| Action           | Method | Endpoint                                          |
| ---------------- | ------ | ------------------------------------------------- |
| List Customers   | GET    | `GET http://localhost:8090/api/customers/`        |
| Create Customers | POST   | `POST http://localhost:8090/api/customers/`       |
| Delete Customers | DELETE | `DELETE http://localhost:8090/api/customers/:id/` |

##### Sales

| Action       | Method | Endpoint                                      |
| ------------ | ------ | --------------------------------------------- |
| List Sales   | GET    | `GET http://localhost:8090/api/sales/`        |
| Create Sales | POST   | `POST http://localhost:8090/api/sales/`       |
| Delete Sales | DELETE | `DELETE http://localhost:8090/api/sales/:id/` |

#### Example Data Entries

1. **Creating a Salesperson**

   ```js
   POST
     {
       first_name: "LeBron",
       last_name: "James",
       employee_id: "LBJ23",
     };
   ```

2. **Adding a Customer**

   ```js
   POST
     {
       first_name: "Stephen",
       last_name: "Curry",
       phone_number: "800-THREE-PT",
       address: "30 Three Point Lane, Hoopsville, BB 1010",
     };
   ```

3. **Recording a Sale**
   ```js
   POST
     {
       salesperson: "LBJ23",
       customer: "SC30",
       automobile: "VIN123456789012345",
       price: "60000",
     };
   ```
