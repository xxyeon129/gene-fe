#!/usr/bin/env python3
"""
Database migration script to rename rna_quality_score column to methyl_quality_score
"""
from app.db.session import SessionLocal
from sqlalchemy import text

def migrate_database():
    """Rename rna_quality_score to methyl_quality_score in projects table"""
    db = SessionLocal()

    try:
        print("Starting database migration...")

        # Check if rna_quality_score column exists
        check_column_query = text("""
            SELECT COUNT(*) as count
            FROM information_schema.COLUMNS
            WHERE TABLE_SCHEMA = 'data_qc'
            AND TABLE_NAME = 'projects'
            AND COLUMN_NAME = 'rna_quality_score'
        """)

        result = db.execute(check_column_query).fetchone()

        if result[0] > 0:
            print("Found 'rna_quality_score' column, renaming to 'methyl_quality_score'...")

            # Rename column
            rename_query = text("""
                ALTER TABLE projects
                CHANGE COLUMN rna_quality_score methyl_quality_score FLOAT NULL
            """)

            db.execute(rename_query)
            db.commit()

            print("✅ Successfully renamed column from 'rna_quality_score' to 'methyl_quality_score'")
        else:
            # Check if methyl_quality_score already exists
            check_methyl_query = text("""
                SELECT COUNT(*) as count
                FROM information_schema.COLUMNS
                WHERE TABLE_SCHEMA = 'data_qc'
                AND TABLE_NAME = 'projects'
                AND COLUMN_NAME = 'methyl_quality_score'
            """)

            methyl_result = db.execute(check_methyl_query).fetchone()

            if methyl_result[0] > 0:
                print("✅ Column 'methyl_quality_score' already exists. No migration needed.")
            else:
                print("❌ Neither 'rna_quality_score' nor 'methyl_quality_score' column found!")
                print("Creating 'methyl_quality_score' column...")

                add_column_query = text("""
                    ALTER TABLE projects
                    ADD COLUMN methyl_quality_score FLOAT NULL
                    AFTER dna_quality_score
                """)

                db.execute(add_column_query)
                db.commit()

                print("✅ Successfully created 'methyl_quality_score' column")

        print("\nMigration completed successfully!")

    except Exception as e:
        print(f"❌ Migration failed: {str(e)}")
        db.rollback()
        raise

    finally:
        db.close()

if __name__ == "__main__":
    migrate_database()
