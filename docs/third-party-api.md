# Third-Party Integrations

The application exposes endpoints under `/api` for integration with external services. A sample verification endpoint is provided below.

## `POST /api/vet/verify`

Send verification details for a vet or veterinary clinic. The request body should include a `vetId` and any additional `data` required by the third-party service. The endpoint currently returns a placeholder response but can be extended to call external APIs.
