using System;
using Owin;
using Microsoft.Owin.Security;
using Microsoft.Owin.Security.Cookies;
using Microsoft.Owin.Security.OpenIdConnect;
using System.Threading.Tasks;
using Microsoft.Owin.Security.Notifications;
using Microsoft.IdentityModel.Tokens;
using Lab.Common;
using Infra.Auth;

namespace WebApp_OpenIDConnect_DotNet
{
    public partial class Startup
    {
        public void ConfigureAuth(IAppBuilder app)
        {
            app.SetDefaultSignInAsAuthenticationType(CookieAuthenticationDefaults.AuthenticationType);

            var authProvider = new CookieAuthenticationProvider
            {
                OnResponseSignIn = ctx =>
                {
					
                    var task = Task.Run(async () => {
                        await AuthInit(ctx);
                    });
                    task.Wait();
                },
                OnValidateIdentity = ctx =>
                {
                    //good spot to troubleshoot nonces, etc...
                    return Task.FromResult(0);
                }
            };

            var cookieOptions = new CookieAuthenticationOptions
            {
                Provider = authProvider,
				//may help with redirect loops
                CookieManager = new Microsoft.Owin.Host.SystemWeb.SystemWebChunkingCookieManager()
            };

            app.UseCookieAuthentication(cookieOptions);

            app.UseOpenIdConnectAuthentication(new OpenIdConnectAuthenticationOptions
            {
                AuthenticationType = CustomAuthType.LabAdmin,
                ClientId = Settings.LabAdminClientId,
                Authority = Settings.AdminAuthority,
                PostLogoutRedirectUri = "/",
                Notifications = new OpenIdConnectAuthenticationNotifications
                {
                    AuthenticationFailed = AuthFailed,
                    AuthorizationCodeReceived = async (context) =>
                    {
						//used if you want to cache the access token for api calls
                        await OnAuthorizationCodeReceived(context);
                        await AuthInit(context);
                    },
                    RedirectToIdentityProvider = (context) =>
                    {
                        string appBaseUrl = context.Request.Scheme + "://" + context.Request.Host + context.Request.PathBase + "/";
                        context.ProtocolMessage.RedirectUri = appBaseUrl;
                        context.ProtocolMessage.PostLogoutRedirectUri = appBaseUrl;
                        return Task.FromResult(0);
                    },
                },
                TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = false,
                }
            });
        }

        private static Task AuthFailed(AuthenticationFailedNotification<Microsoft.IdentityModel.Protocols.OpenIdConnect.OpenIdConnectMessage, OpenIdConnectAuthenticationOptions> arg)
        {
            arg.Response.Redirect(string.Format("/home?msg=", arg.Exception.Message));
            return Task.FromResult(0);
        }
		
		private static async Task OnAuthorizationCodeReceived(AuthorizationCodeReceivedNotification context)
        {
            try
            {
                var code = context.Code;

                ClientCredential credential = new ClientCredential(ClientId, ClientSecret);
                string signedInUserID = context.AuthenticationTicket.Identity.FindFirst(TokenCacheClaimTypes.ObjectId).Value;
				//sample is using a custom token cache designed for CosmosDB
				//more info on token caches:
				//   https://docs.microsoft.com/en-us/azure/architecture/multitenant-identity/token-cache
				//   https://stackoverflow.com/questions/44268324/recommended-adal-token-cache-for-web-api
                AuthenticationContext authContext = new AuthenticationContext(Authority, new AdalCosmosTokenCache(signedInUserID, GetFQDN(context.Request)));
                var redirectUrl = HttpContext.Current.Request.Url.GetLeftPart(UriPartial.Path);
                AuthenticationResult result = await authContext.AcquireTokenByAuthorizationCodeAsync(
                    code, new Uri(redirectUrl), credential, "https://login.microsoftonline.com/");
            }
            catch (Exception ex)
            {
                Logging.WriteToAppLog("Error caching auth code", System.Diagnostics.EventLogEntryType.Error, ex);
                throw;
            }
        }
	}
}
