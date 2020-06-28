# FullStackLabsTest
Employee Manager using Asp.net core 3.1 web API and Angular 9.1

## Prerequisites
* [.NET Core 3.1](https://dotnet.microsoft.com/download/dotnet-core/3.1)
* [Visual Studio 2019](https://visualstudio.microsoft.com/vs/)'

If you clone the repo, make sure you setup the database and Entity Framework migrations! This is how:

In Visual Studio 2019:

1. Remove the contents of the folder Migrations.
2. Then open the Package Manager Console (Tools->Nuget Package Manager->Package Manager Console).
3. Run the following commands:

```
Add-Migration Initial
Update-Database
```
4. Change the appUrl in environment.ts in clientApp (eg: appUrl: 'http://localhost:5000/')
5. Now press F5 and run the application. You will have an empty employee list to start with

## Debugging

If you get an error message running the app, first make sure you installed node modules using the npm install command. In VS Code or in the Node.js command prompt, run npm install in the ClientApp folder.

Make sure you've installed the following as well:

1. Angular CLI using the npm install -g @angular/cli command.

If you get a timeout exception as follow:

```javascript
The Angular CLI process did not start listening for requests within the timeout period of 0 seconds
```
Please press Ctrl+F5 to and reload the application
