package com.learners.cms.rest;

import com.learners.cms.modles.PhotoDto;
import com.learners.cms.service.PhotoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/photo")
public class PictureController {

    @Autowired
    private PhotoService photoService;

    @GetMapping("/contact/{contactId}")
    public ResponseEntity<List<PhotoDto>> getPhotos(@PathVariable String contactId) {
        List<PhotoDto> photo = photoService.getPhotosForContact(contactId);
        return new ResponseEntity<>(photo, HttpStatus.OK);
    }

    @PostMapping(value = "/add")
    public void addPhoto(@RequestParam("contactId") String contactId, @RequestParam("title") String title, @RequestParam("description") String description,
                         @RequestParam("image") MultipartFile image)
            throws IOException {
        PhotoDto photo = photoService.addPhoto(title, description, contactId, image);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PhotoDto> getPhoto(@PathVariable String id) {
        PhotoDto photo = photoService.getPhotoById(id);
        return new ResponseEntity<>(photo, HttpStatus.OK);
    }

}
