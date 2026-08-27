# Database Schema

## Overview

CreatorIQ uses PostgreSQL as the primary database for storing user information, content data, and analytics data.

For Milestone 1, the database schema focuses on the core entities required for authentication, role-based access, and the creator analytics dashboard.

## 1. Users Table

The users table stores account and authentication information.

| Field | Description |
|------|-------------|
| id | Unique user ID |
| name | User's name |
| email | User's email address |
| password | Hashed password |
| role | User role |
| created_at | Account creation date |

Supported roles:

- Creator
- Agency
- Marketing Team
- Administrator

## 2. Content Table

The content table stores information about social media content.

| Field | Description |
|------|-------------|
| id | Unique content ID |
| user_id | ID of the content creator |
| title | Content title |
| platform | Social media platform |
| views | Number of views |
| likes | Number of likes |
| comments | Number of comments |
| shares | Number of shares |
| created_at | Content creation date |

## 3. Analytics Table

The analytics table stores creator performance metrics.

| Field | Description |
|------|-------------|
| id | Unique analytics ID |
| user_id | ID of the creator |
| followers | Total followers |
| total_views | Total content views |
| reach | Total audience reach |
| impressions | Total impressions |
| engagement_rate | Engagement percentage |
| date | Date of analytics record |

## Relationships

A user can have multiple content records.

A user can also have multiple analytics records.

User
↓
Content

User
↓
Analytics

## Milestone 1 Database Scope

For Milestone 1, the database will support:

- User registration
- User login
- Role-based access
- Creator profile information
- Sample analytics data
- Dashboard metrics
