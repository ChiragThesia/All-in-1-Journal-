require("dotenv").config()
import express from "express"
import { ApolloServer, makeExecutableSchema } from "apollo-server-express"
import cors from "cors"
import logger from "./utils/logger"

const port = process.env.PORT || 8080;


const typeDefs = `
type Query {
    username: String!
    Data: [Post!]
}

type Mutation{
    post(title: String!, description: String!): Post!
}

type Post {
    id: ID!
    title: String!
    body: String!

}
`
const posts:any = [{
    id: '1',
    title: "BOOMTOWN",
    body:"This is a test body"
}]

const resolvers = {
    Query: {
        username: ()=> {`Test username`}, 
        Data: ()=> posts
    },
    Post:{
        id: (user)=> user.id,
        title: (user)=> user.title,
        body: (user)=> user.body
    }
}

const schema = makeExecutableSchema({
    typeDefs,
    resolvers
})

const app = express()
const server = new ApolloServer({
    schema,
    playground: true, 
    introspection: true
});

server.applyMiddleware({app})
app.use(cors())

app.listen(port, ()=>{
    logger.info(`🚀Server is ready and running on http://localhost:${port}${server.graphqlPath}`)
})