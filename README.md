# CarCar
CarCar is an app for managing everything in an auto dealership - from cars to sales, and from salespeople to technicians and services.

## Team
- **Henry Martija** - Takes care of Auto Sales.
- **Christian Ramos** - Handles Auto Services.

## Setup Instructions
1. **Install Dependencies**
   - Ensure Docker, Git, and Node.js are installed on your system.

2. **Clone the Repository**
   - Clone the CarCar project from GitLab:
     ```
     git clone https://gitlab.com/hencray/project-beta
     ```

3. **Project Setup**
   - Navigate to the project directory and run:
     ```
     docker-compose build
     docker-compose up
     ```
   - This will set up all necessary containers and services.

4. **Accessing the Application**
   - Once the setup is complete, access the application via:
     `http://localhost:3000/` in your web browser.

## Design
### Microservices Overview

#### Inventory Microservice
    - Viewing inventory, vehicle models, and specific automobile details.

- **API Endpoints:**
  - **Manufacturers**
    - List: `GET http://localhost:8100/api/manufacturers/`
    - Create: `POST http://localhost:8100/api/manufacturers/`
    - Get Specific: `GET http://localhost:8100/api/manufacturers/:id/`
    - Update: `PUT http://localhost:8100/api/manufacturers/:id/`
    - Delete: `DELETE http://localhost:8100/api/manufacturers/:id/`
  - **Vehicle Models**
    - List: `GET http://localhost:8100/api/models/`
    - Create: `POST http://localhost:8100/api/models/`
    - Get Specific: `GET http://localhost:8100/api/models/:id/`
    - Update: `PUT http://localhost:8100/api/models/:id/`
    - Delete: `DELETE http://localhost:8100/api/models/:id/`
  - **Automobiles**
    - List: `GET http://localhost:8100/api/automobiles/`
    - Create: `POST http://localhost:8100/api/automobiles/`
    - Get Specific: `GET http://localhost:8100/api/automobiles/:vin/`
    - Update: `PUT http://localhost:8100/api/automobiles/:vin/`
    - Delete: `DELETE http://localhost:8100/api/automobiles/:vin/`


#### Service Microservice
  - The Service microservice manages service appointments, including their creation, cancellation, and completion.
    Auto technician:
    - "name", auto technician name, input received through form
    - "employee_number", created through form input, references unique employee number.
    Service Appointment:
    - "vin", Vehicle vin.
    - "customer_name", vehicle ownwer name.
    - "date_time", scheduled service appointment date.
    - "reason", reason for service appointment.
    - "dealership_purchase", determines whether the vehicle vin for the service appointment matches inventory vehicle vin, for access to VIP treatment.
    - "technician", the selected technician for the service appointment

AutomobileVO:
    - "Import_href", received from inventory database using poller.
    - "color", color description of the automobile.
    - "year", automobile year.
    - "vin", of the vehicle in inventory.

  - Error handling includes returning 400 or 404 errors for unsuccessful requests or non-existent model objects.

- **API Endpoints:**
  - **Technicians**
    - List: `GET http://localhost:8080/api/technicians/`
    - Create: `POST http://localhost:8080/api/technicians/`
    - Delete Specific: `DELETE http://localhost:8080/api/technicians/:id/`
  - **Appointments**
    - List: `GET http://localhost:8080/api/appointments/`
    - Create: `POST http://localhost:8080/api/appointments/`
    - Delete: `DELETE http://localhost:8080/api/appointments/:id/`
    - Set Status to "Canceled": `PUT http://localhost:8080/api/appointments/:id/cancel/`
    - Set Status to "Finished": `PUT http://localhost:8080/api/appointments/:id/finish/`

### Sales Microservice (Port: 8090)
The Sales Microservice in CarCar plays a critical role in managing automobile sales. It ensures that the dealership only sells vehicles that are not already sold, thereby maintaining inventory accuracy.

#### Key Components
- **Salesperson**: Each salesperson in the dealership is recorded with `first_name`, `last_name`, and a unique `employee_id`.
- **Customer**: This model captures details of the buyers, including their `first_name`, `last_name`, `phone_number`, and `address`.
- **Sale**: This record links a salesperson and a customer to a vehicle, detailing the sale transaction, including the price.
- **AutomobileVO (Value Object)**: This model is focused on vehicle details, uniquely identified by a `vin`. Notably, the Automobile is treated as a value object in our
    system, defined by its attributes.

#### Core Features
- **Unsold Only Policy**: This feature ensures that sales are only processed for vehicles that are currently unsold, ensuring reliability in inventory management.

#### API Endpoints
- **Salespeople**
  - **List (GET)**: `GET http://localhost:8090/api/salespeople/`
  - **Create (POST)**: `POST http://localhost:8090/api/salespeople/`
  - **Delete (DELETE)**: `DELETE http://localhost:8090/api/salespeople/:id/`
- **Customers**
  - **List (GET)**: `GET http://localhost:8090/api/customers/`
  - **Create (POST)**: `POST http://localhost:8090/api/customers/`
  - **Delete (DELETE)**: `DELETE http://localhost:8090/api/customers/:id/`
- **Sales**
  - **List (GET)**: `GET http://localhost:8090/api/sales/`
  - **Create (POST)**: `POST http://localhost:8090/api/sales/`
  - **Delete (DELETE)**: `DELETE http://localhost:8090/api/sales/:id/`


#### Example Data Entries

1. **Creating a Salesperson**
   \
   POST /api/salespeople/
   {
     "first_name": "LeBron",
     "last_name": "James",
     "employee_id": "LBJ23"
   }
   \

2. **Adding a Customer**
   \
   POST /api/customers/
   {
     "first_name": "Stephen",
     "last_name": "Curry",
     "phone_number": "800-THREE-PT",
     "address": "30 Three Point Lane, Hoopsville, BB 1010"
   }
   \

3. **Recording a Sale**
   \
   POST /api/sales/
   {
     "salesperson": "LBJ23",
     "customer": "SC30",
     "automobile": "VIN123456789012345",
     "price": "60000"
   }
   \
   \```

4. **Create A Technician
  \```
  POST /api/technicians/
  {
	  "first_name":"Tom",
	  "last_name":"Jones",
	  "employee_id":"8675309"
  }
  \``

5. **Create An Appointment
  \```
  POST /api/appointments/
  {
     "vin": "1GCEK14T9YE235215",
     "customer": "Mike tyson",
     "date_time": "02/20/25 2:00",
     "reason": "Oil Change",
     "status": "",
      "technician": 7
  }

  \```
6. **Finish An ApppointMent
  POST /api/appointments/:id/finish/
  \```

  \```
7 ** Cancel AN Appointment
  POST /api/appointments/:id/cancel/
  \```
