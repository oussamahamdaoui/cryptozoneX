Ex routes

GET /users user_path(:index)
GET /users/new user_path(:new)
GET /users/:id user_path(:show, user)
GET /users/:id/edit user_path(:edit, user)

POST /users user_path(:create, user)
PUT /users/:id user_path(:update, user)
DELETE /users/:id user_path(:delete, user)
