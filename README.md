# Game Of Drones

Quick Start

```
dotnet run
```

Go to the following URL:

```
http://localhost:5000
```

If you don't have any to run .NET applications, follow the next steps.


## Set Environment for MacOS


### Docker
In order to run the application, some programs has to be downloaded, such as Docker.
```
https://store.docker.com/editions/community/docker-ce-desktop-mac
```

### SQL Server
Then download the SQL server image from there so we can stop an run our SQL server service from Docker.

```
sudo docker pull microsoft/mssql-server-linux:2017-latest
```

After we download our SQL server image, register service in docker.

```
sudo docker run -e 'ACCEPT_EULA=Y' \
                          -e 'SA_PASSWORD=Passw0rd!' \
                          -p 1433:1433 \
                          --name mssql \
                          -d microsoft/mssql-server-linux:2017-latest
```

To start an intance of SqlServer,

```
docker start mssql
```


### .NET SDK

Download both Runtime and SDK .NET Core 2.2

```
https://dotnet.microsoft.com/download
```

To verify installation succeed

```
dotnet --version
```


### Visual Studio Code

To code an run my project I used Visual Studio Code


### EntityFrameworkCore

In visual studio code, open the terminal, and execute the following command

```
dotnet add package Microsoft.EntityFrameworkCore.SqlServer --version 2.1.0
```

This extension is to build a RESTful API project within Visual Studio Code by using ASP.NET Core and Entity Framework Core.


### Node.js and Node Package Manager

```
https://nodejs.org/en/
```

To use client-side dependencies and install tools.

#### WebPack
```
npm install webpack@3.8.1 --save-dev
```

#### React and ReactDOM
```
npm install react react-dom --save-dev
```

#### Babel
```
npm install @babel/preset-react --save-dev
```



## Observations

### Unit Tests
Was RESTApi was not tested with unit test, however was tested manually.

### Logging
The way in which the app is being logged is not properly. 
