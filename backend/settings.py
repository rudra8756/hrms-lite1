import os

DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "sqlite:///./hrms_lite.db"  # fallback for local dev
)
