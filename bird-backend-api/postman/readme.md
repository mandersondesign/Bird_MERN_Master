# Postman Collections

## Pre-Requisites
Pleasse make sure to create environments (dev & prod) and add this variable: API_URL
for dev, it would be something like this: http://localhost:3000 for "INITIAL VALUE" AND "CURRENT VALUE"

## Routes
* Route Name: In the route name, you would see something like {{API_URL}}/v1/some route [AUTH][ADMIN/COACH/ATHLETE]. The last part is considered Auth (Yes or No), and Role (None, Admin, Coach or Athlete)
* Route Url: The route url is preeded by the environment variable API_URL. By simply switching the environment, we can hit dev or prod without changing the url. ALso, a route is receeded by a verion (v1 or v2 or ...)

## Payload
For payload, there could be a path parameter, a quesry parameter or a body raw json payload. For json properties, when you see the value as 0, it means it's a number, if you see "", itt menans it's a string. For query parameters, please see description as it shows what type of parameter it is.
## Authentication
If a route needs an auth token, it would be shown in the name of the route [AUTH]. If none specified, then the route is open.
For authenticated routes, a bearer token needs to be suplied.
## Roles
Some routes require a certain role. It is shown in the name of the route as [ADMIN] or [COACH] or [ATHLETE]

