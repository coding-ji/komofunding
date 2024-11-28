package com.kosmo.komofunding.repository;

import com.kosmo.komofunding.entity.QnA;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface QnARepository extends JpaRepository<QnA, String> {
    Optional<QnA> findByUserId(String userid);
}
