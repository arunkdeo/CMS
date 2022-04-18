package com.learners.cms.service;

import com.learners.cms.modles.Photo;
import com.learners.cms.modles.PhotoDto;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface PhotoService {
    List<PhotoDto> getPhotosForContact(String contactId);

    PhotoDto getPhotoById(String photoId);

    PhotoDto addPhoto(String title, String description, String contactId, MultipartFile file) throws IOException;
}
