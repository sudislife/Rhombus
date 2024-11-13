# Rhombus

## Overview
This is a web application that leverages NextUI for the frontend and Django for the backend. The application allows users to upload a CSV file, which is then processed by the backend to perform data inference. The backend returns a JSON response containing the inferred dataframe.

## Frontend
The frontend of the application is built using [NextUI](https://nextui.org/). NextUI provides a set of beautiful, responsive, and customizable components that make it easy to build a modern user interface.

## Backend
The backend is powered by [Django](https://www.djangoproject.com/), a high-level Python web framework that encourages rapid development and clean, pragmatic design. Django handles the data inference process and communicates with the frontend via JSON responses.

## Workflow
1. **Upload CSV**: The user uploads a CSV file through the frontend.
2. **Data Inference**: The CSV file is sent to the backend, where data inference is performed.
3. **JSON Response**: The backend sends a JSON response containing the inferred dataframe back to the frontend.

## Getting Started
To get started with Rhombus, follow these steps:

1. Clone the repository.
2. Install the necessary dependencies for both the frontend and backend.
3. Run the development servers:
    - For the React frontend, use `npm run dev 3000`.
    - For the Django backend, use `python manage.py runserver 8000`.
4. Open the application in your browser and upload a CSV file to see the data inference in action.

## Note
The frontend currently does not handle the response after receiving it. To check the response, you can view it in the browser console. Additionally, the inferred data types can be viewed in the log statements of the Django backend terminal.


## Acknowledgements
- [NextUI](https://nextui.org/)
- [Django](https://www.djangoproject.com/)
