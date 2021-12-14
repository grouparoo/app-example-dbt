const { dbtProfile } = require("@grouparoo/dbt");

exports.default = async function buildConfig() {
  // fetch warehouse connection details from parent dbt profile
  const { type, options } = await dbtProfile({});
  return [
    {
      class: "app",
      id: "warehouse",
      name: "Warehouse",
      type,
      options,
      refresh: {
        query: "SELECT MAX(last_run_at) FROM dbt_meta",
        recurringFrequency: 60 * 1000,
      },
    },
  ];
};
