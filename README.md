## Installation

`npm install --global gulp-cli`

`npm install -g react-native-cli`
`

*iOS build uses Cocoapods*

`gem install cocoapods`

`pods install` in the ios directory


## Building for Environment

This will copy the correct environment variables. 
```
gulp set --env=production
gulp set --env=development
```


## GraphQL Types and Type Generation

Currently we are manually exporting the graphql_schema.json.

Once exported, run `yarn types_generation` to build a unified types file.

Configuration options can be found in _codegen.yml_

## TS Linting

Sure would like this to work.

`yarn lint`