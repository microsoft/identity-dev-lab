## .Net Framework Lab

### Guide:

The VS2017 .Net MVC template will work for this, or you can follow the new quick start doc. 

https://docs.microsoft.com/en-us/azure/active-directory/develop/quickstart-v2-aspnet-webapp

The ADFS folder contains a sample of the MVC template wired up for ADFS, per https://docs.microsoft.com/en-us/windows-server/identity/ad-fs/development/enabling-openid-connect-with-ad-fs. 

### Notes:

* Claims.cshtml is a sample showing claim inspection
* Startup.Auth.cs has some samples showing intercepting various events/notifications during the sign-in process
