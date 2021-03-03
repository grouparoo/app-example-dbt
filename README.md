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

This example uses a postgres database. Create one called `app_example_dbt`.

Next, you will need to teach dbt how to connect to postgres.
In `dbt`, this lives in `~/.dbt/profiles.yml`.

There is an example file checked into this repo as `profiles.example.yml`. Copy it to `~/.dbt/profiles.yml` and edit as needed.

Finally, let's seed some data. This will create a `users` and a `purchases` table in your postgres database.

```
dbt seed
```

## Running dbt

This project rolls the seeded `users` and `purchases` table up, creating a view called `customers`.
