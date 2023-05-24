# Next.js TODO APP
 
To run locally, the database is needed

```
    docker-compose up -d
```

* The -d means __detached__

## MongoDB local URL:
```
    mongodb://localhost:27017/tododb
```

## Setting enviroment variables

Rename the file .env.template to .env.development and use the MongoDB Local URL

* Rebuild node modules and stand up Next

```
    yarn install
    yarn dev
```

### Author: __Ivan Panussis__