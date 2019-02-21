#!/bin/bash
set -e
set -x

pushd front
  npm i
popd

# chmod +x install.sh