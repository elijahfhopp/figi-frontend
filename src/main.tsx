import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import '@fontsource/outfit/latin.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'

const client = new ApolloClient({
  uri: "/api/graphql",
  cache: new InMemoryCache()
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </StrictMode>,
)
