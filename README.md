# Clean Contacts App
Contacts app to collect customer contacts information (with clean arch/code)

# Project structure
- `server` - Server application to handle http request over REST API
  - Using Express, Typescript, Jest, celebrate (Joi validation as middleware)
  - Under Clean Architecture/Code and SOLID principles
- `client` - Client application to serve facing pages and user interaction.
  - Using ReactJS, Typescript, Tailwind CSS, React hooks, Axios

# Running the applications
> Disclaimer: presuming you have `docker` and `docker-compose` safely installed in your machine

- Simply run:
```sh
  $ docker-compose up -d

  # it will build both `server` and `client` projects and serve those at: 
  # http://localhost:4202 (server)
  # http://localhost:4201 (client)
```

# Application Features
  - Application Models:
    ```ts
      type ContactModel = {
        name: string
        email: string
        phone: string
        address: {
          country: string
          houseNumber: number
          streetName: string
          city: string
          state: string
        }
      }
    ```
  - Server application:
    - `POST api/contacts` - Submit and create new contact
    ```sh
      curl --location --request POST 'http://localhost:4202/api/contacts' \
      --header 'Content-Type: application/json' \
      --header 'Accept: application/json' \
      --data-raw '{
          "name": "Victor Wagner",
          "email": "victor@mail.com",
          "phone": "+5584123456789",
          "address": {
              "country": "BR",
              "houseNumber": 123,
              "streetName": "Street 0",
              "city": "João Pessoa",
              "state": "PB"
          }
      }'
    ```
    - `GET api/contacts` - Retrieve all submitted contacts
    ```sh
      curl --location --request GET 'http://localhost:4202/api/contacts' \
      --header 'Accept: application/json'
    ```
    - `PATCH api/contacts/:contactId` - Kindly update a single contact by id
    ```sh
      curl --location --request PATCH 'http://localhost:4202/api/contacts/ckw4z8a9i0000itvrci6jc1bq' \
      --header 'Content-Type: application/json' \
      --header 'Accept: application/json' \
      --data-raw '{
          "name": "Victor Ribeiro",
          "phone": "+1-902-555-0116",
          "address": {
              "country": "CA",
              "city": "Sydney",
              "state": "NS"
          }
      }'
    ```
    - `DELETE api/contacts/:contactId` - Smoothly delete a contact by id
    ```sh
      curl --location --request DELETE 'http://localhost:4202/api/contacts/ckw4cdk6k0001y2vrekjfgo3f' \
      --header 'Accept: application/json'
    ```
  - Client application:
    - `/contacts-form`: Outside users may post their contact info to our server
    - `/admin`: Internal users may manage submitted contacts
