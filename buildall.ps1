#buildall
#dotnet new tool-manifest --force
#dotnet tool install dotnet-ef
#dotnet tool install --global dotnet-sonarscanner --version 5.4.1
#nuget restore
#dotnet sonarscanner begin /key:"GOAT" /name:"GOAT" /d:sonar.host.url="http://20.116.21.79/" /d:sonar.login="d432b0cebbe841766e9e43faa44c7f56fc6ba86c" /version:0.0.0.8 /d:sonar.cs.vscoveragexml.reportsPaths="%temp%\*.coveragexml" /d:sonar.exclusions='**/wwwroot/lib/**'
#msbuild .\WebGoat.NET.sln
#dotnet sonarscanner end /d:sonar.login="d432b0cebbe841766e9e43faa44c7f56fc6ba86c"
Clear-Host
set-alias -name codeql -value "C:\work\code\tools\codeql\codeql.exe"
$db = "C:\temp\codeql_database"
if (get-item $db) {
    try {
        Remove-Item $db -Force -Recurse -ErrorAction Stop  
    }
    catch {
        throw "Cannot remove database"
        exit -1
    }
}

msbuild .\WebGoat.NET.sln -t:clean
$cmd = "msbuild.exe WebGoat.NET.sln /nologo /nr:false /p:DeployOnBuild=true /p:DeployDefaultTarget=WebPublish /p:UseSharedCompilation=false"

codeql database create --overwrite --source-root=. --language=csharp --command="$cmd" $db

if ($LASTEXITCODE -ne 0) {
    exit -1
}

start-sleep -Seconds 2



codeql database finalize --finalize-dataset --threads=2 $db --ram=5631
codeql database print-baseline $db
codeql database bundle $db --output=$db\csharp.zip --name=csharp
codeql database analyze C:\temp\codeql_database codeql/csharp-queries --download --format=sarifv2.1.0 --ouput=.\codeql.sarif




