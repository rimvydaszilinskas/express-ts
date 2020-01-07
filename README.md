# Workouts

## Generating migrations

The generation of migrations is done manually. To do so, first create a skeleton migration file:

```sh
npx sequelize-cli migration:generate --name [desired name here]
```

Then fill out the file create in the migrations folder and run the migration to apply changes:

```sh
npx sequelize-cli db:migrate
```
