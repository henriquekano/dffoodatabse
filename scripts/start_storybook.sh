#!/bin/bash
set -e

adb reverse tcp:8081 tcp:8081
adb reverse tcp:7007 tcp:7007
adb reverse tcp:8097 tcp:8097

yarn prestorybook
yarn buildAndStartStorybook
