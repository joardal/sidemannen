CREATE TABLE IF NOT EXISTS inquiries (
 id TEXT PRIMARY KEY,
 created_at INTEGER NOT NULL,
 name TEXT NOT NULL,
 email TEXT NOT NULL,
 company TEXT NOT NULL DEFAULT '',
 phone TEXT NOT NULL DEFAULT '',
 message TEXT NOT NULL,
 designs TEXT NOT NULL DEFAULT '[]',
 state TEXT NOT NULL DEFAULT 'new'
);
CREATE INDEX IF NOT EXISTS inquiries_created_at ON inquiries(created_at);
CREATE TABLE IF NOT EXISTS rate_limits (key TEXT PRIMARY KEY, count INTEGER NOT NULL, expires_at INTEGER NOT NULL);
CREATE INDEX IF NOT EXISTS rate_limits_expiry ON rate_limits(expires_at);
