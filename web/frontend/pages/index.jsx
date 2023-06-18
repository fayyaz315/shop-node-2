import {
  Card,
  Page,
  Layout,
  TextContainer,
  Image,
  Stack,
  Link,
  Text,
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { useTranslation, Trans } from "react-i18next";

import { trophyImage } from "../assets";

import { ProductsCard, ProductList } from "../components";
import { useAppQuery } from "../hooks";

export default function HomePage() {
const {data,isLoading, refetch, isRefetching } = useAppQuery({
  url: "api/products"
})
  console.log(data)
  const { t } = useTranslation();
  return (
    <Page>
      <TitleBar title={t("Dashboard")}  />
      <Layout>
         <Layout.Section>
          <ProductsCard />
        </Layout.Section>
        <Layout.Section>
          <ProductList data={data} isLoading={isLoading} isRefetching={isRefetching}/>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
