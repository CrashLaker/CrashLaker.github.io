---
layout: post
title: "CentOS RPM Build"
comments: true
date: "2020-07-06 18:28:35.152000+00:00"
categories:  [linux]
tags:  [centos, rpmbuild]
---


https://wiki.centos.org/HowTos/SetupRpmBuildEnvironment

```bash
yum -y install -y rpm-build
mkdir -p ~/rpmbuild/{BUILD,RPMS,SOURCES,SPECS,SRPMS}
```

### Build example
```bash
rpmbuild -ba mypackage.spec
```

### Spec Example
```
Name:           myvim
Version:        0.1
Release:        0
Summary:        Crashlaker vim
Group:          crashlaker vim
License:        MIT
#URL:
#Vendor:
#Source:
Prefix:         %{_prefix}
Packager:       Crashlaker
BuildRoot:      %{_tmppath}/%{name}-root

%description
My vim and vimrc

#%prep
#%setup -q -n %{name}-%{version}

%build
#echo ">>>>> %{buildroot}"
#echo "+++++ $RPM_BUILD_ROOT"
mkdir -p $RPM_BUILD_ROOT/root
ls $RPM_BUILD_ROOT
ls $RPM_BUILD_ROOT/root

%install
mkdir -p $RPM_BUILD_ROOT/root
tar xzvf /root/rpmbuild/SOURCES/vim.tgz -C $RPM_BUILD_ROOT/root/


%clean
[ $RPM_BUILD_ROOT != "/" ] && rm -rf $RPM_BUILD_ROOT/*

%files
%defattr(-,root,root)
#/root/.vimrc
/root/.vim*
```



