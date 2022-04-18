package com.learners.cms.security;

import com.learners.cms.modles.AppUser;
import com.learners.cms.repository.AppUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class CMSUserDetailsService implements UserDetailsService {

    @Autowired
    private AppUserRepository userDao;

    @Autowired
    private PasswordEncoder bcryptEncoder;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        AppUser user = userDao.findById(username).orElseThrow(() -> new UsernameNotFoundException("User not found with username/EmailId: " + username));
        UserDetails userDetails = new org.springframework.security.core.userdetails.User(user.getUserName(), new String(user.getCredential()),
                new ArrayList<>());
        return userDetails;
    }

    public AppUser save(AppUser user) {
        AppUser newUser = new AppUser();
        newUser.setUserName(user.getUserName());
        String encryptedPwd = bcryptEncoder.encode(new String(user.getCredential()));
        newUser.setCredential(encryptedPwd);
        return userDao.insert(newUser);
    }
}
