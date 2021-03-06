# dbt app example

## Setup

First, install dbt following [these installation instructions](https://docs.getdbt.com/dbt-cli/installation).
For Mac:

```
brew update
brew install git
brew tap fishtown-analytics/dbt
brew install dbt
```

This example uses a Postgres database. Create one called `app_example_dbt`.

Next, you will need to teach dbt how to connect to Postgres.
In `dbt`, this lives in `~/.dbt/profiles.yml`.

There is an example file checked into this repo as `profiles.example.yml`. Copy it to `~/.dbt/profiles.yml` and edit as needed.

Now, let's seed some data. This will create a `users` and a `purchases` table in your Postgres database:

```
dbt seed
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
cd grouparoo && grouparoo run
```

## dbt

This project transforms the seeded `users` and `purchases` table into a few views:

- `customers` view with roll ups of key properties
- `sync_mailchimp` for the data we want to sync to Mailchimp

## Grouparoo

Handle syncing data to destinations, using the Postgres as a warehouse.

It syncs customers' emails, first name, and lifetime value from the `sync_mailchimp` table.
