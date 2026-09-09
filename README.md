# RADAR — ORBYT Playlist Intelligence

Cloudflare Worker for playlist discovery and public curator/contact discovery.

## Current version
RADAR v0.3.8 Cloud

## Endpoints
- `GET /api/health`
- `POST /api/discover`
- `POST /api/curator`

## Secret
`BRAVE_API_KEY` must stay in Cloudflare Workers Secrets. Never commit it to GitHub.

## Deploy
Connect this repository to the Cloudflare Worker `radar-orbyt` and deploy the `main` branch. Cloudflare should keep the existing `BRAVE_API_KEY` secret configured at Worker level.
