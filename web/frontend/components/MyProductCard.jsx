import { Card, TextContainer, Text, Button } from "@shopify/polaris";
import { useState } from "react";
import { Toast } from "@shopify/app-bridge-react";
import { useAppQuery, useAuthenticatedFetch } from "../hooks";

export function MyProductsCard(){
const emptyToastProps = {content: null}
const [toastProps, setToastProps] = useState(emptyToastProps);
const [isLoading, setIsLoading] =useState(false)
const fetch = useAuthenticatedFetch()
const productCount = 5

const  {
    data, 
    refetch: refetchProductCount, 
    isLoading: isLoadingCount,
    isRefetching: isRefetchingCount
} = useAppQuery({
    url: '/api/product/count',
    reactQueryOptions:{
        onSuccess: () => {
            setIsLoading(false)
        }
    }
})


const handlePopulate = async () => {
    setIsLoading(true)
    const  response = await fetch('/api/products/create')
    if (response.ok){
        console.log(await response.json())
        await refetchProductCount();
        setToastProps({
            content: "Products Created",
            count: productsCount
        })
        
    }else{
        setIsLoading(false)
    }
}

    return(
        <>
        <Card
         title= "My Product Card"
         sectioned
         primaryFooterAction={{
            content: t("ProductsCard.populateProductsButton", {
                count: productsCount,
            }),
            onAction:handlePopulate,
            loading: isLoading
         }}
        >
        <TextContainer spacing="loose">
         <p>Sample products are created with a default title and price. You can remove them at any time.</p>
         <Text as="h4" variant="headingMd">
          Total products
         </Text>
         <Text variant="bodyMd" as="p" fontWeight="semibold">
           20
         </Text>
        </TextContainer>
        </Card>
      </>
    )
}
