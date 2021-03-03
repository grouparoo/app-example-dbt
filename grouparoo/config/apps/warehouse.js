exports.default = async function buildConfig() {
  return [
    {
      class: "app",
      id: "warehouse",
      name: "warehouse",
      type: "postgres",
      options: {
        host: "localhost",
        port: 5432,
        database: "app_example_dbt", // The database name - e.g. `database: "data_warehouse"`
        schema: "public",
        user: "postgres", // The user to connect to the database - e.g. `user: "grouparoo_user"`.  If you are connecting to localhost, leave as `undefined`.
        password: "", // The database password - e.g. `password: "P@assword"`.  If you don't have a password, leave as `undefined`.

        // you can also optionally set SSL options
        ssl: false, // enforce SSL connections only.  Default "false" will use ssl optionally if supported by the server.
        // ssl_cert: null,
        // ssl_key: null,
        // ssl_ca: null,
      },
    },
  ];
};