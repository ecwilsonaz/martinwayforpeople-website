CREATE INDEX IF NOT EXISTS idx_subscribers_ip_hash_created ON subscribers (ip_hash, created_at);
