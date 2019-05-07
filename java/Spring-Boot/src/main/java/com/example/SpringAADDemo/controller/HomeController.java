/*******************************************************************************
 // Copyright (c) Microsoft Corporation.
 // All rights reserved.
 //
 // This code is licensed under the MIT License.
 //
 // Permission is hereby granted, free of charge, to any person obtaining a copy
 // of this software and associated documentation files(the "Software"), to deal
 // in the Software without restriction, including without limitation the rights
 // to use, copy, modify, merge, publish, distribute, sublicense, and / or sell
 // copies of the Software, and to permit persons to whom the Software is
 // furnished to do so, subject to the following conditions :
 //
 // The above copyright notice and this permission notice shall be included in
 // all copies or substantial portions of the Software.
 //
 // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 // IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 // FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.IN NO EVENT SHALL THE
 // AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 // LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 // OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 // THE SOFTWARE.
 ******************************************************************************/
package com.example.SpringAADDemo.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClient;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClientService;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.oidc.user.DefaultOidcUser;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class HomeController {
	@Autowired
	OAuth2AuthorizedClientService oauthClientService;
	
	@RequestMapping("/")
	public String index() {
		return "index";
	}
	
	@RequestMapping("/secure")
    @PreAuthorize("hasRole('ROLE_USER')")
	public String secure(Model model, OAuth2AuthenticationToken authToken) {
		// Get the current authenticated user's auth token 
		// OAuth2AuthenticationToken authToken = (OAuth2AuthenticationToken) SecurityContextHolder.getContext().getAuthentication();
		
		// Get user details (user name, claims, etc.) from the auth token
		DefaultOidcUser userDetails = (DefaultOidcUser) authToken.getPrincipal();
		
		// Exchange the auth token for an access token that can be used to access Microsoft Graph APIs
		OAuth2AuthorizedClient client = oauthClientService.loadAuthorizedClient(
				authToken.getAuthorizedClientRegistrationId(), authToken.getName());
		String accessToken = client.getAccessToken().getTokenValue();

		model.addAttribute("userName", userDetails.getGivenName());
		model.addAttribute("idToken", userDetails.getIdToken().getTokenValue());
		model.addAttribute("accessToken", accessToken);
		model.addAttribute("claims", userDetails.getAttributes());
		
		return "secure";
	}
	
	@ResponseBody
	@RequestMapping("/secure/user")
    @PreAuthorize("hasRole('ROLE_USER')")
    public String roleUserPage() {
        return "Role User";
    }
	
	@ResponseBody
	@RequestMapping("/secure/admin")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public String roleAdminPage() {
        return "Role Admin";
    }	
	
	@RequestMapping(value="/logout", method = { RequestMethod.GET, RequestMethod.POST })
	public String logoutPage(HttpServletRequest request, HttpServletResponse response, OAuth2AuthenticationToken authToken) {
	    if (authToken != null){    
	        new SecurityContextLogoutHandler().logout(request, response, authToken);
	    }
	    return "redirect:/login?logout"; 
	}
}
