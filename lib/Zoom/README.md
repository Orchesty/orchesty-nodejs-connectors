# [Zoom](https://marketplace.zoom.us/docs/api-reference/zoom-api/)

## OAuth 2.0

- Client id
- Client secret

### How to get

- Go to [https://marketplace.zoom.us/user/build](https://marketplace.zoom.us/user/build)

### Data example for [ZoomSendMessageConnector](Connector/ZoomSendMessageConnector.ts)

- `userName` from MongoDb
- `userId` Zoom user id
- `toChannel` Zoom channel id
- `message` Zoom content message

```json
{
    "message": "zoom example message",
    "toChannel": "d87f0b9bd5434d3fb75153a42ddb9ce2",
    "userId": "d87f0b9bd5434d3fb75153a42ddb9ce2",
    
    
    "userName": "d87f0b9bd5434d3fb75153a42ddb9ce2"
}
```
