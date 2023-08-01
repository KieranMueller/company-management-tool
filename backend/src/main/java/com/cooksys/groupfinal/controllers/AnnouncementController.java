package com.cooksys.groupfinal.controllers;

import com.cooksys.groupfinal.dtos.AnnouncementDto;
import com.cooksys.groupfinal.services.AnnouncementService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/announcements")
@RequiredArgsConstructor
@CrossOrigin
public class AnnouncementController {

    private final AnnouncementService announcementService;

    @PutMapping("/delete/{id}")
    public AnnouncementDto deleteAnnouncement(@PathVariable Long id) {
        return announcementService.deleteAnnouncement(id);
    }

}
