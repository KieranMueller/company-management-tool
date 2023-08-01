package com.cooksys.groupfinal.repositories;

import com.cooksys.groupfinal.entities.Announcement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AnnouncementRepository extends JpaRepository<Announcement, Long> {


    Optional<Announcement> findByIdAndDeletedFalse(Long id);
}
