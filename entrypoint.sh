#!/bin/sh -l
node dist/index.js "$@" >> $GITHUB_OUTPUT
