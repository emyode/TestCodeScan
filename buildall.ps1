#buildall
#dotnet new tool-manifest --force
#dotnet tool install dotnet-ef
dotnet tool install --global dotnet-sonarscanner --version 5.4.1
nuget restore
dotnet sonarscanner begin /key:"GOAT" /name:"GOAT" /d:sonar.host.url="http://20.116.21.79/" /d:sonar.login="d432b0cebbe841766e9e43faa44c7f56fc6ba86c" /version:0.0.0.8 /d:sonar.cs.vscoveragexml.reportsPaths="%temp%\*.coveragexml" /d:sonar.exclusions='**/wwwroot/lib/**'
msbuild .\WebGoat.NET.sln
dotnet sonarscanner end /d:sonar.login="d432b0cebbe841766e9e43faa44c7f56fc6ba86c"
