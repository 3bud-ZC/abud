#!/bin/bash
psql -U postgres -d abud_platform -c "SELECT count(*) FROM information_schema.tables WHERE table_schema = 'public';"
