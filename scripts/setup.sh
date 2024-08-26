#1/usr/bin/env bash

set -euxo pipefail

ANDROID_DIR=android
IOS_DIR=ios

if [[ "$@" == *"--platform-clean"* ]]; then
  (
    set +e
    echo "Cleaning Android and iOS directories..."
    rm -rf android ios
  )
fi

if [[ "$@" == *"--clean"* ]]; then
  (
    set +e
    echo "Performing clean build..."
    echo "Removing node_modules..."
    rm -rf node_modules
    echo "Removing Android and iOS directories..."
    rm -rf android ios
  )
fi

yarn install

if [[ ! -d "${ANDROID_DIR}" || ! -d "${IOS_DIR}" ]]; then
  echo "Missing Android and/or iOS directories. Performing prebuild..."
  npx expo prebuild
fi
