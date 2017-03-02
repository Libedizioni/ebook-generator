#!/bin/bash

# 0  - Commit everything left until working directory is clean
# 1  - Update version in package.json
# ----------------------------------------------------------------------------
# 2  - Define variables:
#      - current branch (with git)
current_branch=$(git rev-parse --abbrev-ref HEAD)
#      - current tag (with git)
current_tag=$(git describe --abbrev=0 --tags "$(git rev-list --tags --max-count=1)")
#      - new tag  (with node)
new_tag=$(node -pe "require('./package.json').version" | awk '{ print "v"$1 }')
#      - new tag header and date (with node and awk)
new_tag_header=$(node -pe "require('./package.json').version" | awk -v today="$(date +"%Y-%m-%d")" '{ print "**v"$1"**", "    -", today }')
# ----------------------------------------------------------------------------
# 3  - Write new tag header to changelog above current tag
sed -i "/$current_tag/i $new_tag_header\n" CHANGELOG.md
# ----------------------------------------------------------------------------
# 4  - Write commits to temp file
echo "- _New Features:_" >> templog
git log "$(git describe --tags --abbrev=0)"..HEAD --no-merges --grep=^add -i --pretty=format:"    - %s" >> templog
echo "" >> templog
echo "- _Updates:_" >> templog
git log "$(git describe --tags --abbrev=0)"..HEAD --no-merges --grep=^update -i --pretty=format:"    - %s" >> templog
echo "" >> templog
echo "- _Bug fixes:_" >> templog
git log "$(git describe --tags --abbrev=0)"..HEAD --no-merges --grep=^fix -i --pretty=format:"    - %s" >> templog
echo "" >> templog
echo "- _Other:_" >> templog
git log "$(git describe --tags --abbrev=0)"..HEAD --no-merges --grep=^add --grep=^fix --grep=^update -i --invert-grep --pretty=format:"    - %s" >> templog
echo "" >> templog
# ----------------------------------------------------------------------------
# 5  - Write tempfile contents to changelog below new tag header
sed -i -e "/$new_tag/r templog" CHANGELOG.md
# ----------------------------------------------------------------------------
# 6  - Remove tempfile
rm templog
# ----------------------------------------------------------------------------
# 7  - Add all changed files to commit
git add .
# ----------------------------------------------------------------------------
# 8  - Commit changes
git commit -m "Update CHANGELOG.md and version to ${new_tag}"
# ----------------------------------------------------------------------------
# 9  - Switch branch from feature to develop (if applicable)
# 10 - Merge feature branch into develop (if applicable)
# 11 - Remove merged feature branch (if applicable)
if [[ "${current_branch}" != "develop" ]]; then
  git checkout develop
  git merge -m "Prepare release for ${new_tag}" --no-ff "${current_branch}" && git branch -d "${current_branch}"
fi
# ----------------------------------------------------------------------------
# 12 - Switch branch from current to master
git checkout master
# ----------------------------------------------------------------------------
# 13 - Merge develop branch with develop
git merge -m "Release ${new_tag}" develop
# ----------------------------------------------------------------------------
# 14 - Tag git repo with current tag
git tag -a "${new_tag}" -m ''
# ----------------------------------------------------------------------------
# 15 - Push master branch and new tag to remote
#git -c push.default=simple push origin master --porcelain
#git push origin --tags
# ----------------------------------------------------------------------------
# 16 - Checkout to develop branch, ready to go
# ----------------------------------------------------------------------------
git checkout develop
