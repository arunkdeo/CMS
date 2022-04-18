package com.learners.cms.modles;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CMSLoginRequest implements Serializable {
    private static final long serialVersionUID = 1000000000000000100L;

    private String userName;
    private String credential;

}
