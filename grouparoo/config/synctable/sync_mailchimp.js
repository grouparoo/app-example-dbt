module.exports = async function getConfig() {
  const mailchimpListId = process.env.MAILCHIMP_LIST_ID;
  const tableName = "sync_mailchimp";

  // single entity to define a source and destination
  // optimizes for the case where they are transforming a data warehouse into the shape of data to sync
  return [
    {
      id: "sync_mailchimp",
      name: "Sync to Mailchimp",
      class: "synctable",
      source: {
        appId: "warehouse",
        table: tableName,
        userKeyColumn: "customer_id",
        highWaterColumn: "updated_at", // makes schedule for recurring every 15 minutes
      },
      destination: {
        type: "mailchimp-export",
        appId: "mailchimp",
        options: {
          listId: mailchimpListId,
        },
      },
      sync: {
        email_address: { column: "email", type: "email" },
        FNAME: "first_name",
        LTV: "lifetime_value",
      },
    },
  ];
};
