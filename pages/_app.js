import Layout from "@/components/Layout";
import { FilterContextProvider } from "@/contexts/FilterContext";
import "@/styles/globals.css";
  

export default function App({ Component, pageProps }) {

  return(
    <>
        <FilterContextProvider> 
      <Layout> 
    
          <Component {...pageProps} />;
         
        </Layout>
        </FilterContextProvider>
  </>)
  
}
