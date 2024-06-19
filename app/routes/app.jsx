import { json } from "@remix-run/node";
import { Link, Outlet, useLoaderData, useRouteError } from "@remix-run/react";
import { boundary } from "@shopify/shopify-app-remix/server";
import { AppProvider } from "@shopify/shopify-app-remix/react";
import { NavMenu } from "@shopify/app-bridge-react";
import polarisStyles from "@shopify/polaris/build/esm/styles.css?url";
import { authenticate } from "../shopify.server";

export const links = () => [{ rel: "stylesheet", href: polarisStyles }];

export const loader = async ({ request }) => {
  await authenticate.admin(request);

  return json({ apiKey: process.env.SHOPIFY_API_KEY || "" });
};

export default function App() {
  const { apiKey } = useLoaderData();

  return (
    <AppProvider isEmbeddedApp apiKey={apiKey}>
      <NavMenu>
        {/* <Link to="/app" rel="home">Home</Link> */}
        {/* <Link to="/app/additional">Additional page</Link> */}
        {/* <Link to="/app/blog">Blog Generation</Link> */}
        {/* <Link to="/app/trail">Trail</Link> */}
        {/* <Link to="/app/productList">Product List</Link> */}
        {/* <Link to="/app/orderManagement">Order Management</Link> */}
        <Link to="/app/reviewPage">Review Page</Link>
        {/* <Link to="/app/productListCard">Product Card</Link> */}
        <Link to="/app/productReviewsNewList" rel="home">Add Review</Link>
      </NavMenu>
      <Outlet />
    </AppProvider>
  );
}

// Shopify needs Remix to catch some thrown responses, so that their headers are included in the response.
export function ErrorBoundary() {
  return boundary.error(useRouteError());
}

export const headers = (headersArgs) => {
  return boundary.headers(headersArgs);
};
