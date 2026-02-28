package com.example.OpenMind.Service;


import com.example.OpenMind.Entity.Libro;
import com.example.OpenMind.Entity.Prestamo;
import com.example.OpenMind.Entity.Usuario;
import com.example.OpenMind.Enums.EstadoPrestamo;
import com.example.OpenMind.Repository.LibroRepository;
import com.example.OpenMind.Repository.PrestamoRepository;
import com.example.OpenMind.Repository.UsuarioRepository;
import com.example.OpenMind.dto.PrestamoDTO;
import com.example.OpenMind.mapper.PrestamoMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PrestamoService {

    @Autowired private PrestamoRepository prestamoRepository;
    @Autowired private UsuarioRepository usuarioRepository;
    @Autowired private LibroRepository libroRepository;
    @Autowired private PrestamoMapper prestamoMapper;

    @Transactional(readOnly = true)
    public List<PrestamoDTO> listarPrestamos() {
        return prestamoRepository.findAll().stream()
                .map(prestamoMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Transactional
    public PrestamoDTO crearPrestamo(PrestamoDTO prestamoDTO) {
        // 1. Convertir DTO a Entidad
        Prestamo prestamo = prestamoMapper.toEntity(prestamoDTO);

        // 2. Validar y cargar Usuario
        Usuario usuario = usuarioRepository.findById(prestamoDTO.getUsuarioId())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        // 3. Validar y cargar Libro
        Libro libro = libroRepository.findById(prestamoDTO.getLibroId())
                .orElseThrow(() -> new RuntimeException("Libro no encontrado"));

        // 4. Configurar lógica automática
        prestamo.setUsuario(usuario);
        prestamo.setLibro(libro);
        prestamo.setFechaSalida(LocalDate.now());
        prestamo.setEstadoPrestamo(EstadoPrestamo.ACTIVO);

        // VALIDAR STOCK
    if (libro.getStock() == null || libro.getStock() <= 0) {
        throw new RuntimeException("No hay stock disponible para este libro");
    }

    // DESCONTAR STOCK
    libro.setStock(libro.getStock() - 1);

    // Guardar libro actualizado
    libroRepository.save(libro);

    // Guardar préstamo
        return prestamoMapper.toDTO(prestamoRepository.save(prestamo));
    }

    @Transactional(readOnly = true)
    public PrestamoDTO obtenerPrestamoPorId(Long id) {
        Prestamo prestamo = prestamoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Préstamo no encontrado"));
        return prestamoMapper.toDTO(prestamo);
    }

    @Transactional
    public PrestamoDTO devolverPrestamo(Long id) {
        // Buscamos la entidad existente
        Prestamo prestamo = prestamoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Préstamo no encontrado"));

        // Lógica de devolución
        prestamo.setEstadoPrestamo(EstadoPrestamo.DEVUELTO);
        prestamo.setFechaDevolucion(LocalDate.now());

        // Aumentar stock del libro
        Libro libro = prestamo.getLibro();
        libro.setStock(libro.getStock() + 1);
        // Al estar en una @Transactional, Hibernate sincroniza el cambio automáticamente al terminar
        return prestamoMapper.toDTO(prestamoRepository.save(prestamo));
    }

    @Transactional
    public void eliminarPrestamo(Long id) {
        if (!prestamoRepository.existsById(id)) {
            throw new RuntimeException("No se puede eliminar: Préstamo no encontrado");
        }
        prestamoRepository.deleteById(id);
    }
    //Obtener prestamos por usuario
    @Transactional(readOnly = true)
    public List<PrestamoDTO> prestamosUsuario(Long usuarioId){
        return prestamoRepository.findByUsuarioId(usuarioId).stream()
                .map(prestamoMapper::toDTO)
                .collect(Collectors.toList());
    }
}