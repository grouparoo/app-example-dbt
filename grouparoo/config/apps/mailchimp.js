exports.default = async function buildConfig() {
  return [
    {
      class: "app",
      id: "mailchimp",
      name: "Mailchimp",
      type: "mailchimp",
      options: {
        apiKey: process.env.MAILCHIMP_API_KEY, // Mailchimp API key
      },
    },
  ];
};
