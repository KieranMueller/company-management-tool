package com.cooksys.groupfinal.services.impl;

import com.cooksys.groupfinal.dtos.BasicUserDto;
import com.cooksys.groupfinal.entities.*;
import com.cooksys.groupfinal.exceptions.BadRequestException;
import com.cooksys.groupfinal.exceptions.NotFoundException;
import com.cooksys.groupfinal.mappers.BasicUserMapper;
import com.cooksys.groupfinal.repositories.*;
import com.cooksys.groupfinal.services.ValidateService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ValidateServiceImpl implements ValidateService {

    private final CompanyRepository companyRepository;
    private final UserRepository userRepository;
    private final TeamRepository teamRepository;
    private final ProjectRepository projectRepository;
    private final AnnouncementRepository announcementRepository;

    @Override
    public Company findCompany(Long id) {
        Optional<Company> company = companyRepository.findById(id);
        if (company.isEmpty())
            throw new NotFoundException("A company with the provided id does not exist.");
        return company.get();
    }

    @Override
    public User findUser(Long id) {
        Optional<User> user = userRepository.findByIdAndActiveTrue(id);
        if(user.isEmpty())
            throw new NotFoundException("The id provided does not belong to an active user.");
        return user.get();
    }

    @Override
    public User findUser(String username) {
        Optional<User> user = userRepository.findByCredentialsUsernameAndActiveTrue(username);
        if (user.isEmpty())
            throw new NotFoundException("The username provided does not belong to an active user.");
        return user.get();
    }



    @Override
    public Team findTeam(Long id) {
        Optional<Team> team = teamRepository.findById(id);
        if (team.isEmpty())
            throw new NotFoundException("A team with the provided id does not exist.");
        return team.get();
    }

    @Override
    public Project findProject(Long id) {
        Optional<Project> project = projectRepository.findById(id);
        if (project.isEmpty())
            throw new NotFoundException("A project with the provided id does not exist.");
        return project.get();
    }

    @Override
    public Announcement findAnnouncement(Long id) {
        Optional<Announcement> announcement = announcementRepository.findByIdAndDeletedFalse(id);
        if(announcement.isEmpty())
            throw new NotFoundException("An announcement with the provided id does not exist");
        return announcement.get();
    }

}
