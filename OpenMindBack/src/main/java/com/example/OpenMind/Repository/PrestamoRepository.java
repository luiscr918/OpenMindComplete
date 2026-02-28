package com.example.OpenMind.Repository;

import com.example.OpenMind.Entity.Prestamo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PrestamoRepository extends JpaRepository <Prestamo, Long> {
    //Lista de prestamo por usuario
    List<Prestamo>findByUsuarioId(Long usuarioId);
}
