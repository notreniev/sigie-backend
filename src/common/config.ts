export const config = (env: string) => ({
    "development": {
        "username": "root",
        "password": "root",
        "database": "dnedb",
        "host": "localhost",
        "pghost": "localhost", //postgres
        "mghost":"localhost", //mongo
        "dialect": "postgres",
        "dialectOptions": {
            "socketPath": '/var/run/postgresql/.s.PGSQL.5432'
        },
        "debug": true,
        "port": 3100
    },
    "homologation": {
        "username": "root",
        "password": "root",
        "database": "dnedb",
        "host": "localhost",
        "pghost": "postgres",
        "mghost":"mongo",
        "dialect": "mysql",
        "dialectOptions": {
            "socketPath": undefined
        },
        "logging": false,
        "debug": false,
        "port": 4000
    },
    "production": {
        "username": "root",
        "password": "root",
        "database": "dnedb",
        "host": "localhost",
        "mghost":"mongo",
        "pghost": "postgres",
        "dialectOptions": {
            "socketPath": undefined
        },
        "dialect": "mysql",
        "debug": false,
        "port": 5000
    }

}[env] || {})