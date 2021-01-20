---
layout: post
title: "Descomplicando o Grafana SimpleJson"
comments: true
date: "2021-01-20 15:47:56.137000+00:00"
categories:  [medium]
tags:  [grafana, simplejson]
---


Original post: https://medium.com/zabbix-brasil/descomplicando-o-grafana-simple-json-71c3001398b0

Um plugin para todos os casos
Image for post
Grafana é uma ferramenta de visualização por onde é possível gerar dashboards de maneira rápida, fácil e intuitiva. Sendo de fácil instação, leve e suportar uma variedade de datasources de terceiros arrisco dizer que todo departamento de TI já o esteja utilizando de alguma forma. Por ser, também, uma ferramenta open source sua comunidade de usuários e empresas crescem a cada dia contribuindo desde plugins de visualização, datasources e dashboards.
Image for post
Fonte: https://grafana.com/
Um dos maiores destaques da ferramenta é sua construção modular. Dessa forma outros vendors podem contribuir na construção de interfaces de acesso para seus respectivos produtos e os dispobinilizarem como plugins. Os plugins são divididos em duas categorias:
Visualização: Plugins responsáveis pela visualização. Exemplo: Gráfico de linhas, barras, gauge, sparklines, statlines, tabelas, grafos, etc. Ou seja, relacionado à visualização pelo usuário final.
Datasources: Plugins responsáveis por comunicar e transformar dados externos por dados reconhecidos pelo grafana. Exemplo: Comunicação com Cloudwatch, Zabbix, Prometheus, MongoDB, DataDog, Dynatrace, AppDynamics, Oracle, etc. Nota que alguns plugins desta categoria estão disponíveis apenas para usuários enterprise.
Link caso esteja interessado em ver a lista completa de plugins.
Dada uma breve introdução sobre o Grafana e seus plugins, nas próximas seções apresentarei por que e como utilizar o SimpleJson. Ele em conjunto com uma linguagem de programação é poderoso o suficiente para substituir qualquer plugin community ou enterprise. Espero que no final deste artigo eu consiga convencê-lo do mesmo. As próximas seções seguirão a seguir:
Introdução ao plugin SimpleJson
Instalação e configuração.
Backend: Mecanismo /search
Backend: Mecanismo /query
Use case: 1 SimpleJson para 5 Databases: MariaDB, MySQL, PostgreSQL, Oracle e SQL Server
Bônus 1: Web scrape HTML.
Bônus 2: Retornando resultados do MongoDB.
Bônus 3: Retornando resultados de CSV e Excel.
O conteúdo apresentado é de nível básico a intermediário nas seções bônus. O conhecimento de Grafana vai desde sua instalação, plugins, variáveis e criação de dashboards onde guiarei o leitor por cada etapa. Será coberto , também, uma leve introdução a linguagem e lógica de programação e Backend Web. Neste artigo, o leitor verá que é possível criar soluções completas com 10~15 linhas de Python + Flask (web framework).
Introdução ao plugin SimpleJson
SimpleJson é um plugin open source do tipo datasource cuja principal responsabilidade é garantir a comunicação entre um backend qualquer (seu futuro backend) e o Grafana. Ele faz somente a ponte por onde o Grafana obtém os dados para a criação dos gráficos. Logo é necessário um backend para pré processar os dados conforme mostra o diagrama abaixo.
Image for post
Fluxo de dados com SimpleJson retirando dados do MongoDB
Ele suporta 2 tipos principais de dados que cobre 99% de todos os plugins de visualização do Grafana. O tipo timeserie e table.
O tipo timeserie normalmente é utilizado para renderizar dados temporais:
[
  {
    "target":"upper_75", // The field being queried for
    "datapoints":[
      [622,1450754160000],  // Metric value as a float , unixtimestamp in milliseconds
      [365,1450754220000]
    ]
  },
  {
    "target":"upper_90",
    "datapoints":[
      [861,1450754160000],
      [767,1450754220000]
    ]
  }
]
E o table pra mostrar tabelas:
[
  {
    "columns":[
      {"text":"Time","type":"time"},
      {"text":"Country","type":"string"},
      {"text":"Number","type":"number"}
    ],
    "rows":[
      [1234567,"SE",123],
      [1234567,"DE",231],
      [1234567,"US",321]
    ],
    "type":"table"
  }
]
Instalação e configuração
A instalação do plugin dependerá muito da forma de como foi instalado o Grafana. Abaixo listarei três formas possíveis de instalar:
1. Variável de ambiente na subida do container Docker
2. Grafana-cli
3. Manualmente via download e cópia dos arquivos
Mais informações de instalação na documentação.
Variável de ambiente Docker
Se a instalação for feita via docker (documentação) basta adicionar o plugin na lista de plugins a serem instalados na subida do container:
docker run -d \
  -p 3000:3000 \
  --name=grafana \
  -e "GF_INSTALL_PLUGINS=grafana-clock-panel,grafana-simple-json-datasource" \
  grafana/grafana
