# Azure AD Identity Dev Lab

Sample code supporting an Azure AD development lab/training session. Platforms:
 * Angular
 * ASP.Net
 * ASP.Net Core
 * Java
 
 Samples make use of the Active Directory Application Library (ADAL) and/or the Microsoft Application Library (MSAL).

## Lab Outline

* (A PowerPoint deck will accompany this presentation)
* Overview of Azure AD
* Application Types: https://docs.microsoft.com/en-us/azure/active-directory/develop/app-types
* Review modern auth vs legacy (on-prem/NTLM/Kerberos)
* Authentication Basics: https://docs.microsoft.com/en-us/azure/active-directory/develop/authentication-scenarios
* App objects and service principals: https://docs.microsoft.com/en-us/azure/active-directory/develop/app-objects-and-service-principals
* Consent: https://docs.microsoft.com/en-us/azure/active-directory/develop/app-objects-and-service-principals
* OpenID Connect Flows: https://docs.microsoft.com/en-us/azure/active-directory/develop/v1-protocols-openid-connect-code
* ADAL and MSAL, v1 and v2/Microsoft Identity Platform
    * https://docs.microsoft.com/en-us/azure/active-directory/develop/about-microsoft-identity-platform
    * https://docs.microsoft.com/en-us/azure/active-directory/develop/
    * https://docs.microsoft.com/en-us/azure/active-directory/develop/active-directory-authentication-libraries
    * https://docs.microsoft.com/en-us/azure/active-directory/develop/reference-v2-libraries
* Auth Demo
* Azure Stack - disconnected scenarios with ADFS/OIDC
    * https://docs.microsoft.com/en-us/azure-stack/operator/azure-stack-identity-overview
    * https://docs.microsoft.com/en-us/azure-stack/user/azure-stack-solution-hybrid-identity
    * https://docs.microsoft.com/en-us/windows-server/identity/ad-fs/overview/ad-fs-scenarios-for-developers
* Break
* Hackathon: adding modern identity to applications
    * Review this repo
    * Readme for each tech stack has links on getting started
    * Idea is to build an empty app in that stack then add AAD integration - use the sample code as a reference, don't just pull it and build

## Notes
* Azure Stack REST integration enpoints:
  * https://docs.microsoft.com/en-us/azure-stack/operator/azure-stack-integrate-endpoints
* TestingSTS:
  * https://testingsts.azurewebsites.net/

## Contributing

This project welcomes contributions and suggestions.  Most contributions require you to agree to a
Contributor License Agreement (CLA) declaring that you have the right to, and actually do, grant us
the rights to use your contribution. For details, visit https://cla.microsoft.com.

When you submit a pull request, a CLA-bot will automatically determine whether you need to provide
a CLA and decorate the PR appropriately (e.g., label, comment). Simply follow the instructions
provided by the bot. You will only need to do this once across all repos using our CLA.

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/).
For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or
contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.
