package com.learners.cms.rest;

import com.learners.cms.modles.AppUser;
import com.learners.cms.modles.CMSLoginRequest;
import com.learners.cms.modles.CMSLoginResponse;
import com.learners.cms.security.JwtTokenUtil;
import com.learners.cms.security.CMSUserDetailsService;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@Log4j2
@RestController
@RequestMapping("/authenticate")
public class AuthenticationController {

    private AuthenticationManager authenticationManager;

    private JwtTokenUtil jwtTokenUtil;

    private CMSUserDetailsService userDetailsService;

    private ApplicationContext applicationContext;

    @Autowired
    public AuthenticationController(ApplicationContext applicationContext, JwtTokenUtil jwtTokenUtil, CMSUserDetailsService userDetailsService){
        this.applicationContext = applicationContext;
        this.authenticationManager = applicationContext.getBean(AuthenticationManager.class);
        this.jwtTokenUtil = jwtTokenUtil;
        this.userDetailsService = userDetailsService;
    }

    @PostMapping(value = "/login")
    public ResponseEntity<?> createAuthenticationToken(@RequestBody CMSLoginRequest authRequest) throws Exception {
        log.info("Authentication Request received for userName : {}", authRequest.getUserName());
        authenticate(authRequest.getUserName(), authRequest.getCredential());
        final UserDetails userDetails = userDetailsService.loadUserByUsername(authRequest.getUserName());
        final String token = jwtTokenUtil.generateToken(userDetails);
        log.info("Authentication Request processed successfully for userName : {}", authRequest.getUserName());
        return ResponseEntity.ok(new CMSLoginResponse(token, authRequest.getUserName()));
    }

    @PostMapping(value = "/register")
    public ResponseEntity<?> saveUser(@RequestBody AppUser user) throws Exception {
        log.info("New User registration Request received with userName : {}", user.getUserName());
        return ResponseEntity.ok(userDetailsService.save(user));
    }

    private void authenticate(String username, String password) throws Exception {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
        } catch (DisabledException e) {
            throw new Exception("USER_DISABLED", e);
        } catch (BadCredentialsException e) {
            throw new Exception("INVALID_CREDENTIALS", e);
        }
    }
}
