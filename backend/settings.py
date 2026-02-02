import os

DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "sqlite:///./data/hrms_lite.db"
)
