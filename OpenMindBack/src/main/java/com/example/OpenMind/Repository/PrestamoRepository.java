package com.example.OpenMind.Repository;

import com.example.OpenMind.Entity.Prestamo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PrestamoRepository extends JpaRepository <Prestamo, Long> {
}
