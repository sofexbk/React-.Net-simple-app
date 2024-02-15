ARG BUILD_CONFIGURATION=Release

# Use the ASP.NET base image for runtime
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 8080
EXPOSE 8081

# Use the .NET SDK image for building
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy the project file and restore dependencies
COPY ["CRUDAPPLICATION.csproj", "./"]
RUN dotnet restore "CRUDAPPLICATION.csproj"

# Copy the remaining source code and build the application
COPY . .
WORKDIR "/src/"
RUN dotnet build "CRUDAPPLICATION.csproj" -c Release -o /app/build


# Publish the application
FROM build AS publish
RUN dotnet publish "CRUDAPPLICATION.csproj" -c Release -o /app/publish /p:UseAppHost=false

# Build the final runtime image
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "CRUDAPPLICATION.dll"]

# Install SQL Server tools for Linux
RUN apt-get update \
    && apt-get install -y gnupg \
    && apt-get install -y wget \
    && wget -qO- https://packages.microsoft.com/keys/microsoft.asc | apt-key add - \
    && echo "deb [arch=amd64] https://packages.microsoft.com/debian/10/prod buster main" > /etc/apt/sources.list.d/mssql-release.list \
    && apt-get update \
    && ACCEPT_EULA=Y apt-get install -y msodbcsql17 mssql-tools unixodbc \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* \
    && echo 'export PATH="$PATH:/opt/mssql-tools/bin"' >> ~/.bashrc

# Set environment variables for SQL Server
ENV ACCEPT_EULA=Y

# Start the ASP.NET application
CMD dotnet CRUDAPPLICATION.dll