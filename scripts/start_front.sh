#!/bin/bash
set -e
set -x

pushd front
  npm start
popd

# chmod +x start_front.sh
