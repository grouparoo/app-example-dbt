# dbt app example

This project shows and example how to integrate a [dbt](https://www.getdbt.com/) and a [Grouparoo](https://www.grouparoo.com/) project. The dbt models transform the data and the Grouparoo config syncs the result to a destination.

![dbt and Grouparoo workflow](https://www.grouparoo.com/_next/image?url=%2Fposts%2Fdbt-and-grouparoo%2Fworkflow.png&w=896&q=35)

Get more details in the [blog post](https://www.grouparoo.com/blog/dbt-and-grouparoo).

## Setup

First, install dbt following [these installation instructions](https://docs.getdbt.com/dbt-cli/installation).
For Mac:

```
brew update
brew install git
brew tap fishtown-analytics/dbt
brew install dbt
```

This example uses a Postgres database, though it also works with other data warehouses with the necessary SQL updates. Create one called `app_example_dbt`.

Next, you will need to teach dbt how to connect to your warehouse.
In `dbt`, this lives in `~/.dbt/profiles.yml`.

There is an example file checked into this repo as `profiles.example.yml`. Copy it to `~/.dbt/profiles.yml` and edit as needed.

Now, let's seed some data. This will create a `users` and a `purchases` table in your Postgres database:

```
dbt seed
```

Now, we install Node.js for Grouparoo to use. This project has an `.nvmrc` file, so it will be in a v14 `nvm` instance if you use that. Otherwise, use Node.js version 12+.

```
cd grouparoo && npm install
```

Finally, let's set up the Grouparoo `.env` file. These can also be set in the system `ENV`.

```
cp grouparoo/.env.example grouparoo/.env
```

You will need to edit the following environment variables to real ones if you want it to sync to Mailchimp:

```
MAILCHIMP_API_KEY=632d084f1bb6ff63e8336bd4864373ed-us3
MAILCHIMP_LIST_ID=26d8e9db1e
```

## Run

There is a script that runs both dbt and Grouparoo:

```
./transform_and_sync
```

It is relatively simple if you want to do them separately:

```
dbt run
cd grouparoo && npm run sync
```

## dbt

This project transforms the seeded `users` and `purchases` table into a few views:

- `customers` view with roll ups of key properties
- `sync_mailchimp` for the data we want to sync to Mailchimp

## Grouparoo

Handles syncing data to destinations, using Postgres as a warehouse.

It syncs customers' emails, first name, and lifetime value from the `sync_mailchimp` table.
