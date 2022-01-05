# [Webflow](https://developers.webflow.com)
## Auth
- API key

### How to get 
- To generate an API key for a site, open the site in the dashboard and navigate to the “Settings” pane. There is a section titled “API Access”, where you can generate a new API key.

### Data example for [WebflowAddProductConnector](Connector/WebflowAddProductConnector.ts)
- `userName` from MongoDb
- `name` product name
- `description` description of product
- `slug` slug for url (hint: https://example/products/SLUG)
- `price` product price
- `draft` 
- `archived` 
- `currency` e.g. czk, usd 
- `siteId` Webflow ehop id

```json
{
    "name": "Product",
    "description": "product description",
    "slug": "my-product",
    "price": 300,
    "draft": false,
    "archived": false,
    "currency": "czk",
    "siteId": "d87f0b9bd5434d3fb75153a42ddb9ce2",
    
    "userName": "d87f0b9bd5434d3fb75153a42ddb9ce2"
}
```
