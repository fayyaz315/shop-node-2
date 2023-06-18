import { GraphqlQueryError } from "@shopify/shopify-api";
import shopify from "./shopify.js";


const FEATCH_PRODUCTS = `
        {
            products(first: 10){
            edges{
                node{
                id
                title
                description
                variants(first: 10){
                    edges{
                    node
                    {
                        title
                        price
                    }
                    }
                }
                images(first: 10){
                    edges{
                    node{
                        url
                    }
                    }
                }
                }
            }
            }
  }
`;

export default async function featchProducts(session) {
  const client = new shopify.api.clients.Graphql({ session });

  try {
     const res = await client.query({
        data: {
          query: FEATCH_PRODUCTS
        },
      });
    return res
  } catch (error) {
    if (error instanceof GraphqlQueryError) {
      throw new Error(
        `${error.message}\n${JSON.stringify(error.response, null, 2)}`
      );
    } else {
      throw error;
    }
  }
}
