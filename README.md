# my-heatmap

A map-centric view for your activity data.

## Developer Instructions

- Run `npm i` in both the client and server directories
- Create a `.env` file in the `server/` directory and add the following keys with values:

```
SESSION_SECRET=<generated with: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))">
STRAVA_CLIENT_ID=<Obtained from Strava here: https://www.strava.com/settings/api>
STRAVA_CLIENT_SECRET=<Obtained from Strava here: https://www.strava.com/settings/api>
FRONTEND_URL=http://localhost:5173
```

- Run `npm run dev` from project root to run vite server and backend server

## Architecture

### Authentication

Backend stores application-level secret key for Strava, and holds client secret keys.

```mermaid
flowchart TD
    A[User visits app] -->
    B[GET /api/authenticated] -->
    C{
        Server checks session ID
        header to see if there is
        a valid corresponding
        access token.
    }

    C --False-->
    D[opens strava oauth page
    with callback to our backend] -->
    E[authenticate in strava,
    callback to us with code] -->
    F[Fastify exchanges code for
    access token & stores token
    securely.
    Creates corresponding session
    ID and sends as HTTP-only
    cookie to browser] -->
    G[Redirects to home-page]

    G --> B

    C -- True -->
    H[Proceed]
```

### Fetching Strava Activities

The app interfaces with the Strava API to fetch activity data, especially Polyline map data. This is all included in the `GET /athlete/activities` endpoint.

Requests are handled on the backend to keep the user's Strava access token a secret. This also allows us to use the [Strava-v3](https://www.npmjs.com/package/strava-v3) node npm library to abstract away HTTP requests.

Activity data is not stored on our backend because of costs associated with storing large volumes of data. Instead, the activity data is passed to the user and stored in local browser storage. This also enhances privacy as no pesonal data is stored on our server.

```mermaid
flowchart TD
    A[Map App] -->
    B[GET /api/activities] -->
    C[Server uses the session ID
    header to look up user's
    auth token and runs API
    request to Strava to
    fetch Activity data.] -->
    D[Runs list activities] -->
    E[Returns list of relavent
    activity data to frontend]
```

^ Be careful about sending all activities in one response as we may hit memory limit.
Use pagination.
