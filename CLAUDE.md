# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

This is a team blog aggregation site built with Next.js and TypeScript. It fetches RSS feeds from multiple sources (Zenn, Qiita, Note, SpeakerDeck, etc.) and displays aggregated blog posts from primeNumber Inc. members and related blogs.

## Development Commands

### Build and Preview
- `npm run build` - Full build (posts + pages)
- `npm run build:posts` - Build RSS feed aggregation only
- `npm run preview` - Build and preview locally with Wrangler
- `npm run deploy` - Build and deploy to Cloudflare Pages

### Cloudflare Pages Specific
- `npm run pages:build` - Build for Cloudflare Pages deployment
- `npm run vercel-build` - Build for Vercel (alternative deployment)

## Architecture

### Core Components
- **RSS Aggregation**: `src/builder/posts.ts` - Fetches and processes RSS feeds from member sources
- **Member Configuration**: `members.ts` - Defines team members and their RSS feed sources
- **Site Configuration**: `site.config.ts` - Site metadata and navigation settings
- **Type Definitions**: `src/types.ts` - TypeScript interfaces for Member and PostItem

### Build Process
1. `build:posts` runs `posts.ts` which:
   - Fetches RSS feeds from all member sources
   - Processes and filters posts
   - Generates `.contents/posts.json` and `.contents/build_info.json`
2. Next.js build generates static pages using the aggregated data

### Key Directories
- `src/components/` - React components (PostList, SiteHeader, etc.)
- `src/pages/` - Next.js pages including member profiles and main listing
- `src/styles/` - SCSS stylesheets with component-specific styles
- `public/avatars/` - Member avatar images

### Member Management
Add new members by updating `members.ts` with:
- Basic info (id, name, role, bio, avatarSrc)
- RSS feed sources array
- Social media usernames
- Optional URL filtering with includeUrlRegex/excludeUrlRegex

## Deployment

The site is deployed on Cloudflare Pages. The build process aggregates RSS feeds at build time and generates static pages for optimal performance.