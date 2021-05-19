exports.default = async function buildConfig() {
  const mailchimpListId = process.env.MAILCHIMP_LIST_ID;

  return [
    {
      id: "mailchimp_destination",
      name: "Mailchimp",
      class: "destination",
      type: "mailchimp-export",
      appId: "mailchimp", // The ID of the App this Source uses - e.g. `appId: "mailchimp_app"`
      syncMode: "sync", // keep Mailchimp up to date with group
      groupId: "all_emails", // The ID of the group whose members you want to export - e.g. `groupId: "high_value_customers"`

      options: {
        listId: mailchimpListId, // The Mailchimp List ID (https://mailchimp.com/help/find-audience-id/)
      },

      // Mappings are how you choose which properties to export to this destination.
      // Keys are the name to display in the destination, values are the IDs of the Properties in Grouparoo.
      mapping: {
        email_address: "email",
        FNAME: "first_name",
        LTV: "ltv",
      },

      // You can export group memberships.
      // Keys are the name to display in the destination, values are the IDs of the Groups in Grouparoo.
      destinationGroupMemberships: {
        high_value_spanish: "high_value_spanish_speakers",
      },
    },
  ];
};
