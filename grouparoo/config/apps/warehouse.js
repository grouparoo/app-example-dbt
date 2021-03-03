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
    },
  ];
};
