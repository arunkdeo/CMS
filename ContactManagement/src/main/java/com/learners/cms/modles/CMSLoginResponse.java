package com.learners.cms.modles;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.io.Serializable;

@Getter
@AllArgsConstructor
public class CMSLoginResponse implements Serializable {
    private static final long serialVersionUID = 1000000000000000101L;
    private final String token;
    private final String userName;
}
