#!/usr/bin/env python3
"""
Database migration script to add rna_quality_score column
"""
from app.db.session import SessionLocal
from sqlalchemy import text

def migrate_database():
    """Add rna_quality_score column to projects table"""
    db = SessionLocal()

    try:
        print("Starting database migration to add RNA column...")

        # Check if rna_quality_score column exists
        check_column_query = text("""
            SELECT COUNT(*) as count
            FROM information_schema.COLUMNS
            WHERE TABLE_SCHEMA = 'data_qc'
            AND TABLE_NAME = 'projects'
            AND COLUMN_NAME = 'rna_quality_score'
        """)

        result = db.execute(check_column_query).fetchone()

        if result[0] == 0:
            print("RNA column not found, adding rna_quality_score column...")

            # Add column after dna_quality_score
            add_column_query = text("""
                ALTER TABLE projects
                ADD COLUMN rna_quality_score FLOAT NULL
                AFTER dna_quality_score
            """)

            db.execute(add_column_query)
            db.commit()

            print("✅ Successfully added 'rna_quality_score' column")
        else:
            print("✅ Column 'rna_quality_score' already exists. No migration needed.")

        print("\nMigration completed successfully!")

    except Exception as e:
        print(f"❌ Migration failed: {str(e)}")
        db.rollback()
        raise

    finally:
        db.close()

if __name__ == "__main__":
    migrate_database()
