#!/bin/bash

# Define the path to the file you're modifying
HTML_FILE=/usr/src/app/build/index.html

# Replace the placeholder with the actual environment variable value
sed -i "s|__REACT_APP_SERVER_URL__|${REACT_APP_SERVER_URL}|g" $HTML_FILE

# Start the server
exec serve -s build -l 3000
