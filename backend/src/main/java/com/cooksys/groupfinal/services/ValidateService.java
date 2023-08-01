package com.cooksys.groupfinal.services;

import com.cooksys.groupfinal.dtos.BasicUserDto;
import com.cooksys.groupfinal.entities.*;

public interface ValidateService {

    Company findCompany(Long id);

    User findUser(Long id);

    User findUser(String username);

    Team findTeam(Long id);

    Project findProject(Long id);

    Announcement findAnnouncement(Long id);
}
