CREATE TABLE IF NOT EXISTS agap_sso_jti (
  jti text PRIMARY KEY,
  expires_at timestamptz NOT NULL,
  consumed_at timestamptz NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS agap_sso_jti_expires_at_idx ON agap_sso_jti (expires_at);