No exemplo acima foram incluídos dois plugins: grafana-clock-panel e grafana-simple-json-datasource.
Grafana-cli
Instalação via cli se dá executando o comando a seguir:
grafana-cli plugins install grafana-simple-json-datasource
Manualmente
É possível fazer o download do .ZIP do projeto e manualmente copiá-lo para o diretório de plugins do seu Grafana (por padrão no path /var/lib/grafana/plugins). Na data de escrita deste tutorial o plugin encontra-se na versão 1.4.1 podendo ser baixado na seguinte página.
# baixe o .zip
$ wget https://grafana.com/api/plugins/grafana-simple-json-datasource/versions/1.4.1/download -O plugin.zip
# Descompacte-o no diretório de plugins do Grafana
$ unzip plugin.zip -D /var/lib/grafana/plugins/
Se instalado com sucesso você irá encontrá-lo na lista de Data Sources do Grafana:
Image for post
A partir daqui vamos começar a integrar o SimpleJson com nosso backend Flask.
É possível fazer a instalação do flask utilizando seu package manager pip:
$ pip install flask flask-cors
O trecho de código abaixo subirá uma aplicação web com 3 rotas: /, /search e /query.

Supondo o nome do arquivo sendo app.py execute-o como:
$ python3 app.py
Note que na linha 23 foi configurada a porta como 8081. Você poderá utilizar qualquer porta desde que esteja disponível. Sendo assim já é possível acessar no browser http://<Host IP>:8081/ para ver sua página funcionando.
Image for post
Image for post
Com o nosso endpoint funcionando voltamos para adição de um novo DataSource no Grafana. Dê um nome para o seu datasource (no meu caso DemoSimpleJson) e a URL que testamos no exemplo anterior (no meu caso http://192.168.31.89:8081). E clique em salvar.
Image for post
Pronto. Agora que estamos com o nosso plugin funcionando vamos analisar como utilizamos o SimpleJson para popular as variáveis e gráficos do Grafana.
Backend: Mecanismo /search
Se modificarmos nossa rota /search de modo que ele retorne um array em JSON da seguinte forma:
@app.route('/search', methods=['GET', 'POST'])
def r_search():
    response = ["uva", "laranja", "melancia"]
    
    return jsonify(response)
Teremos o seguinte resultado:
Image for post
Repassando essa informação para variáveis do Grafana teremos o seguinte resultado.
Image for post
Caso eu queria adicionar algum valor no campo Query é possível analisar o payload do POST.
Image for post
@app.route('/search', methods=['GET', 'POST'])
def r_search():
    print(request.json) # {'target': 'cor=verde'}
    return ""
O resultado do print é {“target”: “cor=verde”} então já sabemos que o Grafana encapsula nossa query num dicionário de chave target. Sendo assim, podemos filtrar o retorno da variável de acordo com a query.
Vamos praticar com um exemplo mais real. Supondo que precisamos fazer uma outra chamada à API do zabbix ou algum outro CMDB e ele nos retorna esta informação particionada por Datacenter -> Cluster -> Host -> VM:
{
  "Datacenter SP": {
    "Cluster_Datacenter SP_A": {
      "Host1": [
        "VM1"
      ],
      "Host2": [
        "VM2"
      ]
    }
  },
  "Datacenter RJ": {
    "Cluster_Datacenter RJ_A": {
      "Host5": [
        "VM6",
        "VM7"
      ],
      "Host6": [
        "VM8",
        "VM9"
      ]
    },
    "Cluster_Datacenter RJ_B": {
      "Host7": [
        "VM10",
        "VM11"
      ]
    }
  },
  "Datacenter PR": {
    "Cluster_Datacenter PR_A": {
      "Host8": [
        "VM12"
      ]
    }
  }
}
Modificando nosso app.py da seguinte forma podemos ter as variáveis funcionando:

Criamos as variáveis datacenter, cluster, host e vm no Grafana:
Image for post
E assim conseguimos inserir variáveis podendo ser utilizadas em qualquer parte do dashboard.
Image for post
Backend: Mecanismo /query
Nesta seção utilizaremos a rota /query da nossa aplicação flask para interagir com o plugin de visualização. Primeiramente selecionamos nosso datasource DemoSimpleJson e selecionando uma query do tipo timeserie e argumento teste a fim de analisar como chegará o payload no nosso backend.
Image for post
@app.route('/query', methods=['GET', 'POST'])
def r_query():
    req = request.json
    print(req)
    return "você acessou o /query"
Verificando um trecho da requisição temos a seguinte estrutura. Já sabemos, então, que podemos extrair o período de tempo da chave range e o target da chave targets:
Image for post
Da estrutura de dados do tipo “timeserie” suportada pelo SimpleJson (visto no capítulo Introdução) vemos que precisamos retornar os dados temporais no formato timestamp.
Para isso podemos utilizar a biblioteca dateutil.parser do python.
import dateutil.parser
date = dateutil.parser.parse("2020-12-02T13:02:20.123Z")
Utilizando o seguinte código nos traz o resultado abaixo:

Image for post
Agora que já estamos familiarizados com as principais funcionalidades do datasource SimpleJson, vamos explorar alguns casos de usos que possam ajudá-lo a trazer mais valor para o Grafana.
Use case: 1 SimpleJson para 5 Databases: MariaDB, MySQL, PostgreSQL, Oracle e SQL Server
Nesta seção apresentarei como utilizar o SimpleJson como uma interface para diversas bases de dados. Lembrando que o core é o Python e bibliotecas auxiliares. O SimpleJson é somente uma forma de conectá-lo ao Grafana. Logo, é possível utilizar essa seção para ingerir dados para qualquer outra aplicação ElasticSearch, Splunk, etc.
O diagrama final do nosso projeto seguirá conforme diagrama abaixo. O Grafana fará a requisição ao plugin do SimpleJson que em seguida fará ao nosso backend python que nos entregará as informações.
Image for post
Diagrama Macro
Setup inicial
Para esta seção estarei utilizando uma biblioteca python chamada pyodbc que servirá de interface de acesso às bases de dados.
$ pip install pyodbc
Lembrando: Será necessário configurar as bases ODBC e isso dependerá principalmente do sistema operacional utilizado.
As bases de dados utilizadas foram criadas na AWS:
Image for post
O processo de configuração do pyodbc tal como a subida dos RDS fogem do escopo desse tutorial e também há bastante documentação sobre na internet.
Teste retornando a versão do SQL Server com Pyodbc.
import pyodbc
driver = "SQLSERVER"
server = "<server-dns>"
dbname = "<dbname>"
username = "<username>"
pwd = "<password>"
port = 1433
conn = pyodbc.connect(f"DRIVER={driver};SERVER={server};UID={username};PWD={pwd};PORT={port}")
cursor = conn.cursor()
cursor.execute("SELECT @@version;")
row = cursor.fetchone()
while row:
    print(row[0])
    row = cursor.fetchone()
O código acima retornará os valores.
Microsoft SQL Server 2017 (RTM-CU19) (KB4535007) - 14.0.3281.6 (X64)
Jan 23 2020 21:00:04
Copyright (C) 2017 Microsoft Corporation
Express Edition (64-bit) on Windows Server 2016 Datacenter 10.0 <X64> (Build 14393: ) (Hypervisor)
Este será o propósito do projeto. Iremos selecionar a versão de todos os Bancos de Dados SQL e retornar para o Grafana na forma de tabela. A query é simples mas já é possível dar uma ideia do que será possível fazer em cenários mais complexos.
Projeto Final
Como o nosso backend comunica com os bancos de dados através da interface pyodbc, esta só terá informações como servidor, username, pwd, dbname, porta e por fim cursor.execute(“<Query SQL>”) por onde executaremos a query SQL.
Portanto, irei retirar esta parte do código por se tratar apenas de informações de autenticação.
@app.route('/query', methods=['GET', 'POST'])
def r_query():
    req = request.json
    target_map = {
        "sqlserver":  test.test_sqlserver,
        "oracle":     test.test_oracle,
        "mysql":      test.test_mysql,
        "postgresql": test.test_postgresql,
        "mariadb":    test.test_mariadb,
    }
    response = [
        {
          "columns":[
            {"text":"Version","type":"string"},
          ],
          "rows":[
              [i]
              for i in target_map[req["targets"][0]["target"]]()
          ],
          "type":"table"
        }
    ]
    return jsonify(response)
Desta forma teremos o seguinte resultado:
Image for post
A variável target_map é mapeada a partir do target que colocarmos na query. Como por exemplo sqlserver.
Image for post
Bônus 1: Web scrape HTML
Talvez você queria retirar informações de uma página WEB e trazer para seu painel no Grafana. Utilizando a linguagem python também facilita muito esse trabalho.
Nesta seção vamos fazer um scrape das informações de EC2 do site https://www.ec2instances.info/ e mostrá-lo no Grafana.
Image for post
https://www.ec2instances.info/
Para isso três bibliotecas ajudarão bastante nessa tarefa:
Requests: Fazer requisições HTTP à websites
BeautifulSoup: Fazer parse de HTML
Pandas: Fazer data analytics em dados
Fazendo a instalação dessas bibliotecas
$ pip install pandas requests pandas beautifulsoup4
Faremos, então, o scrape da URL e redirecionaremos a saída para o Grafana.

O resultado:
Image for post
Bônus 2: Retornando resultados do MongoDB
Para conectarmos ao MongoDB utilizamos a biblioteca pymongo responsável por fazer a conexão com o banco. Para instalar:
$ pip install pymongo
Subimos uma instância do mongodb e mongoku (visualização) com docker-compose:
version: "3"
services:
  mongodb:
    image: mongo
    ports:
      - 27017:27017
    environment:
      - MONGO_INITDB_ROOT_USERNAME=root
      - MONGO_INITDB_ROOT_PASSWORD=root123
  mongoku:
    image: huggingface/mongoku
    ports:
      - 3100:3100
    environment:
      - MONGOKU_DEFAULT_HOST=mongodb://root:root123@mongodb:27017
Criamos dados falsos para o MongoDB simulando o consumo de CPU% de uma EC2. Observa-se que cada documento possui 3 campos: _id (uso interno do MongoDB), date e value.
Image for post
Visão da collection no Mongoku
Vamos, então, conectar nosso backend SimpleJson flask para a base do MongoDB para plotar um gráfico do consumo.
Utilizando o conector do pymongo temos o seguinte código:

Fazendo a chamada pelo Grafana:
Image for post
Bônus 3: Retornando resultados de CSV e Excel
Retornar resultados de arquivos CSV e Excel tanto local quanto na web pode ser feito utilizando a biblioteca pandas.
$ pip install pandas
Iremos utilizar como exemplo a mesma página https://www.ec2instances.info/ como exemplo.
Image for post
Clique em CSV para baixar o arquivo.
Em seguida coloque o arquivo em alguma pasta local ou pagina web que possa ser acessível pelo nosso backend python.
Ficando o código:

E resultado:
Image for post
Conclusão
Este foi um artigo um tanto extenso onde procurei iniciá-lo com este poderoso datasource, como também alguns conceitos de backend, webapis, conexão com bases de dados e outras integrações. Espero que este overview sirva de início para você criar suas próprias integrações. Como dizem: O céu é o limite! Não esqueça de compartilhar suas integrações conosco!
Qualquer dúvida você pode nos encontrar no grupo do telegram “Grafana Brasil”
Good Charting! :)