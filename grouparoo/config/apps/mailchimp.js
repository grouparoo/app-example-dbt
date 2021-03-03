exports.default = async function buildConfig() {
  const apiKey = process.env.MAILCHIMP_API_KEY;

  return [
    {
      class: "app",
      id: "mailchimp",
      name: "Mailchimp",
      type: "mailchimp",
      options: {
        apiKey,
      },
    },
  ];
};
