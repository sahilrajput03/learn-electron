#!/bin/bash
date
npm run build:mac && {
  # Kill app if already running and remove already installed version
  pkill "Intelligent\ Assistant"
  rm -rf /Applications/Intelligent\ Assistant.app

  # Install the dmg file (src: https://apple.stackexchange.com/a/73931/576826)
  hdiutil attach ./dist/Intelligent\ Assistant-1.0.0.dmg
  cp -r /Volumes/Intelligent\ Assistant\ 1.0.0/Intelligent\ Assistant.app /Applications/
  hdiutil detach /Volumes/Intelligent\ Assistant\ 1.0.0

  # Generally Takes: 1m 12s [TESTED]
  date

  # Open application
  open -a "Intelligent Assistant"
} || {
  echo "❌Build failed, not installing."
}
