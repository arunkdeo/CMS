package com.learners.cms.service;

import com.learners.cms.modles.Photo;
import com.learners.cms.modles.PhotoDto;
import com.learners.cms.repository.PhotoRepository;
import org.bson.BsonBinarySubType;
import org.bson.types.Binary;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;

@Service
public class PhotoServiceImpl implements PhotoService{
    @Autowired
    private PhotoRepository repository;

    @Override
    public List<PhotoDto> getPhotosForContact(String contactId) {
        List<Photo> photos = repository.getAllPhotoForAContact(contactId);
        List<PhotoDto> photoDtos = new ArrayList<>();
        photos.stream().forEach(p ->{
            photoDtos.add(convertFromPhoto(p));
        });
        return photoDtos;
    }

    @Override
    public PhotoDto getPhotoById(String photoId) {
        Photo photo = repository.findById(photoId).orElseThrow();
        return convertFromPhoto(photo);
    }

    @Override
    public PhotoDto addPhoto(String title, String description, String contactId, MultipartFile file) throws IOException {
        Photo photo = new Photo();
        photo.setTitle(title);
        photo.setContactId(contactId);
        photo.setDescription(description);
        photo.setImage(
                new Binary(BsonBinarySubType.BINARY, file.getBytes()));
        photo = repository.insert(photo);
        return convertFromPhoto(photo);
    }

    private PhotoDto convertFromPhoto(Photo photo){
        PhotoDto photoDto = new PhotoDto();
        photoDto.setId(photo.getId());
        photoDto.setTitle(photo.getTitle());
        photoDto.setDescription(photo.getDescription());
        photoDto.setImage(Base64.getEncoder().encodeToString(photo.getImage().getData()));
        return photoDto;
    }

}
