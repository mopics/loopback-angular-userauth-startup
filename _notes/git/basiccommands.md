# Git Basic Commands

## `git init`
Initialises a new git-repo

## `git status`
Shows current status of git-repo

## `git add .`
Adds all new files AND file-changes (exept those specified in .gitignore) to the git-repo

## `git commit -m "commit-message"`
Commits/Stores/Remembers recently added files to git-repo. Git will now remember for in eternity!!!

## `git log --online`
Shows git commits in a brief matter

`git log` : shows the whole shambam! With dates and user-info, and what not.

## `git checkout <commit><file>`
Gets file back in previous commit-state. 
* **Be sure to close the file in V.S.C**
* **And Refresh working-dir**
* Change automaticly added to staging area
* `git reset` unstages checkouts
* `git checkout <commit-after><file>` will change file back to original state like nothing had happened( `git status` will show : `nothing to commit, ... clean` )

# Git Repo
## `git remote add origin <https://url-to-online-git-repo>`
* Hooks up local repo to a remote online repo.
* `git remote set-url <url>` to reset the url
* needs ssh keys to be set.

## `git push -u origin master`
* push the local repo to the origin to the master branch

## `git clone <repo_url>`
Clones online repo to computer

# Git HEAD deattached fix
## `git branch temp`
* Creates branch, attaches current HEAD to it
## `git checkout temp`
* Checks out to name
## `git branch -f master temp`
* points master to temp
## Compare the 2 branches
```
git log --graph --decorate --pretty=oneline --abbrev-commit master origin/master temp
git diff master temp
git diff origin/master temp
```
## `git checkout master`
* checks master out
## `git branch -d temp`
* deletes temp branch
## `git push origin master`
* pushes to master to remote repo




