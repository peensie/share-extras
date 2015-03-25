# Migrating Source Code #

  1. Create the project in GitHub.
```
curl -u 'USER' https://api.github.com/user/repos -d '{"name":"REPO"}'
```
  1. Create the local repo:
```
git init newdir
cd newdir
```
  1. Edit .git/config and add the following at the bottom - updating the last 2 lines to reflect the project dir name in SVN
```
[svn-remote "googlecode"]
    url = https://share-extras.googlecode.com/svn
    fetch = trunk/Share Extras Project Name:refs/remotes/googlecode/trunk
    branches = branches/*/Share Extras Project Name:refs/remotes/googlecode/branches/*
```
  1. Create file googlecode-users.txt and add your Google Code aliases to the file (I found I needed to add with domain and without for me) so that GitHub knows the identity of committers. I use a common alias file in the directory above, so I can re-use the same one each time.
```
gmailuser = Firstname Lastname <GitHub-registered email>
gmailuser@gmail.com = Firstname Lastname <GitHub-registered email>
...
```
  1. Fetch from SVN, create the 1.0 branch (this and the alias info from http://stackoverflow.com/questions/79165/how-to-migrate-svn-with-history-to-a-new-git-repository/3972103#3972103), then push all branches
```
git svn fetch googlecode -A googlecode-users.txt
git checkout -b 1.0 refs/remotes/googlecode/branches/1.0
git remote add origin https://github.com/share-extras/projectname.git
git push --all origin
git checkout master
```

## Post-Migration ##

Any subsequent changes made in SVN can be pulled through to Git using `git svn rebase`. After doing this you probably also want to push your changes to the GitHub repo using `git push`.