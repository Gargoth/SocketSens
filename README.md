# 145-iotcup

## Prerequisites

- `npm`

## Backend

The backend API is built with [Hono](https://hono.dev/) and is deployed using [Vercel](https://vercel.com/).

Upon running `npm run deploy` in the `backend/` directory, the deployed API can be accessed [here](https://cs145iot-backend.vercel.app/).
For testing, `npm run start` can be used to deploy the API locally.

Note that `/api` must be appended to the resulting URL to access the Hono API.
