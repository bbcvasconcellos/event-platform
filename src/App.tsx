import { ApolloProvider } from "@apollo/client"
import { BrowserRouter } from "react-router-dom"

import { Router } from "./router"
import { client } from "./graphQL"

function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Router/>
      </BrowserRouter>
    </ApolloProvider>
  )
}

export default App