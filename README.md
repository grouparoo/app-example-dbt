# dbt app example

This project shows and example how to integrate a [dbt](https://www.getdbt.com/) and a [Grouparoo](https://www.grouparoo.com/) project. The dbt models transform the data and the Grouparoo config syncs the result to a destination. Please note that this project is configured using dbt 1.0.0.

![dbt and Grouparoo workflow](https://www.grouparoo.com/_next/image?url=%2Fposts%2Fdbt-and-grouparoo%2Fworkflow.png&w=640&q=25)

Get more details in our [blog post](https://www.grouparoo.com/blog/dbt-and-grouparoo) about our dbt integration or this post on how to [use App Refresh to run Grouparoo with dbt](https://www.grouparoo.com/blog/app-refresh-grouparoo-and-dbt).

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
GROUPAROO_OPTION__APP__MAILCHIMP_API_KEY=632d084f1bb6ff63e8336bd4864373ed-us3
GROUPAROO_OPTION__DESTINATION__MAILCHIMP_LIST_ID=26d8e9db1e
```

## Run

### App Refresh Query

One way to run this Grouparoo instance is to utilize the App Refresh Query added in the App config. To do this run:

```
cd grouparoo && npm start
```

This will also allow you to run our UI Community package by opening `http://localhost:3000` in your browser. Here, you can create a Team and watch the progress of your data from your Dashboard. Next, to trigger a dbt run, in another tab at the root of this project run:

```
dbt run
```

When the run completes, a new row will be added to the `dbt_meta` table. The `refresh` set up in our `App` configuration file will see the update and enqueue all schedules within the next minute. When you are ready to transform and run again, you simply need to `dbt run` again.

### Script

You can also run the script found in `./transform_and_sync`:

```
./transform_and_sync
```

This will trigger a dbt run, then run all of the Grouparoo schedules once, and then terminate.

## dbt

This project transforms the seeded `users` and `purchases` table into a few views:

- `customers` view with roll ups of key properties
- `sync_mailchimp` for the data we want to sync to Mailchimp

## Grouparoo

Handles syncing data to destinations, using Postgres as a warehouse.

It syncs customers' emails, first name, and lifetime value from the `sync_mailchimp` table.
