---
layout: post
title: "Kafka Study"
comments: true
date: "2021-03-09 03:18:16.007000+00:00"
---

Udemy
https://www.udemy.com/course/apache-kafka/

![](/assets/img/8PFHSCEpM_430bd34623bab93806e0b6638ec032f7.png)

![](/assets/img/8PFHSCEpM_06a309a1b4933e5a76e30ea550d2c535.png)

![](/assets/img/8PFHSCEpM_2f663b33342d3c75eb1d19e9e91d072a.png)

![](/assets/img/8PFHSCEpM_6a66c98c2fbf58fa4a81f3e76bc187ee.png)

## Tools
* Vis
    * https://medium.com/@coderunner/debugging-with-kafkacat-df7851d21968
    * https://medium.com/@coderunner/debugging-with-kafkacat-df7851d21968

## Install


```bash
yum install -y java-1.8.0-openjdk
wget https://downloads.apache.org/kafka/2.7.0/kafka_2.12-2.7.0.tgz
# config config/zookeeper.properties 
# dataDir
screen -dmS zookeeper bash -c "zookeeper-server-start.sh /root/kafka_2.12-2.7.0/config/zookeeper.properties"

# config/server.properties
# log.dirs
screen -dmS kafka bash -c "kafka-server-start.sh /root/kafka_2.12-2.7.0/config/server.properties"
```


### topics
```bash
kafka-topics.sh --zookeeper localhost:2181 \
                --topic first_topic \
                --create \
                --partitions 3 \
                --replication-factor 1
# kafka-topics.sh --zookeeper localhost:2181 --list
first_topic
# kafka-topics.sh --zookeeper localhost:2181 --topic first_topic --describe
Topic: first_topic      PartitionCount: 3       ReplicationFactor: 1    Configs:
        Topic: first_topic      Partition: 0    Leader: 0       Replicas: 0     Isr: 0
        Topic: first_topic      Partition: 1    Leader: 0       Replicas: 0     Isr: 0
        Topic: first_topic      Partition: 2    Leader: 0       Replicas: 0     Isr: 0
kafka-topics.sh --zookeeper localhost:2181 \
                --topic second_topic \
                --create \
                --partitions 6 \
                --replication-factor 1
# kafka-topics.sh --zookeeper localhost:2181 --topic second_topic --delete
Topic second_topic is marked for deletion.
Note: This will have no impact if delete.topic.enable is not set to true.
# kafka-topics.sh --zookeeper localhost:2181 --list
first_topic

```


### produce
```bash
# kafka-console-producer.sh --broker-list localhost:9092 --topic first_topic
>hello
>me
>myself
>crash
>lala
>^C
# kafka-console-producer.sh --broker-list localhost:9092 --topic first_topic --producer-property acks=all
>some message that is acked
>^C
#  kafka-console-producer.sh --broker-list localhost:9092 --topic new_topic
>lol
[2021-03-09 17:32:00,832] WARN [Producer clientId=console-producer] Error while fetching metadata with correlation id 3 : {new_topic=LEADER_NOT_AVAILABLE} (org.apache.kafka.clients.NetworkClient)
>1
>2
>3
>^C
# kafka-topics.sh --zookeeper localhost:2181 --list
first_topic
new_topic
```

### consume
```bash
# kafka-console-consumer.sh --bootstrap-server localhost:9092 --topic first_topic
# kafka-console-consumer.sh --bootstrap-server localhost:9092 --topic first_topic --from-beggining
```









