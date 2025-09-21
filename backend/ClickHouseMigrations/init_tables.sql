CREATE TABLE IF NOT EXISTS default.service_logs
(
    timestamp DateTime64(3) CODEC(Delta, ZSTD),
    message String,
    source_context String
)
    ENGINE = MergeTree()
        PARTITION BY toYYYYMM(timestamp)
        ORDER BY timestamp
        TTL timestamp + INTERVAL 30 DAY;