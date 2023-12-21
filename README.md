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
  - Utilizes models like `Technician`, `AutomobileVO`, and `Appointment` for managing service-related data.
  - Special features include marking appointments as "VIP" based on VIN match in inventory and maintaining service history.
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

#### Sales Microservice
  - Tracks automobile sales, ensuring only unsold vehicles from inventory can be sold.
  - Utilizes models like `Salesperson`, `Customer`, `Sale`, and `AutomobileVO`.
  - Special feature 'Unsold Only' ensures sales are made only for unsold inventory items.


- **API Endpoints:**
  - **Salespeople**
    - List: `GET http://localhost:8090/api/salespeople/`
    - Create: `POST http://localhost:8090/api/salespeople/`
    - Delete Specific: `DELETE http://localhost:8090/api/salespeople/:id/`
  - **Customers**
    - List: `GET http://localhost:8090/api/customers/`
    - Create: `POST http://localhost:8090/api/customers/`
    - Delete Specific: `DELETE http://localhost:8090/api/customers/:id/`
  - **Sales**
    - List: `GET http://localhost:8090/api/sales/`
    - Create: `POST http://localhost:8090/api/sales/`
    - Delete Specific: `DELETE http://localhost:8090/api/sales/:id/`
