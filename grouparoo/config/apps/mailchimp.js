exports.default = async function buildConfig() {
  const apiKey = process.env.MAILCHIMP_API_KEY;
  if (!apiKey || apiKey === "632d084f1bb6ff63e8336bd4864373ed-us3") {
    // hasn't really set it, don't set it up
    console.log("Set MAILCHIMP_API_KEY to sync to Mailchimp.");
    return [];
  }

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
