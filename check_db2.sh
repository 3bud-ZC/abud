#!/bin/bash
sudo -u postgres psql -d abud_platform -c "SELECT count(*) FROM information_schema.tables WHERE table_schema = 'public';"
