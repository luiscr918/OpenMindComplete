package com.example.OpenMind.Repository;

import com.example.OpenMind.Entity.Ejemplar;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EjemplarRepository  extends JpaRepository <Ejemplar, Long>{
}
