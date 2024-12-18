package com.kosmo.komofunding.repository;

import com.kosmo.komofunding.entity.Payment;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.awt.print.Pageable;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, String> {
    Optional<Payment> findByPaymentId(String paymentId);
    List<Payment> findByProjectId(String projectId);
    Boolean existsByPaymentNum(Long paymentNum);
    List<Payment> findByUserId(String userId);

    Page<Payment> findAll(Pageable pageable);
}
