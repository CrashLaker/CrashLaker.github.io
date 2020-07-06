---
layout: post
title: "AWS SAM, CloudFormation Notes"
comments: true
date: "2020-07-06 19:27:14.805000+00:00"
categories:  [aws]
tags:  [sam, cloudformation]
---



### Ref Resource Attribute on another template

https://medium.com/@anupam.ncsu/reference-resource-from-one-cloud-formation-stack-in-another-during-formation-f5c80679f0fd

```yaml
Outputs:
    VPCId:
        Description: VPC ID
        Value:
          Ref: VPC
        Export:
          Name:
            Fn::Sub: "${AWS::StackName}-VPCID" # <-----------------
```

```yaml
Parameters:
  NetworkStackName:
    Description: Name of the base stack with all infra resources
    Type: String
    Default: BaseStack # <------- ${AWS::StackName} from the other Cloudformation template
    
Resources:
  WebServerInstance:
    Type: AWS::EC2::Instance
    Properties:
      InstanceType: t2.micro
      ImageId:
   - SOMETHING FROM MY REGION
      NetworkInterfaces:
      - GroupSet:
        - Fn::ImportValue:
            Fn::Sub: "${NetworkStackName}-SecurityGroupID" # <--------------- 
```

