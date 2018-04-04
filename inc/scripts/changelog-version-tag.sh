#!/bin/bash

# 0  - Commit everything left until working directory is clean
# 1  - Update version in package.json
# 2  - Run 'changelog_version_tag' grunt task
# ----------------------------------------------------------------------------
# 1  - Define variables:
#      - current branch (with git)
current_branch=$(git rev-parse --abbrev-ref HEAD)
#      - current tag (with git)
current_tag=$(git describe --abbrev=0 --tags "$(git rev-list --tags --max-count=1)")
#      - commits number since last tag (with git)
count_commits=$(git rev-list --no-merges --count "$(git describe --abbrev=0 --tags "$(git rev-list --tags --max-count=1)")"..HEAD)
#      - new tag  (with node)
new_tag=$(node -pe "require('./package.json').version" | awk '{ print "v"$1 }')
#      - new tag header and date (with node and awk)
new_tag_header=$(node -pe "require('./package.json').version" | awk '{ print "**v"$1"**" }')
# ----------------------------------------------------------------------------
# 2  - Write new tag header to changelog above current tag
sed -i "/$current_tag/i $new_tag_header\n" CHANGELOG.md
# ----------------------------------------------------------------------------
# 3  - Write commits to temp file
if [[ $count_commits -gt 8 ]] || [[  $count_commits == 8 ]]; then
  echo "- _New Features:_" >> templog
  git log "$(git describe --abbrev=0 --tags "$(git rev-list --tags --max-count=1)")"..HEAD --no-merges --grep=^add -i --pretty=format:"    - %s" >> templog
  echo "" >> templog
  echo "- _Updates:_" >> templog
  git log "$(git describe --abbrev=0 --tags "$(git rev-list --tags --max-count=1)")"..HEAD --no-merges --grep=^update -i --pretty=format:"    - %s" >> templog
  echo "" >> templog
  echo "- _Bug fixes:_" >> templog
  git log "$(git describe --abbrev=0 --tags "$(git rev-list --tags --max-count=1)")"..HEAD --no-merges --grep=^fix -i --pretty=format:"    - %s" >> templog
  echo "" >> templog
  echo "- _Other:_" >> templog
  git log "$(git describe --abbrev=0 --tags "$(git rev-list --tags --max-count=1)")"..HEAD --no-merges --grep=^add --grep=^fix --grep=^update -i --invert-grep --pretty=format:"    - %s" >> templog
  echo "" >> templog
else
  git log "$(git describe --abbrev=0 --tags "$(git rev-list --tags --max-count=1)")"..HEAD --no-merges --pretty=format:"- %s" >> templog
  echo "" >> templog
fi
# ----------------------------------------------------------------------------
# 4  - Write tempfile contents to changelog below new tag header
sed -i -e "/$new_tag/r templog" CHANGELOG.md
# ----------------------------------------------------------------------------
# 5  - Remove tempfile
rm templog
# ----------------------------------------------------------------------------
# 6  - Add all changed files to commit
git add .
# ----------------------------------------------------------------------------
# 7  - Commit changes
if [ "${current_branch}" == "master" ]; then
  git commit -m "Release hotfix in ${new_tag}"
else
  git commit -m "Update CHANGELOG.md and version to ${new_tag}"
fi
# ----------------------------------------------------------------------------
# 8  - Switch branch from feature to develop (if applicable)
# 9 - Merge feature branch into develop (if applicable)
# 10 - Remove merged feature branch (if applicable)
if [[ "${current_branch}" != "develop" ]] && [[ "${current_branch}" != "master" ]]; then
  git checkout develop && \
  git merge --no-ff --no-edit -m "Prepare release for ${new_tag}" "${current_branch}" && \
  git branch -d "${current_branch}"
fi
# ----------------------------------------------------------------------------
# 11 - Switch branch from current to master, if not already on it
# 12 - Merge develop branch with develop
if [ "${current_branch}" != "master" ]; then
  git checkout master && \
  git merge --no-ff --no-edit -m "Release ${new_tag}" develop
fi
# ----------------------------------------------------------------------------
# 13 - Get merge commit hash to tag
merge_commit=$(git log -n 1 --pretty=format:"%h")
# ----------------------------------------------------------------------------
# 14 - Tag git repo with current tag
git tag -m '' -a "${new_tag}" "${merge_commit}"
# ----------------------------------------------------------------------------
# 15 - Push master branch and new tag to remote
git -c push.default=simple push origin master --porcelain
git push origin --tags
# ----------------------------------------------------------------------------
# 16 - Checkout to develop branch, ready to go
# ----------------------------------------------------------------------------
git checkout develop
