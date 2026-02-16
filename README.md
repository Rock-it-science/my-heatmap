# my-heatmap

A map-centric view for your activity data.

## Architecture

### Authentication

Backend stores application-level secret key for Strava, and holds client secret keys.

```mermaid
flowchart TD
    A[User visits app] -->
    B[GET /user/authenticated] -->
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

The app interfaces with the Strava API to fetch activity data, especially Polyline map data. Map data is not included with the basic acticity response returned from `listActivities` so every activity needs an explicit `GET` request.

Requests are handled on the backend to keep the user's Strava access token a secret. This also allows us to use the Strava node npm library to abstract away HTTP requests.

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
    D[Runs list activities,
    then GET on each activity] -->
    E[Returns list of relavent
    activity data to frontend]
```

^ Be careful about sending all activities in one response as we may hit memory limit.
Use pagination.
