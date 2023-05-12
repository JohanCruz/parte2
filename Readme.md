
la app está realizada en node express 
```sh
npm i
npm run dev

funciona en http://localhost:3000/
obtenemos el resultado:
[
  {
    "organization": "org1",
    "users": [
      {
        "username": "jperez",
        "roles": [
          "admin",
          "superadmin"
        ]
      },
      {
        "username": "asosa",
        "roles": [
          "writer"
        ]
      }
    ]
  },
  {
    "organization": "org2",
    "users": [
      {
        "username": "jperez",
        "roles": [
          "admin"
        ]
      },
      {
        "username": "rrodriguez",
        "roles": [
          "writer",
          "editor"
        ]
      }
    ]
  }
]
```