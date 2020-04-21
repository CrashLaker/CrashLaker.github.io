---
layout: post
title: "Upgrade Vmware ESXI 6.5 to 6.7"
comments: true
date: "2020-04-21 23:32:01.421000+00:00"
---

https://miketabor.com/how-to-upgrade-esxi-6-5-to-esxi-6-7/

`esxcli software sources profile list --depot=https://hostupdate.vmware.com/software/VUM/PRODUC
TION/main/vmw-depot-index.xml | grep 6.7.0-2019`

```
ESXi-6.7.0-20191104001-no-tools   VMware, Inc.  PartnerSupported
ESXi-6.7.0-20190802001-no-tools   VMware, Inc.  PartnerSupported
ESXi-6.7.0-20190304001-no-tools   VMware, Inc.  PartnerSupported
ESXi-6.7.0-20190304001-standard   VMware, Inc.  PartnerSupported
ESXi-6.7.0-20191204001-no-tools   VMware, Inc.  PartnerSupported
ESXi-6.7.0-20190802001-standard   VMware, Inc.  PartnerSupported
ESXi-6.7.0-20190402001-no-tools   VMware, Inc.  PartnerSupported
ESXi-6.7.0-20191201001s-standard  VMware, Inc.  PartnerSupported
ESXi-6.7.0-20191204001-standard   VMware, Inc.  PartnerSupported
ESXi-6.7.0-20191201001s-no-tools  VMware, Inc.  PartnerSupported
ESXi-6.7.0-20190404001-standard   VMware, Inc.  PartnerSupported
ESXi-6.7.0-20190504001-standard   VMware, Inc.  PartnerSupported
ESXi-6.7.0-20190402001-standard   VMware, Inc.  PartnerSupported
ESXi-6.7.0-20190401001s-standard  VMware, Inc.  PartnerSupported
ESXi-6.7.0-20190604001-standard   VMware, Inc.  PartnerSupported
ESXi-6.7.0-20191104001-standard   VMware, Inc.  PartnerSupported
ESXi-6.7.0-20190404001-no-tools   VMware, Inc.  PartnerSupported
ESXi-6.7.0-20190104001-no-tools   VMware, Inc.  PartnerSupported
ESXi-6.7.0-20190104001-standard   VMware, Inc.  PartnerSupported
ESXi-6.7.0-20190401001s-no-tools  VMware, Inc.  PartnerSupported
ESXi-6.7.0-20190504001-no-tools   VMware, Inc.  PartnerSupported
ESXi-6.7.0-20190801001s-standard  VMware, Inc.  PartnerSupported
ESXi-6.7.0-20190604001-no-tools   VMware, Inc.  PartnerSupported
ESXi-6.7.0-20190801001s-no-tools  VMware, Inc.  PartnerSupported
```

```bash
esxcli network firewall ruleset set -e true -r httpClient

esxcli software profile update -d https://hostupdate.vmware.com/software/VUM/PRODUCTION/main/vmw-depot-index.xml -p ESXi-6.7.0-20191204001-standard

esxcli network firewall ruleset set -e false -r httpClient
```

`reboot`

```bash
$ esxcli software profile update -d https://hostupdate.vmw
are.com/software/VUM/PRODUCTION/main/vmw-depot-index.xml -p ESXi-6.7.0-201808040
01-standard

 [InstallationError]
 [Errno 28] No space left on device
       vibs = VMware_locker_tools-light_10.2.1.8267844-8941472
 Please refer to the log file for more details.
```
` Go to Host > System > Swap and activate swap on our datastore vmfs.`


