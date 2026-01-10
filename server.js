var express = require("express")
var { createHandler } = require("graphql-http/lib/use/express")
var { buildSchema } = require("graphql")
var { ruruHTML } = require("ruru/server")
var skills = require("./app/portfolio/data/skills.json")

// Construct a schema, using GraphQL schema language
var schema = buildSchema(/* GraphQL */`
  type Skill {
    id: Int
    name: String
    color: String
    percentage: Int
  }

  type Query {
    rollDice(numDice: Int!, numSides: Int): [Int]
    skills: [Skill]
  }
`)

// The root provides a resolver function for each API endpoint
var root = {
  rollDice({ numDice, numSides }) {
    var output = []
    for (var i = 0; i < numDice; i++) {
      output.push(1 + Math.floor(Math.random() * (numSides || 6)))
    }
    return output
  },
  skills() {
    return skills
  }
}

var app = express()

// Serve the GraphiQL IDE.
app.get("/", (_req, res) => {
  res.type("html")
  res.end(ruruHTML({ endpoint: "/graphql" }))
})

app.all(
  "/graphql",
  createHandler({
    schema: schema,
    rootValue: root,
  })
)

app.listen(4000)
console.log("Running a GraphQL API server at http://localhost:4000/graphql")